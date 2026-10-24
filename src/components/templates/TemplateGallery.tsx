import { useMemo, useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { templateCategories, templates } from "../../data/templates.ts";
import type { TemplateItem } from "../../data/templates.ts";
import { futureTarget } from "../../lib/actions.ts";
import { cx } from "../../lib/cx.ts";
import { Button } from "../ui/Button.tsx";
import { Modal } from "../ui/Modal.tsx";
import { PreviewImage } from "./PreviewImage.tsx";

type Device = "desktop" | "mobile";

export function TemplateGallery({ showFilters = true }: { showFilters?: boolean }) {
  const [category, setCategory] = useState<(typeof templateCategories)[number]>("Semua");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<TemplateItem | null>(null);
  const [device, setDevice] = useState<Device>("desktop");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return templates.filter((item) => {
      const inCategory = category === "Semua" || item.category === category;
      if (!inCategory) return false;
      if (!needle) return true;
      return [item.name, item.category, item.description, item.sampleName].some((value) =>
        value.toLowerCase().includes(needle),
      );
    });
  }, [category, query]);

  function reset() {
    setCategory("Semua");
    setQuery("");
  }

  const preview = active
    ? {
        src: device === "desktop" ? active.image : active.mobileImage,
        alt: device === "desktop" ? active.alt : active.mobileAlt,
        width: device === "desktop" ? 960 : 390,
        height: device === "desktop" ? 600 : 844,
      }
    : null;
  const selectTarget = active ? futureTarget("pilih-template", { template: active.id }) : null;

  return (
    <div>
      {showFilters ? (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p id="penapis-template" className="text-sm font-semibold text-navy">
              Kategori
            </p>
            <div className="mt-2 flex flex-wrap gap-2" role="group" aria-labelledby="penapis-template">
              {templateCategories.map((item) => {
                const selected = item === category;
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setCategory(item)}
                    className={cx(
                      "rounded-full px-3 py-2 text-sm font-semibold",
                      selected ? "bg-navy text-white" : "bg-white text-navy ring-1 ring-line hover:bg-surface",
                    )}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="w-full lg:max-w-xs">
            <label htmlFor="carian-template" className="text-sm font-semibold text-navy">
              Cari template
            </label>
            <input
              id="carian-template"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cth. restoran atau korporat"
              className="mt-2 h-11 w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink"
            />
          </div>
        </div>
      ) : null}

      {visible.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-line bg-white px-6 py-16 text-center">
          <p className="text-lg font-semibold text-navy">Tiada template yang sepadan</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
            Cuba kategori lain atau padam carian. Galeri ini hanya mengandungi enam pratonton konsep.
          </p>
          <div className="mt-5">
            <Button variant="secondary" onClick={reset}>
              Set semula
            </Button>
          </div>
        </div>
      ) : (
        <ul className={cx("grid gap-5 sm:grid-cols-2 xl:grid-cols-3", showFilters && "mt-8")}>
          {visible.map((item) => {
            const target = futureTarget("pilih-template", { template: item.id });
            return (
              <li key={item.id}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_16px_40px_-32px_rgba(10,23,48,0.65)]">
                  <div className="relative">
                    <PreviewImage
                      src={item.image}
                      alt={item.alt}
                      width={960}
                      height={600}
                      className="aspect-[16/10]"
                    />
                    <p className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-navy shadow-sm">
                      Pratonton reka bentuk
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-semibold text-navy">{item.name}</h3>
                    <p className="mt-1 text-xs font-semibold tracking-wide text-brand uppercase">
                      Contoh: {item.sampleName}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-6 text-muted">{item.description}</p>
                    <div className="mt-5 grid gap-2 sm:grid-cols-2">
                      <Button
                        variant="secondary"
                        className="w-full"
                        onClick={() => {
                          setActive(item);
                          setDevice("desktop");
                        }}
                      >
                        Pratonton
                      </Button>
                      <Button href={target.href} external={target.external} variant="primary" className="w-full">
                        Pilih
                      </Button>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}

      <Modal
        open={active !== null}
        title={active ? active.name : "Pratonton"}
        description={active ? `Contoh reka bentuk ${active.sampleName}. Bukan template yang telah dilancarkan.` : undefined}
        onClose={() => setActive(null)}
      >
        {active && preview && selectTarget ? (
          <div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Saiz pratonton">
              <button
                type="button"
                aria-pressed={device === "desktop"}
                onClick={() => setDevice("desktop")}
                className={cx(
                  "inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold",
                  device === "desktop" ? "bg-navy text-white" : "bg-surface text-navy",
                )}
              >
                <Monitor size={16} />
                Desktop
              </button>
              <button
                type="button"
                aria-pressed={device === "mobile"}
                onClick={() => setDevice("mobile")}
                className={cx(
                  "inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold",
                  device === "mobile" ? "bg-navy text-white" : "bg-surface text-navy",
                )}
              >
                <Smartphone size={16} />
                Telefon
              </button>
            </div>

            <div
              className={cx(
                "mx-auto mt-4 overflow-hidden rounded-2xl border border-line bg-white",
                device === "mobile" ? "max-w-[280px]" : "max-w-full",
              )}
            >
              <div className="flex items-center gap-2 border-b border-line px-3 py-2">
                <span className="size-2 rounded-full bg-line" />
                <span className="size-2 rounded-full bg-line" />
                <span className="size-2 rounded-full bg-line" />
                <p className="truncate text-[11px] text-muted">contoh.vividworks.my/{active.id}</p>
              </div>
              <PreviewImage
                src={preview.src}
                alt={preview.alt}
                width={preview.width}
                height={preview.height}
                eager
                className={device === "mobile" ? "aspect-[390/844]" : "aspect-[16/10]"}
              />
            </div>

            <p className="mt-4 text-sm leading-6 text-muted">{active.description}</p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Button href={selectTarget.href} external={selectTarget.external}>
                Pilih template ini
              </Button>
              <Button variant="secondary" onClick={() => setActive(null)}>
                Tutup
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
