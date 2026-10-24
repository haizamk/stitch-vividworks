import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Logo } from "../brand/Logo.tsx";
import { Button } from "../ui/Button.tsx";
import { navigation } from "../../data/site.ts";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock.ts";
import { futureTarget } from "../../lib/actions.ts";
import { cx } from "../../lib/cx.ts";

const focusableSelector = "a[href], button:not([disabled])";

export function Header() {
  const location = useLocation();
  const locationKey = `${location.pathname}${location.search}${location.hash}`;
  const [open, setOpen] = useState(false);
  const [menuLocation, setMenuLocation] = useState(locationKey);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const login = futureTarget("log-masuk");
  const start = futureTarget("bina-website");

  if (menuLocation !== locationKey) {
    setMenuLocation(locationKey);
    setOpen(false);
  }

  useBodyScrollLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const header = headerRef.current;
    const visible = () =>
      header
        ? [...header.querySelectorAll<HTMLElement>(focusableSelector)].filter(
            (element) => element.getClientRects().length > 0,
          )
        : [];
    visible()[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const items = visible();
      const first = items[0];
      const last = items[items.length - 1];
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
    <header
      ref={headerRef}
      className={cx(
        "sticky top-0 z-50 border-b bg-white/92 backdrop-blur-md",
        scrolled || open ? "border-line" : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-[4.25rem] w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <NavLink to="/" end aria-label="vividworks.my, halaman utama" className="shrink-0 rounded-lg">
          <Logo />
        </NavLink>

        <nav aria-label="Utama" className="hidden items-center gap-1 xl:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                cx(
                  "rounded-lg px-2.5 py-2 text-[13.5px] font-medium text-muted hover:bg-surface hover:text-navy",
                  isActive && "bg-surface text-navy",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <Button href={login.href} external={login.external} variant="ghost">
            Log Masuk
          </Button>
          <Button href={start.href} external={start.external}>
            Bina Website Percuma
          </Button>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-xl text-navy hover:bg-surface xl:hidden"
          aria-expanded={open}
          aria-controls="menu-mudah-alih"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
          <span className="sr-only">{open ? "Tutup menu" : "Buka menu"}</span>
        </button>
      </div>

      {open ? (
        <div id="menu-mudah-alih" className="fixed inset-x-0 top-[4.25rem] bottom-0 z-40 overflow-y-auto border-t border-line bg-white xl:hidden">
          <nav aria-label="Mudah alih" className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {navigation.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === "/"}
                className={({ isActive }) =>
                  cx(
                    "rounded-xl px-3 py-3 text-base font-medium text-navy hover:bg-surface",
                    isActive && "bg-surface",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Button href={login.href} external={login.external} variant="secondary" className="w-full">
                Log Masuk
              </Button>
              <Button href={start.href} external={start.external} className="w-full">
                Bina Website Percuma
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
