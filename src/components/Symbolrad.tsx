import type { Spesialtegn } from "@/lib/symbolrad";

/**
 * Rad med spesialtegn under sluttsvarfeltet. Hver knapp har tegnet som synlig tekst og et norsk navn som aria-label.
 * pointerdown/mousedown avbrytes slik at fokus blir i feltet (på mobil forsvinner ikke tastaturet); klikk via tastatur
 * (Enter/mellomrom på en fokusert knapp) fungerer likevel, og feltet får fokus igjen etter innsettingen.
 */
export function Symbolrad({
  symboler,
  onVelg,
  deaktivert = false,
}: {
  symboler: Spesialtegn[];
  onVelg: (s: Spesialtegn) => void;
  deaktivert?: boolean;
}) {
  return (
    <div className="prove-symbolrad" role="group" aria-label="Spesialtegn">
      {symboler.map((s) => (
        <button
          key={s.tegn}
          type="button"
          className="prove-symbol"
          aria-label={s.navn}
          title={s.navn}
          disabled={deaktivert}
          onPointerDown={(e) => e.preventDefault()}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onVelg(s)}
        >
          <span aria-hidden="true">{s.tegn}</span>
        </button>
      ))}
    </div>
  );
}
