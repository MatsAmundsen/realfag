import { useEffect } from "react";

const MG_BUILD = "2026-08-27-t-rex";

/**
 * Old Matteguiden registered /sw.js. A later "kill" worker then called
 * clients.navigate(?mg=timestamp) on activate, which reloaded the page
 * forever. Unregister leftovers. Force a single reload if version.json
 * is newer than this HTML. Do not loop.
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

    void fetch(`/version.json?mg=${Date.now()}`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((v: { version?: string } | null) => {
        if (!v?.version || v.version === MG_BUILD) return;
        const key = `mg-forced-${v.version}`;
        try {
          if (sessionStorage.getItem(key)) return;
          sessionStorage.setItem(key, "1");
        } catch {
          return;
        }
        const u = new URL(window.location.href);
        u.searchParams.set("mg", v.version);
        window.location.replace(u.toString());
      })
      .catch(() => {});

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
