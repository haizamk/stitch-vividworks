import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button.tsx";
import { demoUser } from "../demo.ts";
import { StudioShell } from "./Shell.tsx";

export function SitesPage() {
  const [note, setNote] = useState("Laman ini contoh. Ia belum diterbitkan.");

  async function copy() {
    try {
      await navigator.clipboard.writeText(`https://${demoUser.host}`);
      setNote("Pautan contoh disalin. Domain itu tidak wujud.");
    } catch {
      setNote("Papan keratan tidak tersedia. Pautan contoh tidak disalin.");
    }
  }

  return (
    <StudioShell title="Laman web saya">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-fp-muted">Satu kad demo. Tiada senarai laman dari pelayan.</p>
        <Button href="/wizard" variant="indigo">Bina laman baharu</Button>
      </div>
      <article className="rounded-3xl border border-fp-line bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">{demoUser.business}</h2>
            <p className="text-sm text-fp-muted">{demoUser.host}</p>
          </div>
          <span className="rounded-full bg-fp-indigo-soft px-3 py-1 text-xs font-semibold text-fp-indigo">Draf demo</span>
        </div>
        <img src="/templates/food-restaurant-desktop.svg" alt="" className="mt-4 aspect-[16/7] w-full rounded-2xl border border-fp-line object-cover object-top" />
        <p role="status" className="mt-4 text-sm text-fp-muted">{note}</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Button variant="indigoSecondary" onClick={copy}>Salin URL contoh</Button>
          <Button variant="indigoSecondary" onClick={() => setNote("Lawatan dibatalkan. Laman demo belum diterbitkan.")}>Lawati</Button>
          <Link to="/studio/editor" className="inline-flex h-11 items-center justify-center rounded-xl bg-fp-indigo px-4 text-sm font-semibold text-white">Buka editor</Link>
        </div>
      </article>
    </StudioShell>
  );
}
