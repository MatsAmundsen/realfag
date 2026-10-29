import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { CircleHelp, Clock, Flag } from "lucide-react";
import { CHAPTER_META, fagsok, findKap, findSub, videosForSub } from "@/data/content";
import type { StudyMode } from "@/data/types";
import { ChapterSidebar } from "@/components/ChapterSidebar";
import { TopicVideoInvite } from "@/components/TopicVideoInvite";
import { TaskCard } from "@/components/TaskCard";
import { SummaryView } from "@/components/SummaryView";
import { QuizOverlay } from "@/components/QuizOverlay";
import { ModeToggle } from "@/components/ModeToggle";
import { ProveSvar } from "@/components/ProveFelt";
import { PrereqMini } from "@/components/PrereqMini";
import { PREREQS } from "@/data/mindmap";
import { formatKlokke, useProveUtkast } from "@/lib/prove-utkast";
import { useFokusEtterVisning } from "@/lib/fokus";
import { countSubchapter, isOvingDelkap } from "@/lib/progress";
import { fireCelebration, useProgressStore } from "@/lib/progress-store";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/oppgaver/$kapId/$subId")({
  // 3H Ulikheter er flyttet til 5F–5H
  beforeLoad: ({ params }) => {
    if (params.kapId === "kap3" && params.subId.toUpperCase() === "3H") {
      throw redirect({ to: "/oppgaver/$kapId/$subId", params: { kapId: "kap5", subId: "5F" }, replace: true });
    }
  },
  head: ({ params }) => {
    const kap = findKap(params.kapId);
    const dk = findSub(params.kapId, params.subId);
    const kapNavn = CHAPTER_META[params.kapId]?.short ?? kap?.tittel ?? "Matematikk 1T";
    const navn = dk?.tittel ?? params.subId;
    return seoHead(
      `/oppgaver/${params.kapId}/${params.subId}`,
      `${navn} – ${kapNavn} | Oppgaver 1T`,
      `Oppgaver med hint og løsning i ${navn} (${kapNavn}), matematikk 1T. Øv, ta quiz og følg fremgangen din.`,
    );
  },
  component: SubchapterPage,
});

