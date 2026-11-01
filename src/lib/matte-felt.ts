/**
 * Adapter mellom MathLive (LaTeX) og svarfeltets lagrede «ren tekst».
 *
 * Eleven skriver i et <math-field>. Det som lagres, sendes til
 * `sjekkSluttsvar` og vises i resultatlisten er fortsatt vanlig tekst i
 * samme stil som før (`x^2`, `x^(1/2)`, `sqrt(2)`, `(x+1)/(x-1)`, `2,5`,
 * `x=1, x=6`), så parseren i svar-sjekk.ts er upåvirket.
 *
 *  - latexTilSvartekst(latex): MathLive → tekst som lagres/sjekkes.
 *  - svartekstTilLatex(tekst): gammel lagret tekst → LaTeX til feltet.
 *
 * Ren TypeScript uten DOM og uten "@/"-importer, så den kan testes i node.
 * Regler: desimalkomma beholdes, minus blir ASCII "-", komma som ikke står
 * mellom to sifre blir ", " (kommaseparator), og alle sammensatte brøker,
 * røtter og eksponenter får akkurat nok parenteser til at svar-sjekk.ts
 * leser dem likt som eleven mente.
 */

/* ───────────────────────── LaTeX → tekst ───────────────────────── */

type N =
  | { t: "c"; v: string }
  | { t: "cmd"; v: string }
  | { t: "grp"; ch: N[] }
  | { t: "sup"; a: N[] }
  | { t: "sub"; a: N[] }
  | { t: "frac"; n: N[]; d: N[] }
  | { t: "sqrt"; idx: N[] | null; a: N[] }
  | { t: "fence"; o: string; c: string; ch: N[] }
  | { t: "text"; s: string };

const TEKST_KOMMANDOER = new Set([
  "text",
  "textrm",
  "textit",
  "textbf",
  "mathrm",
  "mathit",
  "mathbf",
  "mathsf",
  "mathtt",
  "operatorname",
  "mbox",
  "mathop",
]);

class LatexParser {
  private i = 0;
  private readonly s: string;
  constructor(s: string) {
    this.s = s;
  }

  parse(): N[] {
    const ut = this.seq();
    // Overskytende «}» eller «\right» (ubalansert) ignoreres.
    return ut;
  }

  private seq(): N[] {
    const ut: N[] = [];
    while (this.i < this.s.length) {
      const c = this.s[this.i];
      if (c === "}") break;
      if (c === "\\" && this.peekCmd() === "right") break;
      const n = this.node();
      if (n) ut.push(n);
    }
    return ut;
  }

  private peekCmd(): string {
    const m = /^\\([A-Za-z]+|.)/s.exec(this.s.slice(this.i));
    return m ? m[1] : "";
  }

  private skipWs() {
    while (this.i < this.s.length && /\s/.test(this.s[this.i])) this.i++;
  }

  /** Ett argument: {…} eller ett enkelt tegn/kommando (\frac12, \sqrt2). */
  private arg(): N[] {
    this.skipWs();
    if (this.s[this.i] === "{") {
      this.i++;
      const inn = this.seq();
      if (this.s[this.i] === "}") this.i++;
      return inn;
    }
    if (this.i >= this.s.length || this.s[this.i] === "}") return [];
    const n = this.node();
    return n ? [n] : [];
  }

  private node(): N | null {
    const c = this.s[this.i];
    if (/\s/.test(c)) {
      this.i++;
      return null;
    }
    if (c === "{") {
      this.i++;
      const inn = this.seq();
      if (this.s[this.i] === "}") this.i++;
      return { t: "grp", ch: inn };
    }
    if (c === "^") {
      this.i++;
      return { t: "sup", a: this.arg() };
    }
    if (c === "_") {
      this.i++;
      return { t: "sub", a: this.arg() };
    }
    if (c === "~") {
      this.i++;
      return { t: "c", v: " " };
    }
    if (c === "\\") return this.command();
    this.i++;
    return { t: "c", v: c };
  }

