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
      /** Svaret er en grense (minst/høyst): «x ≥ 56» godtas for 56 når tegnet stemmer («≥» for minst, «≤» for høyst). */
      ulikhet?: "≥" | "≤";
      /** Tallet er størrelsen på en reduksjon: «12 % økning» avvises (retningen er feil), men «12 %» og «12 % mindre» godtas. */
      ikkeOkning?: boolean;
      /** Plasseringene (0, 1 …) i `verdier` som er et antall (bare med rekkefolge «fast»): svaret må være lik nøkkelen eksakt, `tol` gjelder bare de andre plasseringene. «283,56» og «283» er feil for 284. */
      heltall?: number[];
      /**
       * Slår av avrundingsregelen (se `riktigAvrundet`). Brukes når oppgaven krever et bestemt antall desimaler, gjeldende siffer
       * eller eksakt svar, slik at bare verdien i nøkkelen (med toleransen) gjelder.
       */
      ingenAvrunding?: boolean;
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

/**
 * LaTeX som elever limer inn (eller skriver selv) blir vanlig tekst: \frac{a}{b} → ((a)/(b)), \sqrt{x} → sqrt(x), \cdot → *,
 * \pi → pi, \text{…}, \left( \right), \, og tilsvarende. Alt uten LaTeX går rett gjennom.
 */
export function fjernLatex(input: string): string {
  if (!/[\\$]/.test(input)) return input;
  // $…$ rundt formler fjernes; en enslig $ midt i svaret er ikke LaTeX og skal ikke bli til gange.
  let t = input.replace(/\$\$?([^$]*)\$\$?/g, "$1").replace(/^\s*\$|\$\s*$/g, "");
  for (let i = 0; i < 12; i++) {
    const n = t
      .replace(/\\sqrt\s*\{([^{}]*)\}/g, "sqrt($1)")
      .replace(/\\[dt]?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "(($1)/($2))")
      .replace(/\\(?:text|mathrm|mathit|textrm|operatorname)\s*\{([^{}]*)\}/g, "$1");
    if (n === t) break;
    t = n;
  }
  return t
    .replace(/\\sqrt\s*(\d+(?:[.,]\d+)?|[A-Za-z])/g, "sqrt($1)")
    .replace(/\^\s*\{?\s*\\circ\s*\}?|\\circ|\\degree/g, "°")
    .replace(/\\(?:cdot|times|ast)(?![A-Za-z])/g, "*")
    .replace(/\\(?:div)(?![A-Za-z])/g, "/")
    .replace(/\\(?:left|right|big|Big|bigg|Bigg)(?![A-Za-z])\s*/g, "")
    .replace(/\\[,;:! ]|\\quad|\\qquad/g, " ")
    .replace(/\\%/g, "%")
    .replace(/\\(?:le|leq|leqslant)(?![A-Za-z])/g, "≤")
    .replace(/\\(?:ge|geq|geqslant)(?![A-Za-z])/g, "≥")
    .replace(/\\(?:ne|neq)(?![A-Za-z])/g, "≠")
    .replace(/\\pm(?![A-Za-z])/g, "±")
    .replace(/\\(?:lor|vee)(?![A-Za-z])/g, "∨")
    .replace(/\\in(?![A-Za-z])/g, "∈")
    .replace(/\\infty(?![A-Za-z])/g, "∞")
    .replace(/\\[{}]/g, (m) => m[1])
    .replace(/_\s*\{([^{}]*)\}/g, "_$1")
    .replace(/\\(?=[A-Za-z])/g, ""); // \pi, \sin, \ln, \cos … blir pi, sin, ln, cos
}

