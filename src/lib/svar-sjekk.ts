/**
 * Sammenligning av elevens sluttsvar med fasit i prøvemodus. Kjører i nettleseren, uten eval og uten eksterne biblioteker.
 *
 * Godtar desimalkomma og punktum, mellomrom, minus − og -, ², ³, ×, ·, √, π, implisitt multiplikasjon (2x, 3(x+1))
 * og ekvivalente uttrykk (sammenlignet i flere punkter). Funksjonene her gir bare ja/nei og en forhåndsvisning
 * av hva som ble tolket. Ingenting herfra skal vises til eleven før levering, bortsett fra forhåndsvisningen,
 * som aldri sier om svaret er riktig.
 */

export type Toleranse = { abs?: number; rel?: number };

export type SvarSpec =
  /** Ett eller flere tall (verdier kan også skrives som 2√21 eller 3/4). */
  | {
      type: "tall";
      verdier: number[];
      rekkefolge?: "fri" | "fast";
      tol?: Toleranse;
      ord?: boolean;
      /** «15 % nedgang» og «nedgang på 15 %» leses som −15 (bare i ord-modus). */
      nedgang?: boolean;
    }
  /** Uttrykk i én eller flere variabler. Ekvivalente former godtas. «y=» og «f(x)=» foran er valgfritt. */
  | { type: "uttrykk"; uttrykk: string; tol?: Toleranse }
  /** Likning x = a (flere løsninger i vilkårlig rekkefølge), eller flere variabler: a = 2 og b = 6. */
  | { type: "likning"; losninger: Record<string, number[]>; tol?: Toleranse }
  /** Ett eller flere punkt (a, b), i vilkårlig rekkefølge. */
  | { type: "punkt"; punkter: [number, number][]; tol?: Toleranse }
  /** Svar som er oppgitt som område: ett tall inni [fra, til], eller begge grensene («1,4–2,7», «mellom 1,4 og 2,7»). */
  | { type: "omrade"; fra: number; til: number; tol?: Toleranse }
  /** Løsning av en ulikhet: «−2 < x < 3», «x > −2 og x < 3», «(−2, 3)» eller «<−2, 3>». Ikke-lukket intervall som standard. */
  | { type: "ulikhet"; fra: number; til: number; lukket?: boolean }
  /** Et valg, for eksempel en bokstav. Store og små bokstaver er like. */
  | { type: "valg"; valg: string }
  /** Flere delsvar i rekkefølge (a, b, c), skilt med semikolon eller linjeskift. Hvert delsvar sjekkes for seg. */
  | { type: "serie"; deler: SvarSpec[] };

/** Et alternativt fullstendig svar. Kan ha sin egen enhetsliste, slik at «24000 g» og «24 kg» godtas, men ikke «24000 kg». */
export type Alternativ = SvarSpec & { enhet?: string[] };

export type Sluttsvar = {
  svar: SvarSpec;
  /** Andre fullstendige svar som også er riktige. */
  alternativer?: Alternativ[];
  /** Godkjente enheter (valgfri for eleven å skrive). Vises ved feltet. */
  enhet?: string[];
  /** Kort hjelpetekst om formatet, f.eks. «Skriv begge verdiene, adskilt med «og»». */
  format?: string;
  /**
   * Oppgaven har formkrav (forenkle, faktoriser, eksakt, standardform, regn ut/utvid uttrykk). Sluttsvaret får ingen
   * automatisk poengsjekk: eleven sammenligner med løsningsforslaget og krysser selv av for «Riktig svar».
   * `svar` brukes bare til forhåndsvisningen av det eleven skrev.
   */
  selvvurder?: boolean;
};

const STANDARD_TOL: Required<Toleranse> = { abs: 1e-9, rel: 1e-9 };

export function erNær(a: number, b: number, tol?: Toleranse): boolean {
  if (!Number.isFinite(a) || !Number.isFinite(b)) return false;
  const abs = tol?.abs ?? (tol?.rel === undefined ? STANDARD_TOL.abs : 0);
  const rel = tol?.rel ?? (tol?.abs === undefined ? STANDARD_TOL.rel : 0);
  return Math.abs(a - b) <= Math.max(abs, rel * Math.abs(b)) + 1e-12;
}

/* ---------------------------------------------------------------- normalisering */

