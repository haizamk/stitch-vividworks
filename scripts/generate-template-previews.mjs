import fs from "node:fs";
import path from "node:path";

const brand = fs.readFileSync(new URL("../src/data/brand.ts", import.meta.url), "utf8");

function token(name) {
  const match = brand.match(new RegExp(`${name}:\\s*"(#[0-9A-Fa-f]{6})"`));
  if (!match) throw new Error(`Missing brand colour ${name}`);
  return match[1];
}

const navy = token("navy");
const ink = token("ink");
const blue = token("brand");
const muted = token("muted");
const line = token("line");
const surface = token("surface");
const white = token("white");
const ai = token("ai");
const cream = "#F7F4EF";
const sand = "#E6DDD0";
const gold = "#8C7044";
const clay = "#C4623D";
const blush = "#FFF7F2";

const font = "ui-sans-serif, system-ui, -apple-system, sans-serif";

function esc(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
}

function text(x, y, value, options = {}) {
  const { size = 16, weight = 500, fill = ink, anchor = "start", spacing = 0 } = options;
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="${font}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" letter-spacing="${spacing}">${esc(value)}</text>`;
}

function rect(x, y, w, h, fill, rx = 0, stroke) {
  const strokeAttr = stroke ? ` stroke="${stroke}"` : "";
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"${strokeAttr}/>`;
}

function badge(x = 40, y = 28) {
  return `${rect(x, y, 78, 24, navy, 12)}${text(x + 39, y + 16, "CONTOH", { size: 11, weight: 700, fill: white, anchor: "middle", spacing: 0.8 })}`;
}

