/** Svarfelt og «ferdig»-avkrysning per oppgave i prøvemodus. Brukes av eksamenssidene og øveprøvene. */
export function ProveSvar({
  id,
  value,
  done,
  locked,
  onChange,
  onDone,
}: {
  id: string;
  value: string;
  done: boolean;
  /** Etter levering kan svaret ikke endres. */
  locked: boolean;
  onChange: (v: string) => void;
  onDone: (v: boolean) => void;
}) {
  return (
    <div className="prove-svar" data-done={done ? "true" : "false"}>
      <label className="prove-svar-label" htmlFor={`svar-${id}`}>
        Svaret ditt
      </label>
      <textarea
        id={`svar-${id}`}
        className="prove-svar-felt"
        rows={3}
        value={value}
        readOnly={locked}
        placeholder="Skriv svaret ditt her, eller bare på papir."
        onChange={(e) => onChange(e.target.value)}
      />
      <label className="prove-ferdig">
        <input type="checkbox" checked={done} disabled={locked} onChange={(e) => onDone(e.target.checked)} /> Ferdig
      </label>
    </div>
  );
}
