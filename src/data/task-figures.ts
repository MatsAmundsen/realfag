/** Pedagogiske SVG-figurer til oppgaver. Bruker currentColor så de følger tema. */

/** SVG <text> kan ikke kjøre KaTeX — fjern $ og TeX-støy. */
function plain(s: string): string {
  return s
    .replace(/\$/g, "")
    .replace(/\\[,;:!]/g, "")
    .replace(/\\mathrm\{([^}]*)\}/g, "$1")
    .replace(/\\text\{([^}]*)\}/g, "$1")
    .replace(/\\(?:dfrac|tfrac|frac)/g, "")
    .replace(/[{}]/g, "")
    .replace(/\\le\b/g, "≤")
    .replace(/\\ge\b/g, "≥")
    .replace(/\\times/g, "×")
    .replace(/\\cdot/g, "·")
    .replace(/\\pi/g, "π")
    .replace(/\\,/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripSvgTex(svg: string): string {
  return svg.replace(/>([^<]*\$[^<]*)</g, (_m, t: string) => `>${plain(t)}<`);
}

function wrap(svg: string, caption: string, aria: string): string {
  return `<figure class="task-figure"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 220" width="100%" role="img" aria-label="${plain(aria)}">${stripSvgTex(svg)}</svg><figcaption>${caption}</figcaption></figure>`;
}

function wrapH(svg: string, caption: string, aria: string, h = 140): string {
  return `<figure class="task-figure"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 ${h}" width="100%" role="img" aria-label="${plain(aria)}">${stripSvgTex(svg)}</svg><figcaption>${caption}</figcaption></figure>`;
}

const ink = "currentColor";

/** Rektangel med sidemål. */
export function figRect(wLab: string, hLab: string, caption: string): string {
  const svg = `
    <rect x="70" y="36" width="250" height="140" rx="6" fill="rgba(99,102,241,0.12)" stroke="${ink}" stroke-width="2.2"/>
    <text x="195" y="28" text-anchor="middle" font-size="15" font-weight="700" fill="${ink}">${plain(wLab)}</text>
    <text x="338" y="112" text-anchor="middle" font-size="15" font-weight="700" fill="${ink}">${plain(hLab)}</text>
    <line x1="70" y1="22" x2="320" y2="22" stroke="${ink}" stroke-width="1.4"/>
    <line x1="70" y1="17" x2="70" y2="27" stroke="${ink}" stroke-width="1.4"/>
    <line x1="320" y1="17" x2="320" y2="27" stroke="${ink}" stroke-width="1.4"/>
    <line x1="334" y1="36" x2="334" y2="176" stroke="${ink}" stroke-width="1.4"/>
    <line x1="329" y1="36" x2="339" y2="36" stroke="${ink}" stroke-width="1.4"/>
    <line x1="329" y1="176" x2="339" y2="176" stroke="${ink}" stroke-width="1.4"/>`;
  return wrap(svg, caption, `Rektangel med sider ${plain(wLab)} og ${plain(hLab)}`);
}

/** To rektangler inni hverandre (ramme). */
export function figFrame(caption: string): string {
  const svg = `
    <rect x="50" y="28" width="300" height="170" rx="4" fill="rgba(99,102,241,0.16)" stroke="${ink}" stroke-width="2"/>
    <rect x="110" y="68" width="180" height="90" rx="3" fill="var(--bg-surface, #111827)" stroke="${ink}" stroke-width="2"/>
    <text x="200" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="${ink}">ytre: x+5 og x+2</text>
    <text x="200" y="122" text-anchor="middle" font-size="13" font-weight="700" fill="${ink}">indre: x+1 og x</text>`;
  return wrap(svg, caption, "Ramme: ytre rektangel minus indre åpning");
}

/** Rettvinklet trekant med grunnlinje og høyde. */
export function figRightTriangle(base: string, height: string, caption: string): string {
  const svg = `
    <polygon points="70,180 310,180 70,50" fill="rgba(52,211,153,0.12)" stroke="${ink}" stroke-width="2.2"/>
    <rect x="70" y="160" width="20" height="20" fill="none" stroke="${ink}" stroke-width="1.6"/>
    <text x="190" y="202" text-anchor="middle" font-size="15" font-weight="700" fill="${ink}">${plain(base)}</text>
    <text x="52" y="120" text-anchor="middle" font-size="15" font-weight="700" fill="${ink}">${plain(height)}</text>`;
  return wrap(svg, caption, `Rettvinklet trekant med grunnlinje ${plain(base)} og høyde ${plain(height)}`);
}

/** Sirkel med radius. */
export function figCircle(rLab: string, caption: string): string {
  const svg = `
    <circle cx="210" cy="110" r="78" fill="rgba(99,102,241,0.10)" stroke="${ink}" stroke-width="2.2"/>
    <line x1="210" y1="110" x2="288" y2="110" stroke="${ink}" stroke-width="1.8"/>
    <circle cx="210" cy="110" r="3.5" fill="${ink}"/>
    <text x="252" y="100" text-anchor="middle" font-size="16" font-weight="700" fill="${ink}">${plain(rLab)}</text>`;
  return wrap(svg, caption, `Sirkel med radius ${plain(rLab)}`);
}

/** Tallinje med åpen/lukket sirkel og skravering. */
export function figNumberLine(opts: {
  min: number;
  max: number;
  ticks: number[];
  from: number;
  to: number;
  openFrom?: boolean;
  openTo?: boolean;
  caption: string;
}): string {
  const y = 70;
  const pad = 36;
  const w = 420;
  const xAt = (v: number) => pad + ((v - opts.min) / (opts.max - opts.min)) * (w - 2 * pad);
  const ticks = opts.ticks
    .map((t) => {
      const x = xAt(t);
      return `<line x1="${x}" y1="${y - 7}" x2="${x}" y2="${y + 7}" stroke="${ink}" stroke-width="1.6"/>
        <text x="${x}" y="${y + 26}" text-anchor="middle" font-size="13" fill="${ink}">${t}</text>`;
    })
    .join("");
  const x1 = xAt(Math.max(opts.from, opts.min));
  const x2 = xAt(Math.min(opts.to, opts.max));
  const capFrom =
    opts.from <= opts.min
      ? `<polygon points="${pad - 8},${y} ${pad + 4},${y - 6} ${pad + 4},${y + 6}" fill="#6366f1"/>`
      : "";
  const capTo =
    opts.to >= opts.max
      ? `<polygon points="${w - pad + 8},${y} ${w - pad - 4},${y - 6} ${w - pad - 4},${y + 6}" fill="#6366f1"/>`
      : "";
  const end = (open: boolean | undefined, x: number) =>
    `<circle cx="${x}" cy="${y}" r="7" fill="${open ? "var(--bg-surface,#111827)" : "#6366f1"}" stroke="#6366f1" stroke-width="2.4"/>`;
  const showFrom = opts.from > opts.min && opts.from < opts.max;
  const showTo = opts.to > opts.min && opts.to < opts.max;
  const svg = `
    <line x1="${pad}" y1="${y}" x2="${w - pad}" y2="${y}" stroke="${ink}" stroke-width="2"/>
    <polygon points="${w - pad + 10},${y} ${w - pad - 2},${y - 6} ${w - pad - 2},${y + 6}" fill="${ink}"/>
    <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#6366f1" stroke-width="8" stroke-linecap="butt" opacity="0.45"/>
    ${capFrom}${capTo}${ticks}
    ${showFrom ? end(opts.openFrom, xAt(opts.from)) : ""}
    ${showTo ? end(opts.openTo, xAt(opts.to)) : ""}`;
  return wrapH(svg, opts.caption, opts.caption, 120);
}

/** Kvadrattall som prikker: 1, 4, 9, 16. */
export function figSquareNumbers(caption: string): string {
  function grid(n: number, ox: number) {
    const g = 14;
    const dots = [];
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        dots.push(`<circle cx="${ox + c * g}" cy="${48 + r * g}" r="4" fill="${ink}"/>`);
      }
    }
    const labelY = 48 + n * g + 22;
    dots.push(
      `<text x="${ox + ((n - 1) * g) / 2}" y="${labelY}" text-anchor="middle" font-size="13" font-weight="700" fill="${ink}">n=${n}</text>`,
    );
    return dots.join("");
  }
  const svg = `${grid(1, 28)}${grid(2, 78)}${grid(3, 150)}${grid(4, 240)}`;
  return wrapH(svg, caption, "De fire første kvadrattallene som prikker", 160);
}