/** Felles tegnrydding. Rører ikke komma (det avgjøres senere: desimalkomma eller listeskille). */
export function normaliser(input: string): string {
  return fjernLatex(input)
    .replace(/[\u00a0\u2009\u202f\u2007\u200a]/g, " ")
    .replace(/[\u2212\u2013\u2014\u2012\u2010\u2011]/g, "-")
    .replace(/\*\*/g, "^")
    .replace(/\^\s*\{([^{}]*)\}/g, "^($1)")
    .replace(/[×·⋅∙✕]/g, "*")
    .replace(/÷/g, "/")
    .replace(/([⁻⁺]?)([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, (_m, fortegn: string, sifre: string) =>
      `^${fortegn === "⁻" ? "-" : ""}${[...sifre].map((c) => "⁰¹²³⁴⁵⁶⁷⁸⁹".indexOf(c)).join("")}`,
    )
    .replace(/\s*[′´’ʹ‘`']/g, "'") // «f '(x)» er f'(x)
    .replace(/π/g, "pi")
    .replace(/(\d)\s*(?:ganger|gange)\s*(?=10\s*\^)/gi, "$1*") // «4 ganger 10^9» er 4·10^9
    .replace(/(^|[\s(;,=])minus\s+(?=[\d(])/gi, "$1-") // «minus 15 %» er −15 %
    .trim()
    .replace(/\s*\r?\n\s*/g, "; ") // linjeskift mellom delsvar er listeskille
    .replace(/\s+/g, " ")
    .replace(/\s*[.;:]+$/, "");
}

/** «3 628 800» (mellomrom som tusenskille) blir ett tall. */
function tusenskille(s: string): string {
  return s.replace(/(?<![\d.,])\d{1,3}(?: \d{3})+(?!\d)/g, (m) => m.replace(/ /g, ""));
}

/** Desimalkomma mellom sifre blir punktum. «2, 3» (komma og mellomrom) er listeskille og røres ikke. */
function desimalkomma(s: string): string {
  return s.replace(/(\d),(?=\d)/g, "$1.");
}

/**
 * Kommaregelen (felles for alle svartyper): et komma mellom to sifre uten mellomrom er desimalkomma («1,5» er 1,5).
 * Alle andre komma er listeskille: «1, 6» (mellomrom etter), «x=1,x=6» (bokstav etter), «1 ,6» (mellomrom før),
 * «1,-2» (minus etter). Er det flere tall i fasiten enn i den første lesingen, leses også «1,6,-2» med alle komma som
 * listeskille (se listeLesning), men bare når svaret har minst to komma: «2,6» alene er aldri en liste (tvetydig, avvises når fasit er to tall).
 * Antall elementer i fasit er altså hint, og mellomrom etter kommaet avgjør alltid.
 */
const LISTESKILLE = /\s*(?:;|\n|&|\bog\b|\beller\b|∨|(?<!\d),|,(?!\d))\s*/i;

/** Deler et svar i flere deler: «;», linjeskift, «og», «eller», «∨», «&» og komma som ikke er desimalkomma. */
export function delOpp(s: string): string[] {
  return s
    .split(LISTESKILLE)
    .map((x) => x.trim())
    .filter(Boolean);
}

/** Alle komma mellom sifre blir listeskille: «1,6,-2» og «1,5,2» leses som tre tall. Brukes bare som andre forsøk. */
function listeLesning(input: string): string | null {
  const s = normaliser(input);
  // Ett enkelt «2,6» er alltid desimaltallet 2,6: reservelesningen krever minst to komma i svaret («1,6,-2»).
  if ((s.match(/,/g) ?? []).length < 2) return null;
  const ut = s.replace(/(\d),(?=\d)/g, "$1; ");
  return ut === s ? null : ut;
}

/**
 * Ledende ord som ikke er en del av svaret: «Nullpunkter x = 1», «Svaret er 126 kr», «Løsning: x=2», «Likningen har løsningen x=3».
 * Funksjonsnavn og π beholdes. Ord på ett tegn (variabler) fjernes aldri.
 */
export function fjernLedendeOrd(s: string): string {
  let ut = s;
  for (let i = 0; i < 6; i++) {
    // «k er 4», «b blir 150», «i 2022», «på 15 %»: en variabel med er/blir, eller en kort preposisjon foran tallet.
    const kort = /^\s*(?:[A-Za-z]\s+(?:er|blir)|i|på)\s+(?=[-+\d(√.])/i.exec(ut);
    if (kort) {
      ut = ut.slice(kort[0].length);
      continue;
    }
    const m = /^\s*([A-Za-zÆØÅæøå]{2,})\.?(\s*:\s*|\s+)(?=\S)/.exec(ut);
    if (!m || KJENTE_ORD.test(m[1]) || /^(?:og|eller)$/i.test(m[1])) break;
    // «ab = 3» og «ab(x+1)» er variabler eller uttrykk, ikke ord. Etter kolon kan alt følge.
    if (!m[2].includes(":") && /^[=(^_≈<>]/.test(ut.slice(m[0].length))) break;
    ut = ut.slice(m[0].length);
  }
  return ut.replace(/^\s*[A-Za-z]\s*(?:∈|\bi\b|\bin\b)\s*(?=\S)/i, "").trim();
}

/** Mengdeklammer: «{1, 6, -2}», «L = {1, 6}», «x ∈ {1, 6}». Gir innholdet, eller teksten uendret. */
function fjernMengdeklammer(s: string): string {
  const m = /^\s*(?:[A-Za-zÆØÅæøå][A-Za-zÆØÅæøå0-9_]*\s*(?:=|∈)\s*)?\{([^{}]*)\}\s*$/.exec(s);
  return m ? m[1].trim() : s.replace(/[{}]/g, " ").replace(/\s+/g, " ").trim();
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
      if (vl === "°" && /(?:sin|cos|tan)\s*[-\d.,]+$/i.test(rest)) continue; // «sin150°»: graden hører til vinkelen
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
  | { k: "fak"; a: Node }
  /** «30°»: verdien er gradtallet. Sinus, cosinus og tangens leser et argument med grader som grader. */
  | { k: "deg"; a: Node };

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
        // Funksjonsnavn inni et langt ord leses som funksjon: «xsqrt(3)» (fra x\\sqrt{3}) er x·sqrt(3).
        const navn = [...FUNKSJONER, "pi"].sort((a, b) => b.length - a.length);
        for (let k = 0; k < ord.length; ) {
          const f = navn.find((n) => lav.startsWith(n, k));
          if (f) {
            toks.push({ t: "id", v: f });
            k += f.length;
          } else {
            toks.push({ t: "id", v: ord[k] });
            k++;
          }
        }
      }
      i += ord.length;
      continue;
    }
    if (c === "√") {
      toks.push({ t: "id", v: "sqrt" });
      i++;
      continue;
    }
    if ("+-*/^()!°".includes(c)) {
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
    while (this.isOp("!") || this.isOp("°")) {
      const grad = this.isOp("°");
      this.i++;
      a = grad ? { k: "deg", a } : { k: "fak", a };
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

function harGrader(n: Node): boolean {
  switch (n.k) {
    case "deg":
      return true;
    case "neg":
    case "fak":
      return harGrader(n.a);
    case "bin":
      return harGrader(n.a) || harGrader(n.b);
    default:
      return false; // grader inni en annen funksjon regnes ikke med
  }
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
    case "deg":
      return evaluer(n.a, env);
    case "fn": {
      let a = evaluer(n.a, env);
      if (/^(?:sin|cos|tan)$/.test(n.n) && harGrader(n.a)) a = (a * Math.PI) / 180;
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
  else if (n.k === "neg" || n.k === "fn" || n.k === "fak" || n.k === "deg") variabler(n.a, ut);
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
  // «2 3» er to tall, ikke 2·3. Tusenskille («5 400», «1 632 500») er greit.
  if (/^\s*[-+]?\d+(?:\s+\d+)+\s*$/.test(s) && !/^\s*[-+]?\d{1,3}(?:\s\d{3})+\s*$/.test(s)) return null;
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


/* ---------------------------------------------------------------- enheter og tekst rundt ett tall */

/** Enhetsord og forkortelser → én kanonisk skrivemåte, slik at «kilometer i timen», «km/t» og «km/h» er den samme enheten. */
const ENHETSORD: Record<string, string> = {
  kilometer: "km", kilometre: "km", meter: "m", centimeter: "cm", millimeter: "mm", desimeter: "dm",
  gram: "g", kilogram: "kg", kilo: "kg", milligram: "mg", hektogram: "hg", tonn: "tonn",
  liter: "l", desiliter: "dl", centiliter: "cl", milliliter: "ml",
  sekund: "s", sekunder: "s", sek: "s", minutt: "min", minutter: "min",
  time: "h", timer: "h", timen: "h", t: "h", h: "h", døgn: "døgn", dag: "døgn", dager: "døgn", dagen: "døgn",
  uke: "uke", uker: "uke", uken: "uke", måned: "mnd", måneder: "mnd", mnd: "mnd", måneden: "mnd", år: "år", året: "år",
  krone: "kr", kroner: "kr", kr: "kr", øre: "øre", prosent: "%", prosentpoeng: "pp", promille: "‰",
  grader: "°", grad: "°", kvadratmeter: "m2", kubikkmeter: "m3",
};
const ENHETER_KJENT = new Set([
  ...Object.values(ENHETSORD), "m", "g", "l", "s", "j", "kj", "mj", "kcal", "wh", "kwh", "kw", "mol", "hz", "°c", "°f", "ha", "daa", "dekar", "mil", "tommer", "fot",
  "mph", "pa", "bar", "mb", "kb", "gb", "tb", "mb/s", "°k",
]);

function enhetKanon(u: string): string {
  const s = normaliser(u).toLowerCase().replace(/\s+/g, "").replace(/[.,]+$/, "").replace(/\^/g, "");
  return s.split("/").map((seg) => ENHETSORD[seg] ?? seg).join("/");
}

function erKjentEnhet(kanon: string): boolean {
  return ENHETER_KJENT.has(kanon) || /^(?:mm|cm|dm|m|km)[23]$/.test(kanon);
}

/**
 * Omregning mellom enheter av samme størrelse (kanoniske navn): «5,1 kg» er 5100 g, «0,3 m» er 3 dm. Faktoren ganges med
 * tallet i elevens enhet for å få tallet i oppgavens enhet. Null når enhetene ikke kan regnes om til hverandre.
 */
const ENHETSDIM: Record<string, [string, number]> = {
  mg: ["masse", 1e-3], g: ["masse", 1], hg: ["masse", 100], kg: ["masse", 1000], tonn: ["masse", 1e6],
  mm: ["lengde", 1e-3], cm: ["lengde", 1e-2], dm: ["lengde", 0.1], m: ["lengde", 1], km: ["lengde", 1000],
  ml: ["volum", 1e-3], cl: ["volum", 1e-2], dl: ["volum", 0.1], l: ["volum", 1], cm3: ["volum", 1e-3], dm3: ["volum", 1], m3: ["volum", 1000],
  mm2: ["areal", 1e-6], cm2: ["areal", 1e-4], dm2: ["areal", 1e-2], m2: ["areal", 1], km2: ["areal", 1e6],
  j: ["energi", 1], kj: ["energi", 1e3], mj: ["energi", 1e6],
  s: ["tid", 1], min: ["tid", 60], h: ["tid", 3600], døgn: ["tid", 86400], uke: ["tid", 604800],
  øre: ["penger", 0.01], kr: ["penger", 1],
};
function enhetsFaktor(fra: string, til: string): number | null {
  const a = fra.split("/");
  const b = til.split("/");
  if (a.length !== b.length || a.length > 2) return null;
  let f = 1;
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) continue;
    const x = ENHETSDIM[a[i]];
    const y = ENHETSDIM[b[i]];
    if (!x || !y || x[0] !== y[0]) return null;
    f *= i === 0 ? x[1] / y[1] : y[1] / x[1];
  }
  return f;
}
/** Første tillatte enhet elevens enhet kan regnes om til: faktoren, eller null. */
function omregning(elevEnhet: string, tillatt: string[]): number | null {
  const e = enhetKanon(elevEnhet);
  for (const t of tillatt) {
    const f = enhetsFaktor(e, enhetKanon(t));
    if (f !== null) return f;
  }
  return null;
}

/** Ord som kan stå etter (eller midt i) et svar uten å være en del av tallet. Variabler og funksjoner er det aldri. */
function erProsaOrd(t: string): boolean {
  const b = t.replace(/[.,]+$/, "");
  if (!b || KJENTE_ORD.test(b) || /^(?:og|eller|ikke)$/i.test(b)) return false;
  if (/^(?:i|å)$/i.test(b) || /^[%°‰]$/.test(b)) return true;
  if (/^\^?[\d.]/.test(b) || /^[-+*/^=<>]/.test(b)) return false;
  if (b.includes("^")) return erKjentEnhet(enhetKanon(b));
  if (b.includes("/")) return b.split("/").every((seg) => seg.length > 0 && (erKjentEnhet(enhetKanon(seg)) || /^[A-Za-zÆØÅæøåµ₀-₉]{3,}$/.test(seg)));
  if (/^°[A-Za-z]$/.test(b)) return true;
  if (!/^[A-Za-zÆØÅæøåµ°%‰₀-₉'-]+$/.test(b)) return false;
  const bokstaver = b.replace(/[^A-Za-zÆØÅæøåµ]/g, "");
  if (bokstaver.length >= 3) return true;
  if (bokstaver.length === 2) return /[aeiouæøå]/i.test(bokstaver) || erKjentEnhet(enhetKanon(b));
  return bokstaver.length === 1 && ENKELTBOKSTAV_ENHETER.includes(bokstaver);
}

/** Kobling mellom to tall (ikke ledd i en setning rundt ett svar): «5 til 7», «3 ganger 4», «8 og 9». */
const KOBLINGSORD = /^(?:og|eller|til|fra|mellom|ganger|gange|delt|pluss|minus|opphøyd|av|mot|ikke|ingen|hverken|verken|både|samt)$/i;

/**
 * Enheter og ord rundt ett tall. «3 dm høy», «80 ganger», «Ledd nummer 8 er 57», «10 mL veier 9,124 g». Ordene etter tallet
 * (og setningsstarten før det siste tallet) forkastes. Er oppgavens enhet oppgitt (`tillatt`) og første ord etter tallet er en
 * annen kjent enhet («24 g» for 24 kg), forkastes svaret (ok = false). Uten enhetsliste godtas alle enheter og ord.
 */
function trekkProsa(d: string, tillatt?: string[]): { rest: string; ok: boolean; faktor?: number } {
  let tokens = d.trim().split(/\s+/);
  const hale: string[] = [];
  while (tokens.length > 1 && erProsaOrd(tokens[tokens.length - 1])) hale.unshift(tokens.pop()!);
  let hode = tokens.join(" ");
  // Enhet som henger på tallet: «3dm høy», «24g».
  const hengende = /^(.*\d)([A-Za-zµ°%‰]+(?:\^\d)?(?:\/[A-Za-z]+)?)$/.exec(hode);
  if (hengende && erKjentEnhet(enhetKanon(hengende[2])) && !(hengende[2] === "°" && /(?:sin|cos|tan)\s*[-\d.,]+$/i.test(hengende[1]))) {
    const e = hengende[2];
    const ok = !tillatt || tillatt.length === 0 || tillatt.some((x) => enhetKanon(x) === enhetKanon(e));
    if (!ok) {
      const f = tillatt ? omregning(e, tillatt) : null;
      return f === null ? { rest: d, ok: false } : { rest: hengende[1], ok: true, faktor: f };
    }
    hode = hengende[1];
    // Ligger enheten i tillatt-listen er den allerede klar; ellers (ingen liste) er enhet og hale kommentarer.
    return { rest: hode, ok: true };
  }
  // «Ledd nummer 8 er 57»: bare det siste tallet er svaret når et setningsord står imellom.
  const midt = [...hode.matchAll(/\s([A-Za-zÆØÅæøå]{2,})\s+(?=[-+(.\d√])/g)].filter(
    (m) => !KJENTE_ORD.test(m[1]) && !KOBLINGSORD.test(m[1]) && /\d/.test(hode.slice(0, m.index)),
  );
  const siste = midt[midt.length - 1];
  if (siste && siste.index !== undefined) {
    const etter = hode.slice(siste.index + siste[0].length);
    if (/\d/.test(etter) && !/[A-Za-zÆØÅæøå]{2,}/.test(etter.replace(/sqrt|pi/gi, ""))) hode = etter;
  }
  if (hale.length === 0) return { rest: hode, ok: true };
  if (!/[\d)]$/.test(hode)) return { rest: d, ok: true };
  if (!tillatt || tillatt.length === 0) return { rest: hode, ok: true };
  let t = hale.join(" ").toLowerCase().replace(/\s+(?:per|pr\.?)\s+(?=\S)/g, "/").replace(/\s+i\s+(?=(?:timen|døgnet|uken|måneden|året|sekundet|minuttet)\b)/g, "/").replace(/\s*\/\s*/g, "/");
  const forste = t.split(/\s+/)[0].replace(/[.,]+$/, "");
  const kanon = enhetKanon(forste);
  if (tillatt.some((x) => enhetKanon(x) === kanon)) return { rest: hode, ok: true };
  const omr = omregning(forste, tillatt);
  if (omr !== null) return { rest: hode, ok: true, faktor: omr };
  // Står det en annen kjent enhet rett etter tallet, er svaret oppgitt i feil enhet. Alt annet er kommentar.
  const mult = /^(?:millioner|million|mill|milliarder|milliard|mrd|billioner|billion|billiarder|billiard)$/i.test(forste);
  return { rest: hode, ok: mult || !erKjentEnhet(kanon.split("/")[0]) };
}

/** Faktor for «millioner», «milliarder», «billioner» (norsk: 10^12) og «billiarder» (10^15). */
const MULT_RE = /(\d)\s*(millioner|million|mill|milliarder|milliard|mrd|billioner|billion|billiarder|billiard)\b\.?/i;
function multFaktor(ord: string): number {
  const l = ord.toLowerCase();
  if (/^billiard/.test(l)) return 1e15;
  if (/^billion/.test(l)) return 1e12;
  if (/^milliard|^mrd/.test(l)) return 1e9;
  return 1e6;
}

/** Ledd som bare er ord (en kommentar i en liste): «som er gjennomsnittlig vekstfart». */
function erBareProsa(d: string): boolean {
  const t = d.trim();
  if (!t || /\d|[=+*^(){}<>≤≥≈]/.test(t)) return false;
  const tokens = t.split(/\s+/);
  return tokens.every((x) => erProsaOrd(x) && /[A-Za-zÆØÅæøå]{2,}/.test(x));
}

type TallBit = { tekst: string; faktor: number };

/** «15 % nedgang» og «nedgang på 15 %» betyr −15 %. */
function nedgangTilMinus(d: string): string {
  const tall = "(\\d+(?:[.,]\\d+)?)";
  return d
    .replace(new RegExp(`(?<![-\\d.,])${tall}\\s*(?:%|prosent)?\\s*(?:nedgang|reduksjon|minking|nedsettelse)`, "gi"), "-$1")
    .replace(new RegExp(`(?:nedgang|reduksjon|minking|nedsettelse)\\s*(?:på|med|er|:)?\\s*${tall}(?:\\s*(?:%|prosent))?`, "gi"), "-$1");
}

/** Ett svar-ledd i et tallsvar blir ett eller flere tall-uttrykk (enheter, ord og ± er håndtert). */
function tallFragmenter(d0: string, enhet?: string[], ord?: boolean, nedgang?: boolean): TallBit[] {
  let d = fjernForsteord(d0.replace(/^\s*[a-zA-Z]\)\s*/, ""));
  if (!ord) d = fjernLedendeOrd(d);
  d = d.replace(PREFIKS_UTTRYKK, "").trim();
  if (nedgang) d = nedgangTilMinus(d);
  if (ord) d = d.replace(/([A-Za-zÆØÅæøå]):/g, "$1 "); // «Svar: 9 milliarder», «Areal: 5 m²»
  if (ord) d = d.replace(/(^|\s)[a-hA-H]\)\s*/g, `$1 ${MERKE} `); // «a) 0,2 L b) 3,5 glass»: delbokstavene midt i svaret
  // «1,63 millioner», «9 milliarder» og «5,3 billioner» gir tallet ganger 10^6, 10^9 og 10^12.
  let faktor = 1;
  const mm = MULT_RE.exec(d);
  if (mm) {
    faktor = multFaktor(mm[2]);
    d = d.replace(MULT_RE, "$1");
  }
  if (!ord) {
    // «Det skrives ut 2. Det er vekstfarten.» og «2 – den gjennomsnittlige endringen»: forklaringen etter svaret forkastes.
    d = d
      .replace(/(\d)\s*\.\s+[A-ZÆØÅ][A-Za-zÆØÅæøå]{2,}.*$/, "$1")
      .replace(/(?<=\d)\s+-\s+(?!(?:sqrt|sin|cos|tan|ln|log|lg|abs|exp|pi|arc[a-z]+)\b)(?=[A-Za-zÆØÅæøå]{3,}).*$/, "");
    // En kommentar i parentes bakerst: «5,04 (temperaturen øker 5 grader per måned)», «k=4 (linjene er parallelle)».
    d = d.replace(/\s+\(([^()]*)\)\s*$/, (m, inni: string) => {
      const ordene = inni.match(/[A-Za-zÆØÅæøå]{3,}/g) ?? [];
      return ordene.length > 0 && ordene.every((w) => !KJENTE_ORD.test(w)) ? "" : m;
    });
    const pr = trekkProsa(d, enhet);
    if (!pr.ok) return [];
    if (pr.faktor) faktor *= pr.faktor;
    d = fjernEnhet(pr.rest, enhet).rest;
  } else d = fjernEnheterOveralt(d, enhet);
  let biter: string[];
  if (ord) {
    // «Abid er 21 år»: ord på to bokstaver eller mer fjernes, tallet står igjen. «0,06 m³ = 60 dm³» er to tall.
    d = d.replace(/(^|\s)(?:i|å)(?=\s)/gi, `$1${MERKE}`);
    d = d.replace(/[A-Za-zÆØÅæøå]{2,}/g, (w) => (KJENTE_ORD.test(w) ? w : MERKE));
    d = d.replace(new RegExp(`${MERKE}-+`, "g"), MERKE).replace(new RegExp(`-+${MERKE}`, "g"), MERKE);
    biter = d
      .split(new RegExp(`${MERKE}|\\s*[=≈]\\s*`))
      .map((x) =>
        x
          .replace(/(^|\s)-(?=\s|$)/g, "$1")
          .trim()
          .replace(/^[A-Za-z]\s+(?=[-+\d(√.])/, "") // «A 444 000»: en enkeltbokstav foran er en merkelapp
          .trim(),
      )
      .filter((x) => x && !/^[A-Za-z]$/.test(x)); // «x=8»: variabelen alene er ikke et tall
  } else biter = [d];
  return biter.flatMap(utvidPm).map((tekst) => ({ tekst, faktor }));
}

/** «5 timer og 18 minutter», «1 m 20 cm»: to ledd med ulike enheter av samme størrelse blir ett tall i oppgavens enhet. */
function sammensattEnhet(input: string, enhet?: string[]): number | null {
  if (!enhet || enhet.length === 0) return null;
  const tall = "(\\d+(?:[.,]\\d+)?)";
  const m = new RegExp(`^\\s*${tall}\\s*([A-Za-zÆØÅæøå]+)\\s*(?:og|,|\\+)?\\s*${tall}\\s*([A-Za-zÆØÅæøå]+)\\s*\\.?\\s*$`).exec(normaliser(input));
  if (!m) return null;
  const k1 = enhetKanon(m[2]);
  const k2 = enhetKanon(m[4]);
  if (k1 === k2 || !erKjentEnhet(k1) || !erKjentEnhet(k2)) return null;
  const f1 = omregning(m[2], enhet);
  const f2 = omregning(m[4], enhet);
  if (f1 === null || f2 === null) return null;
  const v1 = Number(m[1].replace(",", "."));
  const v2 = Number(m[3].replace(",", "."));
  return v1 * f1 + v2 * f2;
}

/** «gjennomsnittlig vekstfart på [0,5]»: et intervall i hakeparentes er en forklaring, ikke et svar, når et annet tall står igjen. */
function fjernIntervallforklaring(s: string): string {
  const re = /\s*[\[⟨]\s*-?\d+(?:[.,]\d+)?\s*[;,]\s*-?\d+(?:[.,]\d+)?\s*[\]⟩]/g;
  if (!re.test(s)) return s;
  const ut = s.replace(re, " ").trim();
  return /\d/.test(ut) ? ut : s;
}

/** Hvor nøyaktig eleven skrev tallet: posisjoner (antall desimaler, negativt for tiere/hundrer …) som gir minst 2 gjeldende siffer, og enhetsfaktoren. */
type Presisjon = { pos: number[]; faktor: number };

/**
 * Leser presisjonen fra et tall slik eleven skrev det: «15,87» → 2 desimaler (4 siffer), «177» → hele tall, «180» → tiere (2 siffer)
 * eller hele tall, «1,04·10^11» → hundre millioner … Gjelder bare rene tall og tall på standardform; uttrykk som 2√3 gir null.
 * Færre enn 2 gjeldende siffer (som «200») gir null: for grovt til å regnes som et svar. Et heltall med bare ett ledende siffer
 * og etterfølgende nuller («100», «200», «20 000») regnes som helt tall, ikke som avrundet til hundrer eller tusener: «100» er ikke 96,16 avrundet.
 */
function presisjonFra(tekst: string, faktor: number): Presisjon | null {
  const t = tekst.trim().replace(/(?<=\d)\s+(?=\d{3}(?!\d))/g, "");
  const m = /^[-+]?(\d+)(?:[.,](\d+))?(?:\s*[*×·x]\s*10\^\(?([-+]?\d+)\)?)?$/.exec(t);
  if (!m) return null;
  const heltallsdel = m[1];
  const des = m[2] ?? "";
  const eksp = m[3] ? Number(m[3]) : 0;
  const sifre = (heltallsdel + des).replace(/^0+/, "");
  if (sifre === "") return null;
  const pos: number[] = [];
  if (des.length > 0) {
    if (sifre.length >= 2) pos.push(des.length - eksp);
  } else {
    // Etterfølgende nuller i et heltall er bare en avrunding (til tiere, hundrer …) når de ledende sifrene alene er minst to («180», «250 000»).
    // «100», «200» og «20 000» har ett ledende siffer: nullene er da selv gjeldende siffer, og tallet er bare et helt tall (avvik under en halv enhet).
    const nuller = (sifre.match(/0*$/) ?? [""])[0].length;
    const ledende = sifre.length - nuller;
    for (let p = 0; p <= (ledende >= 2 ? nuller : 0); p++) if (sifre.length - p >= 2) pos.push(-p - eksp);
  }
  return pos.length > 0 ? { pos, faktor } : null;
}

/**
 * Avrundingsregelen: elevens tall er en korrekt avrunding (rund av, halve opp) av nøkkelverdien til minst 2 gjeldende siffer,
 * i elevens egen siste desimal. 177 og 176,5 for 176,5; 15,87 og 15,9 for 15,865; 143 for 142,6. Ikke 176 (176,5 runder opp)
 * og ikke 15,8. Hele tall under 10 000 i nøkkelen er eksakte (et antall, en alder) og avrundes ikke.
 */
export function riktigAvrundet(gitt: number, nokkel: number, pres: Presisjon | null | undefined): boolean {
  if (!pres || !Number.isFinite(gitt) || !Number.isFinite(nokkel) || gitt === 0 || nokkel === 0) return false;
  if (Number.isInteger(nokkel) && Math.abs(nokkel) < 10000) return false;
  if (Math.sign(gitt) !== Math.sign(nokkel)) return false;
  for (const p of pres.pos) {
    const steg = Math.pow(10, -p) * pres.faktor;
    const r = Math.floor(Math.abs(nokkel) / steg + 0.5 + 1e-9) * steg;
    if (Math.abs(r - Math.abs(gitt)) <= 1e-9 * steg) return true;
  }
  return false;
}

function tolkTall(input0: string, enhet?: string[], ord?: boolean, nedgang?: boolean, pres?: (Presisjon | null)[]): number[] | null {
  const input = ord ? input0 : fjernIntervallforklaring(input0);
  if (!ord) {
    const sam = sammensattEnhet(input, enhet);
    if (sam !== null) {
      pres?.push(null);
      return [sam];
    }
  }
  const alle = delOpp(ord ? normaliser(input) : fjernMengdeklammer(fjernLedendeOrd(nedgang ? nedgangTilMinus(normaliser(input)) : normaliser(input))));
  const deler = ord ? alle : alle.filter((d) => !erBareProsa(d)); // «2, som er gjennomsnittlig vekstfart»
  if (deler.length === 0) return null;
  const ut: number[] = [];
  for (const d0 of deler) {
    const bit = tallFragmenter(d0, enhet, ord, nedgang);
    if (bit.length === 0) return null;
    for (const b of bit) {
      const v = tallVerdi(b.tekst);
      if (v === null) return null;
      ut.push(v * b.faktor);
      pres?.push(presisjonFra(b.tekst, b.faktor));
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
  const rent = normaliser(input)
    // «Vertikal asymptote: x = -1/2. Horisontal asymptote: y = 6»: ordene foran hver likning er kommentarer.
    .replace(/(?:^|(?<=[;.]\s))[A-Za-zÆØÅæøå]{3,}(?:\s+[A-Za-zÆØÅæøå]{3,})*\s*:\s*(?=[A-Za-zα-ω]\s*=)/g, "")
    .replace(/(?<=\d)\.\s+(?=[A-Za-zÆØÅæøå])/g, "; ")
    // «x=-2 x=1 x=8»: likninger bare med mellomrom imellom.
    .replace(/(?<=[\d)])\s+(?=[A-Za-zα-ω][A-Za-z0-9_]*\s*(?:=|≈))/g, "; ");
  const deler = delOpp(fjernMengdeklammer(fjernLedendeOrd(rent)));
  if (deler.length === 0) return null;
  const ut: { var?: string; v: number }[] = [];
  for (const d0 of deler) {
    const d = fjernLedendeOrd(fjernForsteord(d0));
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
  // «(p,q)=(4,3)» og «P=(4,3)»: merkelappen foran punktet er ikke et punkt.
  const s = normaliser(input).replace(/(^|[;,\s])\(\s*[A-Za-z]\s*[,;]\s*[A-Za-z]\s*\)\s*=\s*(?=\()/g, "$1");
  const grupper = [...s.matchAll(/\(([^()]*)\)/g)];
  // Parenteser som er del av uttrykk (f.eks. «(1+1, 2)») er ikke støttet; punkt skrives rett fram.
  if (grupper.length === 0) {
    const fraLikninger = punktFraLikninger(input);
    if (fraLikninger) return fraLikninger;
    // Ett punkt uten parentes: «1, 0» eller «Punktet er 1; 0». «2 og 21,5» er to svar, ikke koordinater.
    if (/\b(?:og|eller)\b|∨/i.test(s)) return null;
    const tall = delOpp(fjernMengdeklammer(fjernLedendeOrd(s))).map(tallVerdi);
    return tall.length === 2 && tall.every((t) => t !== null) ? [[tall[0] as number, tall[1] as number]] : null;
  }
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
  if (/^-?\d+,-?\d+$/.test(m[2])) return null; // «2,6» er desimaltallet 2,6, aldri en liste
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
  let s = fjernLedendeOrd(fjernForsteord(normaliser(input))).replace(/^\s*(?:mellom|fra)\s+/i, "");
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

/** `ubestemt`: «-2 til 3» sier ikke om endepunktene er med, så begge lesemåter godtas. */
type Ulikhet = { lo: number; hi: number; loLukket: boolean; hiLukket: boolean; ubestemt?: boolean };

/** Løsningsmengde: «-2 < x < 3», «x>-2 og x<3», «(-2, 3)», «<-2, 3>» eller «x ∈ ⟨-2, 3⟩». */
function tolkUlikhet(input: string): Ulikhet | null {
  const n0 = normaliser(input);
  // «x er mellom -2 og 3» er det åpne intervallet (-2, 3).
  const mellom = /^(?:.*?\s)?(?:x\s+(?:er\s+)?)?mellom\s+(.+?)\s+og\s+(.+)$/i.exec(n0);
  if (mellom) {
    const lo = tallVerdi(mellom[1].trim());
    const hi = tallVerdi(mellom[2].trim());
    return lo === null || hi === null ? null : { lo, hi, loLukket: false, hiLukket: false };
  }
  // «-2 til 3» og «fra -2 til 3»: et intervall uten at åpen eller lukket er sagt.
  const til = /^(?:x\s+(?:er\s+)?)?(?:fra\s+)?(-?\d[^<>≤≥=]*?|-?\(.+?\)|-?sqrt\(.+?\)|-?pi)\s+til\s+(.+)$/i.exec(n0);
  if (til) {
    const lo = tallVerdi(til[1].trim());
    const hi = tallVerdi(til[2].trim());
    return lo === null || hi === null ? null : { lo, hi, loLukket: false, hiLukket: false, ubestemt: true };
  }
  let s = fjernLedendeOrd(n0).replace(/≤|⩽/g, "<=").replace(/≥|⩾/g, ">=").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
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

/** Rydder ett delsvar: «a)», «b.» og «c:» foran, og skilletegn («;», «,», «og») bakerst. */
function renDelsvar(x: string): string {
  return x
    .replace(/^\s*[a-fA-F]\s*(?:\)|:|\.(?=\s))\s*/, "")
    .replace(/\s*(?:[;,]|\bog\b|\beller\b)\s*$/i, "")
    .trim();
}

/** Posisjoner (på parentesnivå 0) der teksten kan deles. */
function skillepunkter(s: string): { fra: number; til: number; sep: string }[] {
  const ut: { fra: number; til: number; sep: string }[] = [];
  let dyp = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "(" || ch === "[" || ch === "{") dyp++;
    else if (ch === ")" || ch === "]" || ch === "}") dyp = Math.max(0, dyp - 1);
    else if (dyp === 0) {
      if (ch === ";") ut.push({ fra: i, til: i + 1, sep: "; " });
      else if (ch === "," && !(/\d/.test(s[i - 1] || "") && /\d/.test(s[i + 1] || ""))) ut.push({ fra: i, til: i + 1, sep: ", " });
      else {
        const m = /^\s+(og|eller)\s+/i.exec(s.slice(i));
        if (m && (i === 0 || s[i - 1] !== " ")) ut.push({ fra: i, til: i + m[0].length, sep: ` ${m[1].toLowerCase()} ` });
      }
    }
  }
  return ut;
}

/** Deler et serie-svar i delsvar (semikolon, linjeskift eller «a) … b) …» uten skilletegn) og fjerner «a)», «b.» og «c:» foran hvert. */
export function delSerie(input: string): string[] {
  const biter: string[] = [];
  let dyp = 0;
  let nå = "";
  const norm = normaliser(input.replace(/\r?\n/g, ";"));
  for (const ch of norm) {
    if (ch === "(" || ch === "[") dyp++;
    if (ch === ")" || ch === "]") dyp = Math.max(0, dyp - 1);
    if (ch === ";" && dyp === 0) {
      biter.push(nå);
      nå = "";
    } else nå += ch;
  }
  biter.push(nå);
  if (biter.length === 1) {
    // «a) x=8 b) 9 c) x=15»: delbokstavene alene skiller delsvarene.
    const merker: { fra: number; til: number }[] = [];
    for (const m of norm.matchAll(/(?:^|\s)(?:[a-fA-F]\)|[A-F]:)\s*/g)) {
      const før = norm.slice(0, m.index);
      if ((før.match(/\(/g) || []).length <= (før.match(/\)/g) || []).length) merker.push({ fra: m.index!, til: m.index! + m[0].length });
    }
    if (merker.length >= 2) {
      const deler = merker.map((m, i) => norm.slice(m.til, i + 1 < merker.length ? merker[i + 1].fra : undefined));
      return deler.map(renDelsvar).filter(Boolean);
    }
  }
  return biter.map(renDelsvar).filter(Boolean);
}

/** Alle rimelige måter å dele et serie-svar i n delsvar: «;»/linjeskift/a)-merker, ellers komma og «og» på øverste nivå. */
function serieKandidater(input: string, n: number): string[][] {
  const ut: string[][] = [];
  const a = delSerie(input);
  if (a.length === n) ut.push(a);
  if (a.length !== 1) return ut; // eksplisitt delt (;, linjeskift eller a)-merker): antallet må stemme
  const norm = normaliser(input.replace(/\r?\n/g, ";"));
  const punkter = skillepunkter(norm);
  if (punkter.length + 1 >= n && punkter.length + 1 <= 10) {
    const deler = punkter.map((p, i) => ({ tekst: norm.slice(i === 0 ? 0 : punkter[i - 1].til, p.fra), sep: p.sep }));
    deler.push({ tekst: norm.slice(punkter.length ? punkter[punkter.length - 1].til : 0), sep: "" });
    const m = deler.length;
    // Velg n - 1 delepunkter blant de m - 1 mulige.
    const velg = (start: number, igjen: number, valgt: number[]) => {
      if (igjen === 0) {
        const grenser = [-1, ...valgt, m - 1];
        const biter: string[] = [];
        for (let g = 0; g < grenser.length - 1; g++) {
          let t = "";
          for (let i = grenser[g] + 1; i <= grenser[g + 1]; i++) t += deler[i].tekst + (i < grenser[g + 1] ? deler[i].sep : "");
          biter.push(renDelsvar(t));
        }
        if (biter.every(Boolean)) ut.push(biter);
        return;
      }
      for (let i = start; i <= m - 1 - igjen; i++) velg(i + 1, igjen - 1, [...valgt, i]);
    };
    velg(0, n - 1, []);
  }
  return ut;
}

function sjekkUttrykk(input: string, spec: Extract<SvarSpec, { type: "uttrykk" }>, enhet?: string[]): boolean {
  // «8400:x»: kolon uten mellomrom mellom to ledd er divisjon (norsk skrivemåte).
  const rens = fjernEnhet(fjernForsteord(normaliser(input)).replace(PREFIKS_UTTRYKK, ""), enhet).rest.replace(/(?<=[\dA-Za-z)])\s*:\s*(?=[\dA-Za-z(√])/g, "/");
  const gitt = parseUttrykk(rens);
  const fasit = parseUttrykk(spec.uttrykk);
  if (!fasit) return false;
  // Linje på likningsform («2x+y=3», «y−1=−4(x−1)») er samme linje som y = uttrykket.
  if (!gitt) return likningsform(input, spec.uttrykk);
  return likeUttrykk(gitt, fasit, spec.tol);
}

/** «7·8+1 = 57» og «v=(17-7)/5=2»: en kjede av like store tall. Gir siste ledd, ellers null. */
function likhetskjede(input: string): string | null {
  const sider = normaliser(input).split(/\s*(?:=|≈)\s*/);
  if (sider.length < 2) return null;
  const start = /^[A-Za-zα-ω][A-Za-z0-9_]*(?:\([^()]*\))?$/.test(sider[0].trim()) ? 1 : 0;
  if (sider.length - start < 2) return null;
  const v: number[] = [];
  for (const side of sider.slice(start)) {
    const t = tolkTall(side);
    if (!t || t.length !== 1) return null;
    v.push(t[0]);
  }
  const sist = v[v.length - 1];
  return v.every((x) => Math.abs(x - sist) <= 0.02 * Math.max(1, Math.abs(sist))) ? sider[sider.length - 1] : null;
}

/** Ord som sier at tallet er en økning («12 % økning», «12 % større», «+12 %»). Brukes av `ikkeOkning`.
 *  Svake økningsord som også er vanlige småord («nedgang over tid», «mer enn jeg trodde»): de teller bare rett ved tallet (B-7). */
const SVAKE_OKNINGSORD = "større|mer|høyere|over|flere|pluss";
const STERKE_OKNINGSORD = "økning|økningen|økte|øker|økt|stigning|stiger|steg|oppgang|vekst";
const ORDSLUTT = "(?![A-Za-zÆØÅæøå])";
/** Teksten uttrykker en økning: et sterkt økningsord et sted i svaret, «+12», eller et svakt ord rett foran («mer enn 12 %») eller rett etter («12 % mer») tallet. */
function sierOkning(tekst: string): boolean {
  const tall = "-?\\d[\\d.,]*";
  const enhet = "(?:\\s*(?:%|prosentpoeng|prosent))?";
  return (
    new RegExp(`(?:^|[^A-Za-zÆØÅæøå])(?:${STERKE_OKNINGSORD})${ORDSLUTT}|(?<![\\w)])\\+\\s*[\\d.,]`, "i").test(tekst) ||
    new RegExp(`(?:^|[^A-Za-zÆØÅæøå])(?:${SVAKE_OKNINGSORD})${ORDSLUTT}(?:\\s+enn)?\\s*(?:på\\s+)?${tall}`, "i").test(tekst) ||
    new RegExp(`${tall}${enhet}\\s*(?:${SVAKE_OKNINGSORD})${ORDSLUTT}`, "i").test(tekst)
  );
}
/** Selve økningssubstantivene: «ikke en økning» (nektelse av økningen, ikke av tallet) fjernes før nektelsestesten og før ikkeOkning. */
const IKKE_OKNING = new RegExp("\\b(?:ikke|ingen)\\s+(?:en\\s+|noen\\s+)?(?:økning|økningen|økt|stigning|oppgang|vekst)(?![A-Za-zÆØÅæøå])\\s*,?", "gi");

/** Ulikhetsord foran et tall («høyst 56», «mer enn 55») og tegnet de betyr. Lengste uttrykk først. */
const ULIKHETSORD: [RegExp, "≤" | "≥" | "<" | ">"][] = [
  [/^(?:(?:færre|mindre|lavere)\s+enn\s+eller\s+lik|ikke\s+(?:mer|flere|større|høyere)\s+enn|høyst|maks(?:imalt|imum)?|inntil|opptil)\s+/i, "≤"],
  [/^(?:(?:mer|flere|større|høyere)\s+enn\s+eller\s+lik|ikke\s+(?:færre|mindre|lavere)\s+enn|minst|minimum|minimalt)\s+/i, "≥"],
  [/^(?:færre|mindre|lavere|under)\s+(?:enn\s+)?/i, "<"],
  [/^(?:mer|flere|større|høyere|over)\s+(?:enn\s+)?/i, ">"],
];

function sjekkSpec(input: string, spec: SvarSpec, enhet?: string[]): boolean {
  switch (spec.type) {
    case "serie": {
      return serieKandidater(input, spec.deler.length).some((biter) => spec.deler.every((d, i) => sjekkSpec(biter[i], d, enhet)));
    }
    case "tall": {
      const sammenlign = (gitt: number[], pres: (Presisjon | null)[] = []) => {
        // Likt: innenfor toleransen, eller en korrekt avrunding av nøkkelen (se riktigAvrundet).
        const lik = (i: number, y: number) => erNær(gitt[i], y, spec.tol) || (!spec.ingenAvrunding && riktigAvrundet(gitt[i], y, pres[i]));
        if (spec.rekkefolge === "fast") {
          return (
            gitt.length === spec.verdier.length &&
            // Posisjoner i `heltall` (et antall der naboverdiene er feil svar) krever eksakt likhet: toleransen gjelder bare de andre.
            gitt.every((_, i) => ((spec.heltall ?? []).includes(i) ? Math.abs(gitt[i] - spec.verdier[i]) < 1e-9 : lik(i, spec.verdier[i])))
          );
        }
        const idx: number[] = [];
        gitt.forEach((v, i) => {
          if (!idx.some((j) => erNær(gitt[j], v, spec.tol))) idx.push(i);
        });
        const nokler = dedup(spec.verdier, spec.tol);
        if (idx.length !== nokler.length) return false;
        const rest = [...nokler];
        for (const i of idx) {
          const k = rest.findIndex((y) => lik(i, y));
          if (k < 0) return false;
          rest.splice(k, 1);
        }
        return true;
      };
      if (spec.ikkeOkning) {
        // «ikke en økning, 12 % reduksjon» er en nedgang: nektelsen foran økningsordet fjernes først (også for selve tolkningen).
        const uten = normaliser(input).replace(IKKE_OKNING, " ").replace(/\(\s*\)/g, " ").trim();
        if (sierOkning(uten)) return false;
        if (uten) input = uten;
      }
      if (spec.ulikhet) {
        // «x ≥ 56» / «høyst 56» / «flere enn 55» for «minst 56»: tegnet (eller ordet) må stemme med oppgaven, ellers er det ikke svaret.
        // Strengt større enn / mindre enn er det samme som ≥ / ≤ bare når nøkkelen er et heltall (et antall): «> 55» er «≥ 56».
        const n = normaliser(input).replace(/^\s*[A-Za-z]\s+er\s+(?=\S)/i, ""); // «x er høyst 56»
        let tegn: "≤" | "≥" | "<" | ">" | null = null;
        let rest = "";
        const sym = /^\s*(?:[A-Za-z]\s*)?(≥|≤|>=|<=|⩾|⩽|>|<)\s*(.+)$/.exec(n);
        if (sym) {
          tegn = sym[1] === "≥" || sym[1] === ">=" || sym[1] === "⩾" ? "≥" : sym[1] === "≤" || sym[1] === "<=" || sym[1] === "⩽" ? "≤" : (sym[1] as "<" | ">");
          rest = sym[2];
        } else {
          for (const [re, tg] of ULIKHETSORD) {
            const mo = re.exec(n);
            if (mo) {
              tegn = tg;
              rest = n.slice(mo[0].length);
              break;
            }
          }
        }
        if (tegn) {
          if (tegn === "≥" || tegn === "≤") return tegn === spec.ulikhet && sjekkSpec(rest, { ...spec, ulikhet: undefined }, enhet);
          const v = spec.verdier[0];
          const g = tolkTall(rest, enhet, spec.ord, spec.nedgang);
          if (spec.verdier.length !== 1 || !Number.isInteger(v) || !g || g.length !== 1) return false;
          if (tegn === ">") return spec.ulikhet === "≥" && Math.floor(g[0] + 1e-9) + 1 === v;
          return spec.ulikhet === "≤" && Math.ceil(g[0] - 1e-9) - 1 === v;
        }
      }
      if (spec.verdier.length >= 2 && (spec.rekkefolge !== "fast" || spec.heltall)) {
        // «(284, 4459)»: en liste i parentes er den samme listen. Ikke for fast rekkefølge uten heltall: der er (a, b) et koordinatpar
        // (P4.OP5: «(21,5; 2)» er ikke punktet (2; 21,5)), og punktet har sin egen alternativ-nøkkel.
        const pm = /^\s*\(([^()]*)\)\s*$/.exec(normaliser(input));
        if (pm && /;|,\s+|\bog\b/i.test(pm[1])) return sjekkSpec(pm[1], spec, enhet);
      }
      const pres0: (Presisjon | null)[] = [];
      const gitt = tolkTall(input, enhet, spec.ord, spec.nedgang, pres0);
      if (gitt && sammenlign(gitt, pres0)) return true;
      if (spec.verdier.length < 2) {
        // «0,8·60 = 48»: utregning og svar i samme felt. Svaret er siste ledd når alle ledd er like store.
        const siste = likhetskjede(input);
        const pres1: (Presisjon | null)[] = [];
        return siste !== null && sammenlign(tolkTall(siste, enhet, spec.ord, spec.nedgang, pres1) ?? [], pres1);
      }
      // Flere tall i fasit: prøv også «1,6,-2» og «1 6 -2» som lister (kommaregelen, se LISTESKILLE).
      return [listeLesning(input), heltallsListe(input)].some((liste) => {
        const pres2: (Presisjon | null)[] = [];
        const g2 = liste ? tolkTall(liste, enhet, spec.ord, spec.nedgang, pres2) : null;
        return Boolean(g2 && sammenlign(g2, pres2));
      });
    }
    case "omrade": {
      const gitt = tolkOmrade(input, enhet);
      if (!gitt) return false;
      const lo = Math.min(spec.fra, spec.til) - (spec.tol?.abs ?? 0);
      const hi = Math.max(spec.fra, spec.til) + (spec.tol?.abs ?? 0);
      // Ett tall er et anslag «omtrent 2 kg» og må ligge inni området. Én av endene alene («1,4 kg») er bare halve svaret.
      if (gitt.length === 1) {
        const t = spec.tol?.abs ?? 0;
        return gitt[0] > lo + t + 1e-12 && gitt[0] < hi - t - 1e-12;
      }
      return erNær(gitt[0], spec.fra, spec.tol) && erNær(gitt[1], spec.til, spec.tol);
    }
    case "ulikhet": {
      const u = tolkUlikhet(input);
      if (!u) return false;
      const lukket = Boolean(spec.lukket);
      return erNær(u.lo, spec.fra) && erNær(u.hi, spec.til) && (u.ubestemt || (u.loLukket === lukket && u.hiLukket === lukket));
    }
    case "uttrykk": {
      if (sjekkUttrykk(input, spec, enhet)) return true;
      // «Svaret er x^2+1»: ledende ord fjernes bare når uttrykket ikke stemte som skrevet.
      const utenOrd = fjernLedendeOrd(normaliser(input));
      return utenOrd !== normaliser(input) && sjekkUttrykk(utenOrd, spec, enhet);
    }
    case "likning": {
      if (likningSjekk(input, spec)) return true;
      if (Object.keys(spec.losninger).length !== 1) return false;
      return [listeLesning(input), heltallsListe(input)].some((liste) => liste !== null && likningSjekk(liste, spec));
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

/**
 * «f(x)=0,15x^3+0,175x^2−1,1x+6,3» for a, b, c og d: koeffisientene til et polynom i x, i rekkefølgen a, b, c (…) fra høyeste grad.
 * Brukes bare når fasiten er koeffisienter med navn a, b, c (, d).
 */
function polynomKoeffisienter(input: string, n: number): number[] | null {
  const node = parseUttrykk(fjernForsteord(normaliser(input)).replace(PREFIKS_UTTRYKK, ""));
  if (!node) return null;
  const vars = variabler(node);
  if ([...vars].some((v) => v !== "x") || !vars.has("x")) return null;
  const grad = n - 1;
  const punkter = [0, 1, -1, 2, -2, 3, 0.5].slice(0, grad + 2);
  const y = punkter.map((px) => evaluer(node, { x: px }));
  if (y.some((v) => !Number.isFinite(v))) return null;
  // Løs for koeffisientene (c0 + c1 x + …) med de første grad+1 punktene (Gauss), kontroller med det siste.
  const m = grad + 1;
  const A = punkter.slice(0, m).map((px, i) => [...Array.from({ length: m }, (_, k) => Math.pow(px, k)), y[i]]);
  for (let c = 0; c < m; c++) {
    let p = c;
    for (let r = c + 1; r < m; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    if (Math.abs(A[p][c]) < 1e-12) return null;
    [A[c], A[p]] = [A[p], A[c]];
    for (let r = 0; r < m; r++) {
      if (r === c) continue;
      const f = A[r][c] / A[c][c];
      for (let k = c; k <= m; k++) A[r][k] -= f * A[c][k];
    }
  }
  const koef = A.map((rad, i) => rad[m] / rad[i]);
  const kontroll = punkter[m];
  const verdi = koef.reduce((sum, c, k) => sum + c * Math.pow(kontroll, k), 0);
  if (Math.abs(verdi - y[m]) > 1e-6 * Math.max(1, Math.abs(y[m]))) return null;
  return koef.reverse().map((c) => (Math.abs(c) < 1e-9 ? 0 : c)); // fra høyeste grad: a, b, c …
}

function likningSjekk(input: string, spec: Extract<SvarSpec, { type: "likning" }>): boolean {
  const gitt = tolkLikning(input);
  const navnA = Object.keys(spec.losninger);
  if (navnA.length >= 3 && navnA.every((n, i) => n === String.fromCharCode(97 + i) && spec.losninger[n].length === 1)) {
    const k = polynomKoeffisienter(input, navnA.length);
    if (k && k.every((c, i) => erNær(c, spec.losninger[navnA[i]][0], spec.tol))) return true;
  }
  if (!gitt) return false;
  const navn = Object.keys(spec.losninger);
  const per: Record<string, number[]> = Object.fromEntries(navn.map((n) => [n, []]));
  const uten: number[] = [];
  for (const g of gitt) {
    if (g.var === undefined) uten.push(g.v);
    else if (g.var in per) per[g.var].push(g.v);
    else if (navn.length === 1 && g.var.toLowerCase() === navn[0].toLowerCase()) per[navn[0]].push(g.v);
    // x1=1, x2=6, x3=-2 (nummererte løsninger) er løsninger av x.
    else if (navn.length === 1 && new RegExp(`^${escRegex(navn[0])}_?\\d+$`, "i").test(g.var)) per[navn[0]].push(g.v);
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

/**
 * Svartypen til en fasit, utledet av `svar` (og enhet). Den styrer hvordan elevsvaret tolkes, og gir en oversikt over hvilke
 * oppgaver som sjekkes automatisk. Oppgaver uten fasit i SLUTTSVAR, og fasit med `selvvurder`, er «selvvurdering».
 */
export type Svartype =
  | "tall"
  | "tall med enhet"
  | "flere tall"
  | "uttrykk"
  | "løsningsmengde"
  | "punkt"
  | "intervall"
  | "valg"
  | "serie"
  | "selvvurdering";

export function svartype(fasit: Sluttsvar | undefined): Svartype {
  if (!fasit || fasit.selvvurder) return "selvvurdering";
  const s = fasit.svar;
  switch (s.type) {
    case "tall":
      return s.verdier.length > 1 ? "flere tall" : fasit.enhet?.length ? "tall med enhet" : "tall";
    case "uttrykk":
      return "uttrykk";
    case "likning":
      return "løsningsmengde";
    case "punkt":
      return "punkt";
    case "omrade":
    case "ulikhet":
      return "intervall";
    case "valg":
      return "valg";
    case "serie":
      return "serie";
  }
}

/** Er sluttsvaret riktig? Tomt svar er feil. */
export function sjekkSluttsvar(input: string, fasit: Sluttsvar): boolean {
  if (!input || !input.trim()) return false;
  // «k≠4» og «k er ikke 4» er det motsatte av «k=4».
  if (/≠|!=|<>|\b(?:ikke|aldri|forskjellig|ulik)\b/i.test(normaliser(input).replace(IKKE_OKNING, " "))) return false;
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
    case "deg":
      return `${paren(n.a, 5)}^{\\circ}`;
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
