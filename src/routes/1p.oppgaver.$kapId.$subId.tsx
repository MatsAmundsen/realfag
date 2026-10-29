import { useEffect, useMemo, useRef, useState } from "react";
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
import { PoengOppsummering, ProveResultat, ProveSvar } from "@/components/ProveFelt";
import { SLUTTSVAR } from "@/data/eksamen-svar";
import { beregnPoeng, poengPerEnhet, type Vurdering } from "@/lib/prove-poeng";
import { formatKlokke, useProveUtkast } from "@/lib/prove-utkast";
import { useDialogFelle, useFokusEtterVisning } from "@/lib/fokus";
import { SkjulTilHydrert, useAvslor } from "@/components/SkjulTilHydrert";
import { countSubchapter, isOvingDelkap } from "@/lib/progress";
import { fireCelebration, useProgressStore } from "@/lib/progress-store";
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
  const [bekreft, setBekreft] = useState<null | "lever" | "pånytt">(null);
  const [timerOn, setTimerOn] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  /** Levering av en øveprøve lagres som et forsøk under egen nøkkel, slik at den overlever omlasting (som i 1T). */
  const proveKey = `ove/${kapId}/${subId}`;
  const prev = useProgressStore((s) => s.p.exams[proveKey]);
  const saveExam = useProgressStore((s) => s.saveExam);
  const clearExam = useProgressStore((s) => s.clearExam);
  const updateExam = useProgressStore((s) => s.updateExam);
  const submitted = Boolean(prev);
  const utkast = useProveUtkast(proveKey);
  const fokus = useFokusEtterVisning();
  const leverKnapp = useRef<HTMLButtonElement>(null);
  const leverDialog = useRef<HTMLDivElement>(null);
  const pånyttKnapp = useRef<HTMLButtonElement>(null);
  const pånyttDialog = useRef<HTMLDivElement>(null);
  const hydrated = useProgressStore((s) => s.hydrated);
  const omslag = useRef<HTMLDivElement>(null);
  useAvslor(omslag, hydrated && utkast.ready);

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
  const sammendrag = useRef<HTMLDivElement>(null);
  const førsteOppgave = useRef<HTMLDivElement>(null);

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
  /** Lagret innlevering leses først etter hydrering: skjul svarflaten til da, så siden ikke hopper fra «ikke levert» til «levert». */
  const venter = oving && !hydrated;
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
  /** Introduksjonskortet «Om øveprøven» er ikke en oppgave: ingen svarfelt, ingen «Ferdig» og ikke med i tellingen. */
  const erIntro = (o: { id: string }) => /\.OP0$/.test(o.id);
  const proveOppgaver = dk.oppgaver.filter((o) => !erIntro(o));
  /** Eleven skal se «Oppgave 1», ikke den interne ID-en «P2.OP1». IDen i dataene er uendret. */
  const visTittel = (o: { id: string; tittel: string }) =>
    oving ? o.tittel.replace(/^Oppgave P\d+\.OP(\d+)/, "Oppgave $1") : o.tittel;
  /** Øveprøver har ikke oppgitte poeng: hver oppgave teller 1 p. */
  const poengEnheter = proveOppgaver.map((o) => ({ id: o.id, maks: poengPerEnhet(undefined, 1), fasit: SLUTTSVAR[o.id] }));
  const poengForsok = submitted && prev?.mode === "prove" ? prev.poeng : undefined;

  function vurder(id: string, v: Vurdering) {
    if (!prev || !poengForsok) return;
    const vurdering = { ...(prev.vurdering || {}), [id]: v };
    updateExam(proveKey, { vurdering, poeng: beregnPoeng(poengEnheter, prev.sluttsvar || {}, vurdering) });
  }

  function lever() {
    const notes: Record<string, string> = {};
    const sluttsvar: Record<string, string> = {};
    proveOppgaver.forEach((o) => {
      const v = (utkast.answers[o.id] || "").trim();
      if (v) notes[o.id] = v;
      const sv = (utkast.answers[`${o.id}::sluttsvar`] || "").trim();
      if (sv) sluttsvar[o.id] = sv;
    });
    const newly = saveExam(proveKey, {
      submittedAt: Date.now(),
      selfScore: {},
      notes,
      mode: "prove",
      sluttsvar,
      vurdering: {},
      poeng: beregnPoeng(poengEnheter, sluttsvar, {}),
    });
    utkast.clear();
    setBekreft(null);
    fireCelebration({
      kind: "exam",
      title: `${kap!.tittel} · øveprøven er levert`,
      body: "Nå kan du åpne løsningsforslaget og merke oppgavene du fikk til.",
      badges: newly,
    });
  }

  function taPåNytt() {
    clearExam(proveKey);
    utkast.clear();
    setElapsed(0);
    setBekreft(null);
    // Knappen forsvinner: start på nytt øverst, ved første oppgave.
    fokus(() => førsteOppgave.current?.querySelector<HTMLElement>(".task-title"));
  }

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
                  ? "Prøvemodus er på. Ingen hint, og løsningen vises først når du leverer — slik det er på en kapittelprøve."
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
              <span className="prove-teller" role="status" style={venter ? { visibility: "hidden" } : undefined}>
                {proveOppgaver.filter((o) => utkast.ferdig[o.id]).length} av {proveOppgaver.length} krysset av som ferdige.
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

        <div ref={omslag} style={{ display: "contents" }}>
          {oving && <SkjulTilHydrert forsokNokkel={proveKey} utkastNokkel={`mg-prove-utkast:${proveKey}`} />}
          {isSummary ? <SummaryView items={dk.oppgaver} kapId={kapId} subId={subId} /> : dk.oppgaver.map((o, i) => (
            <div key={o.id} className="prove-oppgave" ref={i === 0 ? førsteOppgave : undefined}>
              <TaskCard
                oppgave={{ ...o, tittel: visTittel(o) }}
                kapId={kapId}
                subId={subId}
                index={i}
                total={dk.oppgaver.length}
                mode={effectiveMode}
                locked={locked}
                reveal={submitted}
                hideHint={effectiveMode === "prove"}
                hideTierBadge
              />
              {oving && mode === "prove" && !erIntro(o) && !submitted && (
                <ProveSvar
                  id={o.id}
                  skjult={venter}
                  value={utkast.answers[o.id] || ""}
                  done={Boolean(utkast.ferdig[o.id])}
                  locked={false}
                  onChange={(v) => utkast.setAnswer(o.id, v)}
                  onDone={(v) => utkast.setFerdig(o.id, v)}
                  sluttsvar={
                    SLUTTSVAR[o.id]
                      ? {
                          fasit: SLUTTSVAR[o.id],
                          value: utkast.answers[`${o.id}::sluttsvar`] || "",
                          onChange: (v) => utkast.setAnswer(`${o.id}::sluttsvar`, v),
                        }
                      : undefined
                  }
                />
              )}
              {oving && mode === "prove" && !erIntro(o) && submitted && prev?.notes[o.id] && (
                <p className="prove-svar-levert">
                  <strong>Ditt svar:</strong> {prev.notes[o.id]}
                </p>
              )}
              {oving && !erIntro(o) && submitted && poengForsok?.deler[o.id] && (
                <ProveResultat
                  id={o.id}
                  gitt={prev?.sluttsvar?.[o.id] || ""}
                  fasit={SLUTTSVAR[o.id]}
                  res={poengForsok.deler[o.id]}
                  vurdering={prev?.vurdering?.[o.id]}
                  onVurder={(v) => vurder(o.id, v)}
                />
              )}
            </div>
          ))}

          {oving && !submitted && mode === "prove" && bekreft !== "lever" && (
            <button
              type="button"
              className="btn-primary prove-lever"
              ref={leverKnapp}
              style={venter ? { visibility: "hidden" } : undefined}
              onClick={() => {
                setBekreft("lever");
                fokus(() => leverDialog.current);
              }}
            >
              <Flag size={16} /> Lever / Ferdig
            </button>
          )}
          {oving && !submitted && mode === "prove" && bekreft === "lever" && (
            <div className="exam-summary" role="alertdialog" aria-modal="true" aria-labelledby="bekreft-ovep-lever" ref={leverDialog} tabIndex={-1}>
              <p id="bekreft-ovep-lever">
                <strong>Er du ferdig med øveprøven?</strong> {proveOppgaver.filter((o) => utkast.ferdig[o.id]).length} av {proveOppgaver.length} oppgaver er krysset av som ferdige. Når du leverer, åpnes løsningsforslaget.
              </p>
              <button type="button" className="btn-primary" onClick={lever}>
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
          {oving && submitted && (
            <div className="exam-summary" ref={sammendrag} tabIndex={-1} data-fokus-etter-feiring="">
              {poengForsok && <PoengOppsummering res={poengForsok} />}
              <p>
                Øveprøven er levert. Løsningsforslaget er nå åpent.{" "}
                {poengForsok
                  ? "Vurder deg selv under hver oppgave, så oppdateres poengene. Merk også oppgavene du fikk til."
                  : "Merk oppgavene du fikk til."}
              </p>
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
                <div role="alertdialog" aria-modal="true" aria-labelledby="bekreft-ovep-pånytt" ref={pånyttDialog} tabIndex={-1}>
                  <p id="bekreft-ovep-pånytt">
                    <strong>Ta øveprøven på nytt?</strong> Det leverte forsøket, svarene dine og poengene i prøven slettes.
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
      </div>

      {dk.quiz && dk.quiz.length > 0 && (
        <button type="button" className="quiz-fab" style={venter ? { visibility: "hidden" } : undefined} onClick={() => setQuizOn(true)}>
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
