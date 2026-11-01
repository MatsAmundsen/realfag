import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Clock, Flag } from "lucide-react";
import type { Oppgave, StudyMode } from "@/data/types";
import { TaskCard } from "./TaskCard";
import { ModeToggle } from "./ModeToggle";
import { PoengOppsummering, ProveResultat, ProveSvar } from "./ProveFelt";
import { SkjulTilHydrert, useAvslor } from "./SkjulTilHydrert";
import { SLUTTSVAR } from "@/data/eksamen-svar";
import { beregnPoeng, poengPerEnhet, type PoengEnhet, type Vurdering } from "@/lib/prove-poeng";
import { formatKlokke, useProveUtkast } from "@/lib/prove-utkast";
import { useDialogFelle, useFokusEtterVisning } from "@/lib/fokus";
import { fireCelebration, useProgressStore } from "@/lib/progress-store";
import { enheterFor, erGammelInnlevering, fasitEllerFri, migrerUtkast, type OppgaveEnheter } from "@/lib/deloppgaver";

/** Sluttsvaret ligger i utkastet under egen nøkkel, ved siden av utregningen. */
const SLUTTSVAR_NOKKEL = (id: string) => `${id}::sluttsvar`;

/** Introduksjonskortet (3.OP0, «Om øveprøven») er ikke en oppgave: ingen svarfelt, ingen «Ferdig» og ikke med i tellingen. */
const erIntro = (o: { id: string }) => /\.OP0$/.test(o.id);

/**
 * Øveprøven (1T og 1P): oppgavene, svarfelt per deloppgave, levering, poeng og «ta på nytt».
 * Brukes av begge rutene. Rutene gir bare det som er ulikt: lagringsnøkkel, tittel og oppgavetittel.
 *
 * Hver deloppgave («a)», «b)» …) har egne felt for utregning og sluttsvar, egen «Ferdig» og egen vurdering.
 * Oppgaven teller fortsatt 1 p i alt, fordelt likt på delene. Oppgaver uten sikker oppdeling er én enhet.
 * Utkast og innleveringer fra før delene fikk egne felt leses videre (se `deloppgaver.ts`).
 */
