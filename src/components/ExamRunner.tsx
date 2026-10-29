import { useEffect, useMemo, useState } from "react";
import { Clock, Flag, Lightbulb, ListOrdered } from "lucide-react";
import type { Exam, ExamPart, ExamTask, StudyMode } from "@/data/types";
import { KatexHtml } from "./KatexHtml";
import { ExamFigure } from "./figures";
import { ModeToggle } from "./ModeToggle";
import { ProveSvar, formatKlokke, useProveUtkast } from "./ProveFelt";
import { fireCelebration, useProgressStore } from "@/lib/progress-store";

/** Alle enhetene eleven krysser av som ferdige: oppgaven selv, eller hver deloppgave når den har deloppgaver. */
function enheter(task: ExamTask): string[] {
  return task.parts && task.parts.length ? task.parts.map((p) => p.id) : [task.id];
}

type Svar = {
  answers: Record<string, string>;
  ferdig: Record<string, boolean>;
  setAnswer: (id: string, v: string) => void;
  setFerdig: (id: string, v: boolean) => void;
};

/** Hint og trinnvis løsning. Samme markup for hel oppgave og for deloppgave. */
function HjelpBlokk({
  hint,
  steg,
  open,
  resetKey,
  lockedNote,
}: {
  hint: string;
  steg: string[];
  open: boolean;
  resetKey: string;
  lockedNote: boolean;
}) {
  const [hintOn, setHint] = useState(false);
  const [sol, setSol] = useState(false);
  const [step, setStep] = useState(0);
  useEffect(() => {
    setHint(false);
    setSol(false);
    setStep(0);
  }, [resetKey]);
  const last = Math.max(steg.length - 1, 0);
  return (
    <>
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
      {!open && lockedNote && <p className="locked-note">Løsningen vises etter innlevering i prøvemodus.</p>}
      {hintOn && open && <KatexHtml html={hint} className="hint-content visible" />}
      {sol && open && (
        <div className="solution-content visible">
          <KatexHtml html={steg[Math.min(step, last)] || ""} />
          <div className="steg-nav">
            <span>
              Steg {Math.min(step, last) + 1} av {steg.length}
            </span>
            {step < last && (
              <button type="button" className="steg-next-btn" onClick={() => setStep((s) => s + 1)}>
                Neste steg
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function DelOppgave({
  part,
  mode,
  submitted,
  svar,
}: {
  part: ExamPart;
  mode: StudyMode;
  submitted: boolean;
  svar: Svar;
}) {
  const open = mode === "ove" || submitted;
  const visSvar = mode === "prove";
  const gitt = svar.answers[part.id] || "";
  return (
    <div className="exam-part" id={`del-${part.id}`}>
      <div className="exam-part-head">
        <strong className="exam-part-label">{part.label})</strong>
        <KatexHtml html={part.text} className="task-content exam-part-text" />
      </div>
      {visSvar && !submitted && (
        <ProveSvar
          id={part.id}
          value={gitt}
          done={Boolean(svar.ferdig[part.id])}
          locked={false}
          onChange={(v) => svar.setAnswer(part.id, v)}
          onDone={(v) => svar.setFerdig(part.id, v)}
        />
      )}
      {visSvar && submitted && gitt && (
        <p className="prove-svar-levert">
          <strong>Ditt svar:</strong> {gitt}
        </p>
      )}
      <HjelpBlokk hint={part.hint} steg={part.fasitSteg} open={open} resetKey={`${part.id}|${mode}|${submitted}`} lockedNote />
    </div>
  );
}

function TaskBlock({
  task,
  mode,
  submitted,
  score,
  onScore,
  svar,
}: {
  task: ExamTask;
  mode: StudyMode;
  submitted: boolean;
  score?: "riktig" | "delvis" | "feil";
  onScore: (v: "riktig" | "delvis" | "feil") => void;
  svar: Svar;
}) {
  const open = mode === "ove" || submitted;
  const harDeler = Boolean(task.parts && task.parts.length);
  const visSvar = mode === "prove";
  const gitt = svar.answers[task.id] || "";

  return (
    <article className="task-card exam-task" id={`oppgave-${task.id}`}>
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
      {harDeler ? (
        task.parts!.map((pt) => <DelOppgave key={pt.id} part={pt} mode={mode} submitted={submitted} svar={svar} />)
      ) : (
        <>
          {visSvar && !submitted && (
            <ProveSvar
              id={task.id}
              value={gitt}
              done={Boolean(svar.ferdig[task.id])}
              locked={false}
              onChange={(v) => svar.setAnswer(task.id, v)}
              onDone={(v) => svar.setFerdig(task.id, v)}
            />
          )}
          {visSvar && submitted && gitt && (
            <p className="prove-svar-levert">
              <strong>Ditt svar:</strong> {gitt}
            </p>
          )}
          <HjelpBlokk hint={task.hint} steg={task.fasitSteg} open={open} resetKey={`${task.id}|${mode}|${submitted}`} lockedNote />
        </>
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
  const [elapsed, setElapsed] = useState(0);
  const [submitted, setSubmitted] = useState(Boolean(prev));
  const [scores, setScores] = useState<Record<string, "riktig" | "delvis" | "feil">>(prev?.selfScore || {});
  const utkast = useProveUtkast(`eksamen/${exam.id}`);

  const tasks = part === "1" ? exam.del1 : exam.del2;

  // Etter levering vises de lagrede svarene, ikke utkastet.
  const svar: Svar = useMemo(
    () =>
      submitted && prev
        ? { answers: prev.notes || {}, ferdig: {}, setAnswer: () => {}, setFerdig: () => {} }
        : { answers: utkast.answers, ferdig: utkast.ferdig, setAnswer: utkast.setAnswer, setFerdig: utkast.setFerdig },
    [submitted, prev, utkast.answers, utkast.ferdig, utkast.setAnswer, utkast.setFerdig],
  );

  useEffect(() => {
    if (!timerOn || submitted) return;
    const id = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => window.clearInterval(id);
  }, [timerOn, submitted]);

  const del1Left = exam.del1Minutes * 60 - elapsed;
  const totalLeft = exam.totalMinutes * 60 - elapsed;

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

  const enhetsId = useMemo(() => [...exam.del1, ...exam.del2].flatMap(enheter), [exam]);
  const antallFerdig = enhetsId.filter((id) => utkast.ferdig[id]).length;

  function submit() {
    const notes: Record<string, string> = {};
    enhetsId.forEach((id) => {
      const v = (utkast.answers[id] || "").trim();
      if (v) notes[id] = v;
    });
    const newly = saveExam(exam.id, {
      submittedAt: Date.now(),
      selfScore: scores,
      notes,
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
            Del 1 <span className="tab-extra">· <strong>Uten hjelpemidler</strong></span>
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
              setElapsed(0);
            }}
          />
          <Clock size={14} /> Tidtaking
        </label>
        {timerOn && (
          <span className="timer-group" aria-live="off">
            <span className={`timer-readout${del1Left < 60 ? " is-low" : ""}`} title={`Del 1 skal leveres etter ${exam.del1Minutes} minutter`}>
              Del 1: {del1Left > 0 ? formatKlokke(del1Left) : "tiden er ute"}
            </span>
            <span className={`timer-readout${totalLeft < 60 ? " is-low" : ""}`} title={`Hele eksamen varer ${exam.totalMinutes} minutter`}>
              Totalt: {totalLeft > 0 ? formatKlokke(totalLeft) : "tiden er ute"}
            </span>
          </span>
        )}
      </div>
      <p className="exam-mode-copy">
        {mode === "prove"
          ? "Prøvemodus: skriv svaret ditt her eller på papir, og kryss av «Ferdig» for hver oppgave. Hint og løsning er låst til du leverer, slik det er på ekte eksamen."
          : "Øvemodus: hint og steg-løsning er tilgjengelig med en gang. Bruk denne når du øver tema for tema."}
      </p>
      {mode === "prove" && !submitted && (
        <p className="prove-teller" role="status">
          {antallFerdig} av {enhetsId.length} oppgaver og deloppgaver krysset av som ferdige.
        </p>
      )}
      {tasks.map((task) => (
        <TaskBlock
          key={task.id}
          task={task}
          mode={mode}
          submitted={submitted}
          score={scores[task.id]}
          onScore={(v) => setScores((s) => ({ ...s, [task.id]: v }))}
          svar={svar}
        />
      ))}
      <div className="exam-submit-row">
        {!submitted ? (
          <button type="button" className="btn-primary" onClick={submit}>
            <Flag size={16} /> {mode === "prove" ? "Lever / Ferdig" : "Lever settet"}
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
