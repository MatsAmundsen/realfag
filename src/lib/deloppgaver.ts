/**
 * Deloppgaver i øveprøver.
 *
 * En øveprøveoppgave har alle delene inline i `tekst` («<strong>a)</strong> …») og én fasitSteg per del. Her deles oppgaven
 * i enheter (deler) som får hvert sitt svarfelt og sin egen vurdering, slik som delene i en eksamen. Oppgaven er fortsatt
 * 1 p, fordelt likt på delene (`poengPerEnhet(undefined, n)`).
 *
 * Id-skjema: delens id er `<oppgave-id><bokstav>`, for eksempel `1.OP2a` og `P3.OP4b`. Samme nøkkel brukes
 *   - i utkast og innleveringer (svar, sluttsvar, vurdering, poeng), og
 *   - i `SLUTTSVAR` (spec_svar.py: `E("1.OP2a", …)`), som har første prioritet.
 * Oppgaver uten deler, og oppgaver som ikke lar seg dele sikkert, er én enhet med oppgavens egen id (som før).
 */
import type { Sluttsvar, SvarSpec } from "./svar-sjekk";

/** Fritt sluttsvar: formelfelt uten fasit. Eleven vurderer selv etter levering. */
export const FRI_SLUTTSVAR: Sluttsvar = { svar: { type: "fri" }, selvvurder: true };

export type Del = {
  bokstav: string;
  /** `<oppgave-id><bokstav>`. */
  id: string;
  /** Delens tekst (html), uten merket «a)» og uten avsluttende linjeskift. */
  tekst: string;
};
export type Oppdeling = { intro: string; deler: Del[] };

export type OppgaveInn = { id: string; tekst?: string; fasitSteg?: string[] | null };

const MERKE = /<strong>\s*([a-z])\)\s*<\/strong>/g;
const TAGGER = ["div", "span", "table", "thead", "tbody", "tr", "td", "th", "ul", "ol", "li", "em", "strong", "b", "i", "p", "figure", "svg", "sub", "sup", "a"];

function balansert(html: string): boolean {
  return TAGGER.every((t) => {
    const apne = (html.match(new RegExp(`<${t}(?=[\\s>/])`, "gi")) || []).length;
    const lukk = (html.match(new RegExp(`</${t}>`, "gi")) || []).length;
    return apne === lukk;
  });
}

function rens(delTekst: string): string {
  return delTekst
    .replace(/^\s+/, "")
    .replace(/(?:\s*<br\s*\/?>)+\s*$/i, "")
    .trim();
}

/**
 * Deler en øveprøveoppgave i deler. Gir `null` (oppgaven er én enhet) når
 *  - den har færre enn to merker «a)», «b)», …, eller merkene ikke går i rekkefølge fra «a»,
 *  - antall fasitSteg ikke er lik antall deler (1:1), eller
 *  - en del ikke er gyldig html alene (uavsluttede tagger).
 */
export function splittDeler(oppgave: OppgaveInn): Oppdeling | null {
  const tekst = oppgave.tekst || "";
  const treff = [...tekst.matchAll(MERKE)];
  if (treff.length < 2) return null;
  const bokstaver = treff.map((m) => m[1]);
  if (!bokstaver.every((b, i) => b === String.fromCharCode(97 + i))) return null;
  const steg = (oppgave.fasitSteg || []).filter(Boolean);
  if (steg.length !== treff.length) return null;
  const deler: Del[] = [];
  for (let i = 0; i < treff.length; i++) {
    const start = (treff[i].index ?? 0) + treff[i][0].length;
    const slutt = i + 1 < treff.length ? (treff[i + 1].index ?? tekst.length) : tekst.length;
    const delTekst = rens(tekst.slice(start, slutt));
    if (!delTekst || !balansert(delTekst)) return null;
    deler.push({ bokstav: bokstaver[i], id: `${oppgave.id}${bokstaver[i]}`, tekst: delTekst });
  }
  return { intro: tekst.slice(0, treff[0].index ?? 0), deler };
}

const likt = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

