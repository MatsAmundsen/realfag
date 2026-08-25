import { useState } from "react";
import { X } from "lucide-react";
import type { QuizQuestion } from "@/data/types";
import { KatexHtml } from "./KatexHtml";
import { fireCelebration, useProgressStore } from "@/lib/progress-store";

export function QuizOverlay({
  title,
  quizKey,
  questions,
  onClose,
}: {
  title: string;
  quizKey: string;
  questions: QuizQuestion[];
  onClose: () => void;
}) {
  const recordQuiz = useProgressStore((s) => s.recordQuiz);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[idx];
  const letters = ["A", "B", "C", "D", "E", "F"];

  function choose(i: number) {
    if (picked !== null || !q) return;
    setPicked(i);
    if (i === q.riktigSvar) setScore((s) => s + 1);
  }

  function next() {
    if (idx + 1 >= questions.length) {
      const rec = recordQuiz(quizKey, score, questions.length);
      setDone(true);
      if (score === questions.length) {
        fireCelebration({
          kind: "quiz",
          title: "Perfekt quiz",
          body: `Alle ${questions.length} spørsmål riktig i ${title}.`,
          badges: rec.newly,
        });
      }
      return;
    }
    setIdx((i) => i + 1);
    setPicked(null);
  }

  if (!q && !done) return null;

  return (
    <>
      <div className="quiz-backdrop" onClick={onClose} />
      <div className="quiz-overlay" role="dialog" aria-modal="true">
        <div className="quiz-panel">
          <div className="quiz-panel-header">
            <div>
              <div className="quiz-panel-label">Quiz</div>
              <h2 className="quiz-panel-title">{title}</h2>
            </div>
            <button type="button" className="quiz-close-btn" onClick={onClose} aria-label="Lukk quiz">
              <X size={18} />
            </button>
          </div>
          {!done && (
            <>
              <div className="quiz-progress-bar-wrap">
                <div
                  className="quiz-progress-bar"
                  style={{ width: `${((idx + (picked !== null ? 1 : 0)) / questions.length) * 100}%` }}
                />
              </div>
              <div className="quiz-progress-text">
                Spørsmål {idx + 1} av {questions.length}
              </div>
            </>
          )}
          <div className="quiz-panel-body">
            {done ? (
              <div className="quiz-result">
                <div className="quiz-result-score">
                  {score}/{questions.length}
                </div>
                <p className="quiz-result-text">
                  {score === questions.length
                    ? "Prikkfri. Du kan dette delkapittelet."
                    : score >= questions.length * 0.7
                      ? "Sterkt. Gå gjennom de du bommet på, og ta quizen på nytt."
                      : "God start. Les løsningene i oppgavene og prøv igjen."}
                </p>
                <button
                  type="button"
                  className="quiz-restart-btn"
                  onClick={() => {
                    setIdx(0);
                    setPicked(null);
                    setScore(0);
                    setDone(false);
                  }}
                >
                  Ta quizen på nytt
                </button>
              </div>
            ) : (
              <div className="quiz-question-card">
                {q.niva && <div className="quiz-q-level">{q.niva}</div>}
                <KatexHtml html={q.sporsmal} className="quiz-q-text" />
                <div className="quiz-options">
                  {q.alternativer.map((alt, i) => {
                    let cls = "quiz-opt-btn";
                    if (picked !== null) {
                      if (i === q.riktigSvar) cls += " correct";
                      else if (i === picked) cls += " wrong";
                    }
                    return (
                      <button
                        key={i}
                        type="button"
                        className={cls}
                        disabled={picked !== null}
                        onClick={() => choose(i)}
                      >
                        <span>{letters[i]}</span>
                        <KatexHtml html={alt} as="span" />
                      </button>
                    );
                  })}
                </div>
                {picked !== null && (
                  <div className={`quiz-feedback ${picked === q.riktigSvar ? "correct" : "wrong"}`}>
                    <div className="quiz-feedback-title">
                      {picked === q.riktigSvar ? "Riktig" : "Ikke helt"}
                    </div>
                    <KatexHtml html={q.forklaring} />
                    <button type="button" className="quiz-next-btn" onClick={next}>
                      {idx + 1 >= questions.length ? "Se resultat" : "Neste"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