/** Felles tegnrydding. Rører ikke komma (det avgjøres senere: desimalkomma eller listeskille). */
export function normaliser(input: string): string {
  return input
    .replace(/[\u00a0\u2009\u202f\u2007\u200a]/g, " ")
    .replace(/[\u2212\u2013\u2014\u2012\u2010\u2011]/g, "-")
    .replace(/[×·⋅∙✕]/g, "*")
    .replace(/÷/g, "/")
    .replace(/([⁻⁺]?)([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, (_m, fortegn: string, sifre: string) =>
      `^${fortegn === "⁻" ? "-" : ""}${[...sifre].map((c) => "⁰¹²³⁴⁵⁶⁷⁸⁹".indexOf(c)).join("")}`,
    )
    .replace(/[′´’ʹ‘`]/g, "'")
    .replace(/π/g, "pi")
    .replace(/\s+/g, " ")
    .trim();
}

/** «3 628 800» (mellomrom som tusenskille) blir ett tall. */
function tusenskille(s: string): string {
  return s.replace(/(?<![\d.,])\d{1,3}(?: \d{3})+(?!\d)/g, (m) => m.replace(/ /g, ""));
}

/** Desimalkomma mellom sifre blir punktum. «2, 3» (komma og mellomrom) er listeskille og røres ikke. */
function desimalkomma(s: string): string {
  return s.replace(/(\d),(?=\d)/g, "$1.");
}

/** Deler et svar i flere deler: «;», linjeskift, «og», «eller», «&», «,» etterfulgt av mellomrom. */
export function delOpp(s: string): string[] {
  return s
    .split(/\s*(?:;|\n|&|\bog\b|\beller\b|∨|,\s+)\s*/i)
    .map((x) => x.trim())
    .filter(Boolean);
}

/** «y=», «f(x)=», «f'(x)=» (også ′ og ´), «y'=», «B_n=», «B(n)=» foran et uttrykk. */
const PREFIKS_UTTRYKK = /^\s*[A-Za-zα-ω][A-Za-z0-9_]*'*(?:\s*\([^()]*\))?\s*(?:=|≈)\s*/;

function fjernForsteord(s: string): string {
  return s.replace(/^\s*(?:ca\.?|omtrent|ca)\s+/i, "").replace(/^\s*[≈~]\s*/, "");
}

/**
 * Enheter og ord som står etter et tall og aldri er en del av svaret. Gjelder når oppgaven ikke har sin egen enhetsliste
 * (da er listen presis: «24000 kg» skal ikke godtas for 24 kg). I ord-modus gjelder de alltid.
 */
const GENERISKE_ENHETER = [
  "%",
  "°",
  "prosentpoeng",
  "prosent",
  "pp",
  "kroner",
  "kr",
  "gram",
  "måneder",
  "måned",
  "mnd",
  "år",
  "døgn",
  "dager",
  "timer",
  "minutter",
  "sekunder",
  "liter",
  "glass",
  "personer",
  "enheter",
  "stk",
];

/** Enkeltbokstavsenheter (m, g, L, s …). Bare i ord-modus, der svaret er en setning, og aldri x, y, e eller π. */
const ENKELTBOKSTAV_ENHETER = "mglLsthJWNCK";

/** Fjerner en godkjent enhet bakerst (etter tall eller parentes). */
function fjernEnhet(s: string, enheter?: string[]): { rest: string; enhet?: string } {
  if (!enheter || enheter.length === 0) enheter = GENERISKE_ENHETER;
  const sorted = [...enheter].sort((a, b) => b.length - a.length);
  const lav = s.toLowerCase();
  for (const e of sorted) {
    const en = normaliser(e);
    const variants = new Set([en, en.replace(/\^/g, "")]);
    for (const v of variants) {
      const vl = v.toLowerCase();
      if (!vl || !lav.endsWith(vl)) continue;
      const rest = s.slice(0, s.length - vl.length).trimEnd();
      // Enheten står etter et tall eller en parentes, aldri inni et ord (km er ikke m).
      if (/[\d)]$/.test(rest)) return { rest, enhet: e };
    }
  }
  return { rest: s };
}

/* ---------------------------------------------------------------- uttrykksparser */

export type Node =
  | { k: "num"; v: number; tekst: string }
  | { k: "var"; n: string }
  | { k: "const"; n: "pi" | "e" }
  | { k: "neg"; a: Node }
  | { k: "bin"; op: "+" | "-" | "*" | "/" | "^"; a: Node; b: Node; impl?: boolean }
  | { k: "fn"; n: string; a: Node }
  | { k: "fak"; a: Node };

type Tok = { t: "num"; v: number; tekst: string } | { t: "id"; v: string } | { t: "op"; v: string };

const FUNKSJONER = new Set(["sqrt", "sin", "cos", "tan", "ln", "log", "lg", "abs", "exp", "asin", "acos", "atan", "arcsin", "arccos", "arctan"]);

function tokeniser(s: string): Tok[] | null {
  const toks: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === " ") {
      i++;
      continue;
    }
    if (/[0-9]/.test(c) || (c === "." && /[0-9]/.test(s[i + 1] || ""))) {
      const m = /^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+(?![A-Za-z]))?/.exec(s.slice(i));
      if (!m) return null;
      toks.push({ t: "num", v: Number(m[0]), tekst: m[0] });
      i += m[0].length;
      continue;
    }
    if (/[A-Za-z]/.test(c)) {
      const m = /^[A-Za-z]+/.exec(s.slice(i))!;
      const ord = m[0];
      const lav = ord.toLowerCase();
      if (FUNKSJONER.has(lav)) toks.push({ t: "id", v: lav });
      else if (lav === "pi") toks.push({ t: "id", v: "pi" });
      else {
        // Ukjent ord: hver bokstav er en variabel (xy = x·y). «e» er Eulers tall.
        for (const ch of ord) toks.push({ t: "id", v: ch });
      }
      i += ord.length;
      continue;
    }
    if (c === "√") {
      toks.push({ t: "id", v: "sqrt" });
      i++;
      continue;
    }
    if ("+-*/^()!".includes(c)) {
      toks.push({ t: "op", v: c });
      i++;
      continue;
    }
    return null;
  }
  return toks;
}

class Parser {
  i = 0;
  constructor(private toks: Tok[]) {}
  private peek(): Tok | undefined {
    return this.toks[this.i];
  }
  private isOp(v: string) {
    const t = this.peek();
    return t && t.t === "op" && t.v === v;
  }
  parse(): Node {
    const n = this.expr();
    if (this.i < this.toks.length) throw new Error("rest");
    return n;
  }
  private expr(): Node {
    let a = this.term();
    for (;;) {
      if (this.isOp("+")) {
        this.i++;
        a = { k: "bin", op: "+", a, b: this.term() };
      } else if (this.isOp("-")) {
        this.i++;
        a = { k: "bin", op: "-", a, b: this.term() };
      } else return a;
    }
  }
  private startsAtom(): boolean {
    const t = this.peek();
    if (!t) return false;
    if (t.t === "num" || t.t === "id") return true;
    return t.t === "op" && t.v === "(";
  }
  private term(): Node {
    let a = this.unary();
    for (;;) {
      if (this.isOp("*")) {
        this.i++;
        a = { k: "bin", op: "*", a, b: this.unary() };
      } else if (this.isOp("/")) {
        this.i++;
        a = { k: "bin", op: "/", a, b: this.unary() };
      } else if (this.startsAtom()) {
        a = { k: "bin", op: "*", a, b: this.power(), impl: true };
      } else return a;
    }
  }
  private unary(): Node {
    if (this.isOp("-")) {
      this.i++;
      return { k: "neg", a: this.unary() };
    }
    if (this.isOp("+")) {
      this.i++;
      return this.unary();
    }
    return this.power();
  }
  private power(): Node {
    const base = this.postfix();
    if (this.isOp("^")) {
      this.i++;
      const eksp = this.unary();
      return { k: "bin", op: "^", a: base, b: eksp };
    }
    return base;
  }
  private postfix(): Node {
    let a = this.atom();
    while (this.isOp("!")) {
      this.i++;
      a = { k: "fak", a };
    }
    return a;
  }
  private atom(): Node {
    const t = this.peek();
    if (!t) throw new Error("slutt");
    if (t.t === "num") {
      this.i++;
      return { k: "num", v: t.v, tekst: t.tekst };
    }
    if (t.t === "op" && t.v === "(") {
      this.i++;
      const n = this.expr();
      if (!this.isOp(")")) throw new Error("mangler )");
      this.i++;
      return n;
    }
    if (t.t === "id") {
      this.i++;
      if (t.v === "pi") return { k: "const", n: "pi" };
      if (FUNKSJONER.has(t.v)) {
        // sqrt(x), sqrt x, √x, √12, sin(x)
        if (this.isOp("(")) {
          this.i++;
          const a = this.expr();
          if (!this.isOp(")")) throw new Error("mangler )");
          this.i++;
          return { k: "fn", n: t.v, a };
        }
        const arg = this.power();
        return { k: "fn", n: t.v, a: arg };
      }
      if (t.v === "e") return { k: "const", n: "e" };
      return { k: "var", n: t.v };
    }
    throw new Error("uventet");
  }
}

export function parseUttrykk(input: string): Node | null {
  try {
    const toks = tokeniser(tusenskille(desimalkomma(normaliser(input))));
    if (!toks || toks.length === 0) return null;
    return new Parser(toks).parse();
  } catch {
    return null;
  }
}

function fakultet(n: number): number {
  if (!Number.isInteger(n) || n < 0 || n > 170) return NaN;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

export function evaluer(n: Node, env: Record<string, number>): number {
  switch (n.k) {
    case "num":
      return n.v;
    case "var":
      return env[n.n] ?? NaN;
    case "const":
      return n.n === "pi" ? Math.PI : Math.E;
    case "neg":
      return -evaluer(n.a, env);
    case "fak":
      return fakultet(evaluer(n.a, env));
    case "fn": {
      const a = evaluer(n.a, env);
      switch (n.n) {
        case "sqrt":
          return a < 0 ? NaN : Math.sqrt(a);
        case "sin":
          return Math.sin(a);
        case "cos":
          return Math.cos(a);
        case "tan":
          return Math.tan(a);
        case "ln":
          return a <= 0 ? NaN : Math.log(a);
        case "log":
        case "lg":
          return a <= 0 ? NaN : Math.log10(a);
        case "abs":
          return Math.abs(a);
        case "exp":
          return Math.exp(a);
        case "asin":
        case "arcsin":
          return Math.asin(a);
        case "acos":
        case "arccos":
          return Math.acos(a);
        case "atan":
        case "arctan":
          return Math.atan(a);
        default:
          return NaN;
      }
    }
    case "bin": {
      const a = evaluer(n.a, env);
      const b = evaluer(n.b, env);
      switch (n.op) {
        case "+":
          return a + b;
        case "-":
          return a - b;
        case "*":
          return a * b;
        case "/":
          return b === 0 ? NaN : a / b;
        case "^": {
          const r = Math.pow(a, b);
          return Number.isFinite(r) ? r : NaN;
        }
      }
    }
  }
}

export function variabler(n: Node, ut = new Set<string>()): Set<string> {
  if (n.k === "var") ut.add(n.n);
  else if (n.k === "neg" || n.k === "fn" || n.k === "fak") variabler(n.a, ut);
  else if (n.k === "bin") {
    variabler(n.a, ut);
    variabler(n.b, ut);
  }
  return ut;
}

/** Faste, ikke-heltallige testpunkter (stabile resultater, unngår typiske poler i hele tall). */
const TESTPUNKTER = [0.37, -1.83, 2.41, 0.93, -0.61, 3.17, -2.77, 1.29];

/** Evaluerer to uttrykk i flere punkt og sammenligner. Ekvivalente former godtas. */
export function likeUttrykk(a: Node, b: Node, tol?: Toleranse): boolean {
  const vars = [...new Set([...variabler(a), ...variabler(b)])].sort();
  let gyldige = 0;
  for (let p = 0; p < TESTPUNKTER.length; p++) {
    const env: Record<string, number> = {};
    vars.forEach((v, j) => {
      env[v] = TESTPUNKTER[(p + 3 * j) % TESTPUNKTER.length] + 0.011 * j;
    });
    const x = evaluer(a, env);
    const y = evaluer(b, env);
    const xOk = Number.isFinite(x);
    const yOk = Number.isFinite(y);
    if (!xOk && !yOk) continue; // utenfor definisjonsområdet for begge
    if (xOk !== yOk) return false;
    if (!erNær(x, y, tol ?? { abs: 1e-7, rel: 1e-7 })) return false;
    gyldige++;
  }
  return vars.length === 0 ? gyldige >= 1 : gyldige >= 4;
}

/* ---------------------------------------------------------------- tolking av svartyper */

function tallVerdi(s: string): number | null {
  const n = parseUttrykk(s);
  if (!n || variabler(n).size > 0) return null;
  const v = evaluer(n, {});
  return Number.isFinite(v) ? v : null;
}

const KJENTE_ORD = /^(?:sqrt|pi|sin|cos|tan|ln|log|lg|abs|exp|asin|acos|atan|arcsin|arccos|arctan)$/i;

/** «3 ± √5» gir to uttrykk (3+√5 og 3−√5), «±3» gir +3 og −3. */
function utvidPm(s: string): string[] {
  const i = s.indexOf("±");
  if (i < 0) return [s];
  return [...utvidPm(s.slice(0, i) + "+" + s.slice(i + 1)), ...utvidPm(s.slice(0, i) + "-" + s.slice(i + 1))];
}

const MERKE = "\u0001";

function escRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** I ord-modus fjernes godkjente enheter som står etter et tall hvor som helst i teksten («21,5 m etter 2 s»). */
function fjernEnheterOveralt(s: string, enheter?: string[]): string {
  const varianter = new Set<string>();
  for (const e of [...(enheter || []), ...GENERISKE_ENHETER]) {
    const en = normaliser(e);
    varianter.add(en);
    varianter.add(en.replace(/\^/g, ""));
  }
  let ut = s;
  for (const v of [...varianter].filter(Boolean).sort((a, b) => b.length - a.length)) {
    ut = ut.replace(new RegExp(`(?<=[\\d)])\\s*${escRegex(v)}(?![A-Za-zÆØÅæøå0-9^])`, "gi"), MERKE);
  }
  // m, g, L, s … rett etter tallet (også m^2, m^3): «21,5 m etter 2 s».
  ut = ut.replace(new RegExp(`(?<=[\\d)])\\s*[${ENKELTBOKSTAV_ENHETER}](?:\\^\\d)?(?![A-Za-zÆØÅæøå0-9^(])`, "g"), MERKE);
  return ut;
}

type TallBit = { tekst: string; faktor: number };

/** Ett svar-ledd i et tallsvar blir ett eller flere tall-uttrykk (enheter, ord og ± er håndtert). */
function tallFragmenter(d0: string, enhet?: string[], ord?: boolean, nedgang?: boolean): TallBit[] {
  let d = fjernForsteord(d0.replace(/^\s*[a-zA-Z]\)\s*/, "")).replace(PREFIKS_UTTRYKK, "").trim();
  if (ord && nedgang) {
    // «15 % nedgang» og «nedgang på 15 %» betyr −15 %.
    const tall = "(\\d+(?:[.,]\\d+)?)";
    d = d
      .replace(new RegExp(`(?<![-\\d.,])${tall}\\s*(?:%|prosent)?\\s*(?:nedgang|reduksjon|minking|nedsettelse)`, "gi"), "-$1")
      .replace(new RegExp(`(?:nedgang|reduksjon|minking|nedsettelse)\\s*(?:på|med|er|:)?\\s*${tall}(?:\\s*(?:%|prosent))?`, "gi"), "-$1");
  }
  if (ord) d = d.replace(/(^|\s)[a-hA-H]\)\s*/g, `$1 ${MERKE} `); // «a) 0,2 L b) 3,5 glass»: delbokstavene midt i svaret
  d = ord ? fjernEnheterOveralt(d, enhet) : fjernEnhet(d, enhet).rest;
  // «1,63 millioner» og «9 milliarder» gir tallet ganger 10^6 og 10^9.
  let faktor = 1;
  const sk = /^(.*\d)\s*(millioner|million|mill|milliarder|milliard|mrd)\.?\s*$/i.exec(d);
  if (sk) {
    d = sk[1];
    faktor = /^mill(?:ioner|ion)?$/i.test(sk[2]) ? 1e6 : 1e9;
  }
  let biter: string[];
  if (ord) {
    // «Abid er 21 år»: ord på to bokstaver eller mer fjernes, tallet står igjen. «0,06 m³ = 60 dm³» er to tall.
    d = d.replace(/[A-Za-zÆØÅæøå]{2,}/g, (w) => (KJENTE_ORD.test(w) ? w : MERKE));
    d = d.replace(new RegExp(`${MERKE}-+`, "g"), MERKE).replace(new RegExp(`-+${MERKE}`, "g"), MERKE);
    biter = d
      .split(new RegExp(`${MERKE}|\\s*[=≈]\\s*`))
      .map((x) => x.replace(/(^|\s)-(?=\s|$)/g, "$1").trim())
      .filter(Boolean);
  } else biter = [d];
  return biter.flatMap(utvidPm).map((tekst) => ({ tekst, faktor }));
}

function tolkTall(input: string, enhet?: string[], ord?: boolean, nedgang?: boolean): number[] | null {
  const deler = delOpp(normaliser(input));
  if (deler.length === 0) return null;
  const ut: number[] = [];
  for (const d0 of deler) {
    const bit = tallFragmenter(d0, enhet, ord, nedgang);
    if (bit.length === 0) return null;
    for (const b of bit) {
      const v = tallVerdi(b.tekst);
      if (v === null) return null;
      ut.push(v * b.faktor);
    }
  }
  return ut;
}

function sammeMengde(a: number[], b: number[], tol?: Toleranse): boolean {
  const rest = [...b];
  if (a.length !== b.length) return false;
  for (const x of a) {
    const i = rest.findIndex((y) => erNær(x, y, tol));
    if (i < 0) return false;
    rest.splice(i, 1);
  }
  return true;
}

function dedup(v: number[], tol?: Toleranse): number[] {
  const ut: number[] = [];
  for (const x of v) if (!ut.some((y) => erNær(x, y, tol))) ut.push(x);
  return ut;
}

function tolkLikning(input: string): { var?: string; v: number }[] | null {
  const deler = delOpp(normaliser(input));
  if (deler.length === 0) return null;
  const ut: { var?: string; v: number }[] = [];
  for (const d0 of deler) {
    const d = fjernForsteord(d0);
    const m = /^\s*([A-Za-zα-ω][A-Za-z0-9_]*)\s*(?:=|≈)\s*(.+)$/.exec(d);
    for (const tekst of utvidPm(m ? m[2] : d)) {
      const v = tallVerdi(tekst);
      if (v === null) return null;
      ut.push(m ? { var: m[1], v } : { v });
    }
  }
  return ut;
}

/** «x=-3, y=-5 og x=2, y=0» tolkes som punktene (-3, -5) og (2, 0). */
function punktFraLikninger(input: string): [number, number][] | null {
  const items = tolkLikning(input);
  if (!items || items.length === 0 || items.length % 2 !== 0) return null;
  const ut: [number, number][] = [];
  for (let i = 0; i < items.length; i += 2) {
    const par = [items[i], items[i + 1]];
    const x = par.find((q) => q.var === "x");
    const y = par.find((q) => q.var === "y");
    if (x && y) ut.push([x.v, y.v]);
    // «p=4 og q=3»: to ulike navn som ikke er x og y, første navn er første koordinat.
    else if (!x && !y && par[0].var && par[1].var && par[0].var !== par[1].var) ut.push([par[0].v, par[1].v]);
    else return null;
  }
  return ut;
}

/** Koordinatene inni en parentes: «2; 3», «2, 3», «1,5; 2,5», «2, 21,5», «1,5, 2,5» og «2 3». */
function delPunktInnhold(inn: string): string[] | null {
  if (inn.includes(";")) return inn.split(";").length === 2 ? inn.split(";") : null;
  const komma = inn.split(",");
  const medMellomrom = inn.trim().split(/\s*,\s+/);
  const ordnet = inn.trim().split(/\s+/);
  // «(2 21,5)»: bare mellomrom mellom koordinatene.
  if (ordnet.length === 2 && ordnet.every((x) => !x.startsWith(",") && !x.endsWith(","))) return ordnet;
  if (komma.length === 2) return komma;
  if (medMellomrom.length === 2) return medMellomrom; // «(2, 21,5)»: mellomrom etter skille-kommaet
  if (komma.length === 4) return [`${komma[0]}.${komma[1]}`, `${komma[2]}.${komma[3]}`];
  return null;
}

/** Punktene i et svar: «(−2, 0) og (4, 0)». Desimalkomma: bruk «;» inni parentesen eller «(1,5; 2,5)». */
function tolkPunkter(input: string): [number, number][] | null {
  const s = normaliser(input);
  const grupper = [...s.matchAll(/\(([^()]*)\)/g)];
  // Parenteser som er del av uttrykk (f.eks. «(1+1, 2)») er ikke støttet; punkt skrives rett fram.
  if (grupper.length === 0) return punktFraLikninger(input);
  const ut: [number, number][] = [];
  for (const g of grupper) {
    const biter = delPunktInnhold(g[1]);
    if (!biter) return null;
    const a = tallVerdi(biter[0]);
    const b = tallVerdi(biter[1]);
    if (a === null || b === null) return null;
    ut.push([a, b]);
  }
  return ut;
}

/**
 * Lister uten mellomrom etter kommaet eller bare med mellomrom: «1,2», «-2,1,8» og «-2 1 8» blir «1; 2», «-2; 1; 8».
 * Brukes bare når den vanlige tolkingen (der komma er desimalkomma) ikke ga riktig svar.
 */
function heltallsListe(input: string): string | null {
  const s = normaliser(input);
  const m = /^(?:([A-Za-zα-ω][A-Za-z0-9_]*)\s*=\s*)?(-?\d+(?:\s*,\s*-?\d+|\s+-?\d+)+)$/.exec(s);
  if (!m) return null;
  const deler = m[2].split(/\s*,\s*|\s+/);
  return deler.map((d) => (m[1] ? `${m[1]}=${d}` : d)).join("; ");
}

/** Linje på formen «y−1=−4(x−1)» eller «2x+y=3»: er det samme linje som y = uttrykket? */
function likningsform(input: string, uttrykk: string): boolean {
  const deler = fjernForsteord(normaliser(input)).split("=");
  if (deler.length !== 2) return false;
  const l = parseUttrykk(deler[0]);
  const r = parseUttrykk(deler[1]);
  const f = parseUttrykk(uttrykk);
  if (!l || !r || !f) return false;
  const bare = (n: Node, tillatt: string[]) => [...variabler(n)].every((v) => tillatt.includes(v));
  if (!bare(f, ["x"]) || !bare(l, ["x", "y"]) || !bare(r, ["x", "y"])) return false;
  let avhengerAvY = false;
  for (const x of TESTPUNKTER) {
    const y = evaluer(f, { x });
    const g = (yy: number) => evaluer(l, { x, y: yy }) - evaluer(r, { x, y: yy });
    const skala = 1 + Math.abs(evaluer(l, { x, y })) + Math.abs(evaluer(r, { x, y }));
    if (!Number.isFinite(g(y)) || Math.abs(g(y)) > 1e-7 * skala) return false;
    if (Math.abs(g(y + 1)) > 1e-7 * skala) avhengerAvY = true;
  }
  return avhengerAvY;
}

/** Område: «1,4–2,7», «1,4 til 2,7», «mellom 1,4 og 2,7 kg» eller ett tall. Gir ett eller to tall. */
function tolkOmrade(input: string, enhet?: string[]): number[] | null {
  let s = fjernForsteord(normaliser(input)).replace(/^\s*(?:mellom|fra)\s+/i, "");
  s = fjernEnheterOveralt(s, enhet).split(MERKE).join(" ");
  const biter = s
    .split(/\s*(?:\bog\b|\btil\b|;|,\s+)\s*|\s*(?<=[\d)])\s*-\s*(?=[\d(√.])/i)
    .map((x) => x.trim())
    .filter(Boolean);
  if (biter.length < 1 || biter.length > 2) return null;
  const ut: number[] = [];
  for (const b of biter) {
    const v = tallVerdi(b);
    if (v === null) return null;
    ut.push(v);
  }
  return ut;
}

type Ulikhet = { lo: number; hi: number; loLukket: boolean; hiLukket: boolean };

/** Løsningsmengde: «-2 < x < 3», «x>-2 og x<3», «(-2, 3)», «<-2, 3>» eller «x ∈ ⟨-2, 3⟩». */
function tolkUlikhet(input: string): Ulikhet | null {
  let s = normaliser(input).replace(/≤|⩽/g, "<=").replace(/≥|⩾/g, ">=").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  s = s.replace(/^\s*x\s*(?:∈|\bi\b|\bin\b)\s*/i, "").replace(/\s+/g, " ").trim();
  const op = "(<=|>=|<|>)";
  const num = (t: string) => tallVerdi(t.trim());
  // Kjede: a < x < b
  const k = new RegExp(`^(.+?)\\s*${op}\\s*x\\s*${op}\\s*(.+)$`, "i").exec(s);
  if (k) {
    const a = num(k[1]);
    const b = num(k[4]);
    if (a === null || b === null || k[2][0] !== k[3][0]) return null;
    const sterkt = (o: string) => o.length === 1;
    if (k[2][0] === "<") return { lo: a, hi: b, loLukket: !sterkt(k[2]), hiLukket: !sterkt(k[3]) };
    return { lo: b, hi: a, loLukket: !sterkt(k[3]), hiLukket: !sterkt(k[2]) };
  }
  // Intervall: (a, b), ⟨a; b⟩, <a, b>, ]a, b[, [a, b]
  const m = /^([(\[\]<⟨])\s*(.+?)\s*([)\[\]>⟩])$/.exec(s);
  if (m) {
    const inn = m[2];
    let biter: string[];
    if (inn.includes(";")) biter = inn.split(";");
    else if (/,\s+/.test(inn)) biter = inn.split(/,\s+/);
    else {
      const komma = inn.split(",");
      biter = komma.length === 2 ? komma : komma.length === 4 ? [`${komma[0]}.${komma[1]}`, `${komma[2]}.${komma[3]}`] : [];
    }
    if (biter.length !== 2) return null;
    const a = num(biter[0]);
    const b = num(biter[1]);
    if (a === null || b === null) return null;
    return { lo: a, hi: b, loLukket: m[1] === "[", hiLukket: m[3] === "]" };
  }
  // To enkeltbetingelser: x > a og x < b
  const deler = s.split(/\s*(?:\bog\b|&|;|,\s+)\s*/i).filter(Boolean);
  if (deler.length === 2) {
    let lo: number | null = null;
    let hi: number | null = null;
    let loL = false;
    let hiL = false;
    for (const d of deler) {
      const hoyre = new RegExp(`^x\\s*${op}\\s*(.+)$`, "i").exec(d);
      const venstre = new RegExp(`^(.+?)\\s*${op}\\s*x$`, "i").exec(d);
      let o: string;
      let v: number | null;
      if (hoyre) {
        o = hoyre[1];
        v = num(hoyre[2]);
      } else if (venstre) {
        // «-2 < x» betyr x > -2
        o = venstre[2].startsWith("<") ? ">" + venstre[2].slice(1) : "<" + venstre[2].slice(1);
        v = num(venstre[1]);
      } else return null;
      if (v === null) return null;
      if (o.startsWith(">")) {
        if (lo !== null) return null;
        lo = v;
        loL = o.length === 2;
      } else {
        if (hi !== null) return null;
        hi = v;
        hiL = o.length === 2;
      }
    }
    return lo === null || hi === null ? null : { lo, hi, loLukket: loL, hiLukket: hiL };
  }
  return null;
}

/** Deler et serie-svar i delsvar (semikolon eller linjeskift) og fjerner «a)», «b.» og «c:» foran hvert. */
export function delSerie(input: string): string[] {
  const biter: string[] = [];
  let dyp = 0;
  let nå = "";
  for (const ch of normaliser(input.replace(/\r?\n/g, ";"))) {
    if (ch === "(" || ch === "[") dyp++;
    if (ch === ")" || ch === "]") dyp = Math.max(0, dyp - 1);
    if (ch === ";" && dyp === 0) {
      biter.push(nå);
      nå = "";
    } else nå += ch;
  }
  biter.push(nå);
  return biter
    .map((x) => x.replace(/^\s*[a-fA-F]\s*(?:\)|:|\.(?=\s))\s*/, "").trim())
    .filter(Boolean);
}

function sjekkSpec(input: string, spec: SvarSpec, enhet?: string[]): boolean {
  switch (spec.type) {
    case "serie": {
      const biter = delSerie(input);
      if (biter.length !== spec.deler.length) return false;
      return spec.deler.every((d, i) => sjekkSpec(biter[i], d, enhet));
    }
    case "tall": {
      const sammenlign = (gitt: number[]) => {
        if (spec.rekkefolge === "fast") {
          return gitt.length === spec.verdier.length && gitt.every((v, i) => erNær(v, spec.verdier[i], spec.tol));
        }
        return sammeMengde(dedup(gitt, spec.tol), dedup(spec.verdier, spec.tol), spec.tol);
      };
      const gitt = tolkTall(input, enhet, spec.ord, spec.nedgang);
      if (gitt && sammenlign(gitt)) return true;
      if (spec.verdier.length < 2) return false;
      const liste = heltallsListe(input);
      const gitt2 = liste ? tolkTall(liste, enhet, spec.ord, spec.nedgang) : null;
      return Boolean(gitt2 && sammenlign(gitt2));
    }
    case "omrade": {
      const gitt = tolkOmrade(input, enhet);
      if (!gitt) return false;
      const lo = Math.min(spec.fra, spec.til) - (spec.tol?.abs ?? 0);
      const hi = Math.max(spec.fra, spec.til) + (spec.tol?.abs ?? 0);
      if (gitt.length === 1) return gitt[0] >= lo - 1e-12 && gitt[0] <= hi + 1e-12;
      return erNær(gitt[0], spec.fra, spec.tol) && erNær(gitt[1], spec.til, spec.tol);
    }
    case "ulikhet": {
      const u = tolkUlikhet(input);
      if (!u) return false;
      const lukket = Boolean(spec.lukket);
      return erNær(u.lo, spec.fra) && erNær(u.hi, spec.til) && u.loLukket === lukket && u.hiLukket === lukket;
    }
    case "uttrykk": {
      const rens = fjernEnhet(fjernForsteord(normaliser(input)).replace(PREFIKS_UTTRYKK, ""), enhet).rest;
      const gitt = parseUttrykk(rens);
      const fasit = parseUttrykk(spec.uttrykk);
      if (!fasit) return false;
      // Linje på likningsform («2x+y=3», «y−1=−4(x−1)») er samme linje som y = uttrykket.
      if (!gitt) return likningsform(input, spec.uttrykk);
      return likeUttrykk(gitt, fasit, spec.tol);
    }
    case "likning": {
      if (likningSjekk(input, spec)) return true;
      const liste = heltallsListe(input);
      return Object.keys(spec.losninger).length === 1 && liste !== null && likningSjekk(liste, spec);
    }
    case "punkt": {
      const gitt = tolkPunkter(input);
      if (!gitt || gitt.length !== spec.punkter.length) return false;
      const rest = [...spec.punkter];
      for (const [a, b] of gitt) {
        const i = rest.findIndex(([x, y]) => erNær(a, x, spec.tol) && erNær(b, y, spec.tol));
        if (i < 0) return false;
        rest.splice(i, 1);
      }
      return true;
    }
    case "valg":
      return normaliser(input).replace(/[.)\s]/g, "").toLowerCase() === spec.valg.toLowerCase();
  }
}

function likningSjekk(input: string, spec: Extract<SvarSpec, { type: "likning" }>): boolean {
  const gitt = tolkLikning(input);
  if (!gitt) return false;
  const navn = Object.keys(spec.losninger);
  const per: Record<string, number[]> = Object.fromEntries(navn.map((n) => [n, []]));
  const uten: number[] = [];
  for (const g of gitt) {
    if (g.var === undefined) uten.push(g.v);
    else if (g.var in per) per[g.var].push(g.v);
    else return false;
  }
  if (uten.length > 0) {
    if (navn.length === 1) per[navn[0]].push(...uten);
    else {
      // Uten variabelnavn: i rekkefølgen variablene er oppgitt i fasiten (a, så b).
      const ledige = navn.filter((n) => per[n].length === 0);
      if (ledige.length !== uten.length) return false;
      ledige.forEach((n, i) => per[n].push(uten[i]));
    }
  }
  return navn.every((n) => sammeMengde(dedup(per[n], spec.tol), dedup(spec.losninger[n], spec.tol), spec.tol));
}

/** Er sluttsvaret riktig? Tomt svar er feil. */
export function sjekkSluttsvar(input: string, fasit: Sluttsvar): boolean {
  if (!input || !input.trim()) return false;
  const alle = [fasit.svar, ...(fasit.alternativer || [])];
  return alle.some((s) => sjekkSpec(input, s, (s as Alternativ).enhet ?? fasit.enhet));
}

/* ---------------------------------------------------------------- forhåndsvisning (KaTeX) */

function tallLatex(tekst: string): string {
  return tekst.replace(".", "{,}");
}

function prio(n: Node): number {
  switch (n.k) {
    case "bin":
      return n.op === "+" || n.op === "-" ? 1 : n.op === "*" || n.op === "/" ? 2 : 4;
    case "neg":
      return 3;
    default:
      return 5;
  }
}

/** Gjør et uttrykkstre om til LaTeX. */
export function tilLatex(n: Node): string {
  const paren = (x: Node, min: number) => (prio(x) < min ? `\\left(${tilLatex(x)}\\right)` : tilLatex(x));
  switch (n.k) {
    case "num":
      return tallLatex(n.tekst);
    case "var":
      return n.n;
    case "const":
      return n.n === "pi" ? "\\pi" : "e";
    case "neg":
      return `-${paren(n.a, 3)}`;
    case "fak":
      return `${paren(n.a, 5)}!`;
    case "fn": {
      if (n.n === "sqrt") return `\\sqrt{${tilLatex(n.a)}}`;
      if (n.n === "abs") return `\\left|${tilLatex(n.a)}\\right|`;
      const navn = ({ asin: "arcsin", acos: "arccos", atan: "arctan" } as Record<string, string>)[n.n] || n.n;
      return `\\${navn}\\left(${tilLatex(n.a)}\\right)`;
    }
    case "bin": {
      switch (n.op) {
        case "+":
          return `${paren(n.a, 1)}+${paren(n.b, 2)}`;
        case "-":
          return `${paren(n.a, 1)}-${paren(n.b, 2)}`;
        case "*":
          // 2x, 3(x+1), xy settes sammen. To tall får gangeprikk.
          return `${paren(n.a, 2)}${n.impl && n.b.k !== "num" ? "" : "\\cdot "}${paren(n.b, 3)}`;
        case "/":
          return `\\frac{${tilLatex(n.a)}}{${tilLatex(n.b)}}`;
        case "^":
          return `${n.a.k === "num" || n.a.k === "var" || n.a.k === "const" ? tilLatex(n.a) : `\\left(${tilLatex(n.a)}\\right)`}^{${tilLatex(n.b)}}`;
      }
    }
  }
}

function enhetLatex(e: string): string {
  return e
    .replace(/[\\{}$&#_~]/g, "")
    .replace(/\^(\d)/g, "^{$1}")
    .replace(/%/g, "\\%")
    .replace(/°/g, "^{\\circ}");
}

export type Forhandsvisning = { tom: true } | { ok: true; latex: string } | { ok: false };

/**
 * Det eleven skrev, tolket og satt som formel. Sier ingenting om svaret er riktig.
 * `ok: false` betyr bare at teksten ikke kan tolkes (vises nøytralt).
 */
export function forhandsvis(input: string, spec: SvarSpec, enhet?: string[]): Forhandsvisning {
  if (!input || !input.trim()) return { tom: true };
  const s = normaliser(input);
  if (spec.type === "serie") {
    const biter = delSerie(input);
    if (biter.length === 0 || spec.deler.length === 0) return { ok: false };
    const ut: string[] = [];
    for (let i = 0; i < biter.length; i++) {
      const f = forhandsvis(biter[i], spec.deler[Math.min(i, spec.deler.length - 1)], enhet);
      if (!("ok" in f) || !f.ok) return { ok: false };
      ut.push(f.latex);
    }
    return { ok: true, latex: ut.join(";\\quad ") };
  }
  if (spec.type === "valg") return { ok: true, latex: `\\text{${s.replace(/[^A-Za-z0-9æøåÆØÅ]/g, "")}}` };
  if (spec.type === "omrade") {
    const tall = tolkOmrade(input, enhet);
    return tall ? { ok: true, latex: tall.map((v) => tallLatex(String(v))).join("\\text{ til }") } : { ok: false };
  }
  if (spec.type === "ulikhet") {
    const u = tolkUlikhet(input);
    if (!u) return { ok: false };
    const lt = (v: number) => tallLatex(String(Math.round(v * 1e9) / 1e9));
    return { ok: true, latex: `${lt(u.lo)}${u.loLukket ? "\\le" : "<"}x${u.hiLukket ? "\\le" : "<"}${lt(u.hi)}` };
  }
  if (spec.type === "punkt") {
    const grupper = [...s.matchAll(/\(([^()]*)\)/g)];
    if (grupper.length === 0) return { ok: false };
    const biter: string[] = [];
    for (const g of grupper) {
      const deler = delPunktInnhold(g[1]);
      if (!deler) return { ok: false };
      const a = parseUttrykk(deler[0]);
      const b = parseUttrykk(deler[1]);
      if (!a || !b) return { ok: false };
      biter.push(`\\left(${tilLatex(a)},\\,${tilLatex(b)}\\right)`);
    }
    return { ok: true, latex: biter.join("\\quad\\text{og}\\quad ") };
  }
  const deler = spec.type === "uttrykk" ? [s] : delOpp(s);
  if (deler.length === 0) return { ok: false };
  if (spec.type === "tall" && spec.ord) {
    // Svar med ord og enheter: vis tallene som ble funnet.
    const ut: string[] = [];
    for (const d0 of deler) {
      for (const b of tallFragmenter(d0, enhet, true, spec.nedgang)) {
        const n = parseUttrykk(b.tekst);
        if (!n || variabler(n).size > 0 || b.faktor !== 1) return { ok: false };
        ut.push(tilLatex(n));
      }
    }
    return ut.length ? { ok: true, latex: ut.join(",\\quad ") } : { ok: false };
  }
  const ut: string[] = [];
  for (const d0 of deler) {
    let d = fjernForsteord(d0);
    let prefiks = "";
    const m = spec.type === "uttrykk" ? PREFIKS_UTTRYKK.exec(d) : /^\s*([A-Za-zα-ω][A-Za-z0-9_]*)\s*(?:=|≈)\s*/.exec(d);
    if (m) {
      const p = parseUttrykk(m[0].replace(/\s*(=|≈)\s*$/, ""));
      prefiks = `${p ? tilLatex(p) : m[0].replace(/\s*(=|≈)\s*$/, "")}=`;
      d = d.slice(m[0].length);
    }
    const { rest, enhet: e } = fjernEnhet(d.trim(), enhet);
    const n = parseUttrykk(rest);
    if (!n && spec.type === "uttrykk") {
      // Linje på likningsform, «2x+y=3»: vis venstre og høyre side.
      const sider = rest.split("=");
      const l = sider.length === 2 ? parseUttrykk(sider[0]) : null;
      const r = sider.length === 2 ? parseUttrykk(sider[1]) : null;
      if (l && r) return { ok: true, latex: `${prefiks}${tilLatex(l)}=${tilLatex(r)}` };
    }
    if (!n) return { ok: false };
    if (spec.type !== "uttrykk" && variabler(n).size > 0 && spec.type === "tall") return { ok: false };
    ut.push(`${prefiks}${tilLatex(n)}${e ? `\\;\\mathrm{${enhetLatex(e)}}` : ""}`);
  }
  return { ok: true, latex: ut.join(spec.type === "uttrykk" ? "" : ",\\quad ") };
}
