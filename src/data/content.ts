import { fagsok as rawFagsok, fagstoff as rawFagstoff, programmeringData as rawProg } from "./fagsok.js";
import type { Delkapittel, Fagstoff, Kapittel, Oppgave } from "./types";
import { EXTRA, SUB_TITLES } from "./extra-tasks";
import { MORE23 } from "./extra-kap23";
import { KAP2_NYE } from "./extra-kap2-nye";
import { EXTRA_1D, EXTRA_1D_QUIZ } from "./extra-1d";
import { TASK_FIGURES, TASK_FASIT_FIGURES } from "./task-figures";
import { FIGURE_REPLACES_IMAGE } from "./kap2-figures";
import { KAP3_OVEPROVE } from "./kap3-oveprove";
import { KAP4_QUIZ } from "./kap4-quiz";
import { KAP5 } from "./kap5";
import { KAP6 } from "./kap6";
import { KAP7 } from "./kap7";
import tallmengderHtml from "./fagstoff/tallmengder.html?raw";
import brokregningHtml from "./fagstoff/brokregning.html?raw";
import kvadratrotterHtml from "./fagstoff/kvadratrotter.html?raw";
import programmeringHtml from "./fagstoff/programmering.html?raw";
import videoerHtml from "./fagstoff/videoer.html?raw";

/** Datatabeller (kap 6): rullbar ramme på mobil, caption og th scope="row". Endrer ikke tallene. */
function styleDataTables(html: string): string {
  if (!html.includes("<table>")) return html;
  return html.replace(/<table>([\s\S]*?)<\/table>/g, (_m, inner: string) => {
    const heads = [...inner.matchAll(/<th>([\s\S]*?)<\/th>/g)].map((m) => m[1]);
    const caption = heads.length ? `Datatabell: ${heads.join(" og ")}` : "Datatabell";
    const body = inner.replace(/<th>/g, '<th scope="row">');
    return `<div class="data-table-wrap" role="region" tabindex="0" aria-label="Tabell, kan rulles sidelengs"><table class="data-table"><caption>${caption}</caption>${body}</table></div>`;
  });
}

function attachFigure(op: Oppgave): Oppgave {
  let updated = op;
  const fig = TASK_FIGURES[op.id];
  if (fig && !op.tekst.includes('class="task-figure"')) {
    updated = { ...updated, tekst: fig + updated.tekst };
    if (FIGURE_REPLACES_IMAGE.has(op.id)) updated = { ...updated, bilde: null };
  }
  const fasitFigs = TASK_FASIT_FIGURES[op.id];
  if (fasitFigs && updated.fasitSteg?.length) {
    const newSteg = [...updated.fasitSteg];
    for (const [idxStr, fHtml] of Object.entries(fasitFigs)) {
      const idx = Number(idxStr);
      if (newSteg[idx] && !newSteg[idx].includes('class="task-figure"')) {
        newSteg[idx] = fHtml + newSteg[idx];
      }
    }
    updated = { ...updated, fasitSteg: newSteg };
  }
  if (updated.tekst.includes("<table>") || updated.fasitSteg?.some((x) => x.includes("<table>"))) {
    updated = {
      ...updated,
      tekst: styleDataTables(updated.tekst),
      fasitSteg: updated.fasitSteg?.map(styleDataTables) ?? updated.fasitSteg,
    };
  }
  return updated;
}

function withExtras(dk: Delkapittel): Delkapittel {
  const extraList = [...(EXTRA[dk.id] || []), ...(MORE23[dk.id] || []), ...(KAP2_NYE[dk.id] || []), ...(EXTRA_1D[dk.id] || [])];
  const baseQuiz = KAP4_QUIZ[dk.id] ?? dk.quiz;
  const extraQuiz = dk.id === "1D" ? EXTRA_1D_QUIZ : undefined;
  return {
    ...dk,
    tittel: SUB_TITLES[dk.id] || dk.tittel,
    quiz: extraQuiz?.length ? [...(baseQuiz ?? []), ...extraQuiz] : baseQuiz,
    oppgaver: [
      ...dk.oppgaver.map(attachFigure),
      ...extraList.map((op, i, arr) => {
        const withFig = attachFigure(op);
        if (/^\d+\.\d+$/.test(withFig.id) && withFig.id.startsWith("1.")) return withFig;
        if (/^\d+\.\d+$/.test(withFig.id)) {
          return { ...withFig, tittel: `Ekstraøving ${i + 1}` } as Oppgave;
        }
        const n = arr.slice(0, i + 1).filter((x) => !/^\d+\.\d+$/.test(x.id)).length;
        return { ...withFig, tittel: `Ekstraøving ${n}` } as Oppgave;
      }),
    ] as Oppgave[],
  };
}

