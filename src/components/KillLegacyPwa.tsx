import { useEffect } from "react";

/**
 * Old Matteguiden registered /sw.js. A later "kill" worker then called
 * clients.navigate(?mg=timestamp) on activate, which reloaded the page
 * forever. Unregister leftovers. Do not register a new worker. Do not reload.
 */
export function KillLegacyPwa() {
  useEffect(() => {
    const banner = document.getElementById("mg-update-banner");
    if (banner) banner.setAttribute("hidden", "");

    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((r) => void r.unregister());
      });
    }
    if (window.caches) {
      void caches.keys().then((keys) => {
        keys.forEach((k) => void caches.delete(k));
      });
    }

    const onClick = (e: MouseEvent) => {
      const t = e.target;
      if (!(t instanceof HTMLElement)) return;
      const label = (t.closest("button")?.textContent || "").trim().toLowerCase();
      if (label === "last inn på nytt" || label === "last siden på nytt") {
        e.preventDefault();
        e.stopPropagation();
        window.location.reload();
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
