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
    blurb: "Andeler, prosentpoeng, vekstfaktor og vekst og nedgang år for år",
    image: "/images/1p/kap3.jpg",
    tint: "#fbbf24",
  },
  p1kap4: {
    short: "Funksjoner og grafer",
    blurb: "Punkter og akser, hva en funksjon er, egenskaper, vekstfart og modeller",
    image: "/images/1p/kap4.jpg",
    tint: "#34d399",
  },
  p1kap5: {
    short: "Matematiske modeller",
    blurb: "Modeller, regresjon, gyldighetsområde og modellering i praksis",
    image: "/images/1p/kap5.jpg",
    tint: "#22d3ee",
  },
  p1kap6: {
    short: "Formler og mønstre",
    blurb: "Formler, proporsjonalitet, omvendt proporsjonalitet, tallmønstre og figurtall",
    image: "/images/1p/kap6.jpg",
    tint: "#f472b6",
  },
};

/** Temavideoer per 1P-delkapittel (P-prefiks). Mats har ikke valgt videoer ennå. */
export const VIDEO_BY_SUB_1P: Record<string, TemaVideo[]> = {};

export function videosForSub1P(subId: string | null | undefined): TemaVideo[] {
  return subId ? (VIDEO_BY_SUB_1P[subId] ?? []) : [];
}

/** Godkjente nivåark (Word) per 1P-delkapittel. Filene ligger i public/ark/1p/. */
export const NIVAARK_BY_SUB_1P: Record<string, string> = Object.fromEntries(
  ["4A", "4B", "4C", "4D", "4E", "5A", "5B", "5C", "5D"].map((s) => [`P${s}`, `/ark/1p/1p-${s}-nivaark.docx`]),
);