export const fagsokRaw = (rawFagsok as Kapittel[]).map((kap) => {
  const delkapitler = kap.delkapitler.map(withExtras);
  if (kap.id === "kap3") {
    return { ...kap, delkapitler: [...delkapitler, withExtras(KAP3_OVEPROVE)] };
  }
  return { ...kap, delkapitler };
});
export const fagsok = [
  ...fagsokRaw,
  ...[KAP5, KAP6, KAP7].map((kap) => ({
    ...kap,
    delkapitler: kap.delkapitler.map((dk) => ({
      ...dk,
      oppgaver: dk.oppgaver.map(attachFigure),
    })),
  })),
];
export const fagstoff = (rawFagstoff as Fagstoff[]).map((f) => {
  const inline: Record<string, string> = {
    tallmengder: tallmengderHtml,
    brokregning: brokregningHtml,
    kvadratrotter: kvadratrotterHtml,
    programmering: programmeringHtml,
    videoer: videoerHtml,
  };
  if (inline[f.id]) return { ...f, html: inline[f.id], src: undefined };
  return f;
});
export const programmeringData = rawProg as Oppgave[];

export const CHAPTER_META: Record<
  string,
  { short: string; blurb: string; image: string; tint: string }
> = {
  kap1: {
    short: "Tallforståelse og algebra",
    blurb: "Tallmengder, potenser, standardform og logikk",
    image: "/images/kap1.jpg",
    tint: "#818cf8",
  },
  kap2: {
    short: "Algebra og mønstre",
    blurb: "Kvadratsetninger, faktorisering og rasjonale uttrykk",
    image: "/images/kap2.jpg",
    tint: "#34d399",
  },
  kap3: {
    short: "Likninger og ulikheter",
    blurb: "Likninger, ulikheter og polynomdivisjon",
    image: "/images/kap3.jpg",
    tint: "#f59e0b",
  },
  kap4: {
    short: "Funksjoner",
    blurb: "Funksjoner, derivasjon og funksjonsdrøfting",
    image: "/images/kap4.jpg",
    tint: "#a78bfa",
  },
  kap5: {
    short: "Likningssett og ulikheter",
    blurb: "To og tre ukjente, modeller, fortegnslinje og rasjonale ulikheter",
    image: "/images/kap5.jpg",
    tint: "#22d3ee",
  },
  // kap6/kap7: abstrakte omslag laget fra SVG (design/covers). Tint-kontrast mot #111827: rosa 6,7:1, oransje 7,8:1.
  kap6: {
    short: "Modellering",
    blurb: "Matematiske modeller, regresjon og modellering i praksis",
    image: "/images/kap6.jpg",
    tint: "#f472b6",
  },
  kap7: {
    short: "Trigonometri",
    blurb: "Pytagoras, formlikhet, sinus, cosinus, tangens og trekantsetningene",
    image: "/images/kap7.jpg",
    tint: "#fb923c",
  },
};

export type TemaVideo = { tittel: string; url: string };