/** Trekanttall 1, 3, 6, 10. */
export function figTriangleNumbers(caption: string): string {
  function tri(n: number, ox: number) {
    const g = 14;
    const parts = [];
    for (let r = 0; r < n; r++) {
      const count = r + 1;
      const rowW = (count - 1) * g;
      const start = ox - rowW / 2;
      for (let c = 0; c < count; c++) {
        parts.push(`<circle cx="${start + c * g}" cy="${40 + r * g}" r="4" fill="${ink}"/>`);
      }
    }
    parts.push(
      `<text x="${ox}" y="${40 + n * g + 20}" text-anchor="middle" font-size="13" font-weight="700" fill="${ink}">T${"₁₂₃₄"[n - 1]}</text>`,
    );
    return parts.join("");
  }
  const svg = `${tri(1, 40)}${tri(2, 110)}${tri(3, 200)}${tri(4, 310)}`;
  return wrapH(svg, caption, "De fire første trekanttallene", 140);
}

/** To parallelle linjer (ingen løsning). */
export function figParallelLines(caption: string): string {
  const svg = `
    <line x1="40" y1="70" x2="380" y2="150" stroke="#818cf8" stroke-width="3"/>
    <line x1="40" y1="110" x2="380" y2="190" stroke="#34d399" stroke-width="3"/>
    <text x="300" y="64" font-size="13" font-weight="700" fill="${ink}">2x+y=5</text>
    <text x="300" y="204" font-size="13" font-weight="700" fill="${ink}">2x+y=2</text>`;
  return wrap(svg, caption, "To parallelle linjer uten skjæringspunkt");
}

