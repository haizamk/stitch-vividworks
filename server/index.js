import { timingSafeEqual } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { normalizeContact, validateContact } from "../shared/contact.mjs";
import { createStore } from "./store.js";

const app = express();
const store = createStore();
const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist");
const hits = new Map();

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(express.json({ limit: "20kb" }));

function clientKey(req) {
  return req.ip || req.socket.remoteAddress || "unknown";
}

function tooMany(req) {
  const now = Date.now();
  const key = clientKey(req);
  const recent = (hits.get(key) ?? []).filter((time) => now - time < 60 * 60 * 1000);
  if (recent.length >= 8) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

function authorized(req) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return false;
  const header = req.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const left = Buffer.from(token);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

app.get("/api/health", async (_req, res) => {
  try {
    await store.ping();
    res.json({ ok: true, service: "vividworks-my", storage: store.mode });
  } catch {
    res.status(503).json({ ok: false, service: "vividworks-my", storage: store.mode });
  }
});

app.post("/api/contact", async (req, res) => {
  if (tooMany(req)) {
    res.status(429).json({
      saved: false,
      message: "Terlalu banyak percubaan. Cuba lagi kemudian.",
    });
    return;
  }

  const contact = normalizeContact(req.body ?? {});
  const errors = validateContact(contact);
  if (Object.keys(errors).length > 0) {
    res.status(400).json({ saved: false, errors });
    return;
  }

  try {
    const saved = await store.save(contact);
    res.status(201).json({
      saved: true,
      id: saved.id,
      storage: store.mode,
      message:
        store.mode === "postgres"
          ? "Mesej telah disimpan dalam pangkalan data. E-mel automatik belum diaktifkan."
          : "Mesej telah disimpan pada pelayan ini. E-mel automatik belum diaktifkan.",
    });
  } catch (error) {
    console.error("contact_save_failed", error instanceof Error ? error.message : "unknown");
    res.status(500).json({ saved: false, message: "Mesej tidak disimpan." });
  }
});

app.get("/api/inquiries", async (req, res) => {
  if (!process.env.ADMIN_TOKEN) {
    res.status(404).json({ message: "Tidak dijumpai." });
    return;
  }
  if (!authorized(req)) {
    res.status(401).json({ message: "Tidak dibenarkan." });
    return;
  }
  try {
    const inquiries = await store.list();
    res.json({ inquiries });
  } catch (error) {
    console.error("inquiry_list_failed", error instanceof Error ? error.message : "unknown");
    res.status(500).json({ message: "Senarai mesej tidak dapat dibaca." });
  }
});

app.use(express.static(distDir, { index: false, maxAge: "1h" }));

app.use((req, res, next) => {
  if (req.path.startsWith("/api/") || (req.method !== "GET" && req.method !== "HEAD")) {
    next();
    return;
  }
  res.sendFile(path.join(distDir, "index.html"), (error) => {
    if (error) next();
  });
});

app.use((req, res) => {
  if (req.path.startsWith("/api/")) {
    res.status(404).json({ message: "Tidak dijumpai." });
    return;
  }
  res.status(404).type("text").send("Halaman tidak dijumpai.");
});

const port = Number(process.env.PORT) || 8787;
const host = process.env.HOST || "0.0.0.0";

store
  .init()
  .then(() => {
    app.listen(port, host, () => {
      console.log(`vividworks-my API listening on ${host}:${port} (${store.mode})`);
    });
  })
  .catch((error) => {
    console.error("store_init_failed", error instanceof Error ? error.message : "unknown");
    process.exit(1);
  });