export function OveprovRunner({
  kapId,
  subId,
  kapTittel,
  oppgaver,
  proveKey,
  hideTierBadge,
  visTittel,
  children,
}: {
  kapId: string;
  subId: string;
  kapTittel: string;
  /** Alle kortene i øveprøven, også introduksjonskortet. */
  oppgaver: Oppgave[];
  /** Levering lagres som et forsøk under denne nøkkelen (1T: `ove/3OP`, 1P: `ove/p1kap3/P3OP`). */
  proveKey: string;
  hideTierBadge: boolean;
  /** Gir kortets tittel til eleven (1P skjuler den interne id-en). */
  visTittel?: (o: Oppgave) => string;
  /** Står nederst, inni omslaget som skjules til lagret fremgang er lest (forrige/neste-lenker). */
  children?: ReactNode;
}) {
  const [mode, setMode] = useState<StudyMode>("prove");
  const [bekreft, setBekreft] = useState<null | "lever" | "pånytt">(null);
  const [timerOn, setTimerOn] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const prev = useProgressStore((s) => s.p.exams[proveKey]);
  const saveExam = useProgressStore((s) => s.saveExam);
  const clearExam = useProgressStore((s) => s.clearExam);
  const updateExam = useProgressStore((s) => s.updateExam);
  const hydrated = useProgressStore((s) => s.hydrated);
  const submitted = Boolean(prev);
  const utkast = useProveUtkast(proveKey);
  const fokus = useFokusEtterVisning();
  const leverKnapp = useRef<HTMLButtonElement>(null);
  const leverDialog = useRef<HTMLDivElement>(null);
  const pånyttKnapp = useRef<HTMLButtonElement>(null);
  const pånyttDialog = useRef<HTMLDivElement>(null);
  const omslag = useRef<HTMLDivElement>(null);
  const sammendrag = useRef<HTMLDivElement>(null);
  const førsteOppgave = useRef<HTMLDivElement>(null);
  useAvslor(omslag, hydrated && utkast.ready);
  /** Lagret innlevering leses først etter hydrering: skjul svarflaten til da, så siden ikke hopper fra «ikke levert» til «levert». */
  const venter = !hydrated;

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

  useEffect(() => {
    if (!timerOn || submitted) return;
    const id = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => window.clearInterval(id);
  }, [timerOn, submitted]);

  const proveOppgaver = useMemo(() => oppgaver.filter((o) => !erIntro(o)), [oppgaver]);
  const poengForsok = submitted && prev?.mode === "prove" ? prev.poeng : undefined;

  /** Enheter per oppgave. En innlevering fra før delene fikk egne felt leses med oppgaven som én enhet. */
  const enheter: OppgaveEnheter[] = useMemo(
    () => proveOppgaver.map((o) => enheterFor(o, SLUTTSVAR, erGammelInnlevering(prev?.poeng?.deler, submitted, o.id))),
    [proveOppgaver, prev, submitted],
  );
  const enhetsListe = useMemo(() => enheter.flatMap((e) => e.enheter), [enheter]);
  /** Hver oppgave teller 1 p (øveprøver har ikke oppgitte poeng), fordelt likt på delene. */
  const poengEnheter: PoengEnhet[] = useMemo(
    () => enheter.flatMap((e) => e.enheter.map((en) => ({ id: en.id, maks: poengPerEnhet(undefined, e.enheter.length), fasit: en.fasit }))),
    [enheter],
  );
  const antallFerdig = enhetsListe.filter((e) => utkast.ferdig[e.id]).length;

  // Utkast fra før delene fikk egne felt flyttes over til delenes nøkler (én gang, uten tap).
  const { ready: utkastKlart, answers: utkastSvar, ferdig: utkastFerdig, erstatt } = utkast;
  useEffect(() => {
    if (!utkastKlart || submitted) return;
    const m = migrerUtkast(proveOppgaver, SLUTTSVAR, { answers: utkastSvar, ferdig: utkastFerdig });
    if (m.endret) erstatt(m.answers, m.ferdig);
  }, [utkastKlart, submitted, proveOppgaver, utkastSvar, utkastFerdig, erstatt]);

  function vurder(id: string, v: Vurdering) {
    if (!prev || !poengForsok) return;
    const vurdering = { ...(prev.vurdering || {}), [id]: v };
    updateExam(proveKey, { vurdering, poeng: beregnPoeng(poengEnheter, prev.sluttsvar || {}, vurdering) });
  }

  function lever() {
    const notes: Record<string, string> = {};
    const sluttsvar: Record<string, string> = {};
    enhetsListe.forEach((e) => {
      const v = (utkast.answers[e.id] || "").trim();
      if (v) notes[e.id] = v;
      const sv = (utkast.answers[SLUTTSVAR_NOKKEL(e.id)] || "").trim();
      if (sv) sluttsvar[e.id] = sv;
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
      title: `${kapTittel} · øveprøven er levert`,
      body: "Nå kan du åpne løsningsforslaget og merke oppgavene du fikk til.",
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

  const locked = mode === "prove" && !submitted;
  const enhetsTekst = (n: number) => (n === proveOppgaver.length ? "oppgaver" : "oppgaver og deloppgaver");

  /** Etter levering: elevens svar og resultatet for én enhet. */
  const levert = (id: string) => (
    <>
      {mode === "prove" && prev?.notes[id] && (
        <p className="prove-svar-levert">
          <strong>Ditt svar:</strong> {prev.notes[id]}
        </p>
      )}
      {poengForsok?.deler[id] && (
        <ProveResultat
          id={id}
          gitt={prev?.sluttsvar?.[id] || ""}
          fasit={fasitEllerFri(enhetsListe.find((x) => x.id === id)?.fasit)}
          res={poengForsok.deler[id]}
          vurdering={prev?.vurdering?.[id]}
          onVurder={(v) => vurder(id, v)}
        />
      )}
    </>
  );

  return (
    <>
      <div className="ove-banner">
        <div>
          <h2>Øveprøve</h2>
          <p>
            {mode === "prove"
              ? "Prøvemodus er på. Ingen hint, og løsningen vises først når du leverer — slik det er på en kapittelprøve."
              : "Øvemodus er på. Du kan åpne hint og steg-løsning underveis."}
          </p>
        </div>
        <ModeToggle
          mode={mode}
          onChange={(m) => {
            setMode(m);
            setBekreft(null);
          }}
        />
      </div>

      {mode === "prove" && (
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
          {timerOn && (
            <span role="timer" className="timer-readout">
              Brukt tid: {formatKlokke(elapsed)}
            </span>
          )}
          {!submitted && (
            <span className="prove-teller" role="status" style={venter ? { visibility: "hidden" } : undefined}>
              {antallFerdig} av {enhetsListe.length} krysset av som ferdige.
            </span>
          )}
        </div>
      )}

      <div ref={omslag} style={{ display: "contents" }}>
        <SkjulTilHydrert forsokNokkel={proveKey} utkastNokkel={`mg-prove-utkast:${proveKey}`} />
        {oppgaver.map((o, i) => {
          const e = enheter.find((x) => x.oppgave.id === o.id);
          return (
            <div key={o.id} className="prove-oppgave" ref={i === 0 ? førsteOppgave : undefined}>
              <TaskCard
                oppgave={visTittel ? { ...o, tittel: visTittel(o) } : o}
                kapId={kapId}
                subId={subId}
                index={i}
                total={oppgaver.length}
                mode={mode}
                locked={locked}
                reveal={submitted}
                hideHint={mode === "prove"}
                hideTierBadge={hideTierBadge}
              />
              {e &&
                (mode === "prove" || submitted) &&
                e.enheter.map((en) => {
                  const delnavn = en.bokstav ? `deloppgave ${en.bokstav})` : undefined;
                  return (
                    <div key={en.id} className={e.harDeler ? "prove-del" : undefined} data-del={en.bokstav}>
                      {e.harDeler && (
                        <p className="prove-del-head">
                          <span className="part-letter">{en.bokstav})</span> {submitted ? "Ditt svar og poeng" : "Svar"}
                        </p>
                      )}
                      {mode === "prove" && !submitted && (
                        <ProveSvar
                          id={en.id}
                          skjult={venter}
                          value={utkast.answers[en.id] || ""}
                          done={Boolean(utkast.ferdig[en.id])}
                          locked={false}
                          onChange={(v) => utkast.setAnswer(en.id, v)}
                          onDone={(v) => utkast.setFerdig(en.id, v)}
                          oppgavetekst={en.tekst}
                          delnavn={delnavn}
                          sluttsvar={{
                            fasit: fasitEllerFri(en.fasit),
                            value: utkast.answers[SLUTTSVAR_NOKKEL(en.id)] || "",
                            onChange: (v) => utkast.setAnswer(SLUTTSVAR_NOKKEL(en.id), v),
                          }}
                        />
                      )}
                      {submitted && levert(en.id)}
                    </div>
                  );
                })}
            </div>
          );
        })}

        {!submitted && mode === "prove" && bekreft !== "lever" && (
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
        {!submitted && mode === "prove" && bekreft === "lever" && (
          <div className="exam-summary" role="alertdialog" aria-modal="true" aria-labelledby="bekreft-ovep-lever" ref={leverDialog} tabIndex={-1}>
            <p id="bekreft-ovep-lever">
              <strong>Er du ferdig med øveprøven?</strong> {antallFerdig} av {enhetsListe.length} {enhetsTekst(enhetsListe.length)} er krysset av som ferdige. Når du leverer, åpnes løsningsforslaget.
            </p>
            <button type="button" className="btn-primary" onClick={lever}>
              <Flag size={16} /> Ja, lever
            </button>{" "}
            <button type="button" className="hint-btn" onClick={avbrytLever}>
              Fortsett å jobbe
            </button>
          </div>
        )}
        {submitted && (
          <div className="exam-summary" ref={sammendrag} tabIndex={-1} data-fokus-etter-feiring="">
            {poengForsok && <PoengOppsummering res={poengForsok} />}
            <p>
              Øveprøven er levert. Løsningsforslaget er nå åpent.{" "}
              {poengForsok ? "Vurder deg selv under hver oppgave, så oppdateres poengene. Merk også oppgavene du fikk til." : "Merk oppgavene du fikk til."}
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
                <button type="button" className="hint-btn" onClick={avbrytPånytt}>
                  Avbryt
                </button>
              </div>
            )}
          </div>
        )}
        {children}
      </div>
    </>
  );
}