/** Kvadratsetning geometrisk: (a+b)^2. */
export function figSquareIdentity(caption: string): string {
  const svg = `
    <rect x="40" y="30" width="140" height="140" fill="rgba(99,102,241,0.18)" stroke="${ink}" stroke-width="1.8"/>
    <rect x="180" y="30" width="90" height="140" fill="rgba(52,211,153,0.16)" stroke="${ink}" stroke-width="1.8"/>
    <rect x="40" y="170" width="140" height="90" fill="rgba(52,211,153,0.16)" stroke="${ink}" stroke-width="1.8"/>
    <rect x="180" y="170" width="90" height="90" fill="rgba(245,158,11,0.20)" stroke="${ink}" stroke-width="1.8"/>
    <text x="110" y="108" text-anchor="middle" font-size="16" font-weight="800" fill="${ink}">a²</text>
    <text x="225" y="108" text-anchor="middle" font-size="15" font-weight="800" fill="${ink}">ab</text>
    <text x="110" y="222" text-anchor="middle" font-size="15" font-weight="800" fill="${ink}">ab</text>
    <text x="225" y="222" text-anchor="middle" font-size="16" font-weight="800" fill="${ink}">b²</text>
    <text x="110" y="22" text-anchor="middle" font-size="14" font-weight="700" fill="${ink}">a</text>
    <text x="225" y="22" text-anchor="middle" font-size="14" font-weight="700" fill="${ink}">b</text>`;
  return wrap(svg, caption, "Kvadrat med side a+b delt i a², 2ab og b²");
}

/** Følge med differanser over pilene. */
export function figSequence(terms: number[], diffs: number[], caption: string): string {
  const gap = 78;
  const x0 = 28;
  const y = 58;
  const boxes = terms
    .map((t, i) => {
      const x = x0 + i * gap;
      return `<rect x="${x}" y="${y - 22}" width="52" height="36" rx="8" fill="rgba(99,102,241,0.16)" stroke="${ink}" stroke-width="1.6"/>
        <text x="${x + 26}" y="${y + 4}" text-anchor="middle" font-size="16" font-weight="800" fill="${ink}">${t}</text>`;
    })
    .join("");
  const arrows = diffs
    .map((d, i) => {
      const x1 = x0 + 52 + i * gap;
      const x2 = x0 + (i + 1) * gap;
      const mx = (x1 + x2) / 2;
      return `<line x1="${x1}" y1="${y - 4}" x2="${x2}" y2="${y - 4}" stroke="#34d399" stroke-width="1.8" marker-end="url(#arr)"/>
        <text x="${mx}" y="${y - 14}" text-anchor="middle" font-size="12" font-weight="700" fill="#34d399">+${d}</text>`;
    })
    .join("");
  const svg = `<defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#34d399"/></marker></defs>${boxes}${arrows}`;
  return wrapH(svg, caption, caption, 110);
}

