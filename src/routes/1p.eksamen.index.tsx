import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, FileText } from "lucide-react";
import { EXAMS_1P } from "@/data/1p/exams";
import { useProgressStore } from "@/lib/progress-store";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/1p/eksamen/")({
  head: () =>
    seoHead(
      "/1p/eksamen/",
      "Eksamensøving 1P – øvingseksamen med løsning",
      "Øvingseksamen i matematikk 1P med del 1 uten hjelpemidler og del 2 med hjelpemidler. Hint og løsningsforslag til alle oppgaver.",
    ),
  component: EksamenIndex,
});

function EksamenIndex() {
  const exams = useProgressStore((s) => s.p.exams);
  return (
    <section className="view-section full-page">
      <div className="page-intro with-photo">
        <img src="/images/eksamen.jpg" alt="" />
        <div>
          <h1>Eksamensøving 1P</h1>
          <p>
            Egne øvingssett som dekker hele 1P-pensum. Del 1 er <strong>Uten hjelpemidler</strong>, del 2 er med
            hjelpemidler. Velg prøvemodus for å øve som på eksamen, eller øvemodus for å lese løsning underveis.
          </p>
        </div>
      </div>
      <div className="exam-how">
        <div>
          <h3>Slik bruker du et sett</h3>
          <ol>
            <li>Velg <strong>prøvemodus</strong> (anbefalt første gang) eller øvemodus.</li>
            <li>Start gjerne tidtaking. Del 1 <strong>Uten hjelpemidler</strong> varer 1 time, og hele settet varer 5 timer.</li>
            <li>Skriv løsningen på papir. Hint og fasit er låst i prøvemodus.</li>
            <li>Lever settet. Da åpnes steg-løsning, og du vurderer deg selv: riktig / delvis / feil.</li>
          </ol>
        </div>
        <p className="exam-legal">
          Oppgavene er laget for Matteguiden og er ikke offisielle eksamensoppgaver fra Utdanningsdirektoratet.
        </p>
      </div>
      <div className="exam-grid large">
        {EXAMS_1P.map((e) => {
          const done = Boolean(exams[e.id]);
          return (
            <Link key={e.id} to="/1p/eksamen/$examId" params={{ examId: e.id }} className={`exam-card${done ? " done" : ""}`}>
              <span className="exam-season">Øvingssett</span>
              <strong>{e.title}</strong>
              <span className="exam-meta">
                <Clock size={14} /> Del 1: {e.del1Minutes} min · totalt 5 t
              </span>
              <span className="exam-meta">
                <FileText size={14} /> {e.del1.length} + {e.del2.length} oppgaver
              </span>
              <span className="exam-note">
                {e.hasOfficialSolutions ? "Basert på åpent løsningsforslag" : "Matteguidens løsningsforslag"}
              </span>
              {done && <span className="exam-pill">Levert</span>}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
