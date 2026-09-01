import { createFileRoute, Link } from "@tanstack/react-router";
import { CHAPTER_META, fagsok, videoForSub } from "@/data/content";
import { countChapter, isOvingDelkap } from "@/lib/progress";
import { useProgressStore } from "@/lib/progress-store";

export const Route = createFileRoute("/oppgaver/")({ component: OppgaverIndex });

function OppgaverIndex() {
  const p = useProgressStore((s) => s.p);
  return (
    <section className="view-section full-page">
      <div className="page-intro">
        <h1>Oppgaver</h1>
        <p>Velg kapittel og delkapittel. Hver oppgave har hint og steg-løsning. Øveprøvene ligger nederst i kapittel 1 og 2.</p>
      </div>
      <div className="kap-stack">
        {fagsok.map((kap) => {
          const ch = countChapter(kap, p);
          const meta = CHAPTER_META[kap.id];
          return (
            <div key={kap.id} className="kap-panel">
              <div className="kap-panel-head">
                <img src={meta?.image} alt="" />
                <div>
                  <h2>{kap.tittel}</h2>
                  <p>{meta?.blurb}</p>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${ch.pct}%` }} />
                  </div>
                </div>
              </div>
              <div className="sub-grid">
                {kap.delkapitler.map((dk) => (
                  <Link
                    key={dk.id}
                    to="/oppgaver/$kapId/$subId"
                    params={{ kapId: kap.id, subId: dk.id }}
                    className={`sub-tile${isOvingDelkap(dk) ? " ove" : ""}`}
                  >
                    <strong>{isOvingDelkap(dk) ? "Øveprøve" : dk.tittel}</strong>
                    <span>
                      {dk.oppgaver.length} oppgaver
                      {dk.quiz?.length ? " · quiz" : ""}
                      {videoForSub(dk.id) ? " · video" : ""}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