function svg(width, height, background, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
${rect(0, 0, width, height, background)}
${body}
</svg>
`;
}

function minimalDesktop() {
  const cards = ["Identiti", "Laman", "Warna"].map((label, index) => {
    const x = 56 + index * 286;
    return `${rect(x, 468, 270, 92, white, 16, line)}${text(x + 20, 510, label, { size: 16, weight: 700, fill: navy })}${text(x + 20, 534, "Blok contoh", { size: 13, fill: muted })}`;
  });
  return svg(960, 600, white, [
    badge(),
    text(56, 92, "Studio Senja", { size: 18, weight: 700, fill: navy }),
    text(640, 92, "Kerja", { size: 14, fill: muted }),
    text(730, 92, "Perihal", { size: 14, fill: muted }),
    text(830, 92, "Hubungi", { size: 14, fill: muted }),
    rect(56, 116, 848, 1, line),
    text(56, 196, "PERKHIDMATAN", { size: 13, weight: 700, fill: blue, spacing: 1.6 }),
    text(56, 258, "Ruang yang tenang", { size: 46, weight: 700, fill: navy }),
    text(56, 314, "untuk perkhidmatan anda.", { size: 46, weight: 700, fill: navy }),
    text(56, 364, "Contoh susun atur minimal. Bukan website pelanggan.", { size: 16, fill: muted }),
    rect(56, 394, 170, 46, blue, 12),
    text(141, 423, "Lihat contoh", { size: 14, weight: 700, fill: white, anchor: "middle" }),
    ...cards,
  ].join(""));
}

function minimalMobile() {
  return svg(390, 844, white, [
    badge(24, 24),
    text(24, 92, "Studio Senja", { size: 18, weight: 700, fill: navy }),
    rect(24, 112, 342, 1, line),
    text(24, 180, "PERKHIDMATAN", { size: 12, weight: 700, fill: blue, spacing: 1.4 }),
    text(24, 230, "Ruang yang", { size: 34, weight: 700, fill: navy }),
    text(24, 274, "tenang.", { size: 34, weight: 700, fill: navy }),
    text(24, 322, "Contoh susun atur minimal.", { size: 15, fill: muted }),
    rect(24, 356, 168, 46, blue, 12),
    text(108, 385, "Lihat contoh", { size: 14, weight: 700, fill: white, anchor: "middle" }),
    rect(24, 440, 342, 96, white, 16, line),
    text(44, 484, "Identiti", { size: 16, weight: 700, fill: navy }),
    text(44, 508, "Blok contoh", { size: 13, fill: muted }),
    rect(24, 552, 342, 96, white, 16, line),
    text(44, 596, "Laman", { size: 16, weight: 700, fill: navy }),
    text(44, 620, "Blok contoh", { size: 13, fill: muted }),
  ].join(""));
}

function luxuryDesktop() {
  return svg(960, 600, cream, [
    badge(40, 28),
    text(480, 92, "Maison Ara", { size: 16, weight: 600, fill: gold, anchor: "middle", spacing: 3 }),
    rect(430, 112, 100, 1, gold),
    text(480, 210, "Keanggunan yang", { size: 44, weight: 600, fill: navy, anchor: "middle" }),
    text(480, 264, "tidak perlu berteriak.", { size: 44, weight: 600, fill: navy, anchor: "middle" }),
    text(480, 312, "Contoh reka bentuk untuk jenama yang mahukan ruang.", { size: 15, fill: muted, anchor: "middle" }),
    rect(250, 360, 460, 180, sand, 18),
    text(480, 458, "Ruang imej contoh", { size: 16, weight: 600, fill: navy, anchor: "middle" }),
  ].join(""));
}

function luxuryMobile() {
  return svg(390, 844, cream, [
    badge(24, 24),
    text(195, 96, "Maison Ara", { size: 14, weight: 600, fill: gold, anchor: "middle", spacing: 2.4 }),
    rect(145, 116, 100, 1, gold),
    text(195, 200, "Keanggunan", { size: 34, weight: 600, fill: navy, anchor: "middle" }),
    text(195, 244, "yang tenang.", { size: 34, weight: 600, fill: navy, anchor: "middle" }),
    text(195, 292, "Contoh reka bentuk.", { size: 15, fill: muted, anchor: "middle" }),
    rect(24, 340, 342, 280, sand, 18),
    text(195, 488, "Ruang imej contoh", { size: 16, weight: 600, fill: navy, anchor: "middle" }),
  ].join(""));
}

function commerceDesktop() {
  const products = [
    ["Biru lembut", "#D9E4FF"],
    ["Pasir", sand],
    ["Ungu lembut", "#E4E0FA"],
  ].map(([label, fill], index) => {
    const x = 56 + index * 292;
    return `${rect(x, 250, 272, 280, white, 18, line)}${rect(x + 16, 266, 240, 150, fill, 12)}${text(x + 20, 450, "Produk contoh", { size: 16, weight: 700, fill: navy })}${text(x + 20, 476, label, { size: 13, fill: muted })}${text(x + 20, 504, "Lihat", { size: 13, weight: 700, fill: blue })}`;
  });
  return svg(960, 600, surface, [
    rect(0, 0, 960, 84, white),
    badge(24, 30),
    text(120, 48, "Kedai Raya", { size: 18, weight: 700, fill: navy }),
    rect(760, 28, 140, 32, surface, 16),
    text(830, 49, "Cari", { size: 13, fill: muted, anchor: "middle" }),
    text(56, 150, "Pilihan untuk rumah anda.", { size: 36, weight: 700, fill: navy }),
    text(56, 186, "Contoh paparan produk. Tiada harga sebenar.", { size: 15, fill: muted }),
    ...products,
  ].join(""));
}

function commerceMobile() {
  return svg(390, 844, surface, [
    rect(0, 0, 390, 88, white),
    badge(20, 32),
    text(112, 50, "Kedai Raya", { size: 18, weight: 700, fill: navy }),
    text(24, 150, "Pilihan untuk", { size: 32, weight: 700, fill: navy }),
    text(24, 190, "rumah anda.", { size: 32, weight: 700, fill: navy }),
    text(24, 228, "Tiada harga sebenar.", { size: 14, fill: muted }),
    rect(24, 260, 342, 220, white, 18, line),
    rect(40, 276, 310, 120, "#D9E4FF", 12),
    text(40, 430, "Produk contoh", { size: 16, weight: 700, fill: navy }),
    text(40, 454, "Lihat", { size: 13, weight: 700, fill: blue }),
    rect(24, 500, 342, 160, white, 18, line),
    rect(40, 516, 310, 70, sand, 12),
    text(40, 620, "Produk contoh", { size: 16, weight: 700, fill: navy }),
  ].join(""));
}

function corporateDesktop() {
  const services = [
    ["01", "Perkhidmatan"],
    ["02", "Pendekatan"],
    ["03", "Hubungan"],
  ].map(([number, label], index) => {
    const x = 56 + index * 292;
    return `${rect(x, 300, 272, 220, white, 18, line)}${text(x + 24, 360, number, { size: 22, weight: 700, fill: blue })}${text(x + 24, 410, label, { size: 22, weight: 700, fill: navy })}${text(x + 24, 450, "Penerangan contoh", { size: 14, fill: muted })}${text(x + 24, 474, "untuk firma.", { size: 14, fill: muted })}`;
  });
  return svg(960, 600, white, [
    rect(0, 0, 960, 88, navy),
    text(40, 52, "Firma Atlas", { size: 20, weight: 700, fill: white }),
    text(700, 52, "Perihal", { size: 14, fill: "#C5D0E0" }),
    text(790, 52, "Hubungi", { size: 14, fill: "#C5D0E0" }),
    badge(40, 112),
    text(40, 200, "Perkhidmatan yang", { size: 42, weight: 700, fill: navy }),
    text(40, 252, "tersusun rapi.", { size: 42, weight: 700, fill: navy }),
    ...services,
  ].join(""));
}

function corporateMobile() {
  return svg(390, 844, white, [
    rect(0, 0, 390, 84, navy),
    text(24, 50, "Firma Atlas", { size: 20, weight: 700, fill: white }),
    badge(24, 112),
    text(24, 196, "Perkhidmatan", { size: 32, weight: 700, fill: navy }),
    text(24, 238, "yang tersusun.", { size: 32, weight: 700, fill: navy }),
    rect(24, 280, 342, 140, white, 16, line),
    text(44, 332, "01", { size: 18, weight: 700, fill: blue }),
    text(44, 366, "Perkhidmatan", { size: 18, weight: 700, fill: navy }),
    rect(24, 440, 342, 140, white, 16, line),
    text(44, 492, "02", { size: 18, weight: 700, fill: blue }),
    text(44, 526, "Pendekatan", { size: 18, weight: 700, fill: navy }),
    rect(24, 600, 342, 140, white, 16, line),
    text(44, 652, "03", { size: 18, weight: 700, fill: blue }),
    text(44, 686, "Hubungan", { size: 18, weight: 700, fill: navy }),
  ].join(""));
}

function foodDesktop() {
  const dishes = ["Hidangan contoh A", "Hidangan contoh B", "Hidangan contoh C"].map((label, index) => {
    const y = 250 + index * 78;
    return `${rect(56, y, 430, 66, white, 14)}${rect(72, y + 16, 34, 34, clay, 8)}${text(122, y + 40, label, { size: 16, weight: 700, fill: navy })}`;
  });
  return svg(960, 600, blush, [
    badge(),
    text(56, 96, "Dapur Suria", { size: 20, weight: 700, fill: navy }),
    text(56, 168, "Rasa yang", { size: 44, weight: 700, fill: navy }),
    text(56, 220, "mengundang datang.", { size: 44, weight: 700, fill: navy }),
    ...dishes,
    rect(530, 150, 374, 390, "#F3D2C4", 24),
    text(717, 350, "Suasana contoh", { size: 18, weight: 700, fill: navy, anchor: "middle" }),
    text(717, 378, "Bukan gambar restoran.", { size: 13, fill: muted, anchor: "middle" }),
  ].join(""));
}

function foodMobile() {
  const dishes = ["Hidangan contoh A", "Hidangan contoh B", "Hidangan contoh C"].map((label, index) => {
    const y = 360 + index * 84;
    return `${rect(24, y, 342, 72, white, 14)}${rect(40, y + 18, 36, 36, clay, 8)}${text(90, y + 42, label, { size: 15, weight: 700, fill: navy })}`;
  });
  return svg(390, 844, blush, [
    badge(24, 24),
    text(24, 96, "Dapur Suria", { size: 20, weight: 700, fill: navy }),
    text(24, 168, "Rasa yang", { size: 34, weight: 700, fill: navy }),
    text(24, 210, "mengundang.", { size: 34, weight: 700, fill: navy }),
    rect(24, 246, 342, 90, "#F3D2C4", 16),
    text(195, 298, "Suasana contoh", { size: 16, weight: 700, fill: navy, anchor: "middle" }),
    ...dishes,
  ].join(""));
}

function techDesktop() {
  const tiles = [
    [540, 180, "Cadangan"],
    [720, 180, "Editor"],
    [540, 300, "Pratonton"],
    [720, 300, "Terbit"],
  ].map(
    ([x, y, label]) =>
      `${rect(x, y, 150, 90, "#16243F", 14)}${text(x + 16, y + 52, label, { size: 15, weight: 700, fill: white })}`,
  );
  return svg(960, 600, white, [
    badge(),
    text(56, 130, "Nadi Digital", { size: 16, weight: 700, fill: ai }),
    text(56, 196, "Produk digital,", { size: 44, weight: 700, fill: navy }),
    text(56, 250, "rupa yang jelas.", { size: 44, weight: 700, fill: navy }),
    text(56, 304, "Contoh laman untuk agensi dan syarikat digital.", { size: 16, fill: muted }),
    rect(56, 340, 180, 48, navy, 12),
    text(146, 370, "Lihat contoh", { size: 14, weight: 700, fill: white, anchor: "middle" }),
    rect(500, 140, 404, 380, navy, 28),
    ...tiles,
  ].join(""));
}

function techMobile() {
  const labels = ["Cadangan", "Editor", "Pratonton", "Terbit"];
  const tiles = labels.map((label, index) => {
    const y = 360 + index * 100;
    return `${rect(24, y, 342, 84, navy, 16)}${text(44, y + 50, label, { size: 16, weight: 700, fill: white })}`;
  });
  return svg(390, 844, white, [
    badge(24, 24),
    text(24, 100, "Nadi Digital", { size: 15, weight: 700, fill: ai }),
    text(24, 168, "Produk digital,", { size: 32, weight: 700, fill: navy }),
    text(24, 210, "rupa yang jelas.", { size: 32, weight: 700, fill: navy }),
    rect(24, 250, 180, 48, navy, 12),
    text(114, 280, "Lihat contoh", { size: 14, weight: 700, fill: white, anchor: "middle" }),
    ...tiles,
  ].join(""));
}

const files = {
  "minimal-clean-desktop.svg": minimalDesktop(),
  "minimal-clean-mobile.svg": minimalMobile(),
  "premium-luxury-desktop.svg": luxuryDesktop(),
  "premium-luxury-mobile.svg": luxuryMobile(),
  "modern-commerce-desktop.svg": commerceDesktop(),
  "modern-commerce-mobile.svg": commerceMobile(),
  "corporate-pro-desktop.svg": corporateDesktop(),
  "corporate-pro-mobile.svg": corporateMobile(),
  "food-restaurant-desktop.svg": foodDesktop(),
  "food-restaurant-mobile.svg": foodMobile(),
  "creative-tech-desktop.svg": techDesktop(),
  "creative-tech-mobile.svg": techMobile(),
};

const output = new URL("../public/templates/", import.meta.url);
fs.mkdirSync(output, { recursive: true });
for (const [name, contents] of Object.entries(files)) {
  fs.writeFileSync(path.join(output.pathname, name), contents);
}
console.log(`Wrote ${Object.keys(files).length} template previews.`);
