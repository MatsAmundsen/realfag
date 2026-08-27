import { create } from "zustand";
import { fagsok } from "@/data/content";
import type { Progress, QuizRecord } from "./progress";
import {
  cloneProgress,
  emptyProgress,
  evaluateBadges,
  loadProgress,
  saveProgress,
  taskKey,
  touchStreak,
} from "./progress";

type CelebrationKind = "sub" | "kap" | "prove" | "exam" | "quiz" | "quiz-fail" | "badge";

export type Celebration = {
  kind: CelebrationKind;
  title: string;
  body: string;
  badges: string[];
};

type Store = {
  p: Progress;
  hydrated: boolean;
  celebration: Celebration | null;
  badgeQueue: string[];
  hydrate: () => void;
  dismissCelebration: () => void;
  markTask: (kapId: string | null, subId: string | null, oppgaveId: string, done: boolean) => string[];
  recordQuiz: (key: string, score: number, total: number) => { isRecord: boolean; best: number; newly: string[] };
  saveExam: (
    examId: string,
    attempt: Progress["exams"][string],
  ) => string[];
  resetAll: () => void;
};

function persist(p: Progress) {
  saveProgress(p);
  return p;
}

export const useProgressStore = create<Store>((set, get) => ({
  p: emptyProgress(),
  hydrated: false,
  celebration: null,
  badgeQueue: [],
  hydrate: () => {
    if (get().hydrated) return;
    set({ p: loadProgress(), hydrated: true });
  },
  dismissCelebration: () => set({ celebration: null }),
  markTask: (kapId, subId, oppgaveId, done) => {
    const p = cloneProgress(get().p);
    const key = taskKey(kapId, subId, oppgaveId);
    if (done) p.tasks[key] = Date.now();
    else delete p.tasks[key];
    touchStreak(p);
    const newly = evaluateBadges(p, fagsok);
    persist(p);
    set({ p, badgeQueue: newly });
    return newly;
  },
  recordQuiz: (key, score, total) => {
    const p = cloneProgress(get().p);
    const prev: QuizRecord = p.quizzes[key] || { best: 0, total, last: 0 };
    const isRecord = score > prev.best;
    p.quizzes[key] = {
      best: Math.max(prev.best, score),
      total,
      last: score,
    };
    touchStreak(p);
    const newly = evaluateBadges(p, fagsok);
    persist(p);
    set({ p, badgeQueue: newly });
    return { isRecord, best: p.quizzes[key].best, newly };
  },
  saveExam: (examId, attempt) => {
    const p = cloneProgress(get().p);
    p.exams[examId] = attempt;
    touchStreak(p);
    const newly = evaluateBadges(p, fagsok);
    persist(p);
    set({ p, badgeQueue: newly });
    return newly;
  },
  resetAll: () => {
    const p = emptyProgress();
    persist(p);
    set({ p, celebration: null, badgeQueue: [] });
  },
}));

export function fireCelebration(c: Celebration) {
  useProgressStore.setState({ celebration: c });
}
