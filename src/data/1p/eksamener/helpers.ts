import type { Exam, ExamPart, ExamSource, ExamTask } from "../../types";
import { EKSAMEN_FIGURER, renderExamFigure } from "./figurer";

/**
 * Hjelpefunksjoner for offisielle 1P-eksamener (Udir, MAT1019).
 * Oppgavetekstene er Udirs og gjengis med kildehenvisning.
 * Løsningsforslagene er Matteguidens egne.
 */

/** Deloppgave a), b) … med eget hint og eget løsningsforslag. */
export function part(
  taskId: string,
  label: string,
  text: string,
  hint: string,
  fasitSteg: string[],
): ExamPart {
  return { id: `${taskId}${label}`, label, text, hint, fasitSteg };
}

/** Oppgave uten deloppgaver. */
export function single(
  id: string,
  nr: string,
  points: number,
  text: string,
  hint: string,
  fasitSteg: string[],
  topics: string[],
  usikker?: string,
): ExamTask {
  return { id, nr, points, text, hint, fasitSteg, topics, ...(usikker ? { usikker } : {}) };
}

/** Oppgave med deloppgaver. «intro» er teksten før a). */
export function multi(
  id: string,
  nr: string,
  points: number,
  intro: string,
  parts: ExamPart[],
  topics: string[],
  usikker?: string,
): ExamTask {
  return { id, nr, points, text: intro, hint: "", fasitSteg: [], parts, topics, ...(usikker ? { usikker } : {}) };
}

/**
 * Skjult figurbestilling i en HTML-kommentar, etterfulgt av selve figuren når den er levert
 * (src/data/1p/eksamener/figurer.ts). Uten levert figur står en synlig plassholder.
 */
export function figur(id: string, nr: string, beskrivelse: string): string {
  const f = EKSAMEN_FIGURER[id];
  if (f) return `<!-- figur: ${id} — ${beskrivelse} -->${renderExamFigure(f, nr)}`;
  return `<!-- figur: ${id} — ${beskrivelse} --><br><em>Figur til oppgave ${nr} kommer.</em><br><br>`;
}

/**
 * Når en figur er levert, skjules den kursive «Figuren viser: …»-linja (Matteguidens egen figurbeskrivelse):
 * den er bare en erstatning for figuren og skal ikke stå ved siden av den.
 */
const FIGURE_NOTE = /<em>(?:Figuren|Figurene|Skissen)\s+viser[^<]*<\/em>(?:<br>)*/g;
function hideFigureNote(html: string): string {
  return html.includes('<figure class="task-figure') ? html.replace(FIGURE_NOTE, "") : html;
}
function withoutFigureNotes(task: ExamTask): ExamTask {
  return {
    ...task,
    text: hideFigureNote(task.text),
    ...(task.parts ? { parts: task.parts.map((p) => ({ ...p, text: hideFigureNote(p.text) })) } : {}),
  };
}

export function udirSource(kode: string, eksamensdato: string, filnavn: string): ExamSource {
  return {
    utgiver: "Utdanningsdirektoratet",
    kode,
    eksamensdato,
    oppgaveUrl: `https://matematikk.net/res/eksamen/1P/eks/LK20/${filnavn}`,
  };
}

export type OfficialExamInit = Omit<Exam, "hasOfficialSolutions" | "del1Count" | "del2Count">;

export function officialExam(init: OfficialExamInit): Exam {
  return {
    ...init,
    del1: init.del1.map(withoutFigureNotes),
    del2: init.del2.map(withoutFigureNotes),
    del1Count: init.del1.length,
    del2Count: init.del2.length,
    hasOfficialSolutions: false,
  };
}

export const U = "<strong>Uten hjelpemidler</strong>. ";
