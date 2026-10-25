import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import pg from "pg";

const filePath = path.resolve("data/inquiries.json");

export function storageMode() {
  return process.env.DATABASE_URL ? "postgres" : "file";
}

function postgresSsl(connectionString) {
  if (process.env.DATABASE_SSL === "false" || /sslmode=disable/i.test(connectionString)) return false;
  if (process.env.DATABASE_SSL === "true" || /sslmode=(require|verify-ca|verify-full|prefer)/i.test(connectionString)) {
    return { rejectUnauthorized: false };
  }
  if (/localhost|127\.0\.0\.1/.test(connectionString)) return undefined;
  return { rejectUnauthorized: false };
}

function createPostgres() {
  const connectionString = process.env.DATABASE_URL;
  const pool = new pg.Pool({
    connectionString,
    ssl: postgresSsl(connectionString),
    max: 5,
  });

  return {
    mode: "postgres",
    async init() {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS inquiries (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          business TEXT NOT NULL DEFAULT '',
          plan TEXT NOT NULL DEFAULT '',
          message TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);
    },
    async ping() {
      await pool.query("SELECT 1");
    },
    async save(contact) {
      const row = {
        id: randomUUID(),
        ...contact,
        createdAt: new Date().toISOString(),
      };
      await pool.query(
        `INSERT INTO inquiries (id, name, email, business, plan, message, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [row.id, row.name, row.email, row.business, row.plan, row.message, row.createdAt],
      );
      return { id: row.id, createdAt: row.createdAt };
    },
    async list() {
      const result = await pool.query(
        `SELECT id, name, email, business, plan, message, created_at
         FROM inquiries
         ORDER BY created_at DESC
         LIMIT 100`,
      );
      return result.rows.map((row) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        business: row.business,
        plan: row.plan,
        message: row.message,
        createdAt: row.created_at,
      }));
    },
  };
}

function createFileStore() {
  let chain = Promise.resolve();

  function enqueue(task) {
    const run = chain.then(task, task);
    chain = run.then(
      () => undefined,
      () => undefined,
    );
    return run;
  }

  async function readAll() {
    try {
      const raw = await readFile(filePath, "utf8");
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      if (error && error.code === "ENOENT") return [];
      throw error;
    }
  }

  return {
    mode: "file",
    async init() {
      await mkdir(path.dirname(filePath), { recursive: true });
    },
    async ping() {},
    async save(contact) {
      return enqueue(async () => {
        const rows = await readAll();
        const row = {
          id: randomUUID(),
          ...contact,
          createdAt: new Date().toISOString(),
        };
        rows.push(row);
        await writeFile(filePath, JSON.stringify(rows, null, 2));
        return { id: row.id, createdAt: row.createdAt };
      });
    },
    async list() {
      const rows = await readAll();
      return rows.slice(-100).reverse();
    },
  };
}

export function createStore() {
  return storageMode() === "postgres" ? createPostgres() : createFileStore();
}
