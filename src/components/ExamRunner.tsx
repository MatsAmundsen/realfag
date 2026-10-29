import { useEffect, useMemo, useRef, useState } from "react";
import { Clock, Flag, Lightbulb, ListOrdered } from "lucide-react";
import type { Exam, ExamPart, ExamTask, StudyMode } from "@/data/types";
import { KatexHtml } from "./KatexHtml";
import { ExamFigure } from "./figures";
import { ModeToggle } from "./ModeToggle";
import { PoengOppsummering, ProveResultat, ProveSvar } from "./ProveFelt";
import { SLUTTSVAR } from "@/data/eksamen-svar";
import { beregnPoeng, poengPerEnhet, type PoengEnhet, type Resultat, type Vurdering } from "@/lib/prove-poeng";
import { formatKlokke, useProveUtkast } from "@/lib/prove-utkast";
import { useDialogFelle, useFokusEtterVisning } from "@/lib/fokus";
import { SkjulTilHydrert, useAvslor } from "./SkjulTilHydrert";
import { fireCelebration, useProgressStore } from "@/lib/progress-store";

/** Alle enhetene eleven krysser av som ferdige: oppgaven selv, eller hver deloppgave når den har deloppgaver. */
function enheter(task: ExamTask): string[] {
  return task.parts && task.parts.length ? task.parts.map((p) => p.id) : [task.id];
}

/** Sluttsvaret ligger i utkastet under egen nøkkel, ved siden av svarboksen. */
const SLUTTSVAR_NOKKEL = (id: string) => `${id}::sluttsvar`;

type Svar = {
  answers: Record<string, string>;
  ferdig: Record<string, boolean>;
  setAnswer: (id: string, v: string) => void;
  setFerdig: (id: string, v: boolean) => void;
  /** Svarflaten skjules (plassen beholdt) til lagret fremgang er lest. */
  skjult?: boolean;
  /** Poeng og vurdering etter levering i prøvemodus. Mangler for øvemodus og for eldre forsøk. */
  poeng?: {
    res: Resultat;
    vurdering: Record<string, Vurdering>;
    onVurder: (id: string, v: Vurdering) => void;
  };
};

/** Enhetene som gir poeng: hver del, eller oppgaven når den ikke har deler. Mangler poeng, teller hver oppgave 1 p. */
function poengEnheter(exam: Exam): PoengEnhet[] {
  return [...exam.del1, ...exam.del2].flatMap((t) => {
    const ider = enheter(t);
    return ider.map((id) => ({ id, maks: poengPerEnhet(t.points, ider.length), fasit: SLUTTSVAR[id] }));
  });
}

/** Sluttsvarfelt (prøvemodus, før levering) og resultat (etter levering) for én enhet. */
function sluttsvarFor(svar: Svar, id: string) {
  const fasit = SLUTTSVAR[id];
  if (!fasit) return undefined;
  return {
    fasit,
    value: svar.answers[SLUTTSVAR_NOKKEL(id)] || "",
    onChange: (v: string) => svar.setAnswer(SLUTTSVAR_NOKKEL(id), v),
  };
}

function ResultatFor({ svar, id }: { svar: Svar; id: string }) {
  const res = svar.poeng?.res.deler[id];
  if (!svar.poeng || !res) return null;
  return (
    <ProveResultat
      id={id}
      gitt={svar.answers[SLUTTSVAR_NOKKEL(id)] || ""}
      fasit={SLUTTSVAR[id]}
      res={res}
      vurdering={svar.poeng.vurdering[id]}
      onVurder={(v) => svar.poeng!.onVurder(id, v)}
    />
  );
}

