/* Kapittel 5-figurer (DesignBOT). Farger via CSS-variabler så de følger mørk/lys modus.
 * role="img" + <title>/<desc> (aria-labelledby) for skjermlesere — samme mønster som task-figures.ts. */
const C = {
  ink: "currentColor",
  pri: "var(--primary-light, #818cf8)",
  acc: "var(--accent, #34d399)",
  hint: "var(--hint-color, #f59e0b)",
  priFill: "var(--primary-glow, rgba(99,102,241,0.18))",
  accFill: "var(--accent-glow, rgba(52,211,153,0.18))",
};
let seq = 0;
function wrapA11y(svg: string, vb: string, title: string, desc: string, caption: string): string {
  const id = `tf5-${++seq}`;
  return `<figure class="task-figure"><svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="100%" role="img" aria-labelledby="${id}-t ${id}-d" font-family="Inter, -apple-system, BlinkMacSystemFont, sans-serif"><title id="${id}-t">${title}</title><desc id="${id}-d">${desc}</desc>${svg}</svg><figcaption>${caption}</figcaption></figure>`;
}
function pill(x: number, y: number, text: string, color: string, w: number): string {
  return `<rect x="${x - w / 2}" y="${y - 15}" width="${w}" height="22" rx="11" style="fill:var(--bg-surface, #111827);stroke:${color}" stroke-width="1.2"/><text x="${x}" y="${y + 1}" text-anchor="middle" font-size="15" font-weight="700" style="fill:${color}">${text}</text>`;
}

/** 5.33: rettvinklet trekant, korteste katet 12, katet b, hypotenus c = b + 4 (skjematisk). */
export function fig533(): string {
  const A = [80, 200], B = [320, 200], Cc = [80, 20];
  const svg = `
    <polygon points="${A} ${B} ${Cc}" style="fill:${C.accFill};stroke:${C.ink}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M${A[0]} ${A[1] - 18} h18 v18" style="stroke:${C.ink}" stroke-width="1.8" fill="none"/>
    <line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}" style="stroke:${C.pri}" stroke-width="4" stroke-linecap="round"/>
    <line x1="${A[0]}" y1="${A[1]}" x2="${Cc[0]}" y2="${Cc[1]}" style="stroke:${C.hint}" stroke-width="4" stroke-linecap="round"/>
    <line x1="${Cc[0]}" y1="${Cc[1]}" x2="${B[0]}" y2="${B[1]}" style="stroke:${C.acc}" stroke-width="4" stroke-linecap="round"/>
    ${pill((A[0] + B[0]) / 2, 226, "b", C.pri, 30)}
    ${pill(48, (A[1] + Cc[1]) / 2 + 5, "12", C.hint, 38)}
    ${pill((Cc[0] + B[0]) / 2 + 30, (Cc[1] + B[1]) / 2 - 8, "c = b + 4", C.acc, 92)}`;
  return wrapA11y(
    svg,
    "0 10 420 230",
    "Rettvinklet trekant",
    "Rettvinklet trekant med rett vinkel nede til venstre. Den korteste kateten er 12, den andre kateten er b, og hypotenusen er c, som er lik b pluss 4. Figuren er ikke i målestokk.",
    "Korteste side $12$, katet $b$ og hypotenus $c=b+4$.",
  );
}

/** Rektangel med sidene x og y, valgfritt med diagonal. */
function rectXY(opts: { diag?: string; inside?: string; title: string; desc: string; caption: string }): string {
  const x = 70, y = 30, w = 260, h = 140;
  const diag = opts.diag
    ? `<line x1="${x}" y1="${y + h}" x2="${x + w}" y2="${y}" style="stroke:${C.acc}" stroke-width="3" stroke-dasharray="7 5" stroke-linecap="round"/>
       <g transform="translate(${x + w / 2 + 14} ${y + h / 2 - 14}) rotate(-28.3)">${pill(0, 5, opts.diag, C.acc, 64)}</g>`
    : "";
  const inside = opts.inside
    ? `<text x="${x + w / 2}" y="${y + h - 22}" text-anchor="middle" font-size="14" font-weight="600" style="fill:${C.ink}">${opts.inside}</text>`
    : "";
  const svg = `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" style="fill:${C.priFill};stroke:${C.ink}" stroke-width="2.4"/>
    ${diag}${inside}
    ${pill(x + w / 2, y + h + 26, "x", C.pri, 30)}
    ${pill(x + w + 24, y + h / 2 + 5, "y", C.hint, 30)}`;
  return wrapA11y(svg, "0 10 420 210", opts.title, opts.desc, opts.caption);
}

/** 5.30: rektangel med sidene x og y, omkrets 22 cm og areal 24 cm². */
export function fig530(): string {
  return rectXY({
    inside: "omkrets 22 cm · areal 24 cm²",
    title: "Rektangel med sidene x og y",
    desc: "Rektangel der den vannrette siden er x og den loddrette siden er y. Omkretsen er 22 centimeter og arealet er 24 kvadratcentimeter.",
    caption: "Sidene $x$ og $y$ er ukjente.",
  });
}

/** 5.36: rektangel med sidene x og y, diagonal 13 m og areal 60 m². */
export function fig536(): string {
  return rectXY({
    diag: "13 m",
    inside: "areal 60 m²",
    title: "Rektangel med diagonal",
    desc: "Rektangel der den vannrette siden er x og den loddrette siden er y. Diagonalen fra nedre venstre til øvre høyre hjørne er 13 meter, og arealet er 60 kvadratmeter.",
    caption: "Diagonalen deler rektangelet i to rettvinklede trekanter med kateter $x$ og $y$.",
  });
}