/** Vanntank fylt 2/5. */
export function figTank(filled: number, of: number, caption: string): string {
  const frac = filled / of;
  const top = 24;
  const h = 160;
  const waterH = h * frac;
  const ticks = Array.from({ length: of + 1 }, (_, i) => {
    const y = top + h - (i / of) * h;
    const lab = i === 0 ? "0" : i === of ? "1" : `${i}/${of}`;
    return `<line x1="268" y1="${y}" x2="282" y2="${y}" stroke="${ink}" stroke-width="1.4"/>
      <text x="292" y="${y + 4}" font-size="12" fill="${ink}">${lab}</text>`;
  }).join("");
  const svg = `
    <rect x="120" y="${top}" width="140" height="${h}" rx="6" fill="rgba(255,255,255,0.04)" stroke="${ink}" stroke-width="2.2"/>
    <rect x="122" y="${top + h - waterH}" width="136" height="${waterH}" rx="4" fill="rgba(52,211,153,0.35)"/>
    <text x="190" y="${top + h - waterH - 8}" text-anchor="middle" font-size="14" font-weight="700" fill="#34d399">${filled}/${of} fylt</text>
    ${ticks}`;
  return wrap(svg, caption, `Tank fylt ${filled} av ${of}`);
}

/** To likesidede trekanter. */
export function figSimilarTriangles(caption: string): string {
  const svg = `
    <polygon points="40,180 140,180 40,70" fill="rgba(99,102,241,0.14)" stroke="${ink}" stroke-width="2"/>
    <rect x="40" y="160" width="16" height="16" fill="none" stroke="${ink}" stroke-width="1.4"/>
    <text x="90" y="202" text-anchor="middle" font-size="14" font-weight="700" fill="${ink}">3</text>
    <text x="26" y="130" text-anchor="middle" font-size="14" font-weight="700" fill="${ink}">4</text>
    <text x="108" y="118" text-anchor="middle" font-size="14" font-weight="700" fill="${ink}">5</text>
    <polygon points="200,180 360,180 200,50" fill="rgba(52,211,153,0.14)" stroke="${ink}" stroke-width="2"/>
    <rect x="200" y="160" width="16" height="16" fill="none" stroke="${ink}" stroke-width="1.4"/>
    <text x="280" y="202" text-anchor="middle" font-size="14" font-weight="700" fill="${ink}">6</text>
    <text x="186" y="118" text-anchor="middle" font-size="14" font-weight="700" fill="${ink}">x</text>
    <text x="310" y="108" text-anchor="middle" font-size="14" font-weight="700" fill="${ink}">10</text>
    <text x="90" y="28" text-anchor="middle" font-size="13" fill="${ink}">liten</text>
    <text x="280" y="28" text-anchor="middle" font-size="13" fill="${ink}">stor (likeformet)</text>`;
  return wrap(svg, caption, "To likeformede rettvinklede trekanter, faktor 2");
}

/** Stang og tre med skygge. */
export function figShadow(caption: string): string {
  const svg = `
    <line x1="30" y1="170" x2="400" y2="170" stroke="${ink}" stroke-width="2"/>
    <rect x="70" y="70" width="12" height="100" fill="rgba(99,102,241,0.55)" stroke="${ink}"/>
    <text x="76" y="58" text-anchor="middle" font-size="13" font-weight="700" fill="${ink}">6 m</text>
    <line x1="82" y1="170" x2="162" y2="170" stroke="#f59e0b" stroke-width="8" opacity="0.7"/>
    <text x="122" y="196" text-anchor="middle" font-size="13" font-weight="700" fill="#f59e0b">4 m</text>
    <polygon points="250,170 268,40 286,170" fill="rgba(52,211,153,0.35)" stroke="${ink}" stroke-width="1.6"/>
    <text x="268" y="28" text-anchor="middle" font-size="14" font-weight="800" fill="#34d399">h = ?</text>
    <line x1="268" y1="170" x2="388" y2="170" stroke="#f59e0b" stroke-width="8" opacity="0.7"/>
    <text x="328" y="196" text-anchor="middle" font-size="13" font-weight="700" fill="#f59e0b">10 m</text>
    <line x1="40" y1="24" x2="82" y2="70" stroke="#fde68a" stroke-dasharray="4 3" stroke-width="1.4"/>
    <line x1="40" y1="24" x2="268" y2="40" stroke="#fde68a" stroke-dasharray="4 3" stroke-width="1.4"/>
    <circle cx="36" cy="20" r="8" fill="#fbbf24"/>`;
  return wrap(svg, caption, "Stang 6 m med skygge 4 m, tre med skygge 10 m");
}

