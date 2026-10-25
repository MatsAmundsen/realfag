import type { Kapittel } from "../types";
import { KAP1_1P } from "./kap1";
import { KAP2_1P } from "./kap2";
import { KAP3_1P } from "./kap3";
import { KAP4_1P } from "./kap4";
import { KAP5_1P } from "./kap5";
import { KAP6_1P } from "./kap6";

/** Alle 1P-kapitler. Id-er: kapittel «p1kapN», delkapittel «PNA», oppgave «PN.n». */
export const fagsok1P: Kapittel[] = [KAP1_1P, KAP2_1P, KAP3_1P, KAP4_1P, KAP5_1P, KAP6_1P];

export function findKap1P(id: string) {
  return fagsok1P.find((k) => k.id === id);
}

export function findSub1P(kapId: string, subId: string) {
  return findKap1P(kapId)?.delkapitler.find((d) => d.id === subId);
}

export { CHAPTER_META_1P, VIDEO_BY_SUB_1P, videosForSub1P } from "./meta";
