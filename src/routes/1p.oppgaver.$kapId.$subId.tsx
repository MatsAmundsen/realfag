import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CircleHelp, Clock, FileDown, Flag } from "lucide-react";
import { CHAPTER_META_1P as CHAPTER_META, fagsok1P as fagsok, findKap1P as findKap, findSub1P as findSub, videosForSub1P as videosForSub, NIVAARK_BY_SUB_1P } from "@/data/1p";
import type { StudyMode } from "@/data/types";
import { ChapterSidebar } from "@/components/ChapterSidebar";
import { TopicVideoInvite } from "@/components/TopicVideoInvite";
import { TaskCard } from "@/components/TaskCard";
import { SummaryView } from "@/components/SummaryView";
import { QuizOverlay } from "@/components/QuizOverlay";
import { ModeToggle } from "@/components/ModeToggle";
import { ProveSvar, formatKlokke, useProveUtkast } from "@/components/ProveFelt";
import { countSubchapter, isOvingDelkap } from "@/lib/progress";
import { useProgressStore } from "@/lib/progress-store";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/1p/oppgaver/$kapId/$subId")({
  head: ({ params }) => {
    const kap = findKap(params.kapId);
    const dk = findSub(params.kapId, params.subId);
    const kapNavn = CHAPTER_META[params.kapId]?.short ?? kap?.tittel ?? "Matematikk 1P";
    const navn = dk?.tittel ?? params.subId;
    return seoHead(
      `/1p/oppgaver/${params.kapId}/${params.subId}`,
      `${navn} – ${kapNavn} | Oppgaver 1P`,
      `Oppgaver med hint og løsning i ${navn} (${kapNavn}), matematikk 1P. Øv, ta quiz og følg fremgangen din.`,
    );
  },
  component: SubchapterPage1P,
});

function SubchapterPage1P() {
  const { kapId, subId } = Route.useParams();
  const kap = findKap(kapId);
  const dk = findSub(kapId, subId);
  const p = useProgressStore((s) => s.p);
  const [quizOn, setQuizOn] = useState(false);
  const [mode, setMode] = useState<StudyMode>("prove");
  const [submitted, setSubmitted] = useState(false);
  const [timerOn, setTimerOn] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const utkast = useProveUtkast(`ove/${kapId}/${subId}`);

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

  return (
    <section className="view-section">
      <ChapterSidebar kapId={kapId} subId={subId} fag="1P" />
      <div className="content-area">
        <div className="kap-switch">
          {fagsok.map((k) => {
            const first = k.delkapitler[0];
            if (!first) return null;
            return (
              <Link
                key={k.id}
                to="/1p/oppgaver/$kapId/$subId"
                params={{ kapId: k.id, subId: first.id }}
                className={k.id === kapId ? "is-on" : ""}
              >
                Kap. {k.id.replace(/^p1kap/, "")}
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
            <ModeToggle mode={mode} onChange={(m) => { setMode(m); setSubmitted(false); }} />
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
            {timerOn && <span className="timer-readout">Brukt tid: {formatKlokke(elapsed)}</span>}
            {!submitted && (
              <span className="prove-teller" role="status">
                {dk.oppgaver.filter((o) => utkast.ferdig[o.id]).length} av {dk.oppgaver.length} krysset av som ferdige.
              </span>
            )}
          </div>
        )}

        {topicVideos.length > 0 ? <TopicVideoInvite videos={topicVideos} /> : null}

        {NIVAARK_BY_SUB_1P[subId] ? (
          <a className="nivaark-dl" href={NIVAARK_BY_SUB_1P[subId]} download>
            <FileDown className="nivaark-dl-icon" size={26} aria-hidden="true" />
            <span className="nivaark-dl-text">
              <span className="nivaark-dl-title">Last ned nivåark</span>
              <span className="nivaark-dl-meta">Word-dokument (.docx)</span>
            </span>
          </a>
        ) : null}

        {isSummary ? <SummaryView items={dk.oppgaver} kapId={kapId} subId={subId} /> : dk.oppgaver.map((o, i) => (
          <div key={o.id} className="prove-oppgave">
            <TaskCard
              oppgave={o}
              kapId={kapId}
              subId={subId}
              index={i}
              total={dk.oppgaver.length}
              mode={effectiveMode}
              locked={locked}
              reveal={submitted}
              hideTierBadge
            />
            {oving && mode === "prove" && (
              <ProveSvar
                id={o.id}
                value={utkast.answers[o.id] || ""}
                done={Boolean(utkast.ferdig[o.id])}
                locked={submitted}
                onChange={(v) => utkast.setAnswer(o.id, v)}
                onDone={(v) => utkast.setFerdig(o.id, v)}
              />
            )}
          </div>
        ))}

        {oving && !submitted && mode === "prove" && (
          <button type="button" className="btn-primary" onClick={() => setSubmitted(true)}>
            <Flag size={16} /> Lever / Ferdig
          </button>
        )}
        {oving && submitted && (
          <p className="exam-summary">Øveprøven er levert. Hint og løsningsforslag er nå åpne. Merk oppgavene du fikk til.</p>
        )}

        <div className="sub-nav">
          {nav.prev ? (
            <Link to="/1p/oppgaver/$kapId/$subId" params={{ kapId: nav.prev.kapId, subId: nav.prev.subId }} className="hint-btn">
              {nav.prev.label}
            </Link>
          ) : (
            <span />
          )}
          {nav.next && (
            <Link to="/1p/oppgaver/$kapId/$subId" params={{ kapId: nav.next.kapId, subId: nav.next.subId }} className="btn-primary">
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