/** Én anbefalt forklaringsvideo per delkapittel. Første oppføring er den eleven får. */
export const VIDEO_BY_SUB: Record<string, TemaVideo[]> = {
  "1A": [{ tittel: "Regnerekkefølge og parenteser", url: "https://www.youtube.com/watch?v=HCvi7QZBoGE" }],
  "1B": [{ tittel: "Kvadratrøtter", url: "https://www.youtube.com/watch?v=NRx60-H6ZY0" }],
  "1C": [{ tittel: "Brøkregning", url: "https://www.youtube.com/watch?v=2foqFiSTRPc" }],
  "1D": [{ tittel: "Potenser", url: "https://www.youtube.com/watch?v=daQqN2aB7is" }],
  "1E": [{ tittel: "Standardform", url: "https://www.youtube.com/watch?v=SSb_IddmrdE" }],
  "1F": [{ tittel: "Implikasjon og ekvivalens", url: "https://www.youtube.com/watch?v=lnB4y3IyCRQ" }],
  "2A": [{ tittel: "Regning med bokstavuttrykk", url: "https://www.youtube.com/watch?v=PA7Q18hLK0E" }],
  "2B": [{ tittel: "Første kvadratsetning", url: "https://www.youtube.com/watch?v=LgDQ29AAfEM" }, { tittel: "Andre kvadratsetning", url: "https://www.youtube.com/watch?v=vKmPyzXwm_A" }, { tittel: "Konjugatsetningen", url: "https://www.youtube.com/watch?v=isqqIJYcnB0" }],
  "2C": [{ tittel: "Felles faktor og faktorisering", url: "https://www.youtube.com/watch?v=7L7mYWpMY9U" }],
  "2D": [{ tittel: "Faktorisering med kvadratsetninger", url: "https://www.youtube.com/watch?v=OmjOo1a4pLA" }, { tittel: "Gjenkjenne fullstendige kvadrater", url: "https://www.youtube.com/watch?v=B9vsG1QMy1o" }, { tittel: "Fullstendige kvadraters metode", url: "https://www.youtube.com/watch?v=7nri1E0v_xE" }],
  "2E": [{ tittel: "Brøkregning med bokstaver", url: "https://www.youtube.com/watch?v=p2SeSghAyEE" }, { tittel: "Brudden brøk", url: "https://www.youtube.com/watch?v=Im0BPFxDwp8" }],
  "2F": [{ tittel: "Formler for figurtall", url: "https://www.youtube.com/watch?v=f4v7perY_0o" }, { tittel: "Å lage formler og uttrykk", url: "https://www.youtube.com/watch?v=scwkoWmWDBY" }, { tittel: "Omgjøring av formler", url: "https://www.youtube.com/watch?v=bDZ7JL4ZUzY" }],
  "3A": [{ tittel: "3A Lineære likninger", url: "https://www.youtube.com/watch?v=T1a1-mbv4KQ" }],
  "3B": [{ tittel: "Omskriving av formler", url: "https://www.youtube.com/watch?v=n5k-x-05X00" }],
  "3C": [{ tittel: "Andregradslikninger", url: "https://www.youtube.com/watch?v=0eyN7vknTW4" }],
  "3D": [{ tittel: "ABC-formelen og diskriminanten", url: "https://www.youtube.com/watch?v=zHQ2eauLwr4" }],
  "3E": [{ tittel: "Rasjonale likninger", url: "https://www.youtube.com/watch?v=x3QZyL0KDME" }],
  "3F": [{ tittel: "Forhold og proporsjoner", url: "https://www.youtube.com/watch?v=JDi2jAJaFkw" }],
  "3G": [{ tittel: "Polynomdivisjon", url: "https://www.youtube.com/watch?v=_w-hcv1buIU" }],
  "4A": [{ tittel: "Hva er en funksjon?", url: "https://www.youtube.com/watch?v=BCCZxWe57Eo" }],
  "4B": [{ tittel: "Lineære funksjoner", url: "https://www.youtube.com/watch?v=0qoEA0Kgobo" }],
  "4C": [{ tittel: "Introduksjon til polynomfunksjoner", url: "https://www.youtube.com/watch?v=3oWCt9o6F4Q" }],
  "4D": [{ tittel: "Rasjonale funksjoner og asymptoter", url: "https://www.youtube.com/watch?v=YsrLKyUBbxA" }],
  "4E": [{ tittel: "Potensfunksjoner", url: "https://www.youtube.com/watch?v=Nb2EPO4UmRA" }],
  "4F": [{ tittel: "Eksponentialfunksjoner", url: "https://www.youtube.com/watch?v=QWsCuGz-38A" }],
  "4G": [{ tittel: "Gjennomsnittlig vekstfart", url: "https://www.youtube.com/watch?v=qdEO-jfua-4" }],
  "4H": [{ tittel: "Den deriverte", url: "https://www.youtube.com/watch?v=CRvOOOw80vQ" }],
  "5A": [{ tittel: "5A Lineære likningssystemer", url: "https://www.youtube.com/watch?v=0w-kZMkIalc" }],
  "5B": [{ tittel: "Likningssett, del 1", url: "https://www.youtube.com/watch?v=5tRVlUkNdOA" }],
  "5C": [{ tittel: "Likningssystemer med flere enn to ukjente", url: "https://www.youtube.com/watch?v=eSkmwkUAIh4" }],
  "5D": [{ tittel: "Praktisk bruk av andregradslikninger", url: "https://www.youtube.com/watch?v=rYpEIRjYwOI" }],
  "5E": [{ tittel: "Ikke-lineære likningssystemer", url: "https://www.youtube.com/watch?v=bHooi9jFf2A" }],
  "5F": [{ tittel: "Førstegradsulikheter", url: "https://www.youtube.com/watch?v=WvqUOhfhVSY" }],
  "5G": [{ tittel: "Fortegnsskjema og andregradsulikheter", url: "https://www.youtube.com/watch?v=7eSS4QaFAJ8" }],
  "5H": [{ tittel: "Rasjonale ulikheter", url: "https://www.youtube.com/watch?v=ZsbZLaN3aOc" }],
  "6A": [
    { tittel: "6A Matematiske modeller", url: "https://www.youtube.com/watch?v=BRm1_7hEsyw" },
    { tittel: "1T matte 6A Modellering", url: "https://www.youtube.com/watch?v=BMWi_42D8rc" },
  ],
  "6B": [
    { tittel: "6B Regresjon", url: "https://www.youtube.com/watch?v=KdSx6wcP_rk" },
    { tittel: "Regresjon med GeoGebra", url: "https://www.youtube.com/watch?v=UwVtJPeqGO8" },
    { tittel: "Matematikk 1T 3.4 Lineær regresjon: GeoGebra", url: "https://www.youtube.com/watch?v=8eTDmTwr_iE" },
  ],
  "6C": [
    { tittel: "6C Modellering i praksis", url: "https://www.youtube.com/watch?v=Vt8GdJ1rrv0" },
    { tittel: "Matte 1T 6C modellering i praksis", url: "https://www.youtube.com/watch?v=go8M0cD9HIA" },
  ],
  "7A": [
    { tittel: "7A Pytagorassetningen", url: "https://www.youtube.com/watch?v=7w2Kg7Cv-Hk" },
    { tittel: "Pytagoras' setning", url: "https://www.youtube.com/watch?v=d0qvxsfvpmU" },
  ],
  "7B": [
    { tittel: "7B Formlikhet", url: "https://www.youtube.com/watch?v=YCNP_806dfY" },
    { tittel: "Formlikhet", url: "https://www.youtube.com/watch?v=1_J1BgQDRO4" },
    { tittel: "Formlikhet | Matematikk 1T", url: "https://www.youtube.com/watch?v=lwIAVOLt1nM" },
  ],
  "7C": [
    { tittel: "7C Tangens, sinus og cosinus", url: "https://www.youtube.com/watch?v=AupBrBChCkQ" },
    { tittel: "Matematikk 1T Trigonometri: Sinus, cosinus og tangens Del 1", url: "https://www.youtube.com/watch?v=AM35qPuGUu4" },
  ],
  "7D": [
    { tittel: "7D Generell definisjon av sin v og cos v", url: "https://www.youtube.com/watch?v=0zULwO82b-U" },
    { tittel: "Enhetssirkelen – alt du trenger å vite", url: "https://www.youtube.com/watch?v=ln6uZjGPiM4" },
  ],
  "7E": [
    { tittel: "7E Arealsetningen", url: "https://www.youtube.com/watch?v=7XsCRohbrAk" },
    { tittel: "Arealsetningen (1T)", url: "https://www.youtube.com/watch?v=g4388Bg_UNw" },
  ],
  "7F": [
    { tittel: "7F Sinussetningen", url: "https://www.youtube.com/watch?v=kMYufFWcYAU" },
    { tittel: "Matematikk 1T Sinussetningen Del 2", url: "https://www.youtube.com/watch?v=_S0OCNgZrQw" },
  ],
  "7G": [
    { tittel: "7G Cosinussetningen", url: "https://www.youtube.com/watch?v=-cs5U12nK3I" },
    { tittel: "Matematikk 1T Cosinussetningen", url: "https://www.youtube.com/watch?v=Fpi_mIrpWWk" },
  ],
};