/** To proporsjonsstolper. */
export function figProportion(
  aLab: string,
  aVal: string,
  bLab: string,
  bVal: string,
  caption: string,
): string {
  const svg = `
    <rect x="40" y="40" width="160" height="44" rx="8" fill="rgba(99,102,241,0.22)" stroke="${ink}" stroke-width="1.6"/>
    <text x="120" y="68" text-anchor="middle" font-size="14" font-weight="700" fill="${ink}">${aLab}</text>
    <rect x="220" y="40" width="160" height="44" rx="8" fill="rgba(99,102,241,0.22)" stroke="${ink}" stroke-width="1.6"/>
    <text x="300" y="68" text-anchor="middle" font-size="14" font-weight="700" fill="${ink}">${aVal}</text>
    <rect x="40" y="108" width="256" height="44" rx="8" fill="rgba(52,211,153,0.22)" stroke="${ink}" stroke-width="1.6"/>
    <text x="168" y="136" text-anchor="middle" font-size="14" font-weight="700" fill="${ink}">${bLab}</text>
    <rect x="316" y="108" width="64" height="44" rx="8" fill="rgba(52,211,153,0.12)" stroke="${ink}" stroke-dasharray="5 4" stroke-width="1.6"/>
    <text x="348" y="136" text-anchor="middle" font-size="14" font-weight="800" fill="#34d399">${bVal}</text>`;
  return wrapH(svg, caption, caption, 180);
}

/** Trapp av kvadrater (trekantmønster). */
export function figStaircase(caption: string): string {
  function stair(n: number, ox: number) {
    const s = 16;
    const parts = [];
    for (let r = 0; r < n; r++) {
      for (let c = 0; c <= r; c++) {
        const x = ox + c * s;
        const y = 36 + r * s;
        parts.push(
          `<rect x="${x}" y="${y}" width="${s - 2}" height="${s - 2}" rx="2" fill="rgba(99,102,241,0.28)" stroke="${ink}" stroke-width="1.2"/>`,
        );
      }
    }
    parts.push(
      `<text x="${ox + (n * s) / 4}" y="${36 + n * s + 18}" text-anchor="middle" font-size="13" font-weight="700" fill="${ink}">n=${n}</text>`,
    );
    return parts.join("");
  }
  const svg = `${stair(1, 30)}${stair(2, 90)}${stair(3, 170)}${stair(4, 280)}`;
  return wrapH(svg, caption, "Trekant av kvadrater, figur 1 til 4", 140);
}

/** L-form: stort kvadrat minus hjørne. */
export function figLShape(caption: string): string {
  const s = 28;
  const cells = [];
  // n=3: 4x4 minus 1x1 corner
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (r === 0 && c === 3) continue;
      const x = 140 + c * s;
      const y = 28 + r * s;
      cells.push(
        `<rect x="${x}" y="${y}" width="${s - 3}" height="${s - 3}" rx="3" fill="rgba(99,102,241,0.28)" stroke="${ink}" stroke-width="1.3"/>`,
      );
    }
  }
  cells.push(
    `<rect x="${140 + 3 * s}" y="28" width="${s - 3}" height="${s - 3}" rx="3" fill="none" stroke="${ink}" stroke-dasharray="4 3" stroke-width="1.4"/>`,
  );
  cells.push(`<text x="196" y="168" text-anchor="middle" font-size="13" font-weight="700" fill="${ink}">figur 3: 4² − 1</text>`);
  return wrapH(cells.join(""), caption, "L-form: kvadrat minus ett hjørne", 190);
}

