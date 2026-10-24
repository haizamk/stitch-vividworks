import { PenLine, Rocket, Sparkles } from "lucide-react";
import { conceptCaption } from "../../data/content.ts";

const concepts = [
  { title: "Jana dengan AI", text: "Cadangan reka bentuk", icon: Sparkles },
  { title: "Editor visual", text: "Teks, warna, susun atur", icon: PenLine },
  { title: "Pratonton", text: "Semak sebelum terbit", icon: Rocket },
];

function SampleSite({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "p-3" : "p-4 sm:p-5"}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-semibold text-navy">Studio Nord</p>
        {compact ? null : (
          <p className="hidden gap-3 text-[10px] text-muted sm:flex">
            <span>Kerja</span>
            <span>Perihal</span>
            <span>Hubungi</span>
          </p>
        )}
      </div>
      <p className="mt-4 text-[10px] font-semibold tracking-[0.14em] text-brand uppercase">Contoh reka bentuk</p>
      <p className={compact ? "mt-2 text-[13px] font-semibold leading-snug text-navy" : "mt-2 max-w-[16rem] text-lg font-semibold leading-tight text-navy sm:text-xl"}>
        Jenama tempatan, rupa yang lebih jelas.
      </p>
      {compact ? null : (
        <p className="mt-2 max-w-xs text-[11px] leading-5 text-muted">
          Halaman contoh untuk menunjukkan susun atur. Bukan website pelanggan sebenar.
        </p>
      )}
      <div className="mt-3 flex gap-2">
        <span className="rounded-lg bg-brand px-2.5 py-1.5 text-[10px] font-semibold text-white">Lihat contoh</span>
        {compact ? null : (
          <span className="rounded-lg border border-line px-2.5 py-1.5 text-[10px] font-semibold text-navy">Butiran</span>
        )}
      </div>
      {compact ? null : (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["Identiti", "Laman", "Warna"].map((label) => (
            <div key={label} className="rounded-xl border border-line bg-surface px-2 py-3">
              <div className="h-8 rounded-md bg-white" />
              <p className="mt-2 text-[10px] font-semibold text-navy">{label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Phone() {
  return (
    <div className="w-[148px] overflow-hidden rounded-[1.4rem] border-[5px] border-navy bg-white shadow-[0_16px_40px_-24px_rgba(10,23,48,0.7)]">
      <div className="mx-auto mt-1.5 h-1 w-10 rounded-full bg-line" />
      <SampleSite compact />
      <div className="h-3" />
    </div>
  );
}

export function ProductConcept() {
  return (
    <div>
      <div className="relative lg:pb-20">
        <div
          aria-hidden="true"
          className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_85%_8%,rgba(101,88,224,0.18),transparent_34%),radial-gradient(circle_at_8%_92%,rgba(21,84,224,0.14),transparent_36%)]"
        />
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_60px_-32px_rgba(10,23,48,0.45)]">
          <div className="flex items-center gap-2 border-b border-line px-3 py-2.5 sm:px-4">
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
            <p className="ml-2 min-w-0 flex-1 truncate rounded-md bg-surface px-3 py-1 text-[11px] text-muted">
              contoh.vividworks.my
            </p>
            <p className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-semibold tracking-wide text-brand uppercase">
              Konsep
            </p>
          </div>
          <div aria-hidden="true">
            <SampleSite />
          </div>
        </div>
        <div className="absolute bottom-0 left-6 hidden lg:block" aria-hidden="true">
          <Phone />
        </div>
      </div>

      <div className="mt-4 flex justify-center lg:hidden" aria-hidden="true">
        <Phone />
      </div>

      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {concepts.map((item) => (
          <li key={item.title} className="rounded-2xl border border-line bg-white px-3 py-3 shadow-[0_10px_30px_-24px_rgba(10,23,48,0.8)]">
            <item.icon size={16} className="text-brand" />
            <p className="mt-2 text-sm font-semibold text-navy">{item.title}</p>
            <p className="text-xs leading-5 text-muted">{item.text}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs leading-5 text-muted">{conceptCaption}</p>
    </div>
  );
}