type Tick = { label: string; kind: "zero" | "pole"; included?: boolean };
const SIGN_WORD = (s: string) => (s === "+" ? "positiv" : "negativ");
const SPOKEN = (l: string) => l.replace("−", "minus ");

/** Beskrivende tekst for en fortegnslinje: «positiv før −3, negativ mellom −3 og 1 …». */
export function describeSigns(ticks: { label: string; kind: "zero" | "pole"; included?: boolean }[], signs: string[]): string {
  const parts: string[] = [];
  parts.push(`${SIGN_WORD(signs[0]!)} før ${SPOKEN(ticks[0]!.label)}`);
  for (let i = 1; i < ticks.length; i++) {
    parts.push(`${SIGN_WORD(signs[i]!)} mellom ${SPOKEN(ticks[i - 1]!.label)} og ${SPOKEN(ticks[i]!.label)}`);
  }
  parts.push(`${SIGN_WORD(signs[ticks.length]!)} etter ${SPOKEN(ticks[ticks.length - 1]!.label)}`);
  const marks = ticks
    .map((t) =>
      t.kind === "pole"
        ? `${SPOKEN(t.label)} er pol og er ikke med`
        : `${SPOKEN(t.label)} er nullpunkt${t.included === false ? " og er ikke med" : t.included ? " og er med" : ""}`,
    )
    .join(", ");
  return `Fortegnslinje: ${parts.join(", ")}. ${marks[0]!.toUpperCase()}${marks.slice(1)}.`;
}

/** Fortegnslinje for et rasjonalt uttrykk: fylt prikk = nullpunkt (med), × = pol (ikke med). */
function signLine(label: string, ticks: Tick[], signs: string[], caption: string): string {
  const w = 420, y = 50, x0 = 20, x1 = w - 20;
  const n = ticks.length;
  const xs = ticks.map((_, i) => 70 + ((w - 140) * i) / Math.max(n - 1, 1));
  const bounds = [x0 + 4, ...xs, x1 - 12];
  const segs = signs
    .map((s, i) => {
      const a = bounds[i]! + (i === 0 ? 0 : 9), b = bounds[i + 1]! - (i === signs.length - 1 ? 0 : 9);
      const neg = s !== "+";
      return `<line x1="${a}" y1="${y}" x2="${b}" y2="${y}" style="stroke:${neg ? C.hint : C.acc}" stroke-width="4" stroke-dasharray="${neg ? "6 5" : "0"}"/>
        <text x="${(a + b) / 2}" y="${y - 12}" text-anchor="middle" font-size="17" font-weight="700" style="fill:${neg ? C.hint : C.acc}">${neg ? "−" : "+"}</text>`;
    })
    .join("");
  const marks = ticks
    .map((t, i) => {
      const x = xs[i]!;
      const m =
        t.kind === "pole"
          ? `<text x="${x}" y="${y + 6}" text-anchor="middle" font-size="18" font-weight="700" style="fill:${C.ink}">×</text>`
          : t.included === false
            ? `<circle cx="${x}" cy="${y}" r="5" style="fill:var(--bg-surface, #111827);stroke:${C.ink}" stroke-width="2"/>`
            : `<circle cx="${x}" cy="${y}" r="5.5" style="fill:${C.ink}"/>`;
      return `${m}<text x="${x}" y="${y + 26}" text-anchor="middle" font-size="14" font-weight="700" style="fill:${C.ink}">${t.label}</text>`;
    })
    .join("");
  const svg = `
    <text x="${x0}" y="16" font-size="13" font-weight="700" style="fill:${C.ink}">${label}</text>
    <line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" style="stroke:${C.ink}" stroke-width="1.6"/>
    <polygon points="${x1},${y} ${x1 - 10},${y - 5} ${x1 - 10},${y + 5}" style="fill:${C.ink}"/>
    ${segs}${marks}`;
  return wrapA11y(svg, "0 0 420 90", "Fortegnslinje", describeSigns(ticks, signs), caption);
}

/** 5.58 fasit: (2−x)/((x−6)(x+6)). Poler −6 og 6, nullpunkt 2. */
export function fig558Fasit(): string {
  return signLine(
    "(2 − x) / ((x − 6)(x + 6))",
    [
      { label: "−6", kind: "pole" },
      { label: "2", kind: "zero", included: false },
      { label: "6", kind: "pole" },
    ],
    ["+", "−", "+", "−"],
    "Fortegnslinje: × er pol, hul prikk er nullpunkt som ikke er med (ulikheten er streng).",
  );
}

/** 5.60 fasit: (x+3)(x−3)/((x−1)(x−6)). Nullpunkt ±3 (med), poler 1 og 6 (uten). */
export function fig560Fasit(): string {
  return signLine(
    "(x + 3)(x − 3) / ((x − 1)(x − 6))",
    [
      { label: "−3", kind: "zero", included: true },
      { label: "1", kind: "pole" },
      { label: "3", kind: "zero", included: true },
      { label: "6", kind: "pole" },
    ],
    ["+", "−", "+", "−", "+"],
    "Fortegnslinje: fylt prikk er nullpunkt som er med, × er pol som ikke er med.",
  );
}

export const KAP5_FIGURES: Record<string, string> = {
  "5.30": fig530(),
  "5.33": fig533(),
  "5.36": fig536(),
};

export const KAP5_FASIT_FIGURES: Record<string, Record<number, string>> = {
  "5.58": { 0: fig558Fasit() },
  "5.60": { 0: fig560Fasit() },
};