  private command(): N | null {
    const m = /^\\([A-Za-z]+|.)/s.exec(this.s.slice(this.i));
    if (!m) {
      this.i++;
      return null;
    }
    const navn = m[1];
    this.i += m[0].length;
    if (navn === "frac" || navn === "dfrac" || navn === "tfrac") {
      const n = this.arg();
      const d = this.arg();
      return { t: "frac", n, d };
    }
    if (navn === "sqrt") {
      this.skipWs();
      let idx: N[] | null = null;
      if (this.s[this.i] === "[") {
        const slutt = this.s.indexOf("]", this.i);
        if (slutt > 0) {
          idx = new LatexParser(this.s.slice(this.i + 1, slutt)).parse();
          this.i = slutt + 1;
        }
      }
      return { t: "sqrt", idx, a: this.arg() };
    }
    if (navn === "left") {
      this.skipWs();
      const o = this.delim();
      const ch = this.seq();
      let c = "";
      if (this.peekCmd() === "right") {
        this.i += "\\right".length;
        this.skipWs();
        c = this.delim();
      }
      return { t: "fence", o, c, ch };
    }
    if (TEKST_KOMMANDOER.has(navn)) {
      return { t: "text", s: tilTekstUtenStruktur(this.arg()) };
    }
    if (navn === "mathbb") {
      // \mathbb{Z} → ℤ: tallmengdene lagres som ett tegn (svar-sjekk.ts leser dem som N, Z, Q, R).
      const bokstav = tilTekstUtenStruktur(this.arg()).trim();
      return { t: "text", s: TALLMENGDE[bokstav] ?? bokstav };
    }
    if (navn === "placeholder") {
      this.arg();
      return null;
    }
    return { t: "cmd", v: navn };
  }

  private delim(): string {
    const c = this.s[this.i];
    if (c === "\\") {
      const m = /^\\([A-Za-z]+|.)/s.exec(this.s.slice(this.i));
      if (m) {
        this.i += m[0].length;
        return "\\" + m[1];
      }
    }
    this.i++;
    return c ?? "";
  }
}

function tilTekstUtenStruktur(ch: N[]): string {
  return ch
    .map((n) => {
      if (n.t === "c") return n.v;
      if (n.t === "grp") return tilTekstUtenStruktur(n.ch);
      if (n.t === "text") return n.s;
      if (n.t === "cmd") return KOMMANDO_TEGN[n.v] ?? "";
      return "";
    })
    .join("");
}

/** \mathbb{N} osv. ↔ tegnene som lagres i svarteksten. */
const TALLMENGDE: Record<string, string> = { N: "ℕ", Z: "ℤ", Q: "ℚ", R: "ℝ" };

const GRESK: Record<string, string> = {
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  varepsilon: "ε",
  theta: "θ",
  vartheta: "θ",
  lambda: "λ",
  mu: "μ",
  rho: "ρ",
  sigma: "σ",
  tau: "τ",
  phi: "φ",
  varphi: "φ",
  omega: "ω",
  Delta: "Δ",
  Sigma: "Σ",
  Omega: "Ω",
};

const FUNKSJONER = new Set([
  "sin",
  "cos",
  "tan",
  "cot",
  "sec",
  "csc",
  "arcsin",
  "arccos",
  "arctan",
  "sinh",
  "cosh",
  "tanh",
  "ln",
  "log",
  "lg",
  "exp",
]);

