import { createFileRoute } from "@tanstack/react-router";
import { MindMap } from "@/components/MindMap";

export const Route = createFileRoute("/kunnskapskart")({ component: KartPage });

function KartPage() {
  return (
    <section className="view-section full-page">
      <div className="page-intro">
        <h1>Kunnskapskart</h1>
        <p>
          Slik henger 1T sammen. Fargen viser hvor langt du har kommet. Klikk en node for å se
          byggeklossene, og hopp rett til oppgavene.
        </p>
      </div>
      <MindMap />
    </section>
  );
}
