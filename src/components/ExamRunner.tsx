import { useEffect, useMemo, useState } from "react";
import { Clock, Flag, Lightbulb, ListOrdered } from "lucide-react";
import type { Exam, ExamTask, StudyMode } from "@/data/types";
import { KatexHtml } from "./KatexHtml";
import { ExamFigure } from "./figures";
import { ModeToggle } from "./ModeToggle";
import { fireCelebration, useProgressStore } from "@/lib/progress-store";

function formatTime(sec: number) {
  const m = Math.max(0, Math.floor(sec / 60));
  const s = Math.max(0, sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function TaskBlock({
  task,
  mode,
  submitted,
  score,
  onScore,
}: {
  task: ExamTask;
  mode: StudyMode;
  submitted: boolean;
  score?: "riktig" | "delvis" | "feil";
  onScore: (v: "riktig" | "delvis" | "feil") => void;
}) {
  const [hint, setHint] = useState(false);
  const [sol, setSol] = useState(false);
  const [step, setStep] = useState(0);
  const open = mode === "ove" || submitted;
  useEffect(() => {
    setHint(false);
    setSol(false);
    setStep(0);
  }, [task.id, mode, submitted]);

  return (
    <article className="task-card exam-task">
      <div className="task-card-header">
        <h3 className="task-title">
          Oppgave {task.nr} <span className="pts">{task.points} p</span>
        </h3>
        <div className="topic-chips">
          {task.topics.map((tp) => (
            <span key={tp} className="chip">
              {tp}
            </span>
          ))}
        </div>
      </div>
      <KatexHtml html={task.text} className="task-content" />
      <ExamFigure id={task.figure} />
      <div className="task-action-bar">
        {open && (
          <button type="button" className="hint-btn" onClick={() => setHint((v) => !v)}>
            <Lightbulb size={16} /> Hint
          </button>
        )}
        {open && (
          <button type="button" className="hint-btn fasit-btn" onClick={() => setSol((v) => !v)}>
            <ListOrdered size={16} /> Løsningsforslag
          </button>
        )}
      </div>
      {!open && <p className="locked-note">Løsningen vises etter innlevering i prøvemodus.</p>}
      {hint && open && <KatexHtml html={task.hint} className="hint-content visible" />}
      {sol && open && (
        <div className="solution-content visible">
          <KatexHtml html={task.fasitSteg[Math.min(step, task.fasitSteg.length - 1)] || ""} />
          <div className="steg-nav">
            <span>
              Steg {Math.min(step, task.fasitSteg.length - 1) + 1} av {task.fasitSteg.length}
            </span>
            {step < task.fasitSteg.length - 1 && (
              <button type="button" className="steg-next-btn" onClick={() => setStep((s) => s + 1)}>
                Neste steg
              </button>
            )}
          </div>
        </div>
      )}
      {submitted && (
        <div className="self-score">
          <span>Hvordan gikk det?</span>
          {(["riktig", "delvis", "feil"] as const).map((v) => (
            <button
              key={v}
              type="button"
              className={`score-btn ${v}${score === v ? " is-on" : ""}`}
              onClick={() => onScore(v)}
            >
              {v === "riktig" ? "Riktig" : v === "delvis" ? "Delvis" : "Feil"}
            </button>
          ))}
        </div>
      )}
    </article>
  );
}

export function ExamRunner({ exam }: { exam: Exam }) {
  const saveExam = useProgressStore((s) => s.saveExam);
  const prev = useProgressStore((s) => s.p.exams[exam.id]);
  const [mode, setMode] = useState<StudyMode>("prove");
  const [part, setPart] = useState<"1" | "2">("1");
  const [timerOn, setTimerOn] = useState(false);
  const [remain, setRemain] = useState(exam.del1Minutes * 60);
  const [submitted, setSubmitted] = useState(Boolean(prev));
  const [scores, setScores] = useState<Record<string, "riktig" | "delvis" | "feil">>(prev?.selfScore || {});

  const tasks = part === "1" ? exam.del1 : exam.del2;

  useEffect(() => {
    if (!timerOn || submitted) return;
    const id = window.setInterval(() => setRemain((r) => Math.max(0, r - 1)), 1000);
    return () => window.clearInterval(id);
  }, [timerOn, submitted]);

  const summary = useMemo(() => {
    const all = [...exam.del1, ...exam.del2];
    let riktig = 0,
      delvis = 0,
      feil = 0;
    all.forEach((t) => {
      if (scores[t.id] === "riktig") riktig += 1;
      else if (scores[t.id] === "delvis") delvis += 1;
      else if (scores[t.id] === "feil") feil += 1;
    });
    return { riktig, delvis, feil, total: all.length };
  }, [exam, scores]);

  function submit() {
    const newly = saveExam(exam.id, {
      submittedAt: Date.now(),
      selfScore: scores,
      notes: {},
      mode,
    });
    setSubmitted(true);
    fireCelebration({
      kind: "exam",
      title: `${exam.title} levert`,
      body: "Nå kan du åpne løsningsforslagene og vurdere deg selv oppgave for oppgave.",
      badges: newly,
    });
  }

  return (
    <div className="exam-runner">
      <div className="exam-toolbar">
        <ModeToggle mode={mode} onChange={setMode} />
        <div className="part-tabs">
          <button type="button" className={part === "1" ? "is-on" : ""} onClick={() => setPart("1")}>
            Del 1 <span className="tab-extra">· uten hjelpemidler</span>
          </button>
          <button type="button" className={part === "2" ? "is-on" : ""} onClick={() => setPart("2")}>
            Del 2 <span className="tab-extra">· med hjelpemidler</span>
          </button>
        </div>
        <label className="timer-toggle">
          <input
            type="checkbox"
            checked={timerOn}
            onChange={(e) => {
              setTimerOn(e.target.checked);
              setRemain(part === "1" ? exam.del1Minutes * 60 : (exam.totalMinutes - exam.del1Minutes) * 60);
            }}
          />
          <Clock size={14} /> Tidtaking
        </label>
        {timerOn && <span className={`timer-readout${remain < 60 ? " is-low" : ""}`}>{formatTime(remain)}</span>}
      </div>
      <p className="exam-mode-copy">
        {mode === "prove"
          ? "Prøvemodus: skriv på papir eller i hodet. Hint og løsning er låst til du leverer — slik det er på ekte eksamen."
          : "Øvemodus: hint og steg-løsning er tilgjengelig med en gang. Bruk denne når du øver tema for tema."}
      </p>
      {tasks.map((task) => (
        <TaskBlock
          key={task.id}
          task={task}
          mode={mode}
          submitted={submitted}
          score={scores[task.id]}
          onScore={(v) => setScores((s) => ({ ...s, [task.id]: v }))}
        />
      ))}
      <div className="exam-submit-row">
        {!submitted ? (
          <button type="button" className="btn-primary" onClick={submit}>
            <Flag size={16} /> Lever settet
          </button>
        ) : (
          <div className="exam-summary">
            Selvskåre: {summary.riktig} riktige · {summary.delvis} delvis · {summary.feil} feil av {summary.total} oppgaver i arkivet.
          </div>
        )}
      </div>
    </div>
  );
}
