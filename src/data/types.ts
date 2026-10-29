export type Oppgave = {
  id: string;
  tittel: string;
  tekst: string;
  bilde: string | null;
  hint: string;
  fasit: string | null;
  fasitSteg: string[] | null;
  starter?: string;
};

export type QuizQuestion = {
  sporsmal: string;
  alternativer: string[];
  riktigSvar: number;
  forklaring: string;
  niva?: string;
};

export type Delkapittel = {
  id: string;
  tittel: string;
  oppgaver: Oppgave[];
  quiz?: QuizQuestion[] | null;
};

export type Kapittel = {
  id: string;
  tittel: string;
  delkapitler: Delkapittel[];
};

export type Fagstoff = {
  id: string;
  tittel: string;
  src?: string;
  html?: string;
};

/** Deloppgave a), b), … til en eksamensoppgave. Har egen tekst, eget hint og eget løsningsforslag. */
export type ExamPart = {
  id: string;
  label: string;
  text: string;
  hint: string;
  fasitSteg: string[];
};

export type ExamTask = {
  id: string;
  nr: string;
  points: number;
  /** Innledning til oppgaven. Når «parts» finnes, står selve spørsmålene i hver deloppgave. */
  text: string;
  figure?: string;
  hint: string;
  fasitSteg: string[];
  topics: string[];
  /** Deloppgaver a), b) … Hvis tom eller utelatt, brukes «hint» og «fasitSteg» på oppgaven. */
  parts?: ExamPart[];
  /** Satt når noe i oppgaven eller løsningen ikke er sikkert (f.eks. uleselig data). Vises ikke for elever. */
  usikker?: string;
};

/** Kilde for en offisiell eksamen. Oppgavene er Udirs; løsningsforslagene er Matteguidens egne. */
export type ExamSource = {
  utgiver: string;
  kode: string;
  eksamensdato: string;
  oppgaveUrl: string;
};

export type Exam = {
  id: string;
  title: string;
  /** Bare for offisielle eksamener. Egne øvingssett lar feltene stå tomme. */
  season?: "vår" | "høst";
  year?: number;
  date: string;
  del1Minutes: number;
  totalMinutes: number;
  del1Count: number;
  del2Count: number;
  hasOfficialSolutions: boolean;
  officialNote?: string;
  /** Satt for offisielle Udir-eksamener. */
  source?: ExamSource;
  del1: ExamTask[];
  del2: ExamTask[];
};

export type StudyMode = "prove" | "ove";