/** Hint og trinnvis løsning. Samme markup for hel oppgave og for deloppgave. */
function HjelpBlokk({
  hint,
  steg,
  open,
  resetKey,
  lockedNote,
  visHint = true,
}: {
  hint: string;
  steg: string[];
  open: boolean;
  resetKey: string;
  lockedNote: boolean;
  /** Skjules helt i prøvemodus: ingen hint verken før eller etter levering. Løsning/fasit styres av `open`. */
  visHint?: boolean;
}) {
  const [hintOn, setHint] = useState(false);
  const [sol, setSol] = useState(false);
  const [step, setStep] = useState(0);
  const solRef = useRef<HTMLDivElement>(null);
  const fokus = useFokusEtterVisning();
  useEffect(() => {
    setHint(false);
    setSol(false);
    setStep(0);
  }, [resetKey]);
  const last = Math.max(steg.length - 1, 0);
  return (
    <>
      <div className="task-action-bar">
        {open && visHint && (
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
      {hintOn && open && visHint && <KatexHtml html={hint} className="hint-content visible" />}
      {sol && open && (
        <div className="solution-content visible" ref={solRef} tabIndex={-1}>
          <KatexHtml html={steg[Math.min(step, last)] || ""} />
          <div className="steg-nav">
            <span>
              Steg {Math.min(step, last) + 1} av {steg.length}
            </span>
            {step < last && (
              <button type="button" className="steg-next-btn" 
                onClick={() => {
                  setStep((s) => s + 1);
                  // Siste steg fjerner knappen: flytt fokus til løsningen i stedet for å miste det til body.
                  if (step + 1 >= last) fokus(() => solRef.current);
                }}
              >
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
          sluttsvar={sluttsvarFor(svar, part.id)}
          skjult={svar.skjult}
        />
      )}
      {visSvar && submitted && gitt && (
        <p className="prove-svar-levert">
          <strong>Ditt svar:</strong> {gitt}
        </p>
      )}
      {submitted && <ResultatFor svar={svar} id={part.id} />}
      <HjelpBlokk hint={part.hint} steg={part.fasitSteg} open={open} resetKey={`${part.id}|${mode}|${submitted}`} lockedNote visHint={mode !== "prove"} />
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
        <h3 className="task-title" tabIndex={-1}>
          Oppgave {task.nr}{task.points > 0 && <span className="pts"> {task.points} p</span>}
        </h3>
        <div className="topic-chips">
          {task.topics.map((tp) => (
            <span key={tp} className="chip">
              {tp}
            </span>
          ))}
        </div>
      </div>
      {task.text ? <KatexHtml html={task.text} className="task-content" /> : null}
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
              sluttsvar={sluttsvarFor(svar, task.id)}
              skjult={svar.skjult}
            />
          )}
          {visSvar && submitted && gitt && (
            <p className="prove-svar-levert">
              <strong>Ditt svar:</strong> {gitt}
            </p>
          )}
          {submitted && <ResultatFor svar={svar} id={task.id} />}
          <HjelpBlokk hint={task.hint} steg={task.fasitSteg} open={open} resetKey={`${task.id}|${mode}|${submitted}`} lockedNote visHint={mode !== "prove"} />
        </>
      )}
      {submitted && !svar.poeng && (
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
  const clearExam = useProgressStore((s) => s.clearExam);
  const updateExam = useProgressStore((s) => s.updateExam);
  const prev = useProgressStore((s) => s.p.exams[exam.id]);
  const [mode, setMode] = useState<StudyMode>("prove");
  const [part, setPart] = useState<"1" | "2">("1");
  const [timerOn, setTimerOn] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [scores, setScores] = useState<Record<string, "riktig" | "delvis" | "feil">>(prev?.selfScore || {});
  const [bekreft, setBekreft] = useState<null | "lever" | "pånytt">(null);
  const hydrated = useProgressStore((s) => s.hydrated);
  /** Lagret fremgang lastes først etter første visning. Før det er svarflaten, Lever-knappen og telleren skjult (plassen beholdt); har eleven lagret fremgang, skjules hele omslaget til da (se SkjulTilHydrert). */
  const submitted = hydrated && Boolean(prev);
  const utkast = useProveUtkast(`eksamen/${exam.id}`);
  const omslag = useRef<HTMLDivElement>(null);
  useAvslor(omslag, hydrated && utkast.ready);
  const fokus = useFokusEtterVisning();
  const leverKnapp = useRef<HTMLButtonElement>(null);
  const leverDialog = useRef<HTMLDivElement>(null);
  const pånyttKnapp = useRef<HTMLButtonElement>(null);
  const pånyttDialog = useRef<HTMLDivElement>(null);

  function avbrytLever() {
    setBekreft(null);
    fokus(() => leverKnapp.current);
  }
  function avbrytPånytt() {
    setBekreft(null);
    fokus(() => pånyttKnapp.current);
  }
  useDialogFelle(leverDialog, bekreft === "lever", avbrytLever);
  useDialogFelle(pånyttDialog, bekreft === "pånytt", avbrytPånytt);

  // Når lagret fremgang er lest, hent inn selvvurderingen fra et levert forsøk (justeres under rendring, før første maling).
  const [synket, setSynket] = useState(hydrated);
  if (hydrated && !synket) {
    setSynket(true);
    if (prev) setScores(prev.selfScore || {});
  }

  const tasks = part === "1" ? exam.del1 : exam.del2;

  // Rullbare formler/tabeller må kunne nås med tastatur (WCAG 2.1.1).
  const runnerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const merk = () => {
      runnerRef.current?.querySelectorAll<HTMLElement>(".katex-display, .task-content").forEach((el) => {
        if (el.scrollWidth > el.clientWidth + 1) el.tabIndex = 0;
        else el.removeAttribute("tabindex");
      });
    };
    const id = window.requestAnimationFrame(merk);
    window.addEventListener("resize", merk);
    return () => {
      window.cancelAnimationFrame(id);
      window.removeEventListener("resize", merk);
    };
  });

  const enheterMedPoeng = useMemo(() => poengEnheter(exam), [exam]);
  const poengForsok = submitted && prev && prev.mode === "prove" ? prev.poeng : undefined;

  function vurder(id: string, v: Vurdering) {
    if (!prev || !poengForsok) return;
    const vurdering = { ...(prev.vurdering || {}), [id]: v };
    updateExam(exam.id, {
      vurdering,
      poeng: beregnPoeng(enheterMedPoeng, prev.sluttsvar || {}, vurdering),
    });
  }

  // Etter levering vises de lagrede svarene, ikke utkastet.
  const svar: Svar = useMemo(() => {
    if (submitted && prev) {
      const answers: Record<string, string> = { ...(prev.notes || {}) };
      Object.entries(prev.sluttsvar || {}).forEach(([id, v]) => {
        answers[SLUTTSVAR_NOKKEL(id)] = v;
      });
      return {
        answers,
        ferdig: {},
        setAnswer: () => {},
        setFerdig: () => {},
        poeng: poengForsok
          ? { res: poengForsok, vurdering: prev.vurdering || {}, onVurder: vurder }
          : undefined,
      };
    }
    return { answers: utkast.answers, ferdig: utkast.ferdig, setAnswer: utkast.setAnswer, setFerdig: utkast.setFerdig, skjult: !hydrated };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted, prev, poengForsok, hydrated, utkast.answers, utkast.ferdig, utkast.setAnswer, utkast.setFerdig]);

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
    const sluttsvar: Record<string, string> = {};
    if (mode === "prove") {
      enhetsId.forEach((id) => {
        const v = (utkast.answers[SLUTTSVAR_NOKKEL(id)] || "").trim();
        if (v) sluttsvar[id] = v;
      });
    }
    const newly = saveExam(exam.id, {
      submittedAt: Date.now(),
      selfScore: scores,
      notes,
      mode,
      ...(mode === "prove"
        ? { sluttsvar, vurdering: {}, poeng: beregnPoeng(enheterMedPoeng, sluttsvar, {}) }
        : {}),
    });
    utkast.clear();
    setBekreft(null);
    // Fokus flyttes av feiringen (CelebrationHost). Når den lukkes, går fokus til oppsummeringen under.
    fireCelebration({
      kind: "exam",
      title: `${exam.title} levert`,
      body:
        mode === "prove"
          ? "Nå kan du åpne løsningsforslagene og vurdere deg selv oppgave for oppgave."
          : "Vurder deg selv oppgave for oppgave. Du kan ta settet på nytt når du vil.",
      badges: newly,
    });
  }

  /** Nullstiller forsøket (levering, selvvurdering og utkast) slik at settet kan tas på nytt. */
  function taPåNytt() {
    clearExam(exam.id);
    utkast.clear();
    setScores({});
    setElapsed(0);
    setTimerOn(false);
    setPart("1");
    setBekreft(null);
    // Knappen forsvinner: start på nytt øverst, ved første oppgave.
    fokus(() => runnerRef.current?.querySelector<HTMLElement>(".task-title"));
  }

  return (
    <div className="exam-runner" ref={runnerRef}>
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
            <span role="timer" className={`timer-readout${del1Left < 60 ? " is-low" : ""}`} title={`Del 1 skal leveres etter ${exam.del1Minutes} minutter`}>
              Del 1: {del1Left > 0 ? formatKlokke(del1Left) : "tiden er ute"}
            </span>{" "}
            <span role="timer" className={`timer-readout${totalLeft < 60 ? " is-low" : ""}`} title={`Hele eksamen varer ${exam.totalMinutes} minutter`}>
              Totalt: {totalLeft > 0 ? formatKlokke(totalLeft) : "tiden er ute"}
            </span>
          </span>
        )}
        {timerOn && (
          <span className="timer-sr" role="status">
            {submitted ? "" : totalLeft <= 0 ? "Tiden er ute." : totalLeft < 60 ? "Under ett minutt igjen totalt." : del1Left <= 0 ? "Tiden for del 1 er ute." : del1Left < 60 ? "Under ett minutt igjen av del 1." : ""}
          </span>
        )}
      </div>
      <p className="exam-mode-copy">
        {mode === "prove"
          ? "Prøvemodus: skriv svaret ditt her eller på papir, og kryss av «Ferdig» for hver oppgave. Løsningen er låst til du leverer."
          : "Øvemodus: hint og steg-løsning er tilgjengelig med en gang. Bruk denne når du øver tema for tema."}
      </p>
      <div ref={omslag} style={{ display: "contents" }}>
        <SkjulTilHydrert forsokNokkel={exam.id} utkastNokkel={`mg-prove-utkast:eksamen/${exam.id}`} />
        {mode === "prove" && !submitted && (
          <p className="prove-teller" role="status" style={hydrated ? undefined : { visibility: "hidden" }}>
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
          {!submitted && bekreft !== "lever" && (
            <button
              type="button"
              className="btn-primary"
              ref={leverKnapp}
              style={hydrated ? undefined : { visibility: "hidden" }}
              onClick={() => {
                setBekreft("lever");
                fokus(() => leverDialog.current);
              }}
            >
              <Flag size={16} /> {mode === "prove" ? "Lever / Ferdig" : "Lever settet"}
            </button>
          )}
          {!submitted && bekreft === "lever" && (
            <div className="exam-summary" role="alertdialog" aria-modal="true" aria-labelledby="bekreft-lever-tittel" ref={leverDialog} tabIndex={-1}>
              <p id="bekreft-lever-tittel">
                <strong>Har du gjort ferdig begge delene?</strong> {antallFerdig} av {enhetsId.length} oppgaver og deloppgaver er krysset av som ferdige.
                {mode === "prove" ? " Når du leverer, åpnes løsningsforslaget." : ""}
              </p>
              <button type="button" className="btn-primary" onClick={submit}>
                <Flag size={16} /> Ja, lever
              </button>{" "}
              <button
                type="button"
                className="hint-btn"
                onClick={avbrytLever}
              >
                Fortsett å jobbe
              </button>
            </div>
          )}
          {submitted && (
            <div className="exam-summary" tabIndex={-1} data-fokus-etter-feiring="">
              {poengForsok ? (
                <>
                  <PoengOppsummering res={poengForsok} />
                  <p>Vurder deg selv under hver oppgave. Poengene og prosenten oppdateres underveis.</p>
                </>
              ) : (
                <p>
                  Selvvurdering: {summary.riktig} riktige · {summary.delvis} delvis · {summary.feil} feil av {summary.total} oppgaver.
                </p>
              )}
              {bekreft !== "pånytt" ? (
                <button
                  type="button"
                  className="hint-btn"
                  ref={pånyttKnapp}
                  onClick={() => {
                    setBekreft("pånytt");
                    fokus(() => pånyttDialog.current);
                  }}
                >
                  Ta settet på nytt
                </button>
              ) : (
                <div role="alertdialog" aria-modal="true" aria-labelledby="bekreft-pånytt-tittel" ref={pånyttDialog} tabIndex={-1}>
                  <p id="bekreft-pånytt-tittel">
                    <strong>Ta settet på nytt?</strong> Det leverte forsøket, svarene dine, poengene og selvvurderingen slettes.
                  </p>
                  <button type="button" className="btn-primary" onClick={taPåNytt}>
                    Ja, ta på nytt
                  </button>{" "}
                  <button
                    type="button"
                    className="hint-btn"
                    onClick={avbrytPånytt}
                  >
                    Avbryt
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
