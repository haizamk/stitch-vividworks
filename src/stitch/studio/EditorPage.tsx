import { useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Monitor, Redo2, Smartphone, Tablet, Undo2 } from "lucide-react";
import { Button } from "../../components/ui/Button.tsx";
import { Modal } from "../../components/ui/Modal.tsx";
import { cx } from "../../lib/cx.ts";
import { demoUser } from "../demo.ts";
import { StudioShell } from "./Shell.tsx";

type Device = "desktop" | "tablet" | "phone";
type Block = { id: number; kind: string; text: string };

const palette = [
  { kind: "Tajuk", text: "Nikmati selera warisan, dengan sentuhan baharu." },
  { kind: "Teks", text: "Perenggan contoh untuk menu dan suasana kafe." },
  { kind: "WhatsApp", text: "Butang WhatsApp demo. Tiada sembang dibuka." },
  { kind: "Gambar", text: "Slot gambar. Tiada muat naik ke pelayan." },
  { kind: "Grid", text: "Grid menu contoh: Nasi Lemak, Latte, Kuih." },
  { kind: "Menu", text: "Pautan menu: Utama, Menu, Lokasi." },
  { kind: "Tempahan", text: "Borang tempahan demo. Tiada tempahan disimpan." },
  { kind: "Peta", text: "Peta contoh Shah Alam. Bukan Google Maps langsung." },
  { kind: "Sosial", text: "Ikon sosial tanpa pautan akaun sebenar." },
];

const widths: Record<Device, string> = {
  desktop: "max-w-none",
  tablet: "max-w-xl",
  phone: "max-w-sm",
};

export function EditorPage() {
  const location = useLocation();
  const inserted = (location.state as { insert?: string } | null)?.insert;
  const initial = useMemo<Block[]>(() => {
    const blocks: Block[] = [{ id: 1, kind: "Tajuk", text: "Nikmati selera warisan, dengan sentuhan baharu." }];
    if (inserted) blocks.push({ id: 2, kind: "AI demo", text: inserted });
    return blocks;
  }, [inserted]);
  const [history, setHistory] = useState<Block[][]>([initial]);
  const [index, setIndex] = useState(0);
  const [device, setDevice] = useState<Device>("desktop");
  const [selected, setSelected] = useState(initial[0]?.id ?? 1);
  const [publishOpen, setPublishOpen] = useState(false);
  const nextId = useRef(initial.length + 1);
  const blocks = history[index] ?? initial;

  function commit(next: Block[]) {
    const trimmed = history.slice(0, index + 1);
    setHistory([...trimmed, next]);
    setIndex(trimmed.length);
  }

  function add(kind: string, text: string) {
    const id = nextId.current;
    nextId.current += 1;
    commit([...blocks, { id, kind, text }]);
    setSelected(id);
  }

  const active = blocks.find((block) => block.id === selected) ?? blocks[0];

  return (
    <StudioShell title="Editor visual demo">
      <p className="mb-4 rounded-2xl border border-dashed border-fp-indigo bg-white px-4 py-3 text-sm leading-6">
        GrapesJS tidak dipasang. Kanvas ini susunan React tempatan. Butang terbit tidak menerbitkan laman.
      </p>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {(["desktop", "tablet", "phone"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={device === item}
            onClick={() => setDevice(item)}
            className={cx("inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold", device === item ? "bg-fp-indigo text-white" : "bg-white ring-1 ring-fp-line")}
          >
            {item === "desktop" ? <Monitor size={16} /> : item === "tablet" ? <Tablet size={16} /> : <Smartphone size={16} />}
            {item === "desktop" ? "Desktop" : item === "tablet" ? "Tablet" : "Telefon"}
          </button>
        ))}
        <button type="button" className="inline-flex size-10 items-center justify-center rounded-xl bg-white ring-1 ring-fp-line disabled:opacity-40" aria-label="Buat asal" disabled={index === 0} onClick={() => setIndex((value) => value - 1)}>
          <Undo2 size={16} />
        </button>
        <button type="button" className="inline-flex size-10 items-center justify-center rounded-xl bg-white ring-1 ring-fp-line disabled:opacity-40" aria-label="Buat semula" disabled={index >= history.length - 1} onClick={() => setIndex((value) => value + 1)}>
          <Redo2 size={16} />
        </button>
        <Button variant="indigo" className="ml-auto" onClick={() => setPublishOpen(true)}>Terbit demo</Button>
      </div>

      <div className="grid gap-3 xl:grid-cols-[14rem_minmax(0,1fr)_16rem]">
        <aside className="rounded-2xl border border-fp-line bg-white p-3">
          <h2 className="px-1 text-sm font-semibold">Blok</h2>
          <ul className="mt-2 grid grid-cols-2 gap-2 xl:grid-cols-1">
            {palette.map((item) => (
              <li key={item.kind}>
                <button type="button" className="w-full rounded-xl bg-fp-surface px-3 py-2 text-left text-sm font-medium hover:bg-fp-indigo-soft" onClick={() => add(item.kind, item.text)}>
                  {item.kind}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <div className="overflow-x-auto rounded-2xl border border-fp-line bg-[#eceaf6] p-3 sm:p-6">
          <div className={cx("mx-auto rounded-2xl bg-white p-5 shadow-sm", widths[device])}>
            <p className="text-xs font-semibold text-fp-muted">{demoUser.business}</p>
            <ul className="mt-3 space-y-3">
              {blocks.map((block) => (
                <li key={block.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(block.id)}
                    className={cx("w-full rounded-xl border px-3 py-3 text-left", selected === block.id ? "border-fp-indigo bg-fp-indigo-soft" : "border-transparent")}
                  >
                    <span className="text-[11px] font-semibold tracking-wide text-fp-indigo uppercase">{block.kind}</span>
                    <span className="mt-1 block text-sm leading-6">{block.text}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="rounded-2xl border border-fp-line bg-white p-4">
          <h2 className="text-sm font-semibold">Gaya</h2>
          {active ? (
            <label className="mt-3 block text-sm" htmlFor="teks-blok">
              Teks blok dipilih
              <textarea
                id="teks-blok"
                value={active.text}
                onChange={(event) => {
                  const text = event.target.value;
                  commit(blocks.map((block) => (block.id === active.id ? { ...block, text } : block)));
                }}
                rows={5}
                className="mt-2 w-full rounded-xl border border-fp-line px-3 py-2"
              />
            </label>
          ) : (
            <p className="mt-3 text-sm text-fp-muted">Pilih blok pada kanvas.</p>
          )}
          <p className="mt-4 text-xs leading-5 text-fp-muted">Kredit demo: 0/1 AI Generate, 2/2 AI Edit. Nombor ini label, bukan baki sebenar.</p>
        </aside>
      </div>
      <Modal open={publishOpen} title="Penerbitan belum dibuka" description="Tiada fail dihantar dan tiada domain dikemas kini." onClose={() => setPublishOpen(false)}>
        <Button variant="indigo" onClick={() => setPublishOpen(false)}>Faham, kekal sebagai demo</Button>
      </Modal>
    </StudioShell>
  );
}