/** Del nr. i (av n) av en oppgavefasit som er en serie med n deler. Mangler delen, eller kan fasiten ikke deles, gis undefined. */
function delAvSerie(f: Sluttsvar, i: number, n: number): Sluttsvar | undefined {
  const s = f.svar;
  if (s.type !== "serie" || s.deler.length !== n) return undefined;
  const ut: Sluttsvar = { svar: s.deler[i] };
  if (f.enhet) ut.enhet = f.enhet;
  if (f.selvvurder) ut.selvvurder = true;
  if (f.symboler) ut.symboler = f.symboler;
  const alt: SvarSpec[] = [];
  for (const a of f.alternativer || []) {
    if (a.type !== "serie" || a.deler.length !== n) continue; // et alternativ som ikke kan deles hører ikke til denne delen
    if (!likt(a.deler[i], s.deler[i])) alt.push(a.deler[i]);
  }
  if (alt.length) ut.alternativer = alt;
  return ut;
}

/** Del nr. i (av n) av en oppgavefasit som er n tall (ett per del). */
function delAvTall(f: Sluttsvar, i: number, n: number): Sluttsvar | undefined {
  const s = f.svar;
  if (s.type !== "tall" || n < 2 || s.verdier.length !== n || f.alternativer?.length) return undefined;
  const d: Extract<SvarSpec, { type: "tall" }> = { type: "tall", verdier: [s.verdier[i]] };
  if (s.tol) d.tol = s.tol;
  if (s.ord) d.ord = s.ord;
  if (s.nedgang) d.nedgang = s.nedgang;
  if (s.ulikhet) d.ulikhet = s.ulikhet;
  if (s.ikkeOkning) d.ikkeOkning = s.ikkeOkning;
  if (s.ingenAvrunding) d.ingenAvrunding = s.ingenAvrunding;
  if (s.heltall?.includes(i)) d.heltall = [0];
  const ut: Sluttsvar = { svar: d };
  if (f.enhet) ut.enhet = f.enhet;
  if (f.selvvurder) ut.selvvurder = true;
  if (f.symboler) ut.symboler = f.symboler;
  return ut;
}

/**
 * Fasit til en del. Rekkefølge:
 *   1. `SLUTTSVAR[<oppgave-id><bokstav>]` (egen oppføring for delen),
 *   2. oppgavens serie-fasit når den har like mange deler (`deler[i]`),
 *   3. oppgavens tall-fasit når den har ett tall per del,
 *   4. ingen fasit (`undefined`): delen får et fritt felt med selvvurdering.
 * Gir ingen av 1–3 en fasit til noen av delene mens oppgaven har en fasit, er hele oppgaven én enhet (se `enheterFor`).
 */
export function fasitForDel(sluttsvar: Record<string, Sluttsvar>, oppgaveId: string, del: Del, i: number, n: number): Sluttsvar | undefined {
  const egen = sluttsvar[del.id];
  if (egen) return egen;
  const o = sluttsvar[oppgaveId];
  if (!o) return undefined;
  return delAvSerie(o, i, n) ?? delAvTall(o, i, n);
}

export type Enhet = {
  /** Id i utkast, innlevering og poeng. */
  id: string;
  /** «a», «b» … eller undefined når oppgaven er én enhet. */
  bokstav?: string;
  /** Teksten svaret gjelder (intro + del), til valg av spesialtegn. */
  tekst: string;
  /** Registrert fasit (ikke fri). */
  fasit?: Sluttsvar;
};

export type OppgaveEnheter = {
  oppgave: OppgaveInn;
  intro: string;
  /** Alltid minst én enhet. Har oppgaven deler, har hver enhet en `bokstav`. */
  enheter: Enhet[];
  harDeler: boolean;
};

/** Enhetene i en oppgave. `gammel`: leses en innlevering fra før delene fikk egne felt (oppgaven er da én enhet). */
export function enheterFor(oppgave: OppgaveInn, sluttsvar: Record<string, Sluttsvar>, gammel = false): OppgaveEnheter {
  const o = gammel ? null : splittDeler(oppgave);
  if (!o) {
    return {
      oppgave,
      intro: oppgave.tekst || "",
      harDeler: false,
      enheter: [{ id: oppgave.id, tekst: oppgave.tekst || "", fasit: sluttsvar[oppgave.id] }],
    };
  }
  const n = o.deler.length;
  const enheter = o.deler.map((d, i) => ({ id: d.id, bokstav: d.bokstav, tekst: `${o.intro} ${d.tekst}`, fasit: fasitForDel(sluttsvar, oppgave.id, d, i, n) }));
  // Oppgaven har en fasit som ikke lar seg legge på delene (f.eks. tre tall på to deler). Da er hele oppgaven én enhet,
  // slik at fasiten fortsatt brukes i stedet for å gå tapt.
  if (sluttsvar[oppgave.id] && enheter.every((e) => !e.fasit)) {
    return { oppgave, intro: oppgave.tekst || "", harDeler: false, enheter: [{ id: oppgave.id, tekst: oppgave.tekst || "", fasit: sluttsvar[oppgave.id] }] };
  }
  return { oppgave, intro: o.intro, harDeler: true, enheter };
}