function SubchapterPage() {
  const { kapId, subId } = Route.useParams();
  const kap = findKap(kapId);
  const dk = findSub(kapId, subId);
  const p = useProgressStore((s) => s.p);
  const [quizOn, setQuizOn] = useState(false);
  const [mode, setMode] = useState<StudyMode>("prove");
  const [bekreft, setBekreft] = useState<null | "lever" | "pånytt">(null);
  const [timerOn, setTimerOn] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  /** Levering av en øveprøve lagres som et forsøk under egen nøkkel (ove/3OP), slik at den overlever omlasting. */
  const proveKey = `ove/${subId}`;
  const prev = useProgressStore((s) => s.p.exams[proveKey]);
  const saveExam = useProgressStore((s) => s.saveExam);
  const clearExam = useProgressStore((s) => s.clearExam);
  const submitted = Boolean(prev);
  const utkast = useProveUtkast(proveKey);
  const fokus = useFokusEtterVisning();
  const leverKnapp = useRef<HTMLButtonElement>(null);
  const leverDialog = useRef<HTMLDivElement>(null);
  const pånyttKnapp = useRef<HTMLButtonElement>(null);
  const pånyttDialog = useRef<HTMLDivElement>(null);
  const sammendrag = useRef<HTMLDivElement>(null);
  const førsteOppgave = useRef<HTMLDivElement>(null);
  const hasPrereq = Boolean(PREREQS[subId]);

  useEffect(() => {
    if (!timerOn || submitted) return;
    const id = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => window.clearInterval(id);
  }, [timerOn, submitted]);

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : "";
    if (!hash) return;
    const t = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(t);
  }, [kapId, subId]);

  const oving = dk ? isOvingDelkap(dk) : false;
  const topicVideos = !oving ? videosForSub(subId) : [];
  const sub = kap && dk ? countSubchapter(kap, dk, p) : { done: 0, total: 0, pct: 0 };

  const quizKey = `${kapId}/${subId}`;
  const quizBest = p.quizzes[quizKey];

  const nav = useMemo(() => {
    const ki = fagsok.findIndex((k) => k.id === kapId);
    const prevKap = ki > 0 ? fagsok[ki - 1] : null;
    const nextKap = ki >= 0 && ki < fagsok.length - 1 ? fagsok[ki + 1] : null;
    if (!kap) {
      return { prev: null as { kapId: string; subId: string; label: string } | null, next: null as { kapId: string; subId: string; label: string } | null };
    }
    const i = kap.delkapitler.findIndex((d) => d.id === subId);
    const prevSub = i > 0 ? kap.delkapitler[i - 1] : null;
    const nextSub = i >= 0 && i < kap.delkapitler.length - 1 ? kap.delkapitler[i + 1] : null;
    const prev = prevSub
      ? { kapId, subId: prevSub.id, label: "Forrige delkapittel" }
      : prevKap?.delkapitler.length
        ? { kapId: prevKap.id, subId: prevKap.delkapitler[prevKap.delkapitler.length - 1]!.id, label: `Forrige: ${CHAPTER_META[prevKap.id]?.short || prevKap.tittel}` }
        : null;
    const next = nextSub
      ? { kapId, subId: nextSub.id, label: "Neste delkapittel" }
      : nextKap?.delkapitler[0]
        ? { kapId: nextKap.id, subId: nextKap.delkapitler[0].id, label: `Neste: ${CHAPTER_META[nextKap.id]?.short || nextKap.tittel}` }
        : null;
    return { prev, next };
  }, [kap, kapId, subId]);

  if (!kap || !dk) {
    return (
      <section className="view-section">
        <p>Fant ikke delkapittelet.</p>
      </section>
    );
  }

  const isSummary = dk.id.endsWith("SM") && dk.oppgaver.every((o) => /\.S\d+$/.test(o.id));
  const effectiveMode: StudyMode = oving ? mode : "ove";
  const locked = oving && mode === "prove" && !submitted;
  /** Introduksjonskortet (3.OP0 osv.) er ikke en oppgave: ingen svarfelt, ingen «Ferdig» og ikke med i tellingen. */
  const erIntro = (o: { id: string }) => /\.OP0$/.test(o.id);
  const proveOppgaver = dk.oppgaver.filter((o) => !erIntro(o));
  const antallFerdig = proveOppgaver.filter((o) => utkast.ferdig[o.id]).length;

  function lever() {
    const notes: Record<string, string> = {};
    proveOppgaver.forEach((o) => {
      const v = (utkast.answers[o.id] || "").trim();
      if (v) notes[o.id] = v;
    });
    const newly = saveExam(proveKey, { submittedAt: Date.now(), selfScore: {}, notes, mode: "prove" });
    utkast.clear();
    setBekreft(null);
    fireCelebration({
      kind: "exam",
      title: `${kap!.tittel} · øveprøven er levert`,
      body: "Nå kan du åpne hint og løsningsforslag og merke oppgavene du fikk til.",
      badges: newly,
    });
  }

  /** Nullstiller levering, svar og avkrysninger slik at øveprøven kan tas på nytt. */
  function taPåNytt() {
    clearExam(proveKey);
    utkast.clear();
    setElapsed(0);
    setTimerOn(false);
    setBekreft(null);
    // Knappen forsvinner: start på nytt øverst, ved første oppgave.
    fokus(() => førsteOppgave.current?.querySelector<HTMLElement>(".task-title"));
  }

  return (
    <section className="view-section">
      <ChapterSidebar kapId={kapId} subId={subId} />
      <div className="content-area">
        <div className="kap-switch">
          {fagsok.map((k, i) => {
            const first = k.delkapitler[0];
            if (!first) return null;
            return (
              <Link
                key={k.id}
                to="/oppgaver/$kapId/$subId"
                params={{ kapId: k.id, subId: first.id }}
                className={k.id === kapId ? "is-on" : ""}
              >
                Kap. {i + 1}
              </Link>
            );
          })}
        </div>
        <div className="sub-progress-strip">
          <div>
            <p className="crumb">
              {kap.tittel} · {oving ? "Øveprøve" : dk.tittel}
            </p>
            <div className="sub-progress-copy">
              {sub.done} av {sub.total} merket ferdig
            </div>
          </div>
          <div className="progress-track lg" style={{ minWidth: 160 }}>
            <div className={`progress-fill${sub.pct === 100 ? " is-complete" : ""}`} style={{ width: `${sub.pct}%` }} />
          </div>
        </div>

        {oving && (
          <div className="ove-banner">
            <div>
              <h2>Øveprøve</h2>
              <p>
                {mode === "prove"
                  ? "Prøvemodus er på. Ingen hint eller løsning før du leverer — slik det er på en kapittelprøve."
                  : "Øvemodus er på. Du kan åpne hint og steg-løsning underveis."}
              </p>
            </div>
            <ModeToggle mode={mode} onChange={(m) => { setMode(m); setBekreft(null); }} />
          </div>
        )}

        {oving && mode === "prove" && (
          <div className="exam-toolbar prove-verktoy">
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
            {timerOn && <span role="timer" className="timer-readout">Brukt tid: {formatKlokke(elapsed)}</span>}
            {!submitted && (
              <span className="prove-teller" role="status">
                {antallFerdig} av {proveOppgaver.length} krysset av som ferdige.
              </span>
            )}
          </div>
        )}

        {topicVideos.length > 0 ? <TopicVideoInvite videos={topicVideos} /> : null}

        {hasPrereq && !oving && (
          <details className="prereq-details">
            <summary>Hva må jeg kunne?</summary>
            <PrereqMini subId={subId} />
          </details>
        )}

        {isSummary ? <SummaryView items={dk.oppgaver} kapId={kapId} subId={subId} /> : dk.oppgaver.map((o, i) => (
          <div key={o.id} className="prove-oppgave" ref={i === 0 ? førsteOppgave : undefined}>
            <TaskCard
              oppgave={o}
              kapId={kapId}
              subId={subId}
              index={i}
              total={dk.oppgaver.length}
              mode={effectiveMode}
              locked={locked}
              reveal={submitted}
              hideTierBadge={oving}
            />
            {oving && mode === "prove" && !erIntro(o) && !submitted && (
              <ProveSvar
                id={o.id}
                value={utkast.answers[o.id] || ""}
                done={Boolean(utkast.ferdig[o.id])}
                locked={false}
                onChange={(v) => utkast.setAnswer(o.id, v)}
                onDone={(v) => utkast.setFerdig(o.id, v)}
              />
            )}
            {oving && mode === "prove" && !erIntro(o) && submitted && prev?.notes[o.id] && (
              <p className="prove-svar-levert">
                <strong>Ditt svar:</strong> {prev.notes[o.id]}
              </p>
            )}
          </div>
        ))}

        {oving && !submitted && mode === "prove" && bekreft !== "lever" && (
          <button
            type="button"
            className="btn-primary prove-lever"
            ref={leverKnapp}
            onClick={() => {
              setBekreft("lever");
              fokus(() => leverDialog.current);
            }}
          >
            <Flag size={16} /> Lever / Ferdig
          </button>
        )}
        {oving && !submitted && mode === "prove" && bekreft === "lever" && (
          <div className="exam-summary" role="alertdialog" aria-labelledby="bekreft-ovep-lever" ref={leverDialog} tabIndex={-1}>
            <p id="bekreft-ovep-lever">
              <strong>Er du ferdig med øveprøven?</strong> {antallFerdig} av {proveOppgaver.length} oppgaver er krysset av som ferdige. Når du leverer, åpnes hint og løsningsforslag.
            </p>
            <button type="button" className="btn-primary" onClick={lever}>
              <Flag size={16} /> Ja, lever
            </button>{" "}
            <button
              type="button"
              className="hint-btn"
              onClick={() => {
                setBekreft(null);
                fokus(() => leverKnapp.current);
              }}
            >
              Fortsett å jobbe
            </button>
          </div>
        )}
        {oving && submitted && (
          <div className="exam-summary" ref={sammendrag} tabIndex={-1} data-fokus-etter-feiring="">
            <p>Øveprøven er levert. Hint og løsningsforslag er nå åpne. Merk oppgavene du fikk til.</p>
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
                Ta øveprøven på nytt
              </button>
            ) : (
              <div role="alertdialog" aria-labelledby="bekreft-ovep-pånytt" ref={pånyttDialog} tabIndex={-1}>
                <p id="bekreft-ovep-pånytt">
                  <strong>Ta øveprøven på nytt?</strong> Det leverte forsøket og svarene dine i prøven slettes.
                </p>
                <button type="button" className="btn-primary" onClick={taPåNytt}>
                  Ja, ta på nytt
                </button>{" "}
                <button
                  type="button"
                  className="hint-btn"
                  onClick={() => {
                    setBekreft(null);
                    fokus(() => pånyttKnapp.current);
                  }}
                >
                  Avbryt
                </button>
              </div>
            )}
          </div>
        )}

        <div className="sub-nav">
          {nav.prev ? (
            <Link to="/oppgaver/$kapId/$subId" params={{ kapId: nav.prev.kapId, subId: nav.prev.subId }} className="hint-btn">
              {nav.prev.label}
            </Link>
          ) : (
            <span />
          )}
          {nav.next && (
            <Link to="/oppgaver/$kapId/$subId" params={{ kapId: nav.next.kapId, subId: nav.next.subId }} className="btn-primary">
              {nav.next.label}
            </Link>
          )}
        </div>
      </div>

      {dk.quiz && dk.quiz.length > 0 && (
        <button type="button" className="quiz-fab" onClick={() => setQuizOn(true)}>
          <CircleHelp size={18} /> Start quiz
          {quizBest && <span className="quiz-fab-badge">{quizBest.best}/{quizBest.total}</span>}
        </button>
      )}
      {quizOn && dk.quiz && (
        <QuizOverlay title={`${dk.tittel} · quiz`} quizKey={quizKey} questions={dk.quiz} onClose={() => setQuizOn(false)} />
      )}
    </section>
  );
}
