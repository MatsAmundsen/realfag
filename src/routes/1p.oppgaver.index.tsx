import { createFileRoute, Link } from "@tanstack/react-router";
import { CoverImage } from "../components/CoverImage";
import { CHAPTER_META_1P, fagsok1P, videosForSub1P } from "@/data/1p";
import { countChapter, isOvingDelkap } from "@/lib/progress";
import { useProgressStore } from "@/lib/progress-store";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/1p/oppgaver/")({
  head: () =>
    seoHead(
      "/1p/oppgaver/",
      "Oppgaver 1P – kapitler med løsning",
      "Oppgaver i matematikk 1P sortert etter kapittel og delkapittel, med hint, fasit og quiz.",
    ),
  component: OppgaverIndex1P,
});

function OppgaverIndex1P() {
  const p = useProgressStore((s) => s.p);
  return (
    <section className="view-section full-page">
      <div className="page-intro">
        <h1>Oppgaver 1P</h1>
        <p>Velg kapittel og delkapittel. Hver oppgave har hint og steg-løsning. Oppgaver merket «Uten hjelpemidler» løser du uten kalkulator og digitale verktøy.</p>
      </div>
      <div className="kap-stack">
        {fagsok1P.map((kap) => {
          const ch = countChapter(kap, p);
          const meta = CHAPTER_META_1P[kap.id];
          return (
            <div key={kap.id} className="kap-panel">
              <div className="kap-panel-head">
                <CoverImage src={meta?.image} sizes="(max-width: 600px) 100vw, 180px" />
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
                    to="/1p/oppgaver/$kapId/$subId"
                    params={{ kapId: kap.id, subId: dk.id }}
                    className={`sub-tile${isOvingDelkap(dk) ? " ove" : ""}`}
                  >
                    <strong>{isOvingDelkap(dk) ? "Øveprøve" : dk.tittel}</strong>
                    <span>
                      {dk.oppgaver.length} oppgaver
                      {dk.quiz?.length ? " · quiz" : ""}
                      {(() => { const n = videosForSub1P(dk.id).length; return n > 1 ? ` · ${n} videoer` : n ? " · video" : ""; })()}
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
