import type { TemaVideo } from "../content";

/** Kapittelmetadata for 1P. Nøklene har prefiks «p1» så de aldri kolliderer med 1T. */
// Omslag: egne 1P-bilder i lime fotostil (1600×1200 JPEG + /images/omslag/1p/ i 480/960 px).
export const CHAPTER_META_1P: Record<string, { short: string; blurb: string; image: string; tint: string }> = {
  p1kap1: {
    short: "Tall, potenser og røtter",
    blurb: "Regning med tall, potensregler, standardform og røtter",
    image: "/images/1p/kap1.jpg",
    tint: "#60a5fa",
  },
  p1kap2: {
    short: "Enheter og omgjøring",
    blurb: "Enhetsprefikser, omgjøring mellom enheter, fart, tetthet og energi",
    image: "/images/1p/kap2.jpg",
    tint: "#a78bfa",
  },
  p1kap3: {
    short: "Prosent og vekst",
    blurb: "Andeler, prosentpoeng, vekstfaktor og endring over flere perioder",
    image: "/images/1p/kap3.jpg",
    tint: "#fbbf24",
  },
};

/** Temavideoer per 1P-delkapittel (P-prefiks). Mats har ikke valgt videoer ennå. */
export const VIDEO_BY_SUB_1P: Record<string, TemaVideo[]> = {};

export function videosForSub1P(subId: string | null | undefined): TemaVideo[] {
  return subId ? (VIDEO_BY_SUB_1P[subId] ?? []) : [];
}