export const TASK_FIGURES: Record<string, string> = {
  "1.OP3": figSequence(
    [5, 8, 12, 17, 23],
    [3, 4, 5, 6],
    "Differansene øker med $1$ for hvert steg: $+3$, $+4$, $+5$, $+6$, …",
  ),
  "1.OP5": figTank(2, 5, "Tanken er $\\tfrac{2}{5}$ full. Vi tømmer $\\tfrac{1}{4}$ av innholdet — ikke av hele tanken."),
  "1.OP9": figNumberLine({
    min: -4,
    max: 6,
    ticks: [-3, 0, 2, 5],
    from: -3,
    to: 2,
    openFrom: false,
    openTo: true,
    caption: "Skisse til a): $-3\\le x<2$ er det lukkede-åpne intervallet $[-3,2\\rangle$.",
  }),
  "2.15": figRightTriangle("2h", "h", "Arealet er halvparten av grunnlinje ganger høyde."),
  "2.19": figFrame("Rammens areal = ytre rektangel minus den indre åpningen."),
  "2.29": figRect("s + 2", "s − 1", "Kvadrat med side $s$ og rektangel med sider $s+2$ og $s-1$."),
  "2.OP3": figSquareIdentity("Geometrisk: $(a+b)^2 = a^2 + 2ab + b^2$."),
  "2.OP9": figRect("l = 12", "b = ?", "Areal $A=l\\cdot b=48$. Finn $b$."),
  "2.OP10": figSquareNumbers("Kvadrattall $n^2$ som $n\\times n$-prikker. Differansen mellom to naboer er den neste oddetallskanten."),
  "2.56": figStaircase("Figur $n$ er en trekant av $n$ rader med kvadrater — antall = $T_n$."),
  "2.57": figLShape("Figur $3$: kvadrat med side $4$ der et hjørne med side $1$ er kuttet vekk. Areal $(n+1)^2-1$."),
  "3.2": figRect("lengde l", "bredde l − 35", "Fotballbane: omkrets $2(l+b)=350$ m."),
  "3.10": figRect("a + 10", "a", "Sauegjerde formet som rektangel med areal $140\\,\\mathrm{m}^2$."),
  "3.13": figRect("b + 4", "b", "Rektangel med areal $45\\,\\mathrm{cm}^2$. Lengden er $4$ cm lenger enn bredden."),
  "3.24": figRect("2b + 3", "b", "Omkrets $54$ cm. Lengde er $3$ mer enn dobbel bredde."),
  "3.25": figNumberLine({
    min: -6,
    max: 8,
    ticks: [-2, 0, 6],
    from: -6,
    to: -2,
    openFrom: true,
    openTo: false,
    caption: "Skisse til b): $x\\le -2$ er strålen $\\langle\\leftarrow,-2]$.",
  }),
  "3.29": figRect("x + 2", "x", "Areal $x(x+2)=48$. Finn sidene (positiv lengde)."),
  "3.34": figProportion(
    "4 personer",
    "3 dl fløte",
    "6 personer",
    "?",
    "Rett proporsjonal: mer folk $\\Rightarrow$ mer fløte, i samme forhold.",
  ),
  "3.40": figRect("b + 3", "b", "Hage med omkrets $46$ m. Lengden er $3$ m mer enn bredden."),
  "3.46": figRightTriangle("x", "x + 7", "Rettvinklet trekant. Pythagoras: $x^2+(x+7)^2=13^2$."),
  "3.54": figSimilarTriangles("Likeformede trekanter: alle sider i forhold $2$ (sjekk $3\\mapsto 6$ og $5\\mapsto 10$).") +
    figShadow("Samme forhold: $\\dfrac{h}{6}=\\dfrac{10}{4}$. Skyggene er likeformede med stanga og treet."),
  "3.OP2": figRect("3b + 4", "b", "Omkrets $2(l+b)=64$ cm. Lengde $=3b+4$."),
  "3.OP3": figCircle("r", "Omkrets $C=2\\pi r$. Isoler $r$, og sett inn $C=10\\pi$."),
  "3.OP9": figProportion(
    "5 personer",
    "200 g ost",
    "8 personer",
    "?",
    "Rett proporsjonal: mer folk $\\Rightarrow$ mer ost, i samme forhold.",
  ),
  "3.OP8": figNumberLine({
    min: -6,
    max: 6,
    ticks: [-3, 0, 4],
    from: -6,
    to: -3,
    openFrom: true,
    openTo: false,
    caption: "Skisse til b): $x\\le -3$ er strålen $\\langle\\leftarrow,-3]$.",
  }),
  "5.OP1": figNumberLine({
    min: 0,
    max: 8,
    ticks: [3, 5, 7],
    from: 3,
    to: 8,
    openFrom: true,
    openTo: true,
    caption: "Løsningen $x>3$ er den åpne strålen $\\langle 3,\\infty\\rangle$.",
  }),
  "5.OP8": figParallelLines("Når $k=4$ blir den andre linja $2x+y=2$ — parallell med $2x+y=5$, ingen skjæring."),
};
