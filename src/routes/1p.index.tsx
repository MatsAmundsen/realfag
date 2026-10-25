import { createFileRoute, Link } from "@tanstack/react-router";
import { CoverImage } from "../components/CoverImage";
import { ArrowRight, BookOpen } from "lucide-react";
import { CHAPTER_META_1P, fagsok1P } from "@/data/1p";
import { countAll, countChapter } from "@/lib/progress";
import { useProgressStore } from "@/lib/progress-store";
import { MathFloats } from "@/components/AppShell";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/1p/")({
  head: () =>
    seoHead(
      "/1p/",
      "Matteguiden 1P – oppgaver og quiz i matematikk 1P",
      "Gratis læringsressurs for vg1 matematikk 1P: oppgaver på tre nivåer med hint og løsning, quiz og øveprøver.",
    ),
  component: Home1P,
});

function Home1P() {
  const p = useProgressStore((s) => s.p);
  const all = countAll(fagsok1P, p);

  return (
    <section className="view-section full-page">
      <div className="hero-wrap">
        <img src="/images/hero.jpg" alt="" className="hero-photo" />
        <MathFloats />
        <div className="hero-content">
          <span className="hero-badge">Vg1 · Matematikk 1P</span>
          <h1 className="hero-title">
            Matteguiden <span className="hero-gradient">1P</span>
          </h1>
          <p className="hero-subtitle">
            Oppgaver på Nivå 1, 2 og 3 med hint og steg-løsning, quiz og øveprøver. Oppgaver merket «Uten hjelpemidler» løser du uten kalkulator og digitale verktøy.
          </p>
          <div className="hero-actions">
            <Link to="/1p/oppgaver" className="hero-cta">
              Start med oppgaver <ArrowRight size={18} />
            </Link>
            <Link to="/" className="hint-btn">
              Bytt til 1T
            </Link>
          </div>
        </div>
      </div>

      <div className="home-body">
        <div className="home-progress">
          <div className="progress-hero">
            <div className="progress-hero-main">
              <div className="progress-hero-label">Din progresjon i 1P</div>
              <div className="progress-hero-pct">{all.pct}%</div>
              <div className="progress-track lg">
                <div className={`progress-fill${all.pct === 100 ? " is-complete" : ""}`} style={{ width: `${all.pct}%` }} />
              </div>
              <div className="progress-hero-meta">
                {all.done} av {all.total} oppgaver merket ferdig
              </div>
            </div>
          </div>
        </div>

        <div className="home-chapters">
          <h2 className="section-title">Kapitler</h2>
          <div className="chapter-cards">
            {fagsok1P.map((kap) => {
              const meta = CHAPTER_META_1P[kap.id];
              const ch = countChapter(kap, p);
              const n = kap.delkapitler.reduce((s, d) => s + d.oppgaver.length, 0);
              const first = kap.delkapitler[0];
              return (
                <Link
                  key={kap.id}
                  to="/1p/oppgaver/$kapId/$subId"
                  params={{ kapId: kap.id, subId: first?.id || "P4A" }}
                  className="chapter-card photo-card"
                >
                  <CoverImage src={meta?.image} sizes="(max-width: 600px) 100vw, 400px" />
                  <div className="chapter-card-title">{kap.tittel}</div>
                  <div className="chapter-card-sub">{meta?.blurb}</div>
                  <div className="chapter-card-meta">
                    <span>
                      <BookOpen size={14} /> {kap.delkapitler.length} delkapitler
                    </span>
                    <span>{n} oppgaver</span>
                  </div>
                  <div className="chapter-card-progress">
                    <div className="progress-track">
                      <div className={`progress-fill${ch.pct === 100 ? " is-complete" : ""}`} style={{ width: `${ch.pct}%` }} />
                    </div>
                    <span className="chapter-card-progress-label">
                      {ch.done} / {ch.total} · {ch.pct} %
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
