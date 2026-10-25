import { Link } from "react-router-dom";
import { ArrowUpRight, Copy, MousePointerClick, Sparkles, Users } from "lucide-react";
import { DemoBanner } from "../DemoBanner.tsx";
import { demoUser } from "../demo.ts";
import { StudioShell } from "./Shell.tsx";

const stats = [
  { label: "Kredit AI Generate", value: "0 / 1", note: "Contoh kuota Starter", icon: Sparkles },
  { label: "Laman demo", value: "1", note: "Belum diterbitkan", icon: Copy },
  { label: "Pelawat contoh (30 hari)", value: "148", note: "Bukan analitik sebenar", icon: Users },
  { label: "Klik WhatsApp contoh", value: "12", note: "Tiada mesej dihantar", icon: MousePointerClick },
];

const tools = [
  { href: "/studio/ai", title: "Jana teks", text: "Salinan contoh di pelayar, bukan model AI." },
  { href: "/templates", title: "Pilih templat", text: "Enam pratonton sedia ada, bukan katalog 18 item." },
  { href: "/studio/whatsapp", title: "Widget WhatsApp", text: "Ujian tidak menghantar mesej." },
  { href: "/studio/tetapan", title: "Tetapan demo", text: "Simpanan kekal pada pelayar ini sahaja." },
];

export function DashboardPage() {
  return (
    <StudioShell title="Papan pemuka">
      <section className="rounded-3xl border border-fp-line bg-white p-5 sm:p-6">
        <p className="text-sm font-semibold text-fp-indigo">Akaun contoh</p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Selamat kembali, {demoUser.name}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-fp-muted">
          Laman {demoUser.business} ialah data contoh. Naik taraf tidak mempunyai harga. Tiada bil RM59 atau tempoh percubaan.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link to="/studio/langganan" className="inline-flex h-11 items-center justify-center rounded-xl border border-fp-line px-4 text-sm font-semibold">
            Harga belum diumumkan
          </Link>
          <Link to="/wizard" className="inline-flex h-11 items-center justify-center rounded-xl bg-fp-indigo px-4 text-sm font-semibold text-white">
            Terbitkan? Belum dibuka
          </Link>
        </div>
      </section>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <article key={item.label} className="rounded-2xl border border-fp-line bg-white p-4">
            <item.icon size={18} className="text-fp-indigo" aria-hidden="true" />
            <p className="mt-3 text-2xl font-bold">{item.value}</p>
            <h3 className="text-sm font-semibold">{item.label}</h3>
            <p className="mt-1 text-xs leading-5 text-fp-muted">{item.note}</p>
          </article>
        ))}
      </div>

      <section className="mt-4 rounded-3xl border border-fp-line bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-wide text-fp-muted uppercase">Draf contoh</p>
            <h2 className="mt-1 text-xl font-bold">{demoUser.business}</h2>
            <p className="text-sm text-fp-muted">{demoUser.host}</p>
          </div>
          <DemoBanner compact />
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)]">
          <div className="overflow-hidden rounded-2xl border border-fp-line bg-fp-surface">
            <div className="flex items-center gap-2 border-b border-fp-line bg-white px-3 py-2 text-xs text-fp-muted">
              <span className="size-2.5 rounded-full bg-[#fecaca]" />
              <span className="size-2.5 rounded-full bg-[#fde68a]" />
              <span className="size-2.5 rounded-full bg-[#bbf7d0]" />
              <span className="truncate">{demoUser.host}</span>
            </div>
            <img src="/templates/food-restaurant-desktop.svg" alt="Pratonton konsep restoran untuk data contoh Farhan." className="aspect-[16/9] w-full object-cover object-top" />
          </div>
          <div className="flex flex-col gap-3">
            <p className="rounded-2xl bg-fp-indigo-soft px-4 py-3 text-sm leading-6">Draf sedia untuk dilihat. Penerbitan belum dibuka.</p>
            <Link to="/studio/editor" className="inline-flex h-12 items-center justify-center rounded-xl bg-fp-indigo text-sm font-semibold text-white">
              Buka editor demo
            </Link>
            <Link to="/studio/ai" className="inline-flex h-12 items-center justify-center rounded-xl border border-fp-line text-sm font-semibold">
              AI Edit demo
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-4">
        <h2 className="text-lg font-bold">Alat pantas</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {tools.map((tool) => (
            <Link key={tool.href} to={tool.href} className="rounded-2xl border border-fp-line bg-white p-4 hover:border-fp-indigo">
              <h3 className="font-semibold">{tool.title}</h3>
              <p className="mt-2 text-sm leading-6 text-fp-muted">{tool.text}</p>
              <ArrowUpRight size={16} className="mt-3 text-fp-indigo" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-3xl border border-fp-line bg-white p-5">
        <h2 className="font-bold">Aktiviti contoh</h2>
        <ul className="mt-3 space-y-3 text-sm">
          <li>Draf {demoUser.business} dibuka dalam editor demo.</li>
          <li>Kredit AI Generate dipaparkan sebagai 0/1. Tiada penjanaan sebenar.</li>
          <li>Naik taraf Grow, Pro dan Elite masih tanpa harga.</li>
        </ul>
      </section>
    </StudioShell>
  );
}
