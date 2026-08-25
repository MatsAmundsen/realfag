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

export type ExamTask = {
  id: string;
  nr: string;
  points: number;
  text: string;
  figure?: string;
  hint: string;
  fasitSteg: string[];
  topics: string[];
};

export type Exam = {
  id: string;
  title: string;
  season: "vår" | "høst";
  year: number;
  date: string;
  del1Minutes: number;
  totalMinutes: number;
  del1Count: number;
  del2Count: number;
  hasOfficialSolutions: boolean;
  officialNote?: string;
  del1: ExamTask[];
  del2: ExamTask[];
};

export type StudyMode = "prove" | "ove";
