import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { KillLegacyPwa } from "@/components/KillLegacyPwa";
import { AppShell } from "@/components/AppShell";
import appCss from "../styles.css?url";

const APP_NAME = "Matteguiden 1T";

const KILL_LEGACY_PWA = `(function(){
  try {
    var b=document.getElementById("mg-update-banner");
    if(b){b.hidden=true;b.style.display="none";}
    if("serviceWorker"in navigator){
      navigator.serviceWorker.getRegistrations().then(function(regs){
        regs.forEach(function(r){r.unregister();});
      });
    }
    if(window.caches) caches.keys().then(function(keys){
      keys.forEach(function(k){caches.delete(k);});
    });
  } catch(e) {}
})();`;

const RESSURS_CLICKS = `(function(){
  if (window.__mgResClicks) return;
  window.__mgResClicks = true;
  function asEl(t){
    if (!t) return null;
    if (t.nodeType === 1) return t;
    return t.parentElement || null;
  }
  function openAndScroll(id){
    if (!id) return false;
    var el = null;
    try { el = document.getElementById(id); } catch (e) {}
    if (!el) return false;
    var n = el;
    while (n) {
      if (n.tagName === "DETAILS") n.open = true;
      n = n.parentElement;
    }
    var nav = document.querySelector(".navbar");
    var offset = ((nav && nav.getBoundingClientRect().height) || 72) + 12;
    var top = window.scrollY + el.getBoundingClientRect().top - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    return true;
  }
  document.addEventListener("click", function(e){
    var el = asEl(e.target);
    if (!el || !el.closest) return;
    var run = el.closest("[data-run]");
    if (run) {
      e.preventDefault();
      e.stopPropagation();
      var id = run.getAttribute("data-run");
      if (window.__mgRunPython) window.__mgRunPython(id);
      return;
    }
    var yt = el.closest("a[href*='youtube.com'], a[href*='youtu.be']");
    if (yt && yt.closest(".res-html, .fagstoff-content, .sub-video-panel")) {
      var href = yt.getAttribute("href") || "";
      var m = href.match(/(?:v=|youtu\\.be\\/|embed\\/|shorts\\/)([A-Za-z0-9_-]{11})/);
      if (m && typeof window.__mgOpenYoutube === "function") {
        e.preventDefault();
        e.stopPropagation();
        var titleNode = yt.querySelector(".vid-card-title");
        var title = (titleNode && titleNode.textContent) || yt.textContent || "Video";
        window.__mgOpenYoutube(m[1], title.replace(/\\s+/g, " ").trim());
        return;
      }
    }
    var jump = el.closest("[data-fag-scroll], [data-brok-scroll]");
    if (jump) {
      var jid = jump.getAttribute("data-fag-scroll") || jump.getAttribute("data-brok-scroll");
      if (openAndScroll(jid)) { e.preventDefault(); e.stopPropagation(); }
      return;
    }
    var hash = el.closest("a[href^='#']");
    if (hash && hash.closest(".res-html, .fagstoff-content, .vid-overview, .brok-overview")) {
      var hid = (hash.getAttribute("href") || "").replace(/^#/, "");
      try { hid = decodeURIComponent(hid); } catch (err) {}
      if (openAndScroll(hid)) { e.preventDefault(); e.stopPropagation(); }
    }
  }, true);
})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content: "Læringsressurs for vg1 matematikk 1T: oppgaver, quiz, øveprøver og eksamensarkiv.",
      },
      { name: "theme-color", content: "#0a0f1e" },
      { name: "mg-build", content: "2026-08-26-ressurs-lenker" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="nb" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: KILL_LEGACY_PWA }} />
        <script dangerouslySetInnerHTML={{ __html: RESSURS_CLICKS }} />
        <PreviewHostBridge />
        <KillLegacyPwa />
        <AuthProvider>
          <AppShell />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
