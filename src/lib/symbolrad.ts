/**
 * Spesialtegn under sluttsvarfeltet: hvilke som vises, og hva hvert tegn setter inn.
 * Ren TypeScript uten DOM og uten «@/»-importer, så den kan testes i node.
 */

export type SymbolGruppe = "mengde" | "rot" | "ulikhet" | "pi" | "pm" | "grader";

export type Spesialtegn = {
  /** Det eleven ser på knappen. */
  tegn: string;
  /** LaTeX som settes inn i formelfeltet. `#?` er en tom plass markøren hopper til. */
  latex: string;
  /** Det vanlige tekstfeltet (uten MathLive) får dette tegnet. */
  tekst: string;
  /** Norsk navn, brukes som aria-label og tooltip. */
  navn: string;
  gruppe: SymbolGruppe;
};

export const SPESIALTEGN: Spesialtegn[] = [
  { tegn: "∈", latex: "\\in", tekst: "∈", navn: "er element i", gruppe: "mengde" },
  { tegn: "∉", latex: "\\notin", tekst: "∉", navn: "ikke element i", gruppe: "mengde" },
  { tegn: "ℕ", latex: "\\mathbb{N}", tekst: "ℕ", navn: "naturlige tall", gruppe: "mengde" },
  { tegn: "ℤ", latex: "\\mathbb{Z}", tekst: "ℤ", navn: "hele tall", gruppe: "mengde" },
  { tegn: "ℚ", latex: "\\mathbb{Q}", tekst: "ℚ", navn: "rasjonale tall", gruppe: "mengde" },
  { tegn: "ℝ", latex: "\\mathbb{R}", tekst: "ℝ", navn: "reelle tall", gruppe: "mengde" },
  { tegn: "√", latex: "\\sqrt{#?}", tekst: "√", navn: "kvadratrot", gruppe: "rot" },
  { tegn: "π", latex: "\\pi", tekst: "π", navn: "pi", gruppe: "pi" },
  { tegn: "≤", latex: "\\le", tekst: "≤", navn: "mindre enn eller lik", gruppe: "ulikhet" },
  { tegn: "≥", latex: "\\ge", tekst: "≥", navn: "større enn eller lik", gruppe: "ulikhet" },
  { tegn: "≠", latex: "\\ne", tekst: "≠", navn: "ikke lik", gruppe: "ulikhet" },
  { tegn: "±", latex: "\\pm", tekst: "±", navn: "pluss eller minus", gruppe: "pm" },
  { tegn: "°", latex: "^\\circ", tekst: "°", navn: "grader", gruppe: "grader" },
];

/** Vises når verken fasit, oppgavetekst eller eksplisitt liste peker på noe annet. */
export const STANDARD_GRUPPER: SymbolGruppe[] = ["rot", "pi", "pm", "grader"];

/** Tegn i oppgaveteksten (HTML med LaTeX) som tilsier en gruppe. */
const SIGNAL: Record<SymbolGruppe, RegExp> = {
  mengde: /\\in(?![A-Za-z])|\\notin|\\mathbb\s*\{\s*[NZQR]\s*\}|[∈∉ℕℤℚℝ]|tallmengd|element\s+i\b/i,
  rot: /\\sqrt|√|kvadratrot|\bsqrt\b/i,
  ulikhet: /\\(?:le|leq|ge|geq|ne|neq)(?![A-Za-z])|[≤≥≠]|ulikhet/i,
  pi: /\\pi(?![A-Za-z])|π/,
  pm: /\\pm(?![A-Za-z])|±/,
  grader: /\^\s*\{?\s*\\circ|\\degree|°|\bgrader\b/i,
};

/** Hva fasiten selv sier: tilhører-oppgaver trenger mengdetegn, ulikheter trenger ≤ ≥, røtter trenger √. */
function grupperFraFasit(fasit?: { svar?: unknown; alternativer?: unknown[] }): SymbolGruppe[] {
  if (!fasit) return [];
  const ut = new Set<SymbolGruppe>();
  const gaa = (s: unknown): void => {
    if (!s || typeof s !== "object") return;
    const o = s as { type?: string; ulikhet?: string; uttrykk?: string; deler?: unknown[] };
    if (o.type === "relasjon") ut.add("mengde");
    if (o.type === "ulikhet" || o.ulikhet) ut.add("ulikhet");
    if (o.type === "uttrykk" && typeof o.uttrykk === "string" && /sqrt|√/.test(o.uttrykk)) ut.add("rot");
    if (Array.isArray(o.deler)) o.deler.forEach(gaa);
  };
  gaa(fasit.svar);
  fasit.alternativer?.forEach(gaa);
  return [...ut];
}

/**
 * Spesialtegnene til en oppgave, i fast rekkefølge:
 *  1. `fasit.symboler`, hvis satt (eksplisitt liste med grupper).
 *  2. Ellers grupper utledet fra fasitens svartype og fra oppgaveteksten.
 *  3. Finnes ingen signaler: standardsettet (√ π ± °).
 */
export function symbolerFor(fasit?: { svar?: unknown; alternativer?: unknown[]; symboler?: SymbolGruppe[] }, oppgavetekst?: string): Spesialtegn[] {
  let grupper: SymbolGruppe[];
  if (fasit?.symboler) {
    grupper = fasit.symboler;
  } else {
    const fraTekst = (Object.keys(SIGNAL) as SymbolGruppe[]).filter((g) => oppgavetekst && SIGNAL[g].test(oppgavetekst));
    const funnet = new Set<SymbolGruppe>([...grupperFraFasit(fasit), ...fraTekst]);
    grupper = funnet.size ? [...funnet] : STANDARD_GRUPPER;
  }
  const valgt = new Set(grupper);
  return SPESIALTEGN.filter((s) => valgt.has(s.gruppe));
}
