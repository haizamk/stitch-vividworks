import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  BarChart3,
  CreditCard,
  Globe,
  LayoutDashboard,
  Menu,
  MessageCircle,
  Plus,
  Search,
  Settings,
  Sparkles,
  Wand2,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock.ts";
import { cx } from "../../lib/cx.ts";
import { DemoBanner } from "../DemoBanner.tsx";
import { demoUser } from "../demo.ts";

const links = [
  { to: "/studio", label: "Papan Pemuka", icon: LayoutDashboard, end: true },
  { to: "/studio/laman", label: "Laman Web Saya", icon: Globe, end: false },
  { to: "/studio/ai", label: "AI Generator", icon: Sparkles, end: false, badge: "Demo" },
  { to: "/studio/editor", label: "Editor visual", icon: Wand2, end: false, badge: "Demo" },
  { to: "/studio/analitik", label: "Analisis & Pelawat", icon: BarChart3, end: false },
  { to: "/studio/whatsapp", label: "Integrasi & WhatsApp", icon: MessageCircle, end: false },
  { to: "/studio/langganan", label: "Langganan & Bil", icon: CreditCard, end: false, badge: "Starter" },
  { to: "/studio/tetapan", label: "Tetapan", icon: Settings, end: false },
] as const;

export function StudioShell({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const drawerRef = useRef<HTMLDivElement>(null);
  useBodyScrollLock(open);

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return [];
    return links.filter((item) => item.label.toLowerCase().includes(needle));
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const root = drawerRef.current;
    const items = () =>
      root ? [...root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")] : [];
    items()[0]?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusables = items();
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="min-h-screen bg-fp-surface text-fp-ink lg:grid lg:grid-cols-[17.5rem_minmax(0,1fr)]">
      <div className={cx("fixed inset-0 z-40 lg:static lg:block", open ? "block" : "hidden lg:block")}>
        <button
          type="button"
          className="absolute inset-0 bg-fp-ink/40 lg:hidden"
          aria-label="Tutup menu studio"
          onClick={() => setOpen(false)}
        />
        <div ref={drawerRef} className="relative flex h-full w-[min(100%,18rem)] flex-col bg-white lg:w-auto">
          <div className="flex items-center justify-between px-4 py-4">
            <NavLink to="/" className="rounded-lg text-sm font-bold">
              VividWorks
              <span className="mt-0.5 block text-[11px] font-medium text-fp-muted">Studio demo</span>
            </NavLink>
            <button type="button" className="grid size-10 place-items-center rounded-xl lg:hidden" onClick={() => setOpen(false)} aria-label="Tutup">
              <X size={18} />
            </button>
          </div>
          <nav aria-label="Studio" className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 pb-4">
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cx(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
                    isActive ? "bg-fp-indigo text-white" : "text-fp-ink hover:bg-fp-indigo-soft",
                  )
                }
              >
                <item.icon size={18} aria-hidden="true" />
                <span className="flex-1">{item.label}</span>
                {"badge" in item && item.badge ? (
                  <span className="rounded-full bg-fp-surface px-2 py-0.5 text-[10px] font-semibold text-fp-indigo">{item.badge}</span>
                ) : null}
              </NavLink>
            ))}
            <NavLink to="/templates" className="mt-2 rounded-xl px-3 py-2.5 text-sm font-medium text-fp-muted hover:bg-fp-indigo-soft" onClick={() => setOpen(false)}>
              Katalog templat
            </NavLink>
          </nav>
          <p className="border-t border-fp-line px-4 py-3 text-xs leading-5 text-fp-muted">Log keluar tidak diperlukan. Tiada sesi disimpan.</p>
        </div>
      </div>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex items-center gap-2 border-b border-fp-line bg-white/95 px-3 py-3 sm:px-5">
          <button type="button" className="grid size-11 place-items-center rounded-xl hover:bg-fp-indigo-soft lg:hidden" aria-label="Buka menu studio" onClick={() => setOpen(true)}>
            <Menu size={18} />
          </button>
          <form
            className="relative min-w-0 flex-1"
            onSubmit={(event) => {
              event.preventDefault();
              const first = matches[0];
              if (first) navigate(first.to);
            }}
          >
            <Search size={16} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-fp-muted" aria-hidden="true" />
            <label htmlFor="carian-studio" className="sr-only">Cari modul studio</label>
            <input
              id="carian-studio"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari laman, editor, analitik…"
              className="h-11 w-full rounded-xl border border-fp-line bg-fp-surface pr-3 pl-9 text-sm"
            />
            {query.trim() ? (
              <ul className="absolute top-12 right-0 left-0 z-20 overflow-hidden rounded-xl border border-fp-line bg-white shadow-lg">
                {matches.length === 0 ? (
                  <li className="px-3 py-3 text-sm text-fp-muted">Tiada modul yang sepadan.</li>
                ) : (
                  matches.map((item) => (
                    <li key={item.to}>
                      <button type="button" className="block w-full px-3 py-2.5 text-left text-sm hover:bg-fp-indigo-soft" onClick={() => { setQuery(""); navigate(item.to); }}>
                        {item.label}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            ) : null}
          </form>
          <NavLink to="/wizard" className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-fp-indigo px-3 text-sm font-semibold text-white">
            <Plus size={16} aria-hidden="true" />
            <span className="hidden sm:inline">Bina laman baharu</span>
          </NavLink>
          <p className="hidden items-center gap-2 rounded-full border border-fp-line px-3 py-1.5 text-xs font-semibold md:flex">
            <span className="grid size-7 place-items-center rounded-full bg-fp-indigo text-white">F</span>
            {demoUser.name}
            <span className="font-medium text-fp-muted">Demo</span>
          </p>
        </header>
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            <DemoBanner compact />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
