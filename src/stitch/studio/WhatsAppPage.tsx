import { useState } from "react";
import type { FormEvent } from "react";
import { cx } from "../../lib/cx.ts";
import { demoUser } from "../demo.ts";
import { StudioShell } from "./Shell.tsx";

const colors = [
  { id: "hijau", className: "bg-[#16a34a]" },
  { id: "indigo", className: "bg-fp-indigo" },
  { id: "ungu", className: "bg-fp-violet" },
] as const;

export function WhatsAppPage() {
  const [color, setColor] = useState<(typeof colors)[number]["id"]>("hijau");
  const [label, setLabel] = useState("WhatsApp Kami");
  const [status, setStatus] = useState("Widget ini pratonton. Mesej tidak dihantar.");
  const swatch = colors.find((item) => item.id === color) ?? colors[0];

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Ujian dihentikan pada pelayar. Tiada panggilan ke WhatsApp.");
  }

  return (
    <StudioShell title="Integrasi WhatsApp">
      <form className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]" onSubmit={onSubmit}>
        <div className="rounded-3xl border border-fp-line bg-white p-5">
          <label className="block text-sm font-semibold" htmlFor="telefon-wa">
            Nombor paparan
            <input id="telefon-wa" defaultValue={demoUser.phone} className="mt-2 h-12 w-full rounded-xl border border-fp-line px-3 font-normal" />
          </label>
          <label className="mt-4 block text-sm font-semibold" htmlFor="label-wa">
            Teks butang
            <input id="label-wa" value={label} onChange={(event) => setLabel(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-fp-line px-3 font-normal" />
          </label>
          <p id="warna-wa" className="mt-4 text-sm font-semibold">Warna</p>
          <div className="mt-2 flex gap-2" role="group" aria-labelledby="warna-wa">
            {colors.map((item) => (
              <button key={item.id} type="button" aria-pressed={color === item.id} aria-label={item.id} onClick={() => setColor(item.id)} className={cx("size-10 rounded-full ring-offset-2", item.className, color === item.id && "ring-2 ring-fp-ink")} />
            ))}
          </div>
          <button type="submit" className="mt-5 h-12 rounded-xl bg-fp-indigo px-4 text-sm font-semibold text-white">
            Uji hantar
          </button>
          <p role="status" className="mt-3 text-sm text-fp-muted">{status}</p>
        </div>
        <aside className="rounded-3xl border border-fp-line bg-fp-surface p-5">
          <p className="text-sm font-semibold">Pratonton widget</p>
          <div className="mt-8 flex justify-end">
            <span className={cx("rounded-full px-4 py-3 text-sm font-semibold text-white", swatch.className)}>{label}</span>
          </div>
        </aside>
      </form>
    </StudioShell>
  );
}
