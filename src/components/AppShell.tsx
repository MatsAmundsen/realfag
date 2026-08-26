import { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Compass, Menu, Moon, Search, Sun, X } from "lucide-react";
import { fagsok, UKESPLAN } from "@/data/content";
import { useProgressStore } from "@/lib/progress-store";
import { BadgeToast, CelebrationHost } from "./Celebration";

const NAV = [
  { to: "/", label: "Hjem" },
  { to: "/oppgaver", label: "Oppgaver" },
  { to: "/eksamen", label: "Eksamen" },
  { to: "/programmering", label: "Kode" },
  { to: "/ressurser", label: "Ressurser" },
  { to: "/kunnskapskart", label: "Kart" },
] as const;

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hydrate = useProgressStore((s) => s.hydrate);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [q, setQ] = useState("");
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    hydrate();
    try {
      const saved = localStorage.getItem("mg_theme");
      if (saved === "light" || saved === "dark") setTheme(saved);
    } catch {
      /* ignore */
    }
    if (!("serviceWorker" in navigator)) return;
    void navigator.serviceWorker.getRegistrations().then((regs) => {
      regs.forEach((r) => void r.unregister());
    });
    if (window.caches) {
      void caches.keys().then((keys) => {
        keys
          .filter((k) => k.toLowerCase().includes("matte") || k.toLowerCase().includes("mg-"))
          .forEach((k) => void caches.delete(k));
      });
    }
  }, [hydrate]);

  useEffect(() => {
    if (theme === "light") document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
    try {
      localStorage.setItem("mg_theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  useEffect(() => {
    setMenu(false);
  }, [pathname]);

  useEffect(() => {
    const drawer = document.getElementById("mobile-nav-drawer");
    if (drawer && menu) {
      drawer.style.transform = "";
      drawer.style.visibility = "";
      drawer.style.pointerEvents = "";
    }
  }, [menu]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menu]);

  const hits = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (needle.length < 2) return [];
    const out: { href: string; title: string; snippet: string }[] = [];
    fagsok.forEach((kap) => {
      kap.delkapitler.forEach((dk) => {
        dk.oppgaver.forEach((o) => {
          const hay = `${o.tittel} ${o.tekst}`.toLowerCase();
          if (hay.includes(needle)) {
            out.push({
              href: `/oppgaver/${kap.id}/${dk.id}`,
              title: o.tittel,
              snippet: kap.tittel + " · " + dk.tittel,
            });
          }
        });
      });
    });
    return out.slice(0, 12);
  }, [q]);

  return (
    <>
      <header className={`navbar${menu ? " menu-open" : ""}`}>
        <button
          type="button"
          className="hamburger-btn"
          aria-label={menu ? "Lukk meny" : "Åpne meny"}
          aria-expanded={menu}
          aria-controls="mobile-nav-drawer"
          onClick={() => setMenu((v) => !v)}
        >
          {menu ? <X size={22} /> : <Menu size={22} />}
        </button>
        <Link to="/" className="logo">
          <span className="logo-icon">
            <Compass size={18} />
          </span>
          Matteguiden <span className="logo-grade">1T</span>
        </Link>
        <form
          className="search-bar"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Search size={16} className="search-icon" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Søk i oppgaver…"
            aria-label="Søk"
          />
        </form>
        <nav className="desktop-nav">
          {NAV.map((n) => {
            const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
            return (
              <Link key={n.to} to={n.to} className={`nav-btn${active ? " active" : ""}`}>
                {n.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          className="nav-btn theme-btn"
          aria-label="Bytt tema"
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>
      {hits.length > 0 && (
        <div className="search-drop">
          {hits.map((h) => (
            <a key={h.href + h.title} href={h.href} onClick={() => setQ("")}>
              <strong>{h.title}</strong>
              <span>{h.snippet}</span>
            </a>
          ))}
        </div>
      )}
      {menu && <div className="mobile-nav-backdrop" onClick={() => setMenu(false)} />}
      <aside
        id="mobile-nav-drawer"
        className={`mobile-nav-drawer${menu ? " is-open" : ""}`}
        aria-hidden={!menu}
      >
        <p className="mobile-nav-label">Meny</p>
        {NAV.map((n) => {
          const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
          return (
            <Link key={n.to} to={n.to} className={`nav-btn${active ? " active" : ""}`} onClick={() => setMenu(false)}>
              {n.label}
            </Link>
          );
        })}
      </aside>
      <div id="app-content">
        <Outlet />
      </div>
      <CelebrationHost />
      <BadgeToast />
    </>
  );
}

export function MathFloats() {
  const items = [
    { s: "∫", x: "8%", y: "18%", d: "0s" },
    { s: "π", x: "86%", y: "22%", d: "1.2s" },
    { s: "√", x: "12%", y: "72%", d: "0.6s" },
    { s: "Σ", x: "90%", y: "68%", d: "1.8s" },
    { s: "Δ", x: "78%", y: "12%", d: "0.4s" },
  ];
  return (
    <div className="math-floats" aria-hidden="true">
      {items.map((it) => (
        <span
          key={it.s}
          className="math-float"
          style={{ ["--x" as string]: it.x, ["--y" as string]: it.y, ["--delay" as string]: it.d }}
        >
          {it.s}
        </span>
      ))}
    </div>
  );
}

export function WeekBanner() {
  const [week, setWeek] = useState(() => {
    const now = new Date();
    const t = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    const day = t.getUTCDay() || 7;
    t.setUTCDate(t.getUTCDate() + 4 - day);
    const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
    return Math.ceil(((t.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  });
  const plan = UKESPLAN[week];
  return (
    <div id="ukesplan-banner">
      <div className="banner-content">
        <div className="week-nav">
          <button type="button" className="week-nav-btn" onClick={() => setWeek((w) => w - 1)} aria-label="Forrige uke">
            ‹
          </button>
          <span className="week-badge">Uke {week}</span>
          <button type="button" className="week-nav-btn" onClick={() => setWeek((w) => w + 1)} aria-label="Neste uke">
            ›
          </button>
        </div>
        <p id="week-text">{plan?.tekst || "Ingen planlagt økt denne uken — velg et kapittel og fortsett der du slapp."}</p>
        {plan?.kapId && plan.subId && (
          <Link to="/oppgaver/$kapId/$subId" params={{ kapId: plan.kapId, subId: plan.subId }} className="hint-btn">
            Åpne økten
          </Link>
        )}
      </div>
    </div>
  );
}
