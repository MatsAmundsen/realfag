import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, FileText } from "lucide-react";
import { EKSAMENER_1P } from "@/data/1p/eksamener";
import { useProgressStore } from "@/lib/progress-store";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/1p/eksamener/")({
  head: () =>
    seoHead(
      "/1p/eksamener/",
      "Tidligere eksamener 1P (MAT1019) med løsningsforslag",
      "Eksamensoppgavene i matematikk 1P fra Utdanningsdirektoratet, LK20, med Del 1 uten hjelpemidler og Del 2 med hjelpemidler. Trinnvise løsningsforslag og prøvemodus.",
    ),
  component: EksamenerIndex,
});

function timer(min: number) {
  return min % 60 === 0 ? `${min / 60} t` : `${Math.floor(min / 60)} t ${min % 60} min`;
}

function EksamenerIndex() {
  const exams = useProgressStore((s) => s.p.exams);
  return (
    <section className="view-section full-page">
      <div className="page-intro">
        <h1>Tidligere eksamener 1P</h1>
        <p>
          Eksamensoppgavene fra Utdanningsdirektoratet (MAT1019 Matematikk 1P, LK20), med våre egne trinnvise
          løsningsforslag. Del 1 er <strong>Uten hjelpemidler</strong>, Del 2 er med hjelpemidler. Velg prøvemodus for å
          øve som på eksamen, eller øvemodus for å lese løsning underveis.
        </p>
      </div>
      <div className="exam-how">
        <div>
          <h3>Slik bruker du en eksamen</h3>
          <ol>
            <li>Velg <strong>prøvemodus</strong> (anbefalt) eller øvemodus.</li>
            <li>Start gjerne tidtaking. Tiden til Del 1 er ulik fra eksamen til eksamen, og står på hvert kort.</li>
            <li>Skriv svaret her eller på papir, og kryss av «Ferdig» for hver oppgave og deloppgave.</li>
            <li>Trykk «Lever / Ferdig». Da åpnes alle løsningsforslagene, og du vurderer deg selv.</li>
          </ol>
        </div>
        <p className="exam-legal">
          Oppgavetekstene er Utdanningsdirektoratets. Løsningsforslagene er skrevet av Matteguiden og er ikke
          offisielle. Vil du øve på egne sett, finnes de under <Link to="/1p/eksamen">Eksamensøving</Link>.
        </p>
      </div>
      <div className="exam-grid large">
        {EKSAMENER_1P.map((e) => {
          const done = Boolean(exams[e.id]);
          return (
            <Link key={e.id} to="/1p/eksamener/$examId" params={{ examId: e.id }} className={`exam-card${done ? " done" : ""}`}>
              <span className="exam-season">
                {e.season === "vår" ? "Vår" : "Høst"} {e.year}
              </span>
              <strong>{e.title}</strong>
              <span className="exam-meta">
                <Clock size={14} /> Del 1: {timer(e.del1Minutes)} · totalt {timer(e.totalMinutes)}
              </span>
              <span className="exam-meta">
                <FileText size={14} /> {e.del1.length} + {e.del2.length} oppgaver
              </span>
              <span className="exam-note">{e.source ? `${e.source.utgiver}, ${e.source.kode}` : ""}</span>
              {done && <span className="exam-pill">Levert</span>}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
