import { useEffect } from "react";

const MG_BUILD = "2026-09-01-temavideo";

function forceChrome() {
  const drawer = document.getElementById("mobile-nav-drawer");
  if (!drawer || drawer.classList.contains("is-open")) return;
  if (window.getComputedStyle(drawer).position !== "fixed") {
    drawer.style.position = "fixed";
    drawer.style.transform = "translateX(-110%)";
    drawer.style.visibility = "hidden";
    drawer.style.pointerEvents = "none";
  }
}

/**
 * Old Matteguiden registered /sw.js. Unregister leftovers. If the Grok
 * preview iframe drops the stylesheet, force the chrome layout so the
 * drawer cannot sit in document flow.
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

    forceChrome();
    const t1 = window.setTimeout(forceChrome, 0);
    const t2 = window.setTimeout(forceChrome, 120);
    const raf = requestAnimationFrame(forceChrome);

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
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
