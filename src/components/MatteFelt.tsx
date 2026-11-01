import { useEffect, useRef, useState } from "react";
import type { MathfieldElement } from "mathlive";
import { latexTilSvartekst, svartekstTilLatex } from "@/lib/matte-felt";
import { lastMathLive } from "@/lib/mathlive-last";
import type { Spesialtegn } from "@/lib/symbolrad";
import { Symbolrad } from "./Symbolrad";

/**
 * Sluttsvarfeltet: eleven skriver matematikk, og den blir formatert på stedet
 * (x^2 → x², 1/2 → brøk, sqrt(2) → rot). Verdien som lagres og sjekkes er hele
 * tiden vanlig tekst (se matte-felt.ts), så resten av appen er uendret.
 *
 * Før MathLive er lastet (og hvis det ikke lar seg laste) står et vanlig <input>
 * med samme id, samme klasse og samme tekst. Byttet beholder fokus.
 */

type Mathfelt = MathfieldElement;

/** Tegn som avslutter brøk/rot/potens når de skrives helt på slutten: 1/2+x er (1/2)+x, ikke 1/(2+x). */
const AVSLUTTER = new Set(["+", "-", "−", "=", "<", ">", ";", " ", ")"]);

/**
 * Står markøren på slutten av en åpen brøk, rot eller potens (uten noe etter seg i den)?
 * Det er der «+» osv. skal hoppe ut, slik at 1/2+3 blir (1/2)+3 og ikke 1/(2+3).
 * Inne i parentes (smart fence) hopper vi ikke ut: «(x+1)/(x-1)» skal beholde nevneren.
 * Leser MathLives modell, som ikke er offentlig API; mangler den, gjør vi ingenting
 * (eleven får tipset om å bruke →).
 */
function iSluttenAvStruktur(mf: Mathfelt, tegn: string): boolean {
  try {
    const pos = mf.position;
    const siste = mf.lastOffset;
    const r = mf.selection.ranges[0];
    if (r && r[0] !== r[1]) return false;
    const modell = (mf as unknown as { _mathfield?: { model?: ModellLik } })._mathfield?.model;
    if (!modell) return false;
    const atom = modell.at(pos);
    const forelder = atom?.parent;
    if (!forelder || forelder.type === "root") return false;
    // Tom nevner/eksponent: «-» er fortegn, og «)» lukker parentesen rundt (MathLive mister ellers det som skrives etterpå).
    if (atom.type === "first") return false;
    // «)» på slutten av en brøk/rot som står i en parentes: hopp ut av brøken først, så lukkes parentesen.
    if (tegn === ")") return (forelder.type === "genfrac" || forelder.type === "surd") && forelder.parent?.type === "leftright" && sisteIGrenen(modell, pos, atom, forelder);
    if (forelder.type === "leftright") return false;
    if (!sisteIGrenen(modell, pos, atom, forelder)) return false;
    return pos <= siste;
  } catch {
    return false;
  }
}

/** Ingen flere atomer etter markøren i samme gren? */
function sisteIGrenen(modell: ModellLik, pos: number, atom: AtomLik, forelder: AtomLik): boolean {
  const neste = modell.at(pos + 1);
  return !(neste && neste.parent === forelder && neste.parentBranch === atom.parentBranch);
}

interface AtomLik {
  type?: string;
  parent?: AtomLik | null;
  parentBranch?: unknown;
}
interface ModellLik {
  at(i: number): AtomLik | undefined;
}

const TALEMERKER = /<(?:mark|break)\b[^>]*\/?>/g;

/**
 * MathLive legger talemerker (<mark name="…"/>, <break …/>) inn i aria-label og i opplesingsområdet.
 * Skjermleseren leser dem opp som tekst, så vi fjerner dem så fort de dukker opp.
 */
function rensTalemerker(mf: Mathfelt): (() => void) | null {
  const rot = mf.shadowRoot;
  if (!rot || typeof MutationObserver === "undefined") return null;
  const rens = () => {
    // MathLive setter inputmode=none (de regner med sitt eget skjermtastatur). Uten dette åpner ikke mobilens vanlige tastatur.
    const sink = rot.querySelector(".ML__keyboard-sink");
    if (sink && sink.getAttribute("inputmode") !== "text") sink.setAttribute("inputmode", "text");
    for (const el of rot.querySelectorAll("[aria-label]")) {
      const v = el.getAttribute("aria-label") ?? "";
      if (TALEMERKER.test(v)) el.setAttribute("aria-label", v.replace(TALEMERKER, "").replace(/\s+/g, " ").trimEnd());
      TALEMERKER.lastIndex = 0;
    }
    for (const el of rot.querySelectorAll("[role=status]")) {
      const v = el.textContent ?? "";
      if (TALEMERKER.test(v)) el.textContent = v.replace(TALEMERKER, "").replace(/\s+/g, " ").trim();
      TALEMERKER.lastIndex = 0;
    }
  };
  const obs = new MutationObserver(rens);
  obs.observe(rot, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ["aria-label", "inputmode"] });
  rens();
  return () => obs.disconnect();
}

