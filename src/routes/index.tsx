import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Compass, Trophy } from "lucide-react";
import { CHAPTER_META, fagsok } from "@/data/content";
import { EXAMS } from "@/data/exams";
import { countAll, countChapter, BADGE_META } from "@/lib/progress";
import { useProgressStore } from "@/lib/progress-store";
import { MathFloats, WeekBanner } from "@/components/AppShell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const p = useProgressStore((s) => s.p);
  const all = countAll(fagsok, p);
  const unlocked = Object.keys(BADGE_META).filter((id) => p.badges[id]);

  return (
    <section className="view-section full-page">
      <div className="hero-wrap">
        <img src="/images/hero.jpg" alt="" className="hero-photo" />
        <MathFloats />
        <div className="hero-content">
          <span className="hero-badge">Vg1 · MAT1021</span>
          <h1 className="hero-title">
            Matteguiden <span className="hero-gradient">1T</span>
          </h1>
          <p className="hero-subtitle">
            Oppgaver med steg-løsning, quiz uten umiddelbar fasit-juks, øveprøver i ekte prøvemodus
            og alle 1T-eksamener fra 2023 til 2026.
          </p>
          <div className="hero-actions">
            <Link to="/oppgaver" className="hero-cta">
              Start med oppgaver <ArrowRight size={18} />
            </Link>
            <Link to="/eksamen" className="hint-btn">
              Eksamensarkiv
            </Link>
          </div>
        </div>
      </div>

      <div className="home-body">
        <WeekBanner />

        <div className="home-progress">
          <div className="progress-hero">
            <div className="progress-hero-main">
              <div className="progress-hero-label">Din progresjon</div>
              <div className="progress-hero-pct">{all.pct}%</div>
              <div className="progress-track lg">
                <div className={`progress-fill${all.pct === 100 ? " is-complete" : ""}`} style={{ width: `${all.pct}%` }} />
              </div>
              <div className="progress-hero-meta">
                {all.done} av {all.total} oppgaver merket ferdig
              </div>
            </div>
            <div className="progress-hero-side">
              <div className="progress-stat">
                <span className="progress-stat-label">Rekke</span>
                <span className="progress-stat-value">{p.streak.count} d</span>
              </div>
              <div className="progress-stat">
                <span className="progress-stat-label">Merker</span>
                <span className="progress-stat-value">
                  {unlocked.length}/{Object.keys(BADGE_META).length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="home-chapters">
          <h2 className="section-title">Kapitler</h2>
          <div className="chapter-cards">
            {fagsok.map((kap) => {
              const meta = CHAPTER_META[kap.id];
              const ch = countChapter(kap, p);
              const n = kap.delkapitler.reduce((s, d) => s + d.oppgaver.length, 0);
              const first = kap.delkapitler[0];
              return (
                <Link
                  key={kap.id}
                  to="/oppgaver/$kapId/$subId"
                  params={{ kapId: kap.id, subId: first?.id || "1A" }}
                  className="chapter-card photo-card"
                >
                  <img src={meta?.image} alt="" />
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

        <div className="home-exams">
          <h2 className="section-title">Eksamensarkiv</h2>
          <p className="muted-lead">Sju offisielle 1T-sett. Del 1 og del 2, med løsningsforslag og valgfri tidtaking.</p>
          <div className="exam-grid">
            {EXAMS.map((e) => (
              <Link key={e.id} to="/eksamen/$examId" params={{ examId: e.id }} className="exam-card">
                <span className="exam-season">{e.season === "vår" ? "Vår" : "Høst"} {e.year}</span>
                <strong>{e.title}</strong>
                <span>
                  Del 1: {e.del1Minutes} min · {e.del1.length + e.del2.length} oppgaver i arkivet
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="home-progress">
          <h2 className="section-title">
            <Trophy size={18} /> Merker
          </h2>
          <div className="badge-grid">
            {Object.entries(BADGE_META).map(([id, b]) => (
              <div key={id} className={`badge-card${p.badges[id] ? " unlocked" : " locked"}`}>
                <strong>{b.title}</strong>
                <span>{b.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
