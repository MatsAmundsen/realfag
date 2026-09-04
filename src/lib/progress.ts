export const PROGRESS_KEY = "reel_progress";

export type QuizRecord = { best: number; total: number; last: number };
export type Streak = { lastDate: string | null; count: number };
export type ExamAttempt = {
  submittedAt: number;
  selfScore: Record<string, "riktig" | "delvis" | "feil">;
  notes: Record<string, string>;
  mode: "prove" | "ove";
};

export type Progress = {
  tasks: Record<string, number>;
  quizzes: Record<string, QuizRecord>;
  streak: Streak;
  badges: Record<string, number>;
  lastActivityAt: number | null;
  exams: Record<string, ExamAttempt>;
};

export const BADGE_META: Record<
  string,
  { title: string; desc: string; kind: "sub" | "kap" | "prove" | "quiz" | "streak" | "task" }
> = {
  first_task: { title: "Første oppgave", desc: "Du markerte din første oppgave som ferdig.", kind: "task" },
  first_sub: { title: "Første delkapittel", desc: "Et helt delkapittel er fullført.", kind: "sub" },
  ten_tasks: { title: "10 oppgaver", desc: "Du har fullført 10 oppgaver.", kind: "task" },
  fifty_tasks: { title: "50 oppgaver", desc: "50 oppgaver i boka — solid innsats.", kind: "task" },
  kap_kap1: { title: "Kapittel 1 ferdig", desc: "Hele kapittel 1 er merket ferdig.", kind: "kap" },
  kap_kap2: { title: "Kapittel 2 ferdig", desc: "Hele kapittel 2 er merket ferdig.", kind: "kap" },
  kap_kap3: { title: "Kapittel 3 ferdig", desc: "Hele kapittel 3 er merket ferdig.", kind: "kap" },
  kap_kap4: { title: "Kapittel 4 ferdig", desc: "Hele kapittel 4 er merket ferdig.", kind: "kap" },
  kap_kap5: { title: "Kapittel 5 ferdig", desc: "Hele kapittel 5 er merket ferdig.", kind: "kap" },
  oving_kap1: { title: "Øveprøve kap. 1", desc: "Du har gått gjennom øveprøven i kapittel 1.", kind: "prove" },
  oving_kap2: { title: "Øveprøve kap. 2", desc: "Du har gått gjennom øveprøven i kapittel 2.", kind: "prove" },
  oving_kap3: { title: "Øveprøve kap. 3", desc: "Du har gått gjennom øveprøven i kapittel 3.", kind: "prove" },
  oving_kap5: { title: "Øveprøve kap. 5", desc: "Du har gått gjennom øveprøven i kapittel 5.", kind: "prove" },
  quiz_perfect: { title: "Perfekt quiz", desc: "100 % på en quiz. Sterkt!", kind: "quiz" },
  streak_3: { title: "3-dagers rekke", desc: "Tre dager på rad med aktivitet.", kind: "streak" },
  streak_7: { title: "Ukesrekke", desc: "Sju dager på rad. Imponerende disiplin.", kind: "streak" },
  first_exam: { title: "Første eksamen", desc: "Du leverte din første eksamenssett.", kind: "prove" },
  exam_v2023: { title: "Vår 2023", desc: "Du har levert eksamen vår 2023.", kind: "prove" },
  exam_h2023: { title: "Høst 2023", desc: "Du har levert eksamen høst 2023.", kind: "prove" },
  exam_v2024: { title: "Vår 2024", desc: "Du har levert eksamen vår 2024.", kind: "prove" },
  exam_h2024: { title: "Høst 2024", desc: "Du har levert eksamen høst 2024.", kind: "prove" },
  exam_v2025: { title: "Vår 2025", desc: "Du har levert eksamen vår 2025.", kind: "prove" },
  exam_h2025: { title: "Høst 2025", desc: "Du har levert eksamen høst 2025.", kind: "prove" },
  exam_v2026: { title: "Vår 2026", desc: "Du har levert eksamen vår 2026.", kind: "prove" },
};

export function emptyProgress(): Progress {
  return {
    tasks: {},
    quizzes: {},
    streak: { lastDate: null, count: 0 },
    badges: {},
    lastActivityAt: null,
    exams: {},
  };
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function toISODate(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
export function todayISO() {
  return toISODate(new Date());
}
function yesterdayISO() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return toISODate(d);
}

export function loadProgress(): Progress {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "null");
    if (!raw || typeof raw !== "object") return emptyProgress();
    return {
      tasks: raw.tasks || {},
      quizzes: raw.quizzes || {},
      streak: raw.streak || { lastDate: null, count: 0 },
      badges: raw.badges || {},
      lastActivityAt: raw.lastActivityAt || null,
      exams: raw.exams || {},
    };
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(p: Progress) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}

export function touchStreak(p: Progress) {
  const today = todayISO();
  if (p.streak.lastDate === today) {
    p.lastActivityAt = Date.now();
    return;
  }
  if (p.streak.lastDate === yesterdayISO()) p.streak.count += 1;
  else p.streak.count = 1;
  p.streak.lastDate = today;
  p.lastActivityAt = Date.now();
}

