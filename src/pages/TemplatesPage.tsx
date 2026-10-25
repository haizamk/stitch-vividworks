import { useMemo, useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { templates } from "../data/templates.ts";
import type { TemplateItem } from "../data/templates.ts";
import { breadcrumbNode, graph, organizationNodes } from "../lib/schema.ts";
import { Button } from "../components/ui/Button.tsx";
import { Modal } from "../components/ui/Modal.tsx";
import { PreviewImage } from "../components/templates/PreviewImage.tsx";
import { Seo } from "../components/seo/Seo.tsx";
import { cx } from "../lib/cx.ts";

const groups = [
  { id: "Semua", match: () => true },
  { id: "Restoran & Kafe", match: (item: TemplateItem) => item.id === "food-restaurant" },
  { id: "Kedai Online", match: (item: TemplateItem) => item.id === "modern-commerce" },
  { id: "Servis", match: (item: TemplateItem) => item.id === "minimal-clean" },
  { id: "Fesyen", match: (item: TemplateItem) => item.id === "premium-luxury" },
  { id: "Korporat", match: (item: TemplateItem) => item.id === "corporate-pro" },
  { id: "Portfolio", match: (item: TemplateItem) => item.id === "creative-tech" },
  { id: "Percuma", match: () => true },
] as const;

const description =
  "Enam pratonton konsep sedia ada. Katalog Stitch yang memaparkan 18 templat tidak disalin sebagai item yang boleh digunakan.";

export default function TemplatesPage() {
  const [group, setGroup] = useState<(typeof groups)[number]["id"]>("Semua");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"nama" | "asal">("asal");
  const [active, setActive] = useState<TemplateItem | null>(null);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  const visible = useMemo(() => {
    const selected = groups.find((item) => item.id === group) ?? groups[0];
    const needle = query.trim().toLowerCase();
    const next = templates.filter((item) => {
      if (!selected.match(item)) return false;
      if (!needle) return true;
      return [item.name, item.sampleName, item.description, item.category].some((value) => value.toLowerCase().includes(needle));
    });
    return sort === "nama" ? [...next].sort((a, b) => a.name.localeCompare(b.name, "ms")) : next;
  }, [group, query, sort]);

  const preview = active
    ? device === "desktop"
      ? { src: active.image, alt: active.alt, width: 960, height: 600 }
      : { src: active.mobileImage, alt: active.mobileAlt, width: 390, height: 844 }
    : null;

  return (
    <>
      <Seo
        title="Templat"
        description={description}
        path="/templates"
        jsonLd={graph([
          ...organizationNodes("/templates"),
          breadcrumbNode([
            { name: "Utama", path: "/" },
            { name: "Templat", path: "/templates" },
          ]),
        ])}
      />
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">Koleksi templat siap guna untuk dilihat</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-fp-muted">{description}</p>
          </div>
          <dl className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-fp-line">
              <dt className="text-xs text-fp-muted">Pratonton</dt>
              <dd className="text-2xl font-bold">{templates.length}</dd>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-fp-line">
              <dt className="text-xs text-fp-muted">Boleh diterbitkan</dt>
              <dd className="text-2xl font-bold">0</dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="sr-only" htmlFor="carian-katalog">Cari templat</label>
          <input id="carian-katalog" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari restoran, fesyen, korporat…" className="h-12 w-full rounded-xl border border-fp-line bg-white px-3 text-sm lg:max-w-sm" />
          <div className="flex gap-2">
            <button type="button" aria-pressed={sort === "asal"} onClick={() => setSort("asal")} className={cx("h-10 rounded-full px-3 text-sm font-semibold", sort === "asal" ? "bg-fp-indigo text-white" : "bg-white ring-1 ring-fp-line")}>Susunan asal</button>
            <button type="button" aria-pressed={sort === "nama"} onClick={() => setSort("nama")} className={cx("h-10 rounded-full px-3 text-sm font-semibold", sort === "nama" ? "bg-fp-indigo text-white" : "bg-white ring-1 ring-fp-line")}>Nama</button>
          </div>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Kategori">
          {groups.map((item) => {
            const count = templates.filter((template) => item.match(template)).length;
            return (
              <button key={item.id} type="button" aria-pressed={group === item.id} onClick={() => setGroup(item.id)} className={cx("shrink-0 rounded-full px-3 py-2 text-sm font-semibold", group === item.id ? "bg-fp-indigo text-white" : "bg-white ring-1 ring-fp-line")}>
                {item.id} ({count})
              </button>
            );
          })}
        </div>
        {group === "Percuma" ? <p className="mt-3 text-sm text-fp-muted">Semua enam pratonton boleh dilihat tanpa bayaran. Ia belum dilancarkan sebagai templat hidup.</p> : null}

        {visible.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-fp-line bg-white px-6 py-16 text-center">
            <p className="text-lg font-semibold">Tiada pratonton yang sepadan</p>
            <button type="button" className="mt-4 text-sm font-semibold text-fp-indigo" onClick={() => { setQuery(""); setGroup("Semua"); }}>Set semula</button>
          </div>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((item) => (
              <li key={item.id} className="overflow-hidden rounded-3xl border border-fp-line bg-white">
                <button type="button" className="block w-full text-left" onClick={() => { setDevice("desktop"); setActive(item); }}>
                  <PreviewImage src={item.image} alt={item.alt} width={960} height={600} className="aspect-[16/10]" />
                  <span className="block px-4 pt-4 font-semibold">{item.sampleName}</span>
                  <span className="block px-4 pb-4 text-sm text-fp-muted">{item.name}</span>
                </button>
                <div className="flex gap-2 px-4 pb-4">
                  <Button variant="indigoSecondary" onClick={() => { setDevice("desktop"); setActive(item); }}>Pratonton</Button>
                  <Button href={`/wizard?templat=${item.id}`} variant="indigo">Guna dalam demo</Button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <section className="mt-12">
          <h2 className="text-2xl font-bold">Bagaimana pratonton ini berfungsi</h2>
          <ol className="mt-4 grid gap-3 md:grid-cols-3">
            {["Pilih satu daripada enam reka bentuk.", "Wizard demo mengisi teks contoh.", "Editor demo membuka kanvas tempatan."].map((text, index) => (
              <li key={text} className="rounded-2xl bg-white p-4 ring-1 ring-fp-line">
                <span className="grid size-8 place-items-center rounded-full bg-fp-indigo text-sm font-bold text-white">{index + 1}</span>
                <p className="mt-3 text-sm leading-6">{text}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="mt-8 rounded-3xl bg-gradient-to-br from-fp-indigo to-fp-violet px-6 py-8 text-white">
          <h2 className="text-2xl font-bold">Tidak jumpa rupa yang tepat?</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/90">Katalog yang lebih besar belum wujud. Hantar pertanyaan atau teruskan dengan wizard demo.</p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link to="/contact" className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-fp-indigo">Hubungi kami</Link>
            <Link to="/wizard" className="inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold ring-1 ring-white/50">Wizard demo</Link>
          </div>
        </section>
      </div>

      <Modal open={active !== null} title={active ? active.sampleName : "Pratonton"} description={active?.description} onClose={() => setActive(null)}>
        {active && preview ? (
          <div>
            <div className="mb-3 flex gap-2">
              <button type="button" aria-pressed={device === "desktop"} onClick={() => setDevice("desktop")} className={cx("inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold", device === "desktop" ? "bg-fp-indigo text-white" : "bg-fp-surface")}>
                <Monitor size={16} aria-hidden="true" /> Desktop
              </button>
              <button type="button" aria-pressed={device === "mobile"} onClick={() => setDevice("mobile")} className={cx("inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold", device === "mobile" ? "bg-fp-indigo text-white" : "bg-fp-surface")}>
                <Smartphone size={16} aria-hidden="true" /> Telefon
              </button>
            </div>
            <PreviewImage src={preview.src} alt={preview.alt} width={preview.width} height={preview.height} eager className="max-h-[50vh] overflow-hidden rounded-2xl" />
            <div className="mt-4">
              <Button href={`/wizard?templat=${active.id}`} variant="indigo" onClick={() => setActive(null)}>Guna dalam wizard demo</Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
