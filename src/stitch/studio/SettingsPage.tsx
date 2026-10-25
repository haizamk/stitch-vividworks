import { useState } from "react";
import type { FormEvent } from "react";
import { cx } from "../../lib/cx.ts";
import { demoUser } from "../demo.ts";
import { StudioShell } from "./Shell.tsx";

const tabs = ["Profil", "Perniagaan"] as const;

export function SettingsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Profil");
  const [status, setStatus] = useState("Perubahan belum disimpan.");
  const [profile, setProfile] = useState<{ name: string; email: string }>({ name: demoUser.name, email: demoUser.email });
  const [business, setBusiness] = useState<{ name: string; location: string }>({ name: demoUser.business, location: demoUser.location });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Disimpan dalam ingatan pelayar sahaja. Tiada pangkalan data dikemas kini.");
  }

  function exportDemo() {
    const blob = new Blob([JSON.stringify({ profile, business, note: "eksport demo" }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "vividworks-tetapan-demo.json";
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus("Fail JSON demo dimuat turun pada peranti anda.");
  }

  return (
    <StudioShell title="Tetapan akaun">
      <div className="mb-4 flex gap-2" role="tablist" aria-label="Tetapan">
        {tabs.map((item) => (
          <button key={item} type="button" role="tab" aria-selected={tab === item} onClick={() => setTab(item)} className={cx("rounded-full px-4 py-2 text-sm font-semibold", tab === item ? "bg-fp-indigo text-white" : "bg-white ring-1 ring-fp-line")}>
            {item}
          </button>
        ))}
      </div>
      <form className="rounded-3xl border border-fp-line bg-white p-5" onSubmit={onSubmit}>
        {tab === "Profil" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold" htmlFor="nama-profil">
              Nama
              <input id="nama-profil" value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} className="mt-2 h-12 w-full rounded-xl border border-fp-line px-3 font-normal" />
            </label>
            <label className="text-sm font-semibold" htmlFor="emel-profil">
              E-mel paparan
              <input id="emel-profil" value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} className="mt-2 h-12 w-full rounded-xl border border-fp-line px-3 font-normal" />
            </label>
          </div>
        ) : (
          <div className="grid gap-4">
            <label className="text-sm font-semibold" htmlFor="nama-bisnes">
              Perniagaan
              <input id="nama-bisnes" value={business.name} onChange={(event) => setBusiness({ ...business, name: event.target.value })} className="mt-2 h-12 w-full rounded-xl border border-fp-line px-3 font-normal" />
            </label>
            <label className="text-sm font-semibold" htmlFor="lokasi-bisnes">
              Lokasi
              <input id="lokasi-bisnes" value={business.location} onChange={(event) => setBusiness({ ...business, location: event.target.value })} className="mt-2 h-12 w-full rounded-xl border border-fp-line px-3 font-normal" />
            </label>
          </div>
        )}
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <button type="submit" className="h-11 rounded-xl bg-fp-indigo px-4 text-sm font-semibold text-white">Simpan demo</button>
          <button type="button" className="h-11 rounded-xl border border-fp-line px-4 text-sm font-semibold" onClick={exportDemo}>Eksport JSON</button>
          <a href="/studio/editor" className="inline-flex h-11 items-center justify-center rounded-xl border border-fp-line px-4 text-sm font-semibold">Lihat draf editor</a>
        </div>
        <p role="status" className="mt-3 text-sm text-fp-muted">{status}</p>
      </form>
    </StudioShell>
  );
}
