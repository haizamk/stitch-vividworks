import { spawn } from "node:child_process";

const api = spawn(process.execPath, ["server/index.js"], {
  stdio: "inherit",
  env: { ...process.env, PORT: process.env.API_PORT || "8787", HOST: "0.0.0.0" },
});

const web = spawn(process.execPath, ["node_modules/vite/bin/vite.js"], {
  stdio: "inherit",
  env: process.env,
});

function stop() {
  api.kill("SIGTERM");
  web.kill("SIGTERM");
}

for (const child of [api, web]) {
  child.on("exit", (code) => {
    stop();
    process.exit(code ?? 0);
  });
}

process.on("SIGINT", () => {
  stop();
  process.exit(0);
});
process.on("SIGTERM", () => {
  stop();
  process.exit(0);
});