export function videoForSub(subId: string | null | undefined): TemaVideo | null {
  if (!subId) return null;
  return VIDEO_BY_SUB[subId]?.[0] ?? null;
}

export function findKap(id: string) {
  return fagsok.find((k) => k.id === id);
}
export function findSub(kapId: string, subId: string) {
  const kap = findKap(kapId);
  return kap?.delkapitler.find((d) => d.id === subId);
}

export const UKESPLAN: Record<number, { kapId: string | null; subId: string | null; tekst: string }> = {
  34: { kapId: null, subId: null, tekst: "Uke 34 — Tirsdag: grilling og oppstart. Torsdag: Strandheim." },
  35: { kapId: "kap1", subId: "1A", tekst: "Uke 35 — Tirsdag: kapittel 1A. Torsdag: 1B/1D." },
  36: { kapId: "kap1", subId: "1E", tekst: "Uke 36 — Tirsdag: Osloprøve. Torsdag: kapittel 1E." },
  37: { kapId: "kap2", subId: "2B", tekst: "Uke 37 — Tirsdag: kapittel 2B. Torsdag: 2C." },
  38: { kapId: "kap2", subId: "2D", tekst: "Uke 38 — Tirsdag: kapittel 2D. Torsdag: 2E/F." },
  39: { kapId: "kap2", subId: "2F", tekst: "Uke 39 — Tirsdag: kapittel 2F. Torsdag: prøve." },
  40: { kapId: null, subId: null, tekst: "Uke 40 — Høstferie. Lad batteriene." },
};