/** LaTeX-kommandoer → tegn i svarteksten. */
const KOMMANDO_TEGN: Record<string, string> = {
  cdot: "*",
  times: "*",
  ast: "*",
  div: "/",
  pi: "pi",
  le: "<=",
  leq: "<=",
  leqslant: "<=",
  ge: ">=",
  geq: ">=",
  geqslant: ">=",
  ne: "!=",
  neq: "!=",
  // Mellomrom rundt: «x∈ℤ» lagres som «x ∈ ℤ» (rydding slår sammen doble mellomrom).
  in: " ∈ ",
  notin: " ∉ ",
  approx: "≈",
  pm: "±",
  mp: "∓",
  circ: "°",
  degree: "°",
  prime: "'",
  infty: "∞",
  surd: "√",
  minus: "-",
  vert: "|",
  mid: "|",
  lbrace: "{",
  rbrace: "}",
  lbrack: "[",
  rbrack: "]",
  lparen: "(",
  rparen: ")",
  backslash: "\\",
  wedge: "^",
  "%": "%",
  $: "$",
  "&": "&",
  "#": "#",
  _: "_",
  "{": "{",
  "}": "}",
  "|": "|",
  ",": " ",
  ";": " ",
  ":": " ",
  ">": " ",
  " ": " ",
  quad: " ",
  qquad: " ",
  "!": "",
  ...GRESK,
};

const FN_MARKOR = "\u0000";

/** Hører hele strengen til én parentes («(…)») på øverste nivå? */
function heleIParentes(s: string): boolean {
  if (s[0] !== "(" || s[s.length - 1] !== ")") return false;
  let d = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") d++;
    else if (s[i] === ")") {
      d--;
      if (d === 0 && i < s.length - 1) return false;
      if (d < 0) return false;
    }
  }
  return d === 0;
}

