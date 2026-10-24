import fs from "node:fs";

const brand = fs.readFileSync(new URL("../src/data/brand.ts", import.meta.url), "utf8");
const css = fs.readFileSync(new URL("../src/styles/index.css", import.meta.url), "utf8").toLowerCase();

const matches = [...brand.matchAll(/(\w+):\s*"(#[0-9A-Fa-f]{6})"/g)];
if (matches.length === 0) {
  console.error("No brand colours found in src/data/brand.ts");
  process.exit(1);
}

const missing = matches.filter(([, name, hex]) => {
  const token = `--color-${name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}: ${hex.toLowerCase()}`;
  return !css.includes(token);
});

if (missing.length > 0) {
  console.error("Brand colours are out of sync with src/styles/index.css:");
  for (const [, name, hex] of missing) console.error(`  ${name}: ${hex}`);
  process.exit(1);
}

console.log(`Brand colours in sync (${matches.length}).`);
