import { fagsok as rawFagsok, fagstoff as rawFagstoff, programmeringData as rawProg } from "./fagsok.js";
import type { Delkapittel, Fagstoff, Kapittel, Oppgave } from "./types";
import { EXTRA, SUB_TITLES } from "./extra-tasks";
import { MORE23 } from "./extra-kap23";
import { TASK_FIGURES } from "./task-figures";
import { KAP3_OVEPROVE } from "./kap3-oveprove";
import { KAP4_QUIZ } from "./kap4-quiz";
import { KAP5 } from "./kap5";
import tallmengderHtml from "./fagstoff/tallmengder.html?raw";
import brokregningHtml from "./fagstoff/brokregning.html?raw";
import kvadratrotterHtml from "./fagstoff/kvadratrotter.html?raw";
import programmeringHtml from "./fagstoff/programmering.html?raw";
import videoerHtml from "./fagstoff/videoer.html?raw";

function attachFigure(op: Oppgave): Oppgave {
  const fig = TASK_FIGURES[op.id];
  if (!fig || op.tekst.includes('class="task-figure"')) return op;
  return { ...op, tekst: fig + op.tekst };
}

function withExtras(dk: Delkapittel): Delkapittel {
  const extraList = [...(EXTRA[dk.id] || []), ...(MORE23[dk.id] || [])];
  return {
    ...dk,
    tittel: SUB_TITLES[dk.id] || dk.tittel,
    quiz: KAP4_QUIZ[dk.id] ?? dk.quiz,
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
  {
    ...KAP5,
    delkapitler: KAP5.delkapitler.map((dk) => ({
      ...dk,
      oppgaver: dk.oppgaver.map(attachFigure),
    })),
  },
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
};

export const VIDEO_BY_SUB: Record<string, { tittel: string; url: string }[]> = {
  "1A": [
    { tittel: "Regnerekkefølge og parenteser", url: "https://www.youtube.com/watch?v=HCvi7QZBoGE" },
    { tittel: "Tallmengder og intervaller", url: "https://www.youtube.com/watch?v=4ey3raG716U" },
  ],
  "1B": [{ tittel: "Figurtall og mønstre", url: "https://www.youtube.com/watch?v=Pm1Z8GJFqPw" }],
  "1C": [
    { tittel: "Primtall og faktorisering", url: "https://www.youtube.com/watch?v=iMmTOV6rKqg" },
    { tittel: "Brøkregning", url: "https://www.youtube.com/watch?v=2foqFiSTRPc" },
  ],
  "1D": [{ tittel: "Potenser", url: "https://www.youtube.com/watch?v=daQqN2aB7is" }],
  "1E": [
    { tittel: "Kvadratrøtter", url: "https://www.youtube.com/watch?v=NRx60-H6ZY0" },
    { tittel: "Standardform", url: "https://www.youtube.com/watch?v=SSb_IddmrdE" },
  ],
  "1F": [{ tittel: "Implikasjon og ekvivalens", url: "https://www.youtube.com/watch?v=lnB4y3IyCRQ" }],
};

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