/** Funksjonskall som sqrt(…), sin(…): navn + én hel parentes. */
function erFunksjonskall(s: string): boolean {
  const m = /^[A-Za-z]+(?=\()/.exec(s);
  return !!m && heleIParentes(s.slice(m[0].length));
}

/** Kan strengen stå som teller/nevner/eksponent uten ekstra parentes? */
function erAtom(s: string): boolean {
  if (s === "") return true;
  const pot = /^(.*?)\^(\d+|[A-Za-z]|\([^]*\))$/s.exec(s);
  const grunn = pot && grunnErAtom(pot[1]) && (pot[2][0] !== "(" || heleIParentes(pot[2])) ? pot[1] : s;
  return grunnErAtom(grunn);
}
function grunnErAtom(s: string): boolean {
  return (
    /^\d+(?:[.,]\d+)?$/.test(s) ||
    /^[A-Za-zα-ωΑ-Ω]$/.test(s) ||
    s === "pi" ||
    heleIParentes(s) ||
    erFunksjonskall(s)
  );
}

function iParentes(s: string): string {
  return erAtom(s) || heleIParentes(s) ? s : `(${s})`;
}

/** Ett enkelt ledd uten ytterparentes hvis det er en hel «(…)»-gruppe. */
function utenYtterparentes(ch: N[]): N[] {
  const sig = ch.filter((n) => !(n.t === "c" && /\s/.test(n.v)));
  if (sig.length === 1) {
    const n = sig[0];
    if (n.t === "fence" && n.o === "(" && n.c === ")") return n.ch;
    if (n.t === "grp") return utenYtterparentes(n.ch);
  }
  return ch;
}

const ERHALE = (n: N): boolean =>
  (n.t === "c" && /^[\s,;]$/.test(n.v)) ||
  (n.t === "cmd" && /^[;,: ]$/.test(n.v)) || (n.t === "grp" && n.ch.length > 0 && n.ch.every(ERHALE));

/**
 * Komma/semikolon/mellomrom helt på slutten av en brøk, potens eller rot hører til listen rundt,
 * ikke til nevneren: «1/2, x=3» skrives i MathLive med «,» inni nevneren til eleven hopper ut.
 */
function skillHale(ch: N[]): { kropp: N[]; hale: string } {
  let i = ch.length;
  while (i > 0 && ERHALE(ch[i - 1])) i--;
  const hale = ser(ch.slice(i))
    .replace(/\s+/g, " ")
    .trimEnd();
  return { kropp: ch.slice(0, i), hale: hale && !/^\s*$/.test(hale) ? hale : "" };
}

function ser(ch: N[]): string {
  let ut = "";
  for (const n of ch) {
    switch (n.t) {
      case "c": {
        if (/\s/.test(n.v)) {
          ut += " ";
        } else if (n.v === "−" || n.v === "–" || n.v === "‐") ut += "-";
        else if (n.v === "·" || n.v === "×" || n.v === "⋅") ut += "*";
        else if (n.v === "÷") ut += "/";
        else if (n.v === "≤") ut += "<=";
        else if (n.v === "≥") ut += ">=";
        else if (n.v === "≠") ut += "!=";
        else if (n.v === "π") ut += "pi";
        else ut += n.v;
        break;
      }
      case "cmd": {
        if (FUNKSJONER.has(n.v)) {
          ut += n.v + FN_MARKOR;
        } else if (n.v in KOMMANDO_TEGN) {
          ut += KOMMANDO_TEGN[n.v];
        }
        // ukjente kommandoer droppes
        break;
      }
      case "grp":
        ut += ser(n.ch);
        break;
      case "text":
        ut += n.s;
        break;
      case "sup": {
        const a = n.a.filter((x) => !(x.t === "c" && /\s/.test(x.v)));
        if (a.length === 1 && a[0].t === "cmd" && (a[0].v === "circ" || a[0].v === "degree")) {
          ut += "°";
          break;
        }
        if (a.length === 1 && a[0].t === "cmd" && a[0].v === "prime") {
          ut += "'";
          break;
        }
        const { kropp, hale } = skillHale(n.a);
        const e = ser(utenYtterparentes(kropp)).trim();
        ut += "^" + (/^(\d+|[A-Za-z])$/.test(e) ? e : `(${e})`) + hale;
        break;
      }
      case "sub": {
        const e = ser(n.a).trim();
        ut += "_" + (/^[A-Za-z0-9]+$/.test(e) ? e : `(${e})`);
        break;
      }
      case "frac": {
        const t = ser(utenYtterparentes(n.n)).trim();
        const { kropp, hale } = skillHale(n.d);
        const nv = ser(utenYtterparentes(kropp)).trim();
        ut += `${iParentes(t)}/${iParentes(nv)}${hale}`;
        break;
      }
      case "sqrt": {
        const { kropp, hale } = skillHale(n.a);
        const a = ser(utenYtterparentes(kropp)).trim();
        if (n.idx) {
          const i = ser(n.idx).trim();
          ut += `(${a})^(1/${iParentes(i)})${hale}`;
        } else {
          ut += `sqrt(${a})${hale}`;
        }
        break;
      }
      case "fence": {
        const inn = ser(n.ch);
        if (n.o === "|" || n.o === "\\vert" || n.o === "\\|") ut += `abs(${inn.trim()})`;
        else {
          const o = n.o === "." ? "" : (KOMMANDO_TEGN[n.o.slice(1)] ?? n.o);
          const c = n.c === "." ? "" : (KOMMANDO_TEGN[n.c.slice(1)] ?? n.c);
          ut += o + inn + c;
        }
        break;
      }
    }
  }
  return ut;
}

/** Rydder opp i mellomrom, komma og funksjonsmarkører etter serialisering. */
function ryddSvartekst(s: string): string {
  return (
    s
      // «2x√3» → «2x*sqrt(3)»: ellers leses «xsqrt» som ett ord.
      .replace(/(?<![A-Za-z])([A-Za-z])(?=(?:sqrt|abs|sin|cos|tan|ln|log|lg|exp|pi)\b)/g, "$1*")
      .replace(new RegExp(`${FN_MARKOR}(?=\\()`, "g"), "")
      .replace(new RegExp(`${FN_MARKOR}\\s*$`), "")
      .replace(new RegExp(FN_MARKOR, "g"), " ")
      // Komma mellom to sifre er desimalkomma. Alle andre komma er skilletegn.
      .replace(/\s*,(?!\d)\s*/g, ", ")
      .replace(/\s+/g, " ")
      .replace(/,\s*$/, ",")
      .trim()
  );
}

/** MathLive-LaTeX → vanlig svartekst som lagres og sjekkes. */
export function latexTilSvartekst(latex: string): string {
  if (!latex) return "";
  return ryddSvartekst(ser(new LatexParser(latex).parse()));
}

/* ───────────────────────── tekst → LaTeX ───────────────────────── */

type Ledd = { tex: string; operand: boolean; paren?: string; potens?: boolean };

const FUNK_ORD = new Set([...FUNKSJONER, "abs"]);

const SUPER: Record<string, string> = {
  "⁰": "0",
  "¹": "1",
  "²": "2",
  "³": "3",
  "⁴": "4",
  "⁵": "5",
  "⁶": "6",
  "⁷": "7",
  "⁸": "8",
  "⁹": "9",
  "⁻": "-",
};

class TekstParser {
  private i = 0;
  private readonly s: string;
  constructor(s: string) {
    this.s = s;
  }

  tilLatex(): string {
    const ledd = this.rekke(this.s.length);
    // «\\cdot» + «x» må ikke bli «\\cdotx»: legg inn mellomrom etter kommandonavn før en bokstav.
    return ledd
      .map((l) => (/\\[A-Za-z]+$/.test(l.tex) ? l.tex + " " : l.tex))
      .join("")
      .trimEnd();
  }

  /** Match for «(» på posisjon i: indeks til tilhørende «)», ellers -1. */
  private matchParen(fra: number, slutt: number): number {
    let d = 0;
    for (let k = fra; k < slutt; k++) {
      if (this.s[k] === "(") d++;
      else if (this.s[k] === ")") {
        d--;
        if (d === 0) return k;
      }
    }
    return -1;
  }

  /** Match for «{» på posisjon fra: indeks til tilhørende «}», ellers -1. */
  private matchGruppe(fra: number, slutt: number): number {
    let d = 0;
    for (let k = fra; k < slutt; k++) {
      if (this.s[k] === "{") d++;
      else if (this.s[k] === "}") {
        d--;
        if (d === 0) return k;
      }
    }
    return -1;
  }

  private rekke(slutt: number): Ledd[] {
    const ledd: Ledd[] = [];
    while (this.i < slutt) {
      const l = this.neste(ledd, slutt);
      if (l) ledd.push(l);
    }
    return ledd;
  }

  private sist(ledd: Ledd[]): Ledd | undefined {
    return ledd[ledd.length - 1];
  }

  private ignorerer(c: string) {
    return /\s/.test(c);
  }

  /** Kan et operand begynne på posisjon i? (brukes etter / og ^) */
  private begynnerOperand(p: number): boolean {
    let k = p;
    if (this.s[k] === "-" || this.s[k] === "−") k++;
    const c = this.s[k];
    if (c === undefined) return false;
    return /[\dA-Za-zπ√α-ω(]/.test(c);
  }

  /** Ett primært ledd: tall, bokstav, funksjonskall, (…), √… med valgfri potens. */
  private primær(slutt: number): Ledd {
    let fortegn = "";
    if (this.s[this.i] === "-" || this.s[this.i] === "−") {
      fortegn = "-";
      this.i++;
    }
    const t = this.atom(slutt);
    return { ...t, tex: fortegn + t.tex, operand: true };
  }

  private atom(slutt: number): Ledd {
    const c = this.s[this.i];
    const rest = this.s.slice(this.i, slutt);
    let m: RegExpExecArray | null;
    if ((m = /^\d+(?:[.,]\d+)?/.exec(rest))) {
      this.i += m[0].length;
      return { tex: m[0].replace(",", "{,}"), operand: true };
    }
    if (c === "(") {
      const k = this.matchParen(this.i, slutt);
      if (k > 0) {
        const start = this.i;
        this.i++;
        const inn = this.rekke(k);
        this.i = k + 1;
        void start;
        const innTex = inn.map((l) => l.tex).join("");
        return { tex: `\\left(${innTex}\\right)`, operand: true, paren: innTex };
      }
      this.i++;
      return { tex: "(", operand: false };
    }
    if (c === "√") {
      this.i++;
      return this.rot(slutt);
    }
    if ((m = /^[A-Za-zÆØÅæøåα-ωΑ-Ω]+/.exec(rest))) {
      const ord = m[0];
      if (ord === "sqrt" || ord === "rot") {
        this.i += ord.length;
        return this.rot(slutt);
      }
      if (ord === "pi") {
        this.i += 2;
        return { tex: "\\pi", operand: true };
      }
      const fn = [...FUNK_ORD].find((f) => ord.startsWith(f) && ord === f);
      if (fn) {
        this.i += ord.length;
        const navn = fn === "abs" ? "\\operatorname{abs}" : `\\${fn}`;
        if (this.s[this.i] === "(") {
          const p = this.atom(slutt);
          return { tex: navn + p.tex, operand: true };
        }
        return { tex: navn + "\\;", operand: false };
      }
      // Vanlig ord: én bokstav om gangen (x, y, "og", "kr" …)
      this.i += 1;
      return { tex: ord[0], operand: true };
    }
    if (c === "π") {
      this.i++;
      return { tex: "\\pi", operand: true };
    }
    this.i++;
    return { tex: tegnTilLatex(c), operand: false };
  }

  private rot(slutt: number): Ledd {
    if (this.s[this.i] === "(") {
      const k = this.matchParen(this.i, slutt);
      if (k > 0) {
        this.i++;
        const inn = this.rekke(k);
        this.i = k + 1;
        return { tex: `\\sqrt{${inn.map((l) => l.tex).join("")}}`, operand: true };
      }
    }
    if (this.begynnerOperand(this.i)) {
      const a = this.primær(slutt);
      return { tex: `\\sqrt{${a.paren ?? a.tex}}`, operand: true };
    }
    return { tex: "\\surd", operand: false };
  }

  private neste(ledd: Ledd[], slutt: number): Ledd | null {
    const c = this.s[this.i];
    if (c === undefined) return null;
    if (this.ignorerer(c)) {
      let nl = false;
      while (this.i < slutt && this.ignorerer(this.s[this.i])) {
        if (this.s[this.i] === "\n") nl = true;
        this.i++;
      }
      if (this.i >= slutt && ledd.length === 0) return null;
      return { tex: nl ? ";\\;" : "\\;", operand: false };
    }
    // LaTeX-kommando skrevet som tekst («\\frac{1}{2}», «\\cdot», «\\sqrt{3}»): backslash og kommandonavn
    // beholdes bokstavelig gjennom feltet, ellers ville «\\frac» blitt til «frac» etter rundturen.
    if (c === "\\") {
      this.i++;
      const navn = /^[A-Za-z]+/.exec(this.s.slice(this.i, slutt));
      if (navn) {
        this.i += navn[0].length;
        return { tex: "\\backslash " + navn[0], operand: false };
      }
      const tegn = this.s[this.i];
      if (tegn === undefined || this.ignorerer(tegn)) return { tex: "\\backslash", operand: false };
      this.i++;
      return { tex: "\\backslash" + (tegn === "," ? "{,}" : tegnTilLatex(tegn)), operand: false };
    }
    // Hevet skrift
    if (c in SUPER) {
      let e = "";
      while (this.i < slutt && this.s[this.i] in SUPER) e += SUPER[this.s[this.i++]];
      return this.potens(ledd, e, true);
    }
    if (c === "^" || c === "_") {
      const opp = c === "^";
      const forrige = this.sist(ledd);
      this.i++;
      // «10^{12}» (LaTeX-stil i lagret tekst): innholdet i {…} er eksponenten.
      if (forrige?.operand && this.s[this.i] === "{") {
        const k = this.matchGruppe(this.i, slutt);
        if (k > 0) {
          this.i++;
          const inn = this.rekke(k);
          this.i = k + 1;
          return this.potens(ledd, inn.map((l) => l.tex).join(""), opp);
        }
      }
      if (!forrige?.operand || !this.begynnerOperand(this.i)) {
        return { tex: opp ? "\\wedge" : "\\_", operand: false };
      }
      const e = this.primær(slutt);
      return this.potens(ledd, e.paren ?? e.tex, opp);
    }
    if (c === "/") {
      const forrige = this.sist(ledd);
      this.i++;
      if (!forrige?.operand || !this.begynnerOperand(this.i)) {
        return { tex: "/", operand: false };
      }
      const nevner = this.primær(slutt);
      ledd.pop();
      const teller = forrige.paren ?? forrige.tex;
      return { tex: `\\frac{${teller}}{${nevner.paren ?? nevner.tex}}`, operand: true };
    }
    if (c === "<" && this.s[this.i + 1] === "=") {
      this.i += 2;
      return { tex: "\\le", operand: false };
    }
    if (c === ">" && this.s[this.i + 1] === "=") {
      this.i += 2;
      return { tex: "\\ge", operand: false };
    }
    if (c === "!" && this.s[this.i + 1] === "=") {
      this.i += 2;
      return { tex: "\\ne", operand: false };
    }
    if (c === "-" || c === "−") {
      // Minus rett før tall/bokstav behandles som vanlig minus-tegn.
      this.i++;
      return { tex: "-", operand: false };
    }
    if (c === ",") {
      this.i++;
      return { tex: "{,}", operand: false };
    }
    return this.atom(slutt);
  }

  private potens(ledd: Ledd[], eksp: string, opp: boolean): Ledd | null {
    const base = ledd.pop();
    if (!base) return { tex: `^{${eksp}}`, operand: false };
    const b = base.potens ? `{${base.tex}}` : base.tex;
    return {
      tex: `${b}${opp ? "^" : "_"}{${eksp}}`,
      operand: true,
      potens: true,
    };
  }
}

function tegnTilLatex(c: string): string {
  switch (c) {
    case "*":
    case "·":
    case "×":
    case "⋅":
      return "\\cdot";
    case "÷":
      return "\\div";
    case "≤":
      return "\\le";
    case "≥":
      return "\\ge";
    case "≠":
      return "\\ne";
    case "≈":
      return "\\approx";
    case "±":
      return "\\pm";
    case "%":
      return "\\%";
    case "°":
      return "^\\circ";
    case "{":
      return "\\{";
    case "}":
      return "\\}";
    case "$":
      return "\\$";
    case "&":
      return "\\&";
    case "#":
      return "\\#";
    case "\\":
      return "\\backslash";
    case "|":
      return "\\vert";
    case "'":
    case "′":
      return "^{\\prime}";
    case "∞":
      return "\\infty";
    case "∈":
      return "\\in";
    case "∉":
      return "\\notin";
    case "ℕ":
    case "ℤ":
    case "ℚ":
    case "ℝ":
      return `\\mathbb{${"NZQR"["ℕℤℚℝ".indexOf(c)]}}`;
    case ")":
      return ")";
    default:
      return /[A-Za-z0-9+=<>!.;:()[\]-]/.test(c) ? c : `\\text{${c}}`;
  }
}

/** Gammel lagret svartekst → LaTeX som <math-field> kan vise. */
export function svartekstTilLatex(tekst: string): string {
  const t = (tekst ?? "").trim();
  if (!t) return "";
  return new TekstParser(t).tilLatex();
}
