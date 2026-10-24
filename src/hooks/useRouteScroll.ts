import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useRouteScroll(): void {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    let attempts = 0;
    const timer = window.setInterval(() => {
      const target = document.getElementById(id);
      attempts += 1;
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.clearInterval(timer);
      } else if (attempts > 24) {
        window.clearInterval(timer);
      }
    }, 50);

    return () => window.clearInterval(timer);
  }, [pathname, hash]);
}
