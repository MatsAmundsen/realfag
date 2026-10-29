import type { Sluttsvar } from "@/lib/svar-sjekk";

/**
 * Sluttsvar til autosjekk i prøvemodus, per enhet (del eller oppgave uten deler, eller en øveprøveoppgave).
 * Bare der fasitSteg allerede gir ett entydig tall eller uttrykk. Alle verdier er kontrollert med sympy
 * mot fasitSteg (verify_prove_poeng.py). Oppgaver uten oppføring her får bare vurderingslisten.
 */
export const SLUTTSVAR: Record<string, Sluttsvar> = {};
