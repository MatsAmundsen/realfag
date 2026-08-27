import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const failed = done && questions.length > 0 && score / questions.length < 0.5;
  const perfect = done && questions.length > 0 && score === questions.length;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

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
          title: "Du temmet T-rexen",
          body: `Alle ${questions.length} spørsmål riktig i ${title}. Prikkfri.`,
          badges: rec.newly,
        });
      } else if (questions.length > 0 && score / questions.length < 0.5) {
        fireCelebration({
          kind: "quiz-fail",
          title: "T-rexen tok hodet ditt",
          body: `${score} av ${questions.length} riktig i ${title}. Under 50 % — les mer og prøv igjen.`,
          badges: rec.newly,
        });
      }
      return;
    }
    setIdx((i) => i + 1);
    setPicked(null);
  }

  if (!q && !done) return null;
  if (typeof document === "undefined") return null;

  const panel = (
    <>
      <div className="quiz-backdrop" onClick={onClose} />
      <div className="quiz-overlay" role="dialog" aria-modal="true" aria-labelledby="quiz-title">
        <div className="quiz-panel">
          <div className="quiz-panel-header">
            <div>
              <div className="quiz-panel-label">Quiz</div>
              <h2 id="quiz-title" className="quiz-panel-title">
                {title}
              </h2>
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
              <div className={`quiz-result${failed ? " is-rex" : ""}${perfect ? " is-win" : ""}`}>
                {failed && <QuizClip kind="fail" />}
                {perfect && <QuizClip kind="win" />}
                <div className="quiz-result-score">
                  {score}/{questions.length}
                </div>
                <p className="quiz-result-text">
                  {perfect
                    ? "Prikkfri. Du temmet T-rexen og kan dette delkapittelet."
                    : score >= questions.length * 0.7
                      ? "Sterkt. Gå gjennom de du bommet på, og ta quizen på nytt."
                      : failed
                        ? "Under 50 %. T-rexen tok hodet ditt. Les mer og ta quizen på nytt."
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
                        data-letter={letters[i]}
                        disabled={picked !== null}
                        onClick={() => choose(i)}
                      >
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

  return createPortal(panel, document.body);
}

export function QuizClip({ kind }: { kind: "fail" | "win" }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduce, setReduce] = useState(false);
  const [broken, setBroken] = useState(false);

  const src = kind === "win" ? "/videos/quiz-win.mp4" : "/videos/quiz-rex.mp4";
  const poster = kind === "win" ? "/videos/quiz-win.jpg" : "/videos/quiz-rex.jpg";
  const caption = kind === "win" ? "Prikkfri. Du rir T-rexen ut." : "Game over. T-rexen spiste deg.";
  const alt = kind === "win" ? "Elev rir en T-rex gjennom klasserommet" : "En T-rex i klasserommet";

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    if (mq.matches) return;
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => setBroken(true));
    };
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    tryPlay();
    v.addEventListener("canplay", tryPlay);
    v.addEventListener("loadeddata", tryPlay);
    return () => {
      v.removeEventListener("canplay", tryPlay);
      v.removeEventListener("loadeddata", tryPlay);
    };
  }, [src]);

  return (
    <figure className={`quiz-rex${kind === "win" ? " is-win" : ""}`}>
      {reduce || broken ? (
        <img src={poster} alt={alt} />
      ) : (
        <video
          ref={videoRef}
          key={src}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setBroken(true)}
        />
      )}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
