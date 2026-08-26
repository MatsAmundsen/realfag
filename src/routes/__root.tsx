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
      { name: "mg-build", content: "2026-08-26-kap5" },
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