/** Fasiten som vises og sjekkes mot. Enheter uten registrert fasit får fritt felt. */
export const fasitEllerFri = (f: Sluttsvar | undefined): Sluttsvar => f ?? FRI_SLUTTSVAR;
export const erFri = (f: Sluttsvar | undefined) => !f || f.svar.type === "fri";

/**
 * Er innleveringen lagret før delene fikk egne felt? Da ligger poengene på oppgavens id (ikke delenes), og oppgaven
 * leses som én enhet. Innleveringer uten poeng er også gamle (nye har alltid poeng).
 */
export function erGammelInnlevering(poengDeler: Record<string, unknown> | undefined, harInnlevering: boolean, oppgaveId: string): boolean {
  if (!harInnlevering) return false;
  if (!poengDeler) return true;
  return poengDeler[oppgaveId] !== undefined;
}

const SLUTTSVAR_SUFFIKS = "::sluttsvar";

/** Deler et gammelt sluttsvar («a; b; c») på semikolon og linjeskift. Gir null når antallet ikke stemmer. */
function delGammeltSvar(tekst: string, n: number): string[] | null {
  const biter = tekst
    .split(/;|\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  return biter.length === n ? biter : null;
}

/**
 * Flytter et utkast lagret før delene fikk egne felt over til delenes id-er (ingen data går tapt).
 *  - Gammelt svar (utregning) på oppgaven går til del a. Står det allerede noe i a, legges det under «Tidligere svar».
 *  - Gammelt sluttsvar deles per del når det er like mange biter som deler, ellers går det hele til del a.
 *  - Gammel «ferdig» på oppgaven gjelder alle delene.
 * Gamle nøkler fjernes. Returnerer `endret: false` når det ikke var noe å flytte.
 */
export function migrerUtkast(
  oppgaver: OppgaveInn[],
  sluttsvar: Record<string, Sluttsvar>,
  inn: { answers: Record<string, string>; ferdig: Record<string, boolean> },
): { answers: Record<string, string>; ferdig: Record<string, boolean>; endret: boolean } {
  const answers = { ...inn.answers };
  const ferdig = { ...inn.ferdig };
  let endret = false;
  for (const o of oppgaver) {
    const e = enheterFor(o, sluttsvar);
    if (!e.harDeler) continue;
    const a = e.enheter[0].id;
    const nokkelSvar = SLUTTSVAR_SUFFIKS;
    if (o.id in answers) {
      const gammel = answers[o.id];
      delete answers[o.id];
      endret = true;
      if (gammel && gammel.trim()) {
        const na = answers[a];
        answers[a] = na && na.trim() ? `Tidligere svar:\n${gammel}\n\n${na}` : gammel;
      }
    }
    const sk = `${o.id}${nokkelSvar}`;
    if (sk in answers) {
      const gammel = answers[sk];
      delete answers[sk];
      endret = true;
      if (gammel && gammel.trim()) {
        const biter = delGammeltSvar(gammel, e.enheter.length);
        e.enheter.forEach((en, i) => {
          const k = `${en.id}${nokkelSvar}`;
          const ny = biter ? biter[i] : i === 0 ? gammel : "";
          if (ny && !(answers[k] && answers[k].trim())) answers[k] = ny;
        });
      }
    }
    if (o.id in ferdig) {
      const f = ferdig[o.id];
      delete ferdig[o.id];
      endret = true;
      if (f) e.enheter.forEach((en) => (ferdig[en.id] = true));
    }
  }
  return { answers, ferdig, endret };
}
