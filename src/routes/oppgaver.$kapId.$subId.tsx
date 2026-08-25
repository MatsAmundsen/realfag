import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CircleHelp, Video } from "lucide-react";
import { CHAPTER_META, fagsok, findKap, findSub, VIDEO_BY_SUB } from "@/data/content";
import type { StudyMode } from "@/data/types";
import { ChapterSidebar } from "@/components/ChapterSidebar";
import { TaskCard } from "@/components/TaskCard";
import { QuizOverlay } from "@/components/QuizOverlay";
import { ModeToggle } from "@/components/ModeToggle";
import { PrereqMini } from "@/components/PrereqMini";
import { PREREQS } from "@/data/mindmap";
import { countSubchapter, isOvingDelkap } from "@/lib/progress";
import { useProgressStore } from "@/lib/progress-store";

export const Route = createFileRoute("/oppgaver/$kapId/$subId")({
  component: SubchapterPage,
});

function SubchapterPage() {
  const { kapId, subId } = Route.useParams();
  const kap = findKap(kapId);
  const dk = findSub(kapId, subId);
  const p = useProgressStore((s) => s.p);
  const [quizOn, setQuizOn] = useState(false);
  const [mode, setMode] = useState<StudyMode>("prove");
  const [submitted, setSubmitted] = useState(false);
  const videos = VIDEO_BY_SUB[subId] || [];
  const hasPrereq = Boolean(PREREQS[subId]);

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : "";
    if (!hash) return;
    const t = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(t);
  }, [kapId, subId]);

  const oving = dk ? isOvingDelkap(dk) : false;
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

  const effectiveMode: StudyMode = oving ? mode : "ove";
  const locked = oving && mode === "prove" && !submitted;

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
            <ModeToggle mode={mode} onChange={(m) => { setMode(m); setSubmitted(false); }} />
          </div>
        )}

        {videos.length > 0 && (
          <div className="sub-video-panel" style={{ display: "block" }}>
            <p>
              <Video size={14} /> Videoer til dette delkapittelet
            </p>
            {videos.map((v) => (
              <a key={v.url} className="sub-video-link" href={v.url} target="_blank" rel="noreferrer">
                {v.tittel}
              </a>
            ))}
          </div>
        )}

        {hasPrereq && !oving && (
          <details className="prereq-details">
            <summary>Hva må jeg kunne?</summary>
            <PrereqMini subId={subId} />
          </details>
        )}

        {dk.oppgaver.map((o, i) => (
          <TaskCard
            key={o.id}
            oppgave={o}
            kapId={kapId}
            subId={subId}
            index={i}
            total={dk.oppgaver.length}
            mode={effectiveMode}
            locked={locked}
            reveal={submitted}
          />
        ))}

        {oving && !submitted && mode === "prove" && (
          <button type="button" className="btn-primary" onClick={() => setSubmitted(true)}>
            Lever øveprøven
          </button>
        )}
        {oving && submitted && (
          <p className="exam-summary">Øveprøven er levert. Hint og løsningsforslag er nå åpne. Merk oppgavene du fikk til.</p>
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