export function MatteFelt({
  id,
  value,
  onChange,
  placeholder,
  describedBy,
  labelledBy,
  readOnly = false,
  onKlar,
  symboler,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  describedBy?: string;
  labelledBy?: string;
  readOnly?: boolean;
  /** Meldes når <math-field> har tatt over fra det vanlige tekstfeltet. */
  onKlar?: (klar: boolean) => void;
  /** Spesialtegn som vises som knapper under feltet (∈ ℤ √ …). Utelatt eller tom: ingen rad. */
  symboler?: Spesialtegn[];
}) {
  const [klar, setKlar] = useState(false);
  const verter = useRef<HTMLDivElement>(null);
  const felt = useRef<Mathfelt | null>(null);
  const tekstfelt = useRef<HTMLInputElement | null>(null);
  /** Siste tekst vi vet at feltet og forelderen er enige om (hindrer at vi skriver over det eleven skriver). */
  const sisteTekst = useRef(value);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const harFokus = useRef(false);
  const onKlarRef = useRef(onKlar);
  onKlarRef.current = onKlar;
  const startverdi = useRef(value);
  startverdi.current = value;

  useEffect(() => {
    let avbrutt = false;
    lastMathLive()
      .then(() => {
        if (!avbrutt) setKlar(true);
      })
      .catch(() => {
        /* beholder vanlig tekstfelt */
      });
    return () => {
      avbrutt = true;
    };
  }, []);

  // Opprett <math-field> når MathLive er lastet.
  useEffect(() => {
    const vert = verter.current;
    if (!klar || !vert) return;
    const mf = document.createElement("math-field") as Mathfelt;
    mf.id = id;
    mf.className = "prove-sluttsvar-felt prove-matte-felt";
    mf.mathVirtualKeyboardPolicy = "manual";
    mf.mathModeSpace = "\\;";
    mf.setAttribute("placeholder", `\\text{${placeholder.replace(/[\\{}$%&#_^~]/g, "")}}`);
    mf.setAttribute("autocomplete", "off");
    mf.setAttribute("spellcheck", "false");
    mf.setAttribute("enterkeyhint", "done");
    sisteTekst.current = startverdi.current;
    vert.appendChild(mf);
    // Disse trenger et ferdig montert felt.
    mf.setValue(svartekstTilLatex(startverdi.current), { silenceNotifications: true });
    try {
      mf.menuItems = []; // ingen meny: feltet har bare ett formål
    } catch {
      /* ikke kritisk */
    }
    felt.current = mf;
    const stoppRens = rensTalemerker(mf);

    const ved_input = () => {
      const tekst = latexTilSvartekst(mf.getValue("latex"));
      if (tekst === sisteTekst.current) return;
      sisteTekst.current = tekst;
      onChangeRef.current(tekst);
    };
    // Ut av brøk/potens/rot når eleven skriver et tegn som må høre til hele uttrykket.
    let sistTegn = 0;
    const avslutt = (tegn: string | null | undefined) => {
      if (!tegn || !AVSLUTTER.has(tegn) || !iSluttenAvStruktur(mf, tegn)) return;
      // Hindrer dobbelt hopp når både keydown og beforeinput kommer for samme tastetrykk.
      if (Date.now() - sistTegn < 30) return;
      sistTegn = Date.now();
      mf.executeCommand("moveToNextChar");
    };
    const ved_tast = (e: Event) => {
      const k = e as KeyboardEvent;
      if (k.ctrlKey || k.metaKey || k.altKey) return;
      if (k.key.length === 1) avslutt(k.key);
    };
    const ved_foran = (e: Event) => {
      const i = e as InputEvent;
      if (i.inputType === "insertText") avslutt(i.data);
    };
    const ved_fokus = () => {
      harFokus.current = true;
    };
    const ved_blur = () => {
      harFokus.current = false;
    };
    // MathLive flytter det egentlige tastaturfokuset til feltet først 60 ms etter klikket (setTimeout i onFocus).
    // Tegn som kommer i mellomtiden (rask skriving rett etter klikk, eller automatiske tester) går til elementet
    // som hadde fokus før, og er tapt: «x=1, x=6» ble til «1, x=6». Vi flytter derfor tastaturfokuset med en gang
    // trykket starter. MathLive tar selv over resten (markørplassering, onFocus) når fokushendelsen kommer.
    const ved_peker = (e: Event) => {
      const p = e as PointerEvent;
      if (mf.readOnly || mf.disabled || (p.button !== undefined && p.button !== 0)) return;
      const sink = mf.shadowRoot?.querySelector<HTMLElement>(".ML__keyboard-sink");
      if (!sink || mf.shadowRoot?.activeElement === sink) return;
      sink.focus({ preventScroll: true });
    };
    mf.addEventListener("input", ved_input);
    mf.addEventListener("keydown", ved_tast, true);
    mf.addEventListener("beforeinput", ved_foran, true);
    mf.addEventListener("focusin", ved_fokus);
    mf.addEventListener("focusout", ved_blur);
    mf.addEventListener("pointerdown", ved_peker, true);
    // Eleven rakk å klikke i tekstfeltet før MathLive var lastet: ta over fokuset.
    if (harFokus.current) mf.focus();
    onKlarRef.current?.(true);

    return () => {
      mf.removeEventListener("input", ved_input);
      mf.removeEventListener("keydown", ved_tast, true);
      mf.removeEventListener("beforeinput", ved_foran, true);
      mf.removeEventListener("focusin", ved_fokus);
      mf.removeEventListener("focusout", ved_blur);
      mf.removeEventListener("pointerdown", ved_peker, true);
      stoppRens?.();
      mf.remove();
      felt.current = null;
      onKlarRef.current?.(false);
    };
    // placeholder/id endres ikke i praksis; feltet opprettes én gang per montering.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [klar, id]);

  // Verdi utenfra (lagret fremgang lest etterpå, nullstilling): oppdater feltet uten å melde endring.
  useEffect(() => {
    const mf = felt.current;
    if (!mf || value === sisteTekst.current) return;
    // Mens eleven skriver, kan verdien som kommer tilbake være litt på etterskudd (lagring er ikke synkron).
    // Å skrive den inn igjen midt i en brøk ødelegger det eleven holder på med.
    if (harFokus.current && document.activeElement === mf) return;
    sisteTekst.current = value;
    mf.setValue(svartekstTilLatex(value), { silenceNotifications: true });
  }, [value, klar]);

  useEffect(() => {
    const mf = felt.current;
    if (mf) mf.readOnly = readOnly;
  }, [readOnly, klar]);

  useEffect(() => {
    const mf = felt.current;
    if (!mf) return;
    if (describedBy) mf.setAttribute("aria-describedby", describedBy);
    else mf.removeAttribute("aria-describedby");
    if (labelledBy) mf.setAttribute("aria-labelledby", labelledBy);
    else mf.removeAttribute("aria-labelledby");
  }, [describedBy, labelledBy, klar]);

  /** Setter inn et spesialtegn der markøren står, og beholder fokus i feltet. */
  const settInn = (s: Spesialtegn) => {
    const mf = felt.current;
    if (mf) {
      mf.focus();
      mf.insert(s.latex, { format: "latex", mode: "math", focus: true, feedback: false, selectionMode: "placeholder" });
      return;
    }
    const inn = tekstfelt.current;
    if (!inn) return;
    const fra = inn.selectionStart ?? inn.value.length;
    const til = inn.selectionEnd ?? fra;
    const ny = inn.value.slice(0, fra) + s.tekst + inn.value.slice(til);
    onChangeRef.current(ny);
    requestAnimationFrame(() => {
      inn.focus();
      inn.setSelectionRange(fra + s.tekst.length, fra + s.tekst.length);
    });
  };
  const rad = symboler && symboler.length > 0 ? <Symbolrad symboler={symboler} onVelg={settInn} deaktivert={readOnly} /> : null;

  if (klar) {
    return (
      <>
        <div ref={verter} className="prove-matte-vert" data-matte="mathlive" />
        {rad}
      </>
    );
  }
  return (
    <>
      <input
        ref={tekstfelt}
        id={id}
        className="prove-sluttsvar-felt"
        type="text"
        inputMode="text"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        aria-describedby={describedBy}
        onFocus={() => {
          harFokus.current = true;
        }}
        onBlur={() => {
          harFokus.current = false;
        }}
        onChange={(e) => onChange(e.target.value)}
      />
      {rad}
    </>
  );
}
