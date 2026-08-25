import { createFileRoute, Link } from "@tanstack/react-router";
import { programmeringData } from "@/data/content";
import { TaskCard } from "@/components/TaskCard";

export const Route = createFileRoute("/programmering")({ component: ProgrammeringPage });

function ProgrammeringPage() {
  return (
    <section className="view-section full-page">
      <div className="page-intro with-photo">
        <img src="/images/programmering.jpg" alt="" />
        <div>
          <h1>Programmering</h1>
          <p>
            Python-oppgaver til 1T: løkker, vilkår og modeller. Åpne gjerne{" "}
            <Link to="/ressurser">programmeringsressursen</Link> først.
          </p>
        </div>
      </div>
      <div className="prog-list">
        {programmeringData.map((o, i) => (
          <TaskCard
            key={o.id}
            oppgave={o}
            kapId="prog"
            subId="prog"
            index={i}
            total={programmeringData.length}
            mode="ove"
          />
        ))}
      </div>
    </section>
  );
}
