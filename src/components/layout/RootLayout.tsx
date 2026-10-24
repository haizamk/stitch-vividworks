import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useRouteScroll } from "../../hooks/useRouteScroll.ts";
import { Footer } from "./Footer.tsx";
import { Header } from "./Header.tsx";
import { RouteFallback } from "./RouteFallback.tsx";

export function RootLayout() {
  useRouteScroll();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <a className="skip-link" href="#kandungan">
        Langkau ke kandungan
      </a>
      <Header />
      <main id="kandungan" tabIndex={-1} className="flex-1">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