export function taskKey(kapId: string | null, subId: string | null, oppgaveId: string) {
  if (!kapId || kapId === "prog") return `prog/${oppgaveId}`;
  return `${kapId}/${subId}/${oppgaveId}`;
}

export function isOvingDelkap(dk: { id: string; tittel?: string }) {
  return dk.id.endsWith("OP") || (dk.tittel || "").toLowerCase().includes("øveprøve");
}

export type ChapterLike = {
  id: string;
  tittel?: string;
  delkapitler: { id: string; tittel?: string; oppgaver: { id: string }[] }[];
};

export function countSubchapter(kap: ChapterLike, dk: ChapterLike["delkapitler"][0], p: Progress) {
  const total = dk.oppgaver.length;
  const done = dk.oppgaver.filter((o) => p.tasks[taskKey(kap.id, dk.id, o.id)]).length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

export function countChapter(kap: ChapterLike, p: Progress) {
  let done = 0,
    total = 0;
  kap.delkapitler.forEach((dk) => {
    const c = countSubchapter(kap, dk, p);
    done += c.done;
    total += c.total;
  });
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

export function countAll(chapters: ChapterLike[], p: Progress) {
  let done = 0,
    total = 0;
  chapters.forEach((kap) => {
    const c = countChapter(kap, p);
    done += c.done;
    total += c.total;
  });
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

export type StudyTarget = {
  kind: "start" | "continue" | "done";
  kapId: string;
  subId: string;
  title: string;
  chapterTitle: string;
  done: number;
  total: number;
};

function parseTaskKey(key: string): { kapId: string; subId: string } | null {
  const parts = key.split("/");
  if (parts.length < 3 || parts[0] === "prog") return null;
  return { kapId: parts[0]!, subId: parts[1]! };
}

/** Første uferdige delkapittel, eller det eleven jobbet sist med. */
export function studyTarget(chapters: ChapterLike[], p: Progress): StudyTarget | null {
  const flats = chapters.flatMap((kap) =>
    kap.delkapitler
      .filter((dk) => dk.oppgaver.length > 0)
      .map((dk) => {
        const c = countSubchapter(kap, dk, p);
        return {
          kapId: kap.id,
          subId: dk.id,
          title: dk.tittel || dk.id,
          chapterTitle: kap.tittel || kap.id,
          done: c.done,
          total: c.total,
        };
      }),
  );
  if (!flats.length) return null;

  const firstOpen = flats.find((s) => s.done < s.total) ?? flats[flats.length - 1]!;
  const latest = Object.entries(p.tasks).reduce<{ key: string; at: number } | null>((best, [key, at]) => {
    if (typeof at !== "number") return best;
    if (!best || at > best.at) return { key, at };
    return best;
  }, null);

  if (!latest) {
    return { ...firstOpen, kind: "start", chapterTitle: firstOpen.chapterTitle };
  }

  const parsed = parseTaskKey(latest.key);
  if (parsed) {
    const idx = flats.findIndex((s) => s.kapId === parsed.kapId && s.subId === parsed.subId);
    if (idx >= 0) {
      const here = flats[idx]!;
      if (here.done < here.total) return { ...here, kind: "continue" };
      const after = flats.slice(idx + 1).find((s) => s.done < s.total);
      if (after) return { ...after, kind: "continue" };
    }
  }

  if (flats.every((s) => s.total > 0 && s.done >= s.total)) {
    const last = flats[flats.length - 1]!;
    return { ...last, kind: "done" };
  }
  return { ...firstOpen, kind: "continue" };
}

export function evaluateBadges(p: Progress, chapters: ChapterLike[]): string[] {
  const newly: string[] = [];
  function unlock(id: string) {
    if (BADGE_META[id] && !p.badges[id]) {
      p.badges[id] = Date.now();
      newly.push(id);
    }
  }
  let allDone = 0;
  chapters.forEach((kap) => {
    const ch = countChapter(kap, p);
    allDone += ch.done;
    if (ch.total && ch.done === ch.total) unlock("kap_" + kap.id);
    kap.delkapitler.forEach((dk) => {
      const sub = countSubchapter(kap, dk, p);
      if (sub.total && sub.done === sub.total) {
        unlock("first_sub");
        if (isOvingDelkap(dk)) unlock("oving_" + kap.id);
      }
    });
  });
  Object.keys(p.tasks).forEach((k) => {
    if (k.startsWith("prog/")) allDone += 1;
  });
  if (allDone >= 1) unlock("first_task");
  if (allDone >= 10) unlock("ten_tasks");
  if (allDone >= 50) unlock("fifty_tasks");
  if (p.streak.count >= 3) unlock("streak_3");
  if (p.streak.count >= 7) unlock("streak_7");
  Object.values(p.quizzes).forEach((q) => {
    if (q && q.total > 0 && q.best === q.total) unlock("quiz_perfect");
  });
  if (Object.keys(p.exams).length) unlock("first_exam");
  Object.keys(p.exams).forEach((id) => unlock("exam_" + id));
  return newly;
}

export function cloneProgress(p: Progress): Progress {
  return {
    tasks: { ...p.tasks },
    quizzes: { ...p.quizzes },
    streak: { ...p.streak },
    badges: { ...p.badges },
    lastActivityAt: p.lastActivityAt,
    exams: { ...p.exams },
  };
}
