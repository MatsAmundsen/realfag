import type { Exam } from "../../types";
import { EKSAMEN_1P_V2026 } from "./v2026";

/**
 * Offisielle 1P-eksamener (Udir, MAT1019, LK20), nyeste først.
 * Egne øvingssett (P7) ligger i ../exams.ts og røres ikke herfra.
 */
export const EKSAMENER_1P: Exam[] = [EKSAMEN_1P_V2026];

export function findEksamen1P(id: string): Exam | undefined {
  return EKSAMENER_1P.find((e) => e.id === id);
}

/** Teksten under tittelen: «Kilde: Utdanningsdirektoratet, MAT1019 …». */
export function kildelinje(e: Exam): string {
  if (!e.source) return "";
  return `Kilde: ${e.source.utgiver}, eksamen ${e.source.kode}, ${e.season === "vår" ? "våren" : "høsten"} ${e.year} (${e.source.eksamensdato}).`;
}
