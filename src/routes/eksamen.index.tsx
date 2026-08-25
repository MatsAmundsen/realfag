import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, FileText } from "lucide-react";
import { EXAMS } from "@/data/exams";
import { useProgressStore } from "@/lib/progress-store";

export const Route = createFileRoute("/eksamen/")({ component: EksamenIndex });

function EksamenIndex() {
  const exams = useProgressStore((s) => s.p.exams);
  return (
    <section className="view-section full-page">
      <div className="page-intro with-photo">
        <img src="/images/eksamen.jpg" alt="" />
        <div>
          <h1>Eksamensarkiv</h1>
          <p>
            Offisielle MAT1021 1T-eksamenar fra vår 2023 til vår 2026. Oppgaveteksten er satt om til bokmål
            (originalpapirene er nynorsk/bokmål). Del 1 uten hjelpemidler, del 2 med. Velg prøvemodus for
            å øve som på eksamen, eller øvemodus for å lese løsning underveis.
          </p>
        </div>
      </div>
      <div className="exam-how">
        <div>
          <h3>Slik bruker du et sett</h3>
          <ol>
            <li>Velg <strong>prøvemodus</strong> (anbefalt første gang) eller øvemodus.</li>
            <li>Start gjerne tidtaking — Del 1 følger offisiell tid (1, 2 eller 3 timer avhengig av år).</li>
            <li>Skriv løsningen på papir. Hint og fasit er låst i prøvemodus.</li>
            <li>Lever settet. Da åpnes steg-løsning, og du vurderer deg selv: riktig / delvis / feil.</li>
          </ol>
        </div>
        <p className="exam-legal">
          Oppgavene tilhører Utdanningsdirektoratet. Løsningsforslag er enten basert på åpne LF (Omar /
          OpenMathBooks) eller utarbeidet for Matteguiden der offisiell LF manglet.
        </p>
      </div>
      <div className="exam-grid large">
        {EXAMS.map((e) => {
          const done = Boolean(exams[e.id]);
          return (
            <Link key={e.id} to="/eksamen/$examId" params={{ examId: e.id }} className={`exam-card${done ? " done" : ""}`}>
              <span className="exam-season">
                {e.season === "vår" ? "Vår" : "Høst"} {e.year}
              </span>
              <strong>{e.title}</strong>
              <span className="exam-meta">
                <Clock size={14} /> Del 1: {e.del1Minutes} min · totalt 5 t
              </span>
              <span className="exam-meta">
                <FileText size={14} /> {e.del1.length} + {e.del2.length} oppgaver i arkivet
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
