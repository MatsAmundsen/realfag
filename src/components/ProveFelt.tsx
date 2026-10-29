import { useId } from "react";
import { KatexHtml } from "./KatexHtml";
import { forhandsvis, type Sluttsvar } from "@/lib/svar-sjekk";
import { formaterPoeng, POENGANDEL, type EnhetsResultat, type Resultat, type Vurdering } from "@/lib/prove-poeng";

const PLASSHOLDER: Record<string, string> = {
  tall: "Skriv bare svaret, for eksempel 2,5 eller 3/4",
  uttrykk: "Skriv uttrykket, for eksempel 2x+1",
  likning: "Skriv for eksempel x = 2",
  punkt: "Skriv for eksempel (2, 3)",
  valg: "Skriv bokstaven",
};

/**
 * Eget felt for sluttsvaret, i tillegg til svarboksen. Under feltet vises hva som er tolket, som formel.
 * Forhåndsvisningen sier aldri om svaret er riktig: bare «Kan ikke tolke uttrykket» når teksten ikke kan leses.
 */
function SluttsvarFelt({
  id,
  fasit,
  value,
  onChange,
}: {
  id: string;
  fasit: Sluttsvar;
  value: string;
  onChange: (v: string) => void;
}) {
  const hjelpId = useId();
  const fv = forhandsvis(value, fasit.svar, fasit.enhet);
  return (
    <div className="prove-sluttsvar">
      <label className="prove-sluttsvar-label" htmlFor={`sluttsvar-${id}`}>
        Sluttsvar
      </label>
      <input
        id={`sluttsvar-${id}`}
        className="prove-sluttsvar-felt"
        type="text"
        inputMode="text"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        value={value}
        placeholder={PLASSHOLDER[fasit.svar.type] || PLASSHOLDER.tall}
        aria-describedby={hjelpId}
        onChange={(e) => onChange(e.target.value)}
      />
      <div id={hjelpId} className="prove-sluttsvar-hjelp">
        {"ok" in fv && fv.ok && (
          <span className="prove-sluttsvar-forhandsvisning" tabIndex={0} aria-label="Forhåndsvisning av sluttsvaret">
            <span className="prove-sluttsvar-tolket">Slik leser vi det: </span>
            <KatexHtml as="span" html={`$${fv.latex}$`} />
          </span>
        )}
        {"ok" in fv && !fv.ok && <span className="prove-sluttsvar-feil">Kan ikke tolke uttrykket</span>}
        {fasit.format && !("ok" in fv && !fv.ok) && !("ok" in fv && fv.ok) && (
          <span className="prove-sluttsvar-format">{fasit.format}</span>
        )}
      </div>
    </div>
  );
}

/** Svarfelt og «ferdig»-avkrysning per oppgave i prøvemodus. Brukes av eksamenssidene og øveprøvene. */
export function ProveSvar({
  id,
  value,
  done,
  locked,
  onChange,
  onDone,
  sluttsvar,
  skjult = false,
}: {
  id: string;
  /** Skjules (med plassen beholdt) til lagret fremgang er lest. Teksten rundt står fra første tegning. */
  skjult?: boolean;
  value: string;
  done: boolean;
  /** Sluttsvarfelt ved siden av svarboksen, når enheten har fasit for autosjekk. */
  sluttsvar?: { fasit: Sluttsvar; value: string; onChange: (v: string) => void };
  /** Etter levering kan svaret ikke endres. */
  locked: boolean;
  onChange: (v: string) => void;
  onDone: (v: boolean) => void;
}) {
  return (
    <div className="prove-svar" data-done={done ? "true" : "false"} style={skjult ? { visibility: "hidden" } : undefined}>
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
      {sluttsvar && (
        <SluttsvarFelt id={id} fasit={sluttsvar.fasit} value={sluttsvar.value} onChange={sluttsvar.onChange} />
      )}
      <label className="prove-ferdig">
        <input type="checkbox" checked={done} disabled={locked} onChange={(e) => onDone(e.target.checked)} /> Ferdig
      </label>
    </div>
  );
}

const STATUSTEKST = { riktig: "Riktig", delvis: "Delvis riktig", feil: "Feil" } as const;

/**
 * Etter levering, per del: elevens sluttsvar, om det var riktig, poengene, og vurderingslisten.
 * Med autosjekk og riktig sluttsvar gis alle poengene og listen skjules.
 */
export function ProveResultat({
  id,
  gitt,
  fasit,
  res,
  vurdering,
  onVurder,
}: {
  id: string;
  /** Elevens sluttsvar (tomt hvis ikke fylt ut). */
  gitt: string;
  fasit?: Sluttsvar;
  res: EnhetsResultat;
  vurdering?: Vurdering;
  onVurder: (v: Vurdering) => void;
}) {
  const autoRiktig = Boolean(fasit && res.auto);
  const valg: { key: keyof Vurdering; tekst: string; andel: number }[] = [
    { key: "metode", tekst: "Riktig metode", andel: POENGANDEL.metode },
    { key: "utregning", tekst: "Riktige utregninger", andel: POENGANDEL.utregning },
  ];
  if (!fasit) valg.push({ key: "svar", tekst: "Riktig svar", andel: POENGANDEL.svar });
  return (
    <div className="prove-resultat" data-status={res.status}>
      <p className="prove-resultat-poeng">
        <span style={{ whiteSpace: "nowrap" }}>
          <strong>{STATUSTEKST[res.status]}</strong>&nbsp;·
        </span>
        <span style={{ whiteSpace: "nowrap" }}>
          {formaterPoeng(res.poeng)}&nbsp;av&nbsp;{formaterPoeng(res.maks)}&nbsp;p
        </span>
      </p>
      {fasit && (
        <p className="prove-sluttsvar-levert">
          <strong>Ditt sluttsvar:</strong> {gitt.trim() ? gitt : "ikke besvart"} –{" "}
          {autoRiktig ? "riktig" : "ikke riktig"}
        </p>
      )}
      {autoRiktig ? (
        <p className="prove-vurdering-auto">Sluttsvaret er riktig, så du får alle poengene.</p>
      ) : (
        <fieldset className="prove-vurdering">
          <legend>
            {fasit ? "Sluttsvaret stemmer ikke. Vurder resten selv:" : "Vurder deg selv:"}
          </legend>
          {valg.map((v) => (
            <label key={v.key} className="prove-vurdering-valg">
              <input
                type="checkbox"
                checked={Boolean(vurdering?.[v.key])}
                onChange={(e) => onVurder({ ...vurdering, [v.key]: e.target.checked })}
                data-enhet={id}
              />{" "}
              {v.tekst}
            </label>
          ))}
        </fieldset>
      )}
    </div>
  );
}

/** Sum, prosent og antall riktige/delvis/feil etter levering. */
export function PoengOppsummering({ res }: { res: Resultat }) {
  const alle = Object.values(res.deler);
  const antall = (s: string) => alle.filter((d) => d.status === s).length;
  return (
    <div className="poeng-oppsummering" role="status">
      <p className="poeng-sum">
        <strong>
          {formaterPoeng(res.sum)}&nbsp;av&nbsp;{formaterPoeng(res.maks)}&nbsp;poeng
        </strong>{" "}
        · <span className="poeng-prosent">{res.prosent} % riktig</span>
      </p>
      <p className="poeng-liste">
        {antall("riktig")} riktige · {antall("delvis")} delvis · {antall("feil")} feil av {alle.length} deler.
      </p>
    </div>
  );
}
