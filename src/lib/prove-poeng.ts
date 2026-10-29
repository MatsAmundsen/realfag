/**
 * Poengberegning i prøvemodus (eksamener, P7-sett og øveprøver).
 *
 * Fordeling av poengene i en enhet (del eller oppgave uten deler):
 *   Riktig metode        50 %
 *   Riktige utregninger  25 %
 *   Riktig svar          25 %
 * Har enheten autosjekk og sluttsvaret er riktig, gis alle poengene. Er sluttsvaret feil eller tomt,
 * gir riktig metode og riktige utregninger delpoeng (75 % til sammen). Uten autosjekk vurderer eleven
 * alle tre selv i vurderingslisten etter levering.
 */
import type { Sluttsvar } from "./svar-sjekk";
import { sjekkSluttsvar } from "./svar-sjekk";

/** Den ene konstanten som styrer fordelingen. Summen skal være 1. */
export const POENGANDEL = { metode: 0.5, utregning: 0.25, svar: 0.25 } as const;

/** Oppgaver uten oppgitte poeng teller like mye hver. Delene deler på dette. */
export const POENG_UTEN_OPPGITT = 1;

export type Vurdering = { metode?: boolean; utregning?: boolean; svar?: boolean };
export type Status = "riktig" | "delvis" | "feil";

export type PoengEnhet = {
  /** Enhetens id: delens id, eller oppgavens id når den ikke har deler. */
  id: string;
  /** Poeng denne enheten kan gi. */
  maks: number;
  /** Fasit for sluttsvaret, hvis enheten har autosjekk. */
  fasit?: Sluttsvar;
};

export type EnhetsResultat = { poeng: number; maks: number; status: Status; auto?: boolean };
export type Resultat = {
  sum: number;
  maks: number;
  prosent: number;
  deler: Record<string, EnhetsResultat>;
};

/** Gjør en oppgaves poeng om til poeng per enhet. Mangler poeng, teller hver oppgave 1 og deles likt. */
export function poengPerEnhet(oppgavePoeng: number | undefined, antallDeler: number): number {
  const p = oppgavePoeng && oppgavePoeng > 0 ? oppgavePoeng : POENG_UTEN_OPPGITT;
  return p / Math.max(antallDeler, 1);
}

function rund(x: number): number {
  return Math.round(x * 1e6) / 1e6;
}

export function enhetsPoeng(
  e: PoengEnhet,
  sluttsvar: string | undefined,
  v: Vurdering | undefined,
): EnhetsResultat {
  const metodeUtregning = (v?.metode ? POENGANDEL.metode : 0) + (v?.utregning ? POENGANDEL.utregning : 0);
  let andel: number;
  let auto: boolean | undefined;
  if (e.fasit) {
    auto = sjekkSluttsvar(sluttsvar || "", e.fasit);
    andel = auto ? 1 : metodeUtregning;
  } else {
    andel = metodeUtregning + (v?.svar ? POENGANDEL.svar : 0);
  }
  const poeng = rund(e.maks * andel);
  const status: Status = poeng >= rund(e.maks) ? "riktig" : poeng <= 0 ? "feil" : "delvis";
  return { poeng, maks: rund(e.maks), status, ...(auto === undefined ? {} : { auto }) };
}

export function beregnPoeng(
  enheter: PoengEnhet[],
  sluttsvar: Record<string, string>,
  vurdering: Record<string, Vurdering>,
): Resultat {
  const deler: Record<string, EnhetsResultat> = {};
  let sum = 0;
  let maks = 0;
  for (const e of enheter) {
    const r = enhetsPoeng(e, sluttsvar[e.id], vurdering[e.id]);
    deler[e.id] = r;
    sum += r.poeng;
    maks += r.maks;
  }
  sum = rund(sum);
  maks = rund(maks);
  return { sum, maks, prosent: maks > 0 ? Math.round((sum / maks) * 100) : 0, deler };
}

/** 2 → «2», 1.5 → «1,5», 0.75 → «0,75». */
export function formaterPoeng(x: number): string {
  return String(Math.round(x * 100) / 100).replace(".", ",");
}
