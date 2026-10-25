import { useState } from "react";
import { cx } from "../../lib/cx.ts";
import { StudioShell } from "./Shell.tsx";

const ranges = {
  "7 hari": [12, 18, 9, 22, 15, 28, 19],
  "30 hari": [40, 36, 52, 48, 61, 44, 70],
  "Bulan ini": [20, 24, 18, 30, 28, 33, 26],
} as const;

export function AnalyticsPage() {
  const [range, setRange] = useState<keyof typeof ranges>("7 hari");
  const [englishNote, setEnglishNote] = useState(false);
  const bars = ranges[range];
  const max = Math.max(...bars);

  return (
    <StudioShell title="Analisis pelawat">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Tempoh contoh">
          {(Object.keys(ranges) as (keyof typeof ranges)[]).map((item) => (
            <button key={item} type="button" role="tab" aria-selected={range === item} onClick={() => setRange(item)} className={cx("rounded-full px-3 py-2 text-sm font-semibold", range === item ? "bg-fp-indigo text-white" : "bg-white ring-1 ring-fp-line")}>
              {item}
            </button>
          ))}
        </div>
        <button type="button" className="h-10 rounded-full bg-white px-3 text-sm font-semibold ring-1 ring-fp-line" aria-pressed={englishNote} onClick={() => setEnglishNote((value) => !value)}>
          {englishNote ? "EN: terjemahan belum ada" : "BM"}
        </button>
      </div>
      {englishNote ? (
        <p className="mb-4 rounded-2xl bg-white px-4 py-3 text-sm text-fp-muted">English copy is not shipped. This board stays in Bahasa Melayu.</p>
      ) : null}
      <section className="rounded-3xl border border-fp-line bg-white p-5">
        <h2 className="font-semibold">Pelawat contoh</h2>
        <p className="mt-1 text-sm text-fp-muted">Angka tetap dalam kod antara muka. Tiada penjejakan pelawat.</p>
        <div className="mt-6 flex h-48 items-end gap-2">
          {bars.map((value, index) => (
            <div key={`${range}-${index}`} className="flex flex-1 flex-col items-center gap-2">
              <div className="w-full rounded-t-lg bg-fp-indigo" style={{ height: `${Math.round((value / max) * 100)}%` }} />
              <span className="text-[11px] text-fp-muted">{value}</span>
            </div>
          ))}
        </div>
      </section>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          ["Sesi contoh", range === "7 hari" ? "123" : "640"],
          ["Halaman / sesi", "1.4"],
          ["Sumber", "Terus (contoh)"],
        ].map(([label, value]) => (
          <article key={label} className="rounded-2xl border border-fp-line bg-white p-4">
            <p className="text-sm text-fp-muted">{label}</p>
            <p className="mt-1 text-2xl font-bold">{value}</p>
          </article>
        ))}
      </div>
    </StudioShell>
  );
}
