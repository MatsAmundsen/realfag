import { useEffect, useMemo, useState } from "react";
import { Check, Lightbulb, ListOrdered } from "lucide-react";
import type { Oppgave, StudyMode } from "@/data/types";
import { KatexHtml } from "./KatexHtml";
import { FunctionPlot } from "./FunctionPlot";
import { useProgressStore } from "@/lib/progress-store";
import { countChapter, countSubchapter, isOvingDelkap, taskKey } from "@/lib/progress";
import { fagsok } from "@/data/content";
import { fireCelebration } from "@/lib/progress-store";
import { extractPlots } from "@/lib/plot-fn";

export function TaskCard({
  oppgave,
  kapId,
  subId,
  index,
  total,
  mode = "ove",
  locked = false,
  reveal = false,
}: {
  oppgave: Oppgave;
  kapId: string | null;
  subId: string | null;
  index: number;
  total: number;
  mode?: StudyMode;
  locked?: boolean;
  reveal?: boolean;
}) {
  const p = useProgressStore((s) => s.p);
  const markTask = useProgressStore((s) => s.markTask);
  const key = taskKey(kapId, subId, oppgave.id);
  const done = Boolean(p.tasks[key]);
  const [hintOn, setHintOn] = useState(false);
  const [solOn, setSolOn] = useState(false);
  const [step, setStep] = useState(0);

  const canHelp = mode === "ove" || reveal || !locked;
  const steps = (oppgave.fasitSteg || []).filter(Boolean);
  const fasitHtml = oppgave.fasit;
  const plot = useMemo(
    () => (kapId === "kap4" || kapId === "kap5" ? extractPlots(oppgave.tekst) : null),
    [kapId, oppgave.tekst],
  );

  useEffect(() => {
    setHintOn(false);
    setSolOn(false);
    setStep(0);
  }, [oppgave.id, mode, reveal]);

  function toggleDone() {
    const newly = markTask(kapId, subId, oppgave.id, !done);
    if (done) return;
    if (!kapId || !subId) return;
    const kap = fagsok.find((k) => k.id === kapId);
    const dk = kap?.delkapitler.find((d) => d.id === subId);
    if (!kap || !dk) return;
    const sub = countSubchapter(kap, dk, useProgressStore.getState().p);
    const ch = countChapter(kap, useProgressStore.getState().p);
    if (isOvingDelkap(dk) && sub.done === sub.total) {
      fireCelebration({
        kind: "prove",
        title: "Øveprøve gjennomgått",
        body: `Du har merket alle oppgavene i ${kap.tittel.replace("Kapittel ", "kapittel ")} sin øveprøve.`,
        badges: newly,
      });
    } else if (ch.done === ch.total) {
      fireCelebration({
        kind: "kap",
        title: `${kap.tittel} ferdig`,
        body: "Hele kapittelet er merket. Ta gjerne øveprøven eller et eksamenssett.",
        badges: newly,
      });
    } else if (sub.done === sub.total) {
      fireCelebration({
        kind: "sub",
        title: "Delkapittel ferdig",
        body: `${dk.tittel} er komplett. Quizzen venter hvis du vil teste deg.`,
        badges: newly,
      });
    }
  }

  const level = index < total / 3 ? 1 : index < (2 * total) / 3 ? 2 : 3;

  return (
    <article id={`oppgave-${oppgave.id}`} className={`task-card lvl-${level}${done ? " task-done" : ""}`}>
      <div className="task-card-header">
        <h3 className="task-title">{oppgave.tittel}</h3>
        <div className="task-header-right">
          {done && <span className="task-done-pill">Ferdig</span>}
          {oppgave.tittel.startsWith("Ekstraøving") && <span className="task-badge ekstra">Ekstra</span>}
          <span className={`task-badge lvl-${level}`}>
            {level === 1 ? "Grunnleggende" : level === 2 ? "Øving" : "Utfordring"}
          </span>
        </div>
      </div>
      <div className={plot ? "task-body has-graph" : "task-body"}>
        <KatexHtml html={oppgave.tekst} className="task-content" />
        {plot && <FunctionPlot spec={plot} />}
      </div>
      {oppgave.bilde && (
        <img src={oppgave.bilde} alt="" className="task-image" />
      )}
      <div className="task-action-bar">
        {canHelp && oppgave.hint && (
          <button type="button" className="hint-btn" onClick={() => setHintOn((v) => !v)}>
            <Lightbulb size={16} /> {hintOn ? "Skjul hint" : "Hint"}
          </button>
        )}
        {canHelp && (steps.length > 0 || fasitHtml) && (
          <button
            type="button"
            className="hint-btn fasit-btn"
            onClick={() => {
              setSolOn((v) => !v);
              setStep(0);
            }}
          >
            <ListOrdered size={16} /> {solOn ? "Skjul løsning" : "Løsningsforslag"}
          </button>
        )}
        <button
          type="button"
          className={`hint-btn${done ? " fasit-btn" : ""}`}
          onClick={toggleDone}
        >
          <Check size={16} /> {done ? "Merk som uferdig" : "Merk som ferdig"}
        </button>
      </div>
      {!canHelp && (
        <p className="locked-note">Hint og løsning vises når du leverer i prøvemodus.</p>
      )}
      {hintOn && canHelp && (
        <KatexHtml html={oppgave.hint} className="hint-content visible" />
      )}
      {solOn && canHelp && (
        <div className="solution-content visible">
          {steps.length > 0 ? (
            <>
              <KatexHtml html={steps[Math.min(step, steps.length - 1)] || ""} />
              <div className="steg-nav">
                <span>
                  Steg {Math.min(step, steps.length - 1) + 1} av {steps.length}
                </span>
                {step < steps.length - 1 && (
                  <button type="button" className="steg-next-btn" onClick={() => setStep((s) => s + 1)}>
                    Neste steg
                  </button>
                )}
              </div>
            </>
          ) : (
            <KatexHtml html={fasitHtml || ""} />
          )}
        </div>
      )}
    </article>
  );
}
