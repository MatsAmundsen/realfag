import type { Oppgave } from "@/data/types";
import { KatexHtml } from "@/components/KatexHtml";
import { taskKey } from "@/lib/progress";
import { useProgressStore } from "@/lib/progress-store";

/** Egen visning for sammendrag (6.S*, 7.S*): lesekort i stedet for oppgavekort. */
export function SummaryView({ items, kapId, subId }: { items: Oppgave[]; kapId: string; subId: string }) {
  const p = useProgressStore((s) => s.p);
  const markTask = useProgressStore((s) => s.markTask);
  return (
    <div className="summary-view">
      <nav className="summary-toc" aria-label="Innhold i sammendraget">
        {items.map((o) => (
          <a key={o.id} href={`#sum-${o.id}`}>
            {o.tittel.replace(/^Sammendrag\s*/, "")}
          </a>
        ))}
      </nav>
      {items.map((o) => {
        const done = Boolean(p.tasks[taskKey(kapId, subId, o.id)]);
        return (
          <article key={o.id} id={`sum-${o.id}`} className={`summary-card${done ? " is-done" : ""}`}>
            <h2 className="summary-title">{o.tittel}</h2>
            <KatexHtml html={o.tekst} className="summary-body" />
            {o.hint ? (
              <p className="summary-tip">
                <strong>Husk: </strong>
                <KatexHtml html={o.hint} as="span" />
              </p>
            ) : null}
            {o.fasitSteg?.length ? (
              <details className="summary-check">
                <summary>Sjekk deg selv</summary>
                {o.fasitSteg.map((st, i) => (
                  <KatexHtml key={i} html={st} className="summary-check-step" />
                ))}
              </details>
            ) : null}
            <button type="button" className={`summary-read${done ? " is-on" : ""}`} aria-pressed={done} onClick={() => markTask(kapId, subId, o.id, !done)}>
              {done ? "✓ Lest" : "Merk som lest"}
            </button>
          </article>
        );
      })}
    </div>
  );
}
