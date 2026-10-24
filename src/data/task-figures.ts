import { KAP7_FIGURES } from "./kap7-figures";
import { KAP5_FIGURES, KAP5_FASIT_FIGURES } from "./kap5-figures";
import { KAP2_FIGURES, figDiffSquares, figSecondSquare } from "./kap2-figures";

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
  from?: number;
  to?: number;
  openFrom?: boolean;
  openTo?: boolean;
  noInterval?: boolean;
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

  let interval = "";
  if (!opts.noInterval && opts.from != null && opts.to != null) {
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
    interval = `
      <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#6366f1" stroke-width="8" stroke-linecap="butt" opacity="0.45"/>
      ${capFrom}${capTo}
      ${showFrom ? end(opts.openFrom, xAt(opts.from)) : ""}
      ${showTo ? end(opts.openTo, xAt(opts.to)) : ""}`;
  }

  const svg = `
    <line x1="${pad}" y1="${y}" x2="${w - pad}" y2="${y}" stroke="${ink}" stroke-width="2"/>
    <polygon points="${w - pad + 10},${y} ${w - pad - 2},${y - 6} ${w - pad - 2},${y + 6}" fill="${ink}"/>
    ${interval}${ticks}`;
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
  return wrapH(svg, caption, "Kvadrat med side a+b delt i a², 2ab og b²", 270);
}

/** Følge med differanser over pilene. */
export function figSequence(terms: number[], diffs: (number | string)[], caption: string): string {
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
      const lab = typeof d === "number" ? (d >= 0 ? `+${d}` : `${d}`) : String(d);
      return `<line x1="${x1}" y1="${y - 4}" x2="${x2}" y2="${y - 4}" stroke="#34d399" stroke-width="1.8" marker-end="url(#arr)"/>
        <text x="${mx}" y="${y - 14}" text-anchor="middle" font-size="12" font-weight="700" fill="#34d399">${lab}</text>`;
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

/** To formlike rettvinklede trekanter, tegnet i målestokk: den store er nøyaktig 2 ganger den lille. */
export function figSimilarTriangles(caption: string): string {
  // 20 px per lengdeenhet. Liten: kateter 3 og 4. Stor: kateter 6 og 8 (= 2 · liten).
  const u = 20;
  const g = 196;
  const sx = 50;
  const bx = 210;
  const small = `${sx},${g} ${sx + 3 * u},${g} ${sx},${g - 4 * u}`;
  const big = `${bx},${g} ${bx + 6 * u},${g} ${bx},${g - 8 * u}`;
  const lab = (x: number, y: number, t: string, a = "middle") =>
    `<text x="${x}" y="${y}" text-anchor="${a}" font-size="14" font-weight="700" fill="${ink}">${t}</text>`;
  const svg = `
    <polygon points="${small}" fill="rgba(99,102,241,0.14)" stroke="${ink}" stroke-width="2"/>
    <rect x="${sx}" y="${g - 12}" width="12" height="12" fill="none" stroke="${ink}" stroke-width="1.4"/>
    ${lab(sx + 1.5 * u, g + 18, "3")}
    ${lab(sx - 8, g - 2 * u + 5, "4", "end")}
    ${lab(sx + 1.5 * u + 10, g - 2 * u - 4, "5", "start")}
    <polygon points="${big}" fill="rgba(52,211,153,0.14)" stroke="${ink}" stroke-width="2"/>
    <rect x="${bx}" y="${g - 12}" width="12" height="12" fill="none" stroke="${ink}" stroke-width="1.4"/>
    ${lab(bx + 3 * u, g + 18, "6")}
    ${lab(bx - 8, g - 4 * u + 5, "x", "end")}
    ${lab(bx + 3 * u + 12, g - 4 * u - 4, "10", "start")}
    <text x="${sx + 1.5 * u}" y="${g - 4 * u - 16}" text-anchor="middle" font-size="13" fill="${ink}">liten</text>
    <text x="${bx + 3 * u}" y="22" text-anchor="middle" font-size="13" fill="${ink}">stor (alle sider · 2)</text>`;
  return wrap(svg, caption, "To formlike rettvinklede trekanter i målestokk. Den store har dobbelt så lange sider som den lille.");
}

/** Stang og tre med skygge, i målestokk (10 px per meter) og med parallelle solstråler. */
export function figShadow(caption: string): string {
  // Stang 6 m, skygge 4 m. Tre 15 m, skygge 10 m. Begge stråler har retning (4, 6), altså parallelle.
  const m = 10;
  const g = 200;
  const px = 50;
  const tx = 230;
  const poleTop = g - 6 * m;
  const treeTop = g - 15 * m;
  const pTip = px + 4 * m;
  const tTip = tx + 10 * m;
  // Forleng strålene bakover langs samme retning (dx:dy = 4:6).
  const ray = (x: number, y: number, x2: number, y2: number, back: number) =>
    `<line x1="${x - 4 * back}" y1="${y - 6 * back}" x2="${x2}" y2="${y2}" stroke="#f59e0b" stroke-dasharray="5 4" stroke-width="1.6"/>`;
  const svg = `
    <line x1="20" y1="${g}" x2="400" y2="${g}" stroke="${ink}" stroke-width="2"/>
    <line x1="${px}" y1="${g}" x2="${px}" y2="${poleTop}" stroke="rgba(99,102,241,0.9)" stroke-width="5"/>
    <text x="${px - 8}" y="${(g + poleTop) / 2 + 5}" text-anchor="end" font-size="13" font-weight="700" fill="${ink}">6 m</text>
    <line x1="${px}" y1="${g}" x2="${pTip}" y2="${g}" stroke="#f59e0b" stroke-width="7" opacity="0.7"/>
    <text x="${(px + pTip) / 2}" y="${g + 18}" text-anchor="middle" font-size="13" font-weight="700" fill="#f59e0b">4 m</text>
    <line x1="${tx}" y1="${g}" x2="${tx}" y2="${treeTop + 20}" stroke="#a16207" stroke-width="6"/>
    <ellipse cx="${tx}" cy="${treeTop + 22}" rx="16" ry="24" fill="rgba(52,211,153,0.35)" stroke="${ink}" stroke-width="1.4"/>
    <circle cx="${tx}" cy="${treeTop}" r="2.5" fill="${ink}"/>
    <text x="${tx - 22}" y="${(g + treeTop) / 2 + 20}" text-anchor="end" font-size="14" font-weight="800" fill="#34d399">h = ?</text>
    <line x1="${tx}" y1="${g}" x2="${tTip}" y2="${g}" stroke="#f59e0b" stroke-width="7" opacity="0.7"/>
    <text x="${(tx + tTip) / 2}" y="${g + 18}" text-anchor="middle" font-size="13" font-weight="700" fill="#f59e0b">10 m</text>
    ${ray(px, poleTop, pTip, g, 5)}
    ${ray(tx, treeTop, tTip, g, 1.5)}
    <circle cx="24" cy="18" r="9" fill="#fbbf24"/>`;
  return wrapH(svg, caption, "Stang 6 m med skygge 4 m og tre med skygge 10 m, tegnet i målestokk med parallelle solstråler", 225);
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
  cells.push(`<text x="196" y="168" text-anchor="middle" font-size="13" font-weight="700" fill="${ink}">Figur 3</text>`);
  return wrapH(cells.join(""), caption, "L-form: kvadrat minus ett hjørne", 190);
}

/** Tomt koordinatsystem med akser, eventuelle kvadranter eller inntegnede punkter/linjer. */
export function figCoordinateGrid(
  caption: string,
  opts?: {
    withQuadrants?: boolean;
    points?: { x: number; y: number; label: string }[];
    withLine?: boolean;
  },
): string {
  const ox = 210;
  const oy = 130;
  const step = 38;
  const gridLines: string[] = [];

  for (let i = -4; i <= 4; i++) {
    const x = ox + i * step;
    gridLines.push(`<line x1="${x}" y1="20" x2="${x}" y2="240" stroke="${ink}" stroke-width="1" opacity="0.12"/>`);
    if (i !== 0) {
      gridLines.push(`<line x1="${x}" y1="${oy - 4}" x2="${x}" y2="${oy + 4}" stroke="${ink}" stroke-width="1.4"/>`);
      gridLines.push(`<text x="${x}" y="${oy + 18}" text-anchor="middle" font-size="12" fill="${ink}" opacity="0.8">${i}</text>`);
    }
  }
  for (let j = -2; j <= 2; j++) {
    const y = oy - j * step;
    gridLines.push(`<line x1="20" y1="${y}" x2="400" y2="${y}" stroke="${ink}" stroke-width="1" opacity="0.12"/>`);
    if (j !== 0) {
      gridLines.push(`<line x1="${ox - 4}" y1="${y}" x2="${ox + 4}" stroke="${ink}" stroke-width="1.4"/>`);
      gridLines.push(`<text x="${ox - 10}" y="${y + 4}" text-anchor="end" font-size="12" fill="${ink}" opacity="0.8">${j}</text>`);
    }
  }

  let quadrantsSvg = "";
  if (opts?.withQuadrants) {
    quadrantsSvg = `
      <!-- Kvadranter -->
      <text x="${ox + 85}" y="${oy - 55}" text-anchor="middle" font-size="15" font-weight="800" fill="#6366f1" opacity="0.85">1. kvadrant (I)</text>
      <text x="${ox - 85}" y="${oy - 55}" text-anchor="middle" font-size="15" font-weight="800" fill="#6366f1" opacity="0.85">2. kvadrant (II)</text>
      <text x="${ox - 85}" y="${oy + 75}" text-anchor="middle" font-size="15" font-weight="800" fill="#6366f1" opacity="0.85">3. kvadrant (III)</text>
      <text x="${ox + 85}" y="${oy + 75}" text-anchor="middle" font-size="15" font-weight="800" fill="#6366f1" opacity="0.85">4. kvadrant (IV)</text>
    `;
  }

  let pointsSvg = "";
  if (opts?.points?.length) {
    pointsSvg = opts.points
      .map((p) => {
        const px = ox + p.x * step;
        const py = oy - p.y * step;
        return `<circle cx="${px}" cy="${py}" r="5" fill="#ec4899"/>
          <text x="${px + 8}" y="${py - 8}" font-size="12" font-weight="700" fill="${ink}">${plain(p.label)}</text>`;
      })
      .join("");
  }

  let lineSvg = "";
  if (opts?.withLine && opts?.points && opts.points.length >= 2) {
    const p1 = opts.points[0]!;
    const p2 = opts.points[1]!;
    const m = (p2.y - p1.y) / (p2.x - p1.x);
    const c = p1.y - m * p1.x;
    const xLeft = -3;
    const yLeft = m * xLeft + c;
    const xRight = 2.5;
    const yRight = m * xRight + c;
    lineSvg = `<line x1="${ox + xLeft * step}" y1="${oy - yLeft * step}" x2="${ox + xRight * step}" y2="${oy - yRight * step}" stroke="#34d399" stroke-width="2.4"/>`;
  }

  const svg = `
    ${gridLines.join("")}
    <!-- Akser -->
    <line x1="20" y1="${oy}" x2="400" y2="${oy}" stroke="${ink}" stroke-width="2"/>
    <polygon points="400,${oy} 390,${oy - 4} 390,${oy + 4}" fill="${ink}"/>
    <text x="405" y="${oy + 4}" font-size="13" font-weight="700" fill="${ink}">x</text>

    <line x1="${ox}" y1="240" x2="${ox}" y2="20" stroke="${ink}" stroke-width="2"/>
    <polygon points="${ox},20 ${ox - 4},30 ${ox + 4},30" fill="${ink}"/>
    <text x="${ox + 8}" y="24" font-size="13" font-weight="700" fill="${ink}">y</text>
    <text x="${ox - 10}" y="${oy + 16}" text-anchor="end" font-size="12" fill="${ink}" opacity="0.7">0</text>

    ${lineSvg}
    ${pointsSvg}
    ${quadrantsSvg}
  `;
  return wrapH(svg, caption, caption, 260);
}

/** Definisjonsmengde, verdimengde og nullpunkt. */
export function figDomainRange(caption: string): string {
  const ox = 70;
  const oy = 175;
  const pathD = `M 118,133 Q 214,-15 339,220`;

  const svg = `
    <!-- Akser -->
    <line x1="40" y1="${oy}" x2="390" y2="${oy}" stroke="${ink}" stroke-width="2"/>
    <polygon points="390,${oy} 380,${oy - 4} 380,${oy + 4}" fill="${ink}"/>
    <text x="395" y="${oy + 4}" font-size="13" font-weight="700" fill="${ink}">x</text>

    <line x1="${ox}" y1="235" x2="${ox}" y2="30" stroke="${ink}" stroke-width="2"/>
    <polygon points="${ox},30 ${ox - 4},40 ${ox + 4},40" fill="${ink}"/>
    <text x="${ox + 6}" y="34" font-size="13" font-weight="700" fill="${ink}">y</text>
    <text x="${ox - 8}" y="${oy + 14}" text-anchor="end" font-size="11" fill="${ink}" opacity="0.6">0</text>

    <!-- D_f markering på x-aksen -->
    <line x1="118" y1="${oy + 12}" x2="339" y2="${oy + 12}" stroke="#34d399" stroke-width="4" stroke-linecap="round"/>
    <line x1="118" y1="${oy + 6}" x2="118" y2="${oy + 18}" stroke="#34d399" stroke-width="3"/>
    <line x1="339" y1="${oy + 6}" x2="339" y2="${oy + 18}" stroke="#34d399" stroke-width="3"/>
    <text x="228" y="${oy + 30}" text-anchor="middle" font-size="13" font-weight="700" fill="#34d399">D_f (definisjonsmengde på x-aksen)</text>

    <!-- V_f markering på y-aksen -->
    <line x1="${ox - 14}" y1="57" x2="${ox - 14}" y2="220" stroke="#818cf8" stroke-width="4" stroke-linecap="round"/>
    <line x1="${ox - 20}" y1="57" x2="${ox - 8}" y2="57" stroke="#818cf8" stroke-width="3"/>
    <line x1="${ox - 20}" y1="220" x2="${ox - 8}" y2="220" stroke="#818cf8" stroke-width="3"/>
    <text x="${ox - 24}" y="140" text-anchor="end" font-size="12" font-weight="700" fill="#818cf8">V_f (verdimengde)</text>

    <!-- Graf kurve -->
    <path d="${pathD}" fill="none" stroke="#6366f1" stroke-width="3"/>

    <!-- Endepunkter -->
    <circle cx="118" cy="133" r="4.5" fill="#6366f1"/>
    <circle cx="339" cy="220" r="4.5" fill="#6366f1"/>

    <!-- Nullpunkt -->
    <line x1="310" y1="${oy - 8}" x2="310" y2="${oy + 8}" stroke="#f59e0b" stroke-width="2"/>
    <circle cx="310" cy="${oy}" r="5.5" fill="#f59e0b"/>
    <text x="310" y="${oy - 14}" text-anchor="middle" font-size="12" font-weight="700" fill="#f59e0b">nullpunkt (y=0)</text>
  `;
  return wrapH(svg, caption, "Illustrasjon av definisjonsmengde, verdimengde og nullpunkt", 250);
}

/** Rutenett med akser og eventuell stiplet hjelpelinje som viser en rett linje. */
export function figLinearGrid(caption: string, withLine = false): string {
  const ox = 210;
  const oy = 120;
  const step = 36;
  const gridLines: string[] = [];

  for (let i = -4; i <= 4; i++) {
    const x = ox + i * step;
    gridLines.push(`<line x1="${x}" y1="20" x2="${x}" y2="220" stroke="${ink}" stroke-width="1" opacity="0.12"/>`);
    if (i !== 0) {
      gridLines.push(`<line x1="${x}" y1="${oy - 4}" x2="${x}" y2="${oy + 4}" stroke="${ink}" stroke-width="1.4"/>`);
      gridLines.push(`<text x="${x}" y="${oy + 16}" text-anchor="middle" font-size="11" fill="${ink}" opacity="0.7">${i}</text>`);
    }
  }
  for (let j = -2; j <= 2; j++) {
    const y = oy - j * step;
    gridLines.push(`<line x1="30" y1="${y}" x2="390" y2="${y}" stroke="${ink}" stroke-width="1" opacity="0.12"/>`);
    if (j !== 0) {
      gridLines.push(`<line x1="${ox - 4}" y1="${y}" x2="${ox + 4}" stroke="${ink}" stroke-width="1.4"/>`);
      gridLines.push(`<text x="${ox - 8}" y="${y + 4}" text-anchor="end" font-size="11" fill="${ink}" opacity="0.7">${j}</text>`);
    }
  }

  const lineSvg = withLine
    ? `
      <!-- Stiplet referanselinje gjennom origo -->
      <line x1="${ox - 3 * step}" y1="${oy + 3 * step * 0.7}" x2="${ox + 3 * step}" y2="${oy - 3 * step * 0.7}" stroke="#818cf8" stroke-width="2.2" stroke-dasharray="6 4"/>
      <circle cx="${ox}" cy="${oy}" r="4" fill="#818cf8"/>
      <text x="${ox + 75}" y="${oy - 55}" font-size="12" font-weight="700" fill="#818cf8">stiplet linje (rett linje)</text>
    `
    : "";

  const svg = `
    ${gridLines.join("")}
    <!-- Akser -->
    <line x1="30" y1="${oy}" x2="390" y2="${oy}" stroke="${ink}" stroke-width="2"/>
    <polygon points="390,${oy} 380,${oy - 4} 380,${oy + 4}" fill="${ink}"/>
    <text x="395" y="${oy + 4}" font-size="13" font-weight="700" fill="${ink}">x</text>

    <line x1="${ox}" y1="220" x2="${ox}" y2="20" stroke="${ink}" stroke-width="2"/>
    <polygon points="${ox},20 ${ox - 4},30 ${ox + 4},30" fill="${ink}"/>
    <text x="${ox + 6}" y="24" font-size="13" font-weight="700" fill="${ink}">y</text>
    <text x="${ox - 8}" y="${oy + 16}" text-anchor="end" font-size="11" fill="${ink}" opacity="0.7">0</text>

    ${lineSvg}
  `;
  return wrapH(svg, caption, caption, 240);
}

/** Parabel med sekanter og tangent. */
export function figSecantsAndTangent(caption: string, opts?: { withSlopes?: boolean }): string {
  const withSlopes = Boolean(opts?.withSlopes);
  const sec1Text = withSlopes ? "sekant [0,2] (stigning 2)" : "sekant [0,2]";
  const sec2Text = withSlopes ? "sekant [2,4] (stigning −2)" : "sekant [2,4]";
  const tanText = withSlopes ? "tangent i (2,6) (stigning 0)" : "tangent i x = 2";

  const svg = `
    <!-- Akser -->
    <line x1="40" y1="190" x2="390" y2="190" stroke="${ink}" stroke-width="1.8"/>
    <polygon points="390,190 380,186 380,194" fill="${ink}"/>
    <text x="395" y="194" font-size="12" font-weight="700" fill="${ink}">x</text>

    <line x1="110" y1="225" x2="110" y2="30" stroke="${ink}" stroke-width="1.8"/>
    <polygon points="110,30 106,40 114,40" fill="${ink}"/>
    <text x="116" y="34" font-size="12" font-weight="700" fill="${ink}">y</text>

    <!-- Ticks -->
    <line x1="210" y1="186" x2="210" y2="194" stroke="${ink}" stroke-width="1.4"/>
    <text x="210" y="206" text-anchor="middle" font-size="12" fill="${ink}">2</text>
    <line x1="310" y1="186" x2="310" y2="194" stroke="${ink}" stroke-width="1.4"/>
    <text x="310" y="206" text-anchor="middle" font-size="12" fill="${ink}">4</text>
    <text x="102" y="206" text-anchor="end" font-size="12" fill="${ink}">0</text>

    <line x1="106" y1="150" x2="114" y2="150" stroke="${ink}" stroke-width="1.4"/>
    <text x="102" y="154" text-anchor="end" font-size="12" fill="${ink}">2</text>
    <line x1="106" y1="70" x2="114" y2="70" stroke="${ink}" stroke-width="1.4"/>
    <text x="102" y="74" text-anchor="end" font-size="12" fill="${ink}">6</text>

    <!-- Parabel -->
    <path d="M 85,195 Q 210,-55 335,195" fill="none" stroke="#6366f1" stroke-width="3"/>

    <!-- Sekant [0, 2] -->
    <line x1="85" y1="170" x2="235" y2="50" stroke="#34d399" stroke-width="2" stroke-dasharray="5 4"/>
    <text x="135" y="98" font-size="11" font-weight="700" fill="#34d399">${sec1Text}</text>

    <!-- Sekant [2, 4] -->
    <line x1="185" y1="50" x2="335" y2="170" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 4"/>
    <text x="285" y="98" font-size="11" font-weight="700" fill="#f59e0b">${sec2Text}</text>

    <!-- Horisontal tangent -->
    <line x1="130" y1="70" x2="290" y2="70" stroke="#ec4899" stroke-width="2.2"/>
    <text x="210" y="58" text-anchor="middle" font-size="11" font-weight="700" fill="#ec4899">${tanText}</text>

    <!-- Punkter -->
    <circle cx="110" cy="150" r="4.5" fill="#34d399"/>
    <text x="118" y="144" font-size="11" font-weight="700" fill="${ink}">(0,2)</text>
    <circle cx="210" cy="70" r="5" fill="#ec4899"/>
    <text x="210" y="86" text-anchor="middle" font-size="11" font-weight="700" fill="${ink}">(2,6)</text>
    <circle cx="310" cy="150" r="4.5" fill="#f59e0b"/>
    <text x="318" y="144" font-size="11" font-weight="700" fill="${ink}">(4,2)</text>
  `;
  return wrapH(svg, caption, "Parabel f(x)=-x^2+4x+2 med sekanter og tangent", 235);
}

/** Tredjegradskurve f(x) = 0.25x^3 - 2x på [-4, 4]. */
export function figCubicGraph(withTangents: boolean, caption: string): string {
  const pts: [number, number][] = [];
  for (let i = -40; i <= 40; i++) {
    const x = i / 10;
    const y = 0.25 * x * x * x - 2 * x;
    const px = 210 + x * 40;
    const py = 120 - y * 11.5;
    pts.push([px, py]);
  }
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

  let tangentsSvg = "";
  if (withTangents) {
    tangentsSvg = `
      <!-- Tangent i x=-2 -->
      <line x1="70" y1="114.2" x2="190" y2="79.8" stroke="#34d399" stroke-width="2.2"/>
      <circle cx="130" cy="97" r="5" fill="#34d399"/>
      <text x="120" y="86" font-size="11" font-weight="700" fill="#34d399">(−2, 2) stigning 1</text>

      <!-- Tangent i x=2 -->
      <line x1="230" y1="160.2" x2="350" y2="125.8" stroke="#f59e0b" stroke-width="2.2"/>
      <circle cx="290" cy="143" r="5" fill="#f59e0b"/>
      <text x="300" y="160" font-size="11" font-weight="700" fill="#f59e0b">(2, −2) stigning 1</text>
    `;
  }

  const svg = `
    <!-- Rutenett og akser -->
    <line x1="30" y1="120" x2="390" y2="120" stroke="${ink}" stroke-width="1.8"/>
    <polygon points="390,120 380,116 380,124" fill="${ink}"/>
    <text x="395" y="124" font-size="12" font-weight="700" fill="${ink}">x</text>

    <line x1="210" y1="230" x2="210" y2="15" stroke="${ink}" stroke-width="1.8"/>
    <polygon points="210,15 206,25 214,25" fill="${ink}"/>
    <text x="216" y="20" font-size="12" font-weight="700" fill="${ink}">y</text>

    <!-- Ticks -->
    <line x1="130" y1="116" x2="130" y2="124" stroke="${ink}" stroke-width="1.4"/>
    <text x="130" y="136" text-anchor="middle" font-size="11" fill="${ink}">−2</text>
    <line x1="290" y1="116" x2="290" y2="124" stroke="${ink}" stroke-width="1.4"/>
    <text x="290" y="136" text-anchor="middle" font-size="11" fill="${ink}">2</text>
    <text x="202" y="134" text-anchor="end" font-size="11" fill="${ink}">0</text>

    <!-- Tredjegradskurve -->
    <path d="${d}" fill="none" stroke="#6366f1" stroke-width="2.8"/>
    ${tangentsSvg}
  `;
  return wrapH(svg, caption, "Grafen til f(x)=0.25x^3-2x", 245);
}

/** Startpunkt (x) for aksen i en fortegnslinje: gir plass til etiketten til venstre. */
function signLineAxisStart(label?: string): number {
  return label ? 10 + Math.ceil(label.length * 7.5) + 10 : 20;
}

let fpClipId = 0;

/** Generell funksjonsgraf i et koordinatsystem med rutenett (brukes i kap. 4). */
export function figFunctionPlot(opts: {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  xstep: number;
  ystep: number;
  fns: { f: (x: number) => number; color: string; label: string; labelX: number; from?: number; to?: number }[];
  points?: { x: number; y: number; label?: string; dx?: number; dy?: number }[];
  xName?: string;
  yName?: string;
  fmt?: (v: number) => string;
  caption: string;
  h?: number;
}): string {
  const h = opts.h ?? 300;
  const L = 46, R = 396, T = 16, B = h - 30;
  const sx = (x: number) => L + ((x - opts.xmin) / (opts.xmax - opts.xmin)) * (R - L);
  const sy = (y: number) => B - ((y - opts.ymin) / (opts.ymax - opts.ymin)) * (B - T);
  const fmt = opts.fmt ?? ((v: number) => String(Math.round(v * 100) / 100).replace("-", "−").replace(".", ","));
  const parts: string[] = [];
  const eps = 1e-9;
  const clip = `fp-clip-${++fpClipId}`;
  for (let x = Math.ceil(opts.xmin / opts.xstep) * opts.xstep; x <= opts.xmax + eps; x += opts.xstep) {
    parts.push(`<line x1="${sx(x).toFixed(1)}" y1="${T}" x2="${sx(x).toFixed(1)}" y2="${B}" stroke="${ink}" stroke-width="0.6" opacity="0.18"/>`);
    if (Math.abs(x) > eps || opts.ymin > 0 || opts.ymax < 0)
      parts.push(`<text x="${sx(x).toFixed(1)}" y="${(opts.ymin <= 0 && opts.ymax >= 0 ? sy(0) : B) + 14}" text-anchor="middle" font-size="10" fill="${ink}">${fmt(x)}</text>`);
  }
  for (let y = Math.ceil(opts.ymin / opts.ystep) * opts.ystep; y <= opts.ymax + eps; y += opts.ystep) {
    parts.push(`<line x1="${L}" y1="${sy(y).toFixed(1)}" x2="${R}" y2="${sy(y).toFixed(1)}" stroke="${ink}" stroke-width="0.6" opacity="0.18"/>`);
    if (Math.abs(y) > eps || opts.xmin > 0 || opts.xmax < 0)
      parts.push(`<text x="${(opts.xmin <= 0 && opts.xmax >= 0 ? sx(0) : L) - 5}" y="${(sy(y) + 3.5).toFixed(1)}" text-anchor="end" font-size="10" fill="${ink}">${fmt(y)}</text>`);
  }
  const ax = opts.ymin <= 0 && opts.ymax >= 0 ? sy(0) : B;
  const ay = opts.xmin <= 0 && opts.xmax >= 0 ? sx(0) : L;
  parts.push(`<line x1="${L}" y1="${ax}" x2="${R + 8}" y2="${ax}" stroke="${ink}" stroke-width="1.6"/>
    <polygon points="${R + 12},${ax} ${R + 3},${ax - 4} ${R + 3},${ax + 4}" fill="${ink}"/>
    <text x="${R + 4}" y="${ax - 8}" font-size="12" font-weight="700" fill="${ink}" text-anchor="end">${opts.xName ?? "x"}</text>
    <line x1="${ay}" y1="${B}" x2="${ay}" y2="${T - 8}" stroke="${ink}" stroke-width="1.6"/>
    <polygon points="${ay},${T - 12} ${ay - 4},${T - 3} ${ay + 4},${T - 3}" fill="${ink}"/>
    <text x="${ay + 7}" y="${T - 2}" font-size="12" font-weight="700" fill="${ink}">${opts.yName ?? "y"}</text>`);
  parts.push(`<defs><clipPath id="${clip}"><rect x="${L}" y="${T}" width="${R - L}" height="${B - T}"/></clipPath></defs>`);
  for (const fn of opts.fns) {
    const a = fn.from ?? opts.xmin, b = fn.to ?? opts.xmax;
    const pts: string[] = [];
    for (let i = 0; i <= 200; i++) {
      const x = a + ((b - a) * i) / 200;
      pts.push(`${i ? "L" : "M"} ${sx(x).toFixed(1)},${sy(fn.f(x)).toFixed(1)}`);
    }
    parts.push(`<path d="${pts.join(" ")}" fill="none" stroke="${fn.color}" stroke-width="2.6" clip-path="url(#${clip})"/>`);
    const ly = Math.min(Math.max(sy(fn.f(fn.labelX)) - 8, T + 10), B - 4);
    parts.push(`<text x="${sx(fn.labelX).toFixed(1)}" y="${ly.toFixed(1)}" font-size="12" font-weight="700" fill="${fn.color}">${fn.label}</text>`);
  }
  for (const p of opts.points ?? []) {
    parts.push(`<circle cx="${sx(p.x).toFixed(1)}" cy="${sy(p.y).toFixed(1)}" r="4" fill="${ink}"/>`);
    if (p.label) parts.push(`<text x="${(sx(p.x) + (p.dx ?? 6)).toFixed(1)}" y="${(sy(p.y) + (p.dy ?? -6)).toFixed(1)}" font-size="11" font-weight="700" fill="${ink}">${p.label}</text>`);
  }
  return wrapH(parts.join(""), opts.caption, opts.caption, h);
}

/** Enkel eller utfylt fortegnslinje. */
export function figSignLine(opts: {
  label?: string;
  ticks: { label: string; kind?: "zero" | "pole" }[];
  left?: string;
  mids?: string[];
  right?: string;
  caption: string;
}): string {
  const w = 420;
  const y = 45;
  // Etiketten står til venstre for aksen (ikke over), så den ikke kolliderer med fortegnet i første intervall.
  const x0 = signLineAxisStart(opts.label);
  const pad = Math.max(60, x0 + 45);
  const n = opts.ticks.length;
  const xs = opts.ticks.map((_, i) => (n === 1 ? (pad + w - 60) / 2 : pad + ((w - pad - 60) * i) / (n - 1)));
  const axis = `
    <line x1="${x0}" y1="${y}" x2="${w - 20}" y2="${y}" stroke="${ink}" stroke-width="2"/>
    <polygon points="${w - 20},${y} ${w - 30},${y - 4} ${w - 30},${y + 4}" fill="${ink}"/>
  `;
  const lbl = opts.label
    ? `<text x="10" y="${y + 5}" font-size="13" font-weight="700" fill="${ink}">${opts.label}</text>`
    : "";
  const marks = opts.ticks
    .map((t, i) => {
      const x = xs[i]!;
      const dot =
        t.kind === "pole"
          ? `<text x="${x}" y="${y + 5}" text-anchor="middle" font-size="16" fill="${ink}">×</text>`
          : `<circle cx="${x}" cy="${y}" r="5" fill="${ink}"/>`;
      return `${dot}<text x="${x}" y="${y + 20}" text-anchor="middle" font-size="13" font-weight="700" fill="${ink}">${t.label}</text>`;
    })
    .join("");

  let signs = "";
  if (opts.left || opts.right || (opts.mids && opts.mids.length > 0)) {
    const mids = opts.mids || [];
    const segs: { x1: number; x2: number; s: string }[] = [
      { x1: x0 + 5, x2: xs[0]! - 8, s: opts.left || "" },
      ...mids.map((s, i) => ({ x1: xs[i]! + 8, x2: xs[i + 1]! - 8, s })),
      { x1: xs[n - 1]! + 8, x2: w - 35, s: opts.right || "" },
    ];
    signs = segs
      .filter((g) => g.s)
      .map(
        (g) =>
          `<text x="${(g.x1 + g.x2) / 2}" y="${y - 10}" text-anchor="middle" font-size="14" font-weight="700" fill="${ink}">${g.s}</text>
           <line x1="${g.x1}" y1="${y}" x2="${g.x2}" y2="${y}" stroke="${ink}" stroke-width="3.5" stroke-dasharray="${g.s === "−" || g.s === "-" ? "6 4" : "0"}" opacity="${g.s === "−" || g.s === "-" ? "0.6" : "1"}"/>`,
      )
      .join("");
  }

  const svg = `${lbl}${axis}${signs}${marks}`;
  return wrapH(svg, opts.caption, opts.caption, 85);
}

/** To parallelle fortegnslinjer for to funksjoner (f.eks. g og g'). */
export function figDualSignLine(opts: {
  label1: string;
  ticks1: { label: string; kind?: "zero" | "pole" }[];
  left1?: string;
  mids1?: string[];
  right1?: string;
  label2: string;
  ticks2: { label: string; kind?: "zero" | "pole" }[];
  left2?: string;
  mids2?: string[];
  right2?: string;
  caption: string;
}): string {
  const w = 420;
  function renderLine(
    y: number,
    label: string,
    ticks: { label: string; kind?: "zero" | "pole" }[],
    left?: string,
    mids?: string[],
    right?: string,
  ) {
    const x0 = signLineAxisStart(label);
    const pad = Math.max(65, x0 + 45);
    const n = ticks.length;
    const xAtVal = (v: number) => pad + ((v - (-1)) / 6) * (w - pad - 65);
    const xs = ticks.map((t) => xAtVal(Number(t.label.replace("−", "-"))));

    const axis = `
      <line x1="${x0}" y1="${y}" x2="${w - 20}" y2="${y}" stroke="${ink}" stroke-width="2"/>
      <polygon points="${w - 20},${y} ${w - 30},${y - 4} ${w - 30},${y + 4}" fill="${ink}"/>
    `;
    const lbl = `<text x="10" y="${y + 5}" font-size="13" font-weight="700" fill="${ink}">${label}</text>`;
    const marks = ticks
      .map((t, i) => {
        const x = xs[i]!;
        const dot = `<circle cx="${x}" cy="${y}" r="5" fill="${ink}"/>`;
        return `${dot}<text x="${x}" y="${y + 20}" text-anchor="middle" font-size="13" font-weight="700" fill="${ink}">${t.label}</text>`;
      })
      .join("");

    let signs = "";
    if (left || right || (mids && mids.length > 0)) {
      const ms = mids || [];
      const segs: { x1: number; x2: number; s: string }[] = [
        { x1: x0 + 5, x2: xs[0]! - 8, s: left || "" },
        ...ms.map((s, i) => ({ x1: xs[i]! + 8, x2: xs[i + 1]! - 8, s })),
        { x1: xs[n - 1]! + 8, x2: w - 35, s: right || "" },
      ];
      signs = segs
        .filter((g) => g.s)
        .map(
          (g) =>
            `<text x="${(g.x1 + g.x2) / 2}" y="${y - 10}" text-anchor="middle" font-size="14" font-weight="700" fill="${ink}">${g.s}</text>
             <line x1="${g.x1}" y1="${y}" x2="${g.x2}" y2="${y}" stroke="${ink}" stroke-width="3.5" stroke-dasharray="${g.s === "−" || g.s === "-" ? "6 4" : "0"}" opacity="${g.s === "−" || g.s === "-" ? "0.6" : "1"}"/>`,
        )
        .join("");
    }
    return `${lbl}${axis}${signs}${marks}`;
  }

  const line1 = renderLine(40, opts.label1, opts.ticks1, opts.left1, opts.mids1, opts.right1);
  const line2 = renderLine(115, opts.label2, opts.ticks2, opts.left2, opts.mids2, opts.right2);
  return wrapH(`${line1}${line2}`, opts.caption, opts.caption, 160);
}

/** Prikkmønster med manglende hjørner (for 2.58). */
export function figDotPatternGrid(caption: string): string {
  const sp = 20;
  const ox1 = 90;
  const oy1 = 50;
  const dots1 = [];
  for (let c = 0; c < 3; c++) {
    const x = ox1 + c * sp;
    const y = oy1;
    const isCorner = c === 0 || c === 2;
    if (isCorner) {
      dots1.push(`<circle cx="${x}" cy="${y}" r="4" fill="none" stroke="${ink}" stroke-dasharray="2 2" stroke-width="1.2" opacity="0.4"/>`);
    } else {
      dots1.push(`<circle cx="${x}" cy="${y}" r="4.5" fill="#6366f1"/>`);
    }
  }

  const ox2 = 240;
  const oy2 = 40;
  const dots2 = [];
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 4; c++) {
      const x = ox2 + c * sp;
      const y = oy2 + r * sp;
      const isCorner = r === 0 && (c === 0 || c === 3);
      if (isCorner) {
        dots2.push(`<circle cx="${x}" cy="${y}" r="4" fill="none" stroke="${ink}" stroke-dasharray="2 2" stroke-width="1.2" opacity="0.4"/>`);
      } else {
        dots2.push(`<circle cx="${x}" cy="${y}" r="4.5" fill="#34d399"/>`);
      }
    }
  }

  const svg = `
    ${dots1.join("")}
    <text x="${ox1 + sp}" y="${oy1 + 32}" text-anchor="middle" font-size="13" font-weight="700" fill="${ink}">Figur 1</text>

    ${dots2.join("")}
    <text x="${ox2 + 1.5 * sp}" y="${oy2 + sp + 32}" text-anchor="middle" font-size="13" font-weight="700" fill="${ink}">Figur 2</text>
  `;
  return wrapH(svg, caption, "Prikkmønster for figur 1 og figur 2", 115);
}

/** Kvadratsetning geometrisk: (a-b)^2. */
export function figSquareIdentityMinus(caption: string): string {
  const svg = `
    <!-- Stort kvadrat a x a -->
    <rect x="130" y="25" width="150" height="150" fill="none" stroke="${ink}" stroke-width="2"/>

    <!-- Inner square (a-b)^2 -->
    <rect x="130" y="25" width="110" height="110" fill="rgba(99,102,241,0.25)" stroke="${ink}" stroke-width="1.6"/>
    <text x="185" y="85" text-anchor="middle" font-size="16" font-weight="800" fill="${ink}">(a − b)²</text>

    <!-- Subtracted rectangle 1: right strip (a - b) x b -->
    <rect x="240" y="25" width="40" height="110" fill="rgba(239,68,68,0.18)" stroke="${ink}" stroke-width="1.4"/>
    <text x="260" y="85" text-anchor="middle" font-size="12" font-weight="700" fill="${ink}">ab</text>

    <!-- Subtracted rectangle 2: bottom strip b x (a - b) -->
    <rect x="130" y="135" width="110" height="40" fill="rgba(239,68,68,0.18)" stroke="${ink}" stroke-width="1.4"/>
    <text x="185" y="160" text-anchor="middle" font-size="12" font-weight="700" fill="${ink}">ab</text>

    <!-- Overlapping corner b^2 (subtracted twice, added back) -->
    <rect x="240" y="135" width="40" height="40" fill="rgba(52,211,153,0.3)" stroke="${ink}" stroke-width="1.8"/>
    <text x="260" y="160" text-anchor="middle" font-size="13" font-weight="800" fill="#34d399">+b²</text>

    <!-- Side labels -->
    <text x="185" y="18" text-anchor="middle" font-size="13" font-weight="700" fill="${ink}">a − b</text>
    <text x="260" y="18" text-anchor="middle" font-size="13" font-weight="700" fill="${ink}">b</text>
    <text x="118" y="85" text-anchor="end" font-size="13" font-weight="700" fill="${ink}">a − b</text>
    <text x="118" y="160" text-anchor="end" font-size="13" font-weight="700" fill="${ink}">b</text>
  `;
  return wrapH(svg, caption, "Geometrisk tolkning av (a-b)^2", 205);
}

/** Rasjonal funksjon (x+2)/(x-1) med asymptoter og to greiner (for 4.27). */
export function figRational427(caption: string, opts?: { withKeyPoints?: boolean }): string {
  const withKeyPoints = Boolean(opts?.withKeyPoints);
  const ox = 190;
  const oy = 110;
  const step = 28;
  const asymX = ox + 1 * step;
  const asymY = oy - 1 * step;

  const leftPts = [];
  for (let i = -50; i <= 6; i++) {
    const x = i / 10;
    const y = (x + 2) / (x - 1);
    const px = ox + x * step;
    const py = oy - y * step;
    if (py >= -20 && py <= 240) leftPts.push([px, py]);
  }
  const dLeft = leftPts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

  const rightPts = [];
  for (let i = 13; i <= 60; i++) {
    const x = i / 10;
    const y = (x + 2) / (x - 1);
    const px = ox + x * step;
    const py = oy - y * step;
    if (py >= -20 && py <= 240) rightPts.push([px, py]);
  }
  const dRight = rightPts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

  const asymptoteLabels = withKeyPoints
    ? `
      <text x="${asymX + 6}" y="32" font-size="11" font-weight="700" fill="#ef4444">x = 1</text>
      <text x="340" y="${asymY - 6}" font-size="11" font-weight="700" fill="#ef4444">y = 1</text>
    `
    : "";

  const keyPointsSvg = withKeyPoints
    ? `
      <!-- Nøkkelpunkter (nullpunkt og skjæring med y-aksen) -->
      <circle cx="${ox - 2 * step}" cy="${oy}" r="4.5" fill="#34d399"/>
      <text x="${ox - 2 * step - 8}" y="${oy - 8}" text-anchor="end" font-size="11" font-weight="700" fill="#34d399">(−2, 0)</text>

      <circle cx="${ox}" cy="${oy + 2 * step}" r="4.5" fill="#34d399"/>
      <text x="${ox + 8}" y="${oy + 2 * step + 4}" font-size="11" font-weight="700" fill="#34d399">(0, −2)</text>
    `
    : "";

  const svg = `
    <!-- Akser -->
    <line x1="30" y1="${oy}" x2="390" y2="${oy}" stroke="${ink}" stroke-width="1.8"/>
    <polygon points="390,${oy} 380,${oy - 4} 380,${oy + 4}" fill="${ink}"/>
    <text x="395" y="${oy + 4}" font-size="12" font-weight="700" fill="${ink}">x</text>

    <line x1="${ox}" y1="215" x2="${ox}" y2="20" stroke="${ink}" stroke-width="1.8"/>
    <polygon points="${ox},20 ${ox - 4},30 ${ox + 4},30" fill="${ink}"/>
    <text x="${ox + 6}" y="24" font-size="12" font-weight="700" fill="${ink}">y</text>

    <!-- Ticks -->
    <line x1="${ox - 2 * step}" y1="${oy - 3}" x2="${ox - 2 * step}" y2="${oy + 3}" stroke="${ink}"/>
    <text x="${ox - 2 * step}" y="${oy + 16}" text-anchor="middle" font-size="11" fill="${ink}">−2</text>
    <line x1="${asymX}" y1="${oy - 3}" x2="${asymX}" y2="${oy + 3}" stroke="${ink}"/>
    <text x="${asymX}" y="${oy + 16}" text-anchor="middle" font-size="11" fill="${ink}">1</text>
    <line x1="${ox - 3}" y1="${asymY}" x2="${ox + 3}" y2="${asymY}" stroke="${ink}"/>
    <text x="${ox - 8}" y="${asymY + 4}" text-anchor="end" font-size="11" fill="${ink}">1</text>
    <line x1="${ox - 3}" y1="${oy + 2 * step}" x2="${ox + 3}" y2="${oy + 2 * step}" stroke="${ink}"/>
    <text x="${ox - 8}" y="${oy + 2 * step + 4}" text-anchor="end" font-size="11" fill="${ink}">−2</text>

    <!-- Asymptoter -->
    <line x1="${asymX}" y1="20" x2="${asymX}" y2="215" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="5 4"/>
    ${asymptoteLabels}

    <line x1="30" y1="${asymY}" x2="390" y2="${asymY}" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="5 4"/>

    <!-- Kurver -->
    <path d="${dLeft}" fill="none" stroke="#6366f1" stroke-width="2.6"/>
    <path d="${dRight}" fill="none" stroke="#6366f1" stroke-width="2.6"/>

    ${keyPointsSvg}
  `;
  return wrapH(svg, caption, "Graf til rasjonal funksjon med to greiner og stiplede asymptoter", 235);
}

/** Oddetall bygger kvadrater (for 1.31). */
export function figSolarOddSquares(caption: string, withFormula = false): string {
  const s = 18;
  // Figuren viser totalen etter n rader (1, 4, 9), ikke én enkelt rad.
  const lab = (n: number, formula: string) =>
    `<tspan x="X" dy="0">Etter rad ${n}</tspan>` + (withFormula ? `<tspan x="X" dy="15">${formula}</tspan>` : "");
  const lab1 = lab(1, "1 = 1²");
  const lab2 = lab(2, "1+3 = 2²");
  const lab3 = lab(3, "1+3+5 = 3²");

  const svg = `
    <!-- 1x1 -->
    <rect x="50" y="60" width="${s}" height="${s}" rx="2" fill="rgba(99,102,241,0.4)" stroke="${ink}" stroke-width="1.2"/>
    <text x="${50 + s / 2}" y="105" text-anchor="middle" font-size="12" font-weight="700" fill="${ink}">${lab1.replace(/x="X"/g, `x="${50 + s / 2}"`)}</text>

    <!-- 2x2 -->
    <rect x="130" y="42" width="${s}" height="${s}" rx="2" fill="rgba(99,102,241,0.4)" stroke="${ink}" stroke-width="1.2"/>
    <rect x="${130 + s}" y="42" width="${s}" height="${s}" rx="2" fill="rgba(52,211,153,0.4)" stroke="${ink}" stroke-width="1.2"/>
    <rect x="130" y="${42 + s}" width="${s}" height="${s}" rx="2" fill="rgba(52,211,153,0.4)" stroke="${ink}" stroke-width="1.2"/>
    <rect x="${130 + s}" y="${42 + s}" width="${s}" height="${s}" rx="2" fill="rgba(52,211,153,0.4)" stroke="${ink}" stroke-width="1.2"/>
    <text x="${130 + s}" y="105" text-anchor="middle" font-size="12" font-weight="700" fill="${ink}">${lab2.replace(/x="X"/g, `x="${130 + s}"`)}</text>

    <!-- 3x3 -->
    <rect x="250" y="24" width="${s}" height="${s}" rx="2" fill="rgba(99,102,241,0.4)" stroke="${ink}" stroke-width="1.2"/>
    <rect x="${250 + s}" y="24" width="${s}" height="${s}" rx="2" fill="rgba(52,211,153,0.4)" stroke="${ink}" stroke-width="1.2"/>
    <rect x="250" y="${24 + s}" width="${s}" height="${s}" rx="2" fill="rgba(52,211,153,0.4)" stroke="${ink}" stroke-width="1.2"/>
    <rect x="${250 + s}" y="${24 + s}" width="${s}" height="${s}" rx="2" fill="rgba(52,211,153,0.4)" stroke="${ink}" stroke-width="1.2"/>
    <rect x="${250 + 2 * s}" y="24" width="${s}" height="${s}" rx="2" fill="rgba(245,158,11,0.4)" stroke="${ink}" stroke-width="1.2"/>
    <rect x="${250 + 2 * s}" y="${24 + s}" width="${s}" height="${s}" rx="2" fill="rgba(245,158,11,0.4)" stroke="${ink}" stroke-width="1.2"/>
    <rect x="${250 + 2 * s}" y="${24 + 2 * s}" width="${s}" height="${s}" rx="2" fill="rgba(245,158,11,0.4)" stroke="${ink}" stroke-width="1.2"/>
    <rect x="${250 + s}" y="${24 + 2 * s}" width="${s}" height="${s}" rx="2" fill="rgba(245,158,11,0.4)" stroke="${ink}" stroke-width="1.2"/>
    <rect x="250" y="${24 + 2 * s}" width="${s}" height="${s}" rx="2" fill="rgba(245,158,11,0.4)" stroke="${ink}" stroke-width="1.2"/>
    <text x="${250 + 1.5 * s}" y="105" text-anchor="middle" font-size="12" font-weight="700" fill="${ink}">${lab3.replace(/x="X"/g, `x="${250 + 1.5 * s}"`)}</text>
  `;
  return wrapH(svg, caption, "Oddetall danner kvadrater", withFormula ? 140 : 125);
}

/** Paneler i trekantform: rad n har 2n−1 paneler (1, 3, 5), sentrert som en pyramide. */
export function figTriangleRows(rows: number, caption: string): string {
  const s = 22;
  const cx = 130;
  const y0 = 22;
  const colors = ["rgba(99,102,241,0.4)", "rgba(52,211,153,0.4)", "rgba(245,158,11,0.4)", "rgba(236,72,153,0.4)"];
  let out = "";
  for (let n = 1; n <= rows; n++) {
    const count = 2 * n - 1;
    const y = y0 + (n - 1) * (s + 8);
    const x0 = cx - (count * s) / 2;
    for (let i = 0; i < count; i++) {
      out += `<rect x="${x0 + i * s}" y="${y}" width="${s - 2}" height="${s - 2}" rx="2" fill="${colors[(n - 1) % colors.length]}" stroke="${ink}" stroke-width="1.2"/>`;
    }
    const word = count === 1 ? "panel" : "paneler";
    out += `<text x="${cx + (2 * rows - 1) * s / 2 + 18}" y="${y + s / 2 + 4}" font-size="13" font-weight="700" fill="${ink}">Rad ${n}: ${count} ${word}</text>`;
  }
  return wrapH(out, caption, `Trekantformet jorde med ${rows} rader solcellepaneler: rad n har 2n−1 paneler`, y0 + rows * (s + 8) + 6);
}

/* ── Rikere kapittel 3-figurer (DesignBOT) ─────────────────────
 * Farger via CSS-variabler i style=, så de følger mørk/lys modus.
 * role="img" + <title>/<desc> (aria-labelledby) for skjermlesere. */
const C = {
  ink: "currentColor",
  pri: "var(--primary-light, #818cf8)",
  acc: "var(--accent, #34d399)",
  hint: "var(--hint-color, #f59e0b)",
  priFill: "var(--primary-glow, rgba(99,102,241,0.18))",
  accFill: "var(--accent-glow, rgba(52,211,153,0.18))",
};
let figSeq = 0;
function wrapA11y(svg: string, vb: string, title: string, desc: string, caption: string): string {
  const id = `tf3-${++figSeq}`;
  return `<figure class="task-figure"><svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="100%" role="img" aria-labelledby="${id}-t ${id}-d" font-family="Inter, -apple-system, BlinkMacSystemFont, sans-serif"><title id="${id}-t">${title}</title><desc id="${id}-d">${desc}</desc>${svg}</svg><figcaption>${caption}</figcaption></figure>`;
}
/** Målpil med pilspisser i begge ender (horisontal eller vertikal). */
function dimArrow(x1: number, y1: number, x2: number, y2: number, color: string): string {
  const h = 6;
  const horiz = y1 === y2;
  const heads = horiz
    ? `<path d="M${x1 + h} ${y1 - h * 0.7} L${x1} ${y1} L${x1 + h} ${y1 + h * 0.7} M${x2 - h} ${y2 - h * 0.7} L${x2} ${y2} L${x2 - h} ${y2 + h * 0.7}"/>`
    : `<path d="M${x1 - h * 0.7} ${y1 + h} L${x1} ${y1} L${x1 + h * 0.7} ${y1 + h} M${x2 - h * 0.7} ${y2 - h} L${x2} ${y2} L${x2 + h * 0.7} ${y2 - h}"/>`;
  return `<g style="stroke:${color}" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>${heads}</g>`;
}
/** Etikett med «pille»-bakgrunn så den alltid er lesbar. */
function pill(x: number, y: number, text: string, color: string, w: number, anchor = "middle"): string {
  const rx = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
  return `<rect x="${rx}" y="${y - 15}" width="${w}" height="22" rx="11" style="fill:var(--bg-surface, #111827);stroke:${color}" stroke-width="1.2"/><text x="${rx + w / 2}" y="${y + 1}" text-anchor="middle" font-size="15" font-weight="700" style="fill:${color}">${text}</text>`;
}

/** 3.2: fotballbane med banemarkering, lengde l og bredde l − 35. */
export function figFootballPitch(caption: string): string {
  const x = 60, y = 40, w = 300, h = 200; // 105:70 ≈ 3:2
  const cx = x + w / 2, cy = y + h / 2;
  const line = `style="stroke:${C.ink}" stroke-width="1.6" fill="none" opacity="0.75"`;
  const svg = `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" style="fill:${C.accFill};stroke:${C.ink}" stroke-width="2.4"/>
    ${[1, 3, 5].map((i) => `<rect x="${x + (i * w) / 6}" y="${y}" width="${w / 6}" height="${h}" style="fill:${C.acc}" opacity="0.07"/>`).join("")}
    <line x1="${cx}" y1="${y}" x2="${cx}" y2="${y + h}" ${line}/>
    <circle cx="${cx}" cy="${cy}" r="26" ${line}/>
    <circle cx="${cx}" cy="${cy}" r="2.5" style="fill:${C.ink}" opacity="0.75"/>
    <rect x="${x}" y="${cy - 58}" width="46" height="116" ${line}/>
    <rect x="${x + w - 46}" y="${cy - 58}" width="46" height="116" ${line}/>
    <rect x="${x}" y="${cy - 26}" width="16" height="52" ${line}/>
    <rect x="${x + w - 16}" y="${cy - 26}" width="16" height="52" ${line}/>
    <rect x="${x - 7}" y="${cy - 14}" width="7" height="28" ${line}/>
    <rect x="${x + w}" y="${cy - 14}" width="7" height="28" ${line}/>
    ${dimArrow(x, 22, x + w, 22, C.pri)}
    ${pill(cx, 22, "lengde l", C.pri, 92)}
    ${dimArrow(386, y, 386, y + h, C.hint)}
    <g transform="translate(386 ${cy}) rotate(-90)">${pill(0, 5, "bredde l − 35", C.hint, 126)}</g>
    <text x="${cx}" y="${y + h + 30}" text-anchor="middle" font-size="14" font-weight="600" style="fill:${C.ink}">Omkrets: l + (l − 35) + l + (l − 35) = 350 m</text>`;
  return wrapA11y(
    svg,
    "0 0 420 280",
    "Fotballbane sett ovenfra",
    "Rektangulær fotballbane med midtlinje, midtsirkel, straffefelt og mål. Lengden er merket l, bredden er merket l minus 35. Hele omkretsen er 350 meter.",
    caption,
  );
}

/** 3.24: rektangel med omkrets 54 cm, sider b og 2b + 3. Bredden b vist som målestokk. */
export function figRectPerimeter54(caption: string): string {
  const x = 50, y = 42, b = 70, w = 2 * b + 30, h = b; // l = 2b + 3 skjematisk
  const svg = `
    <rect x="${x}" y="${y}" width="${w * 1.6}" height="${h * 1.6}" rx="4" style="fill:${C.priFill};stroke:${C.ink}" stroke-width="2.4"/>
    ${dimArrow(x, 24, x + b * 1.6, 24, C.pri)}${dimArrow(x + b * 1.6, 24, x + 2 * b * 1.6, 24, C.pri)}${dimArrow(x + 2 * b * 1.6, 24, x + w * 1.6, 24, C.hint)}
    <text x="${x + b * 0.8}" y="16" text-anchor="middle" font-size="14" font-weight="700" style="fill:${C.pri}">b</text>
    <text x="${x + b * 2.4}" y="16" text-anchor="middle" font-size="14" font-weight="700" style="fill:${C.pri}">b</text>
    <text x="${x + (2 * b + 15) * 1.6}" y="16" text-anchor="middle" font-size="14" font-weight="700" style="fill:${C.hint}">3</text>
    ${pill(x + (w * 1.6) / 2, y + h * 0.8 + 6, "lengde 2b + 3", C.pri, 128)}
    ${dimArrow(x + w * 1.6 + 18, y, x + w * 1.6 + 18, y + h * 1.6, C.acc)}
    ${pill(x + w * 1.6 + 18, y + h * 0.8 + 6, "b", C.acc, 30)}
    <text x="${x + (w * 1.6) / 2}" y="${y + h * 1.6 + 30}" text-anchor="middle" font-size="14" font-weight="600" style="fill:${C.ink}">Omkrets = 54 cm (hele kanten rundt)</text>`;
  return wrapA11y(
    svg,
    "0 0 420 230",
    "Rektangel med omkrets 54 cm",
    "Rektangel der bredden er b og lengden er 2b pluss 3. Lengden er delt opp i to biter med lengde b og en bit med lengde 3. Omkretsen er 54 centimeter.",
    caption,
  );
}

/** 3.46 c: rettvinklet trekant, kateter x og x + 7, hypotenus 13. */
export function figPythagoras13(caption: string): string {
  // 5–12–13-proporsjoner (skjematisk): x kort katet, x + 7 lang katet.
  const A = [80, 190], B = [80 + 12 * 21, 190], Cc = [80, 190 - 5 * 21];
  const svg = `
    <polygon points="${A} ${B} ${Cc}" style="fill:${C.accFill};stroke:${C.ink}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M${A[0]} ${A[1] - 18} h18 v18" style="stroke:${C.ink}" stroke-width="1.8" fill="none"/>
    <circle cx="${A[0] + 9}" cy="${A[1] - 9}" r="1.8" style="fill:${C.ink}"/>
    <line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}" style="stroke:${C.pri}" stroke-width="4" stroke-linecap="round"/>
    <line x1="${A[0]}" y1="${A[1]}" x2="${Cc[0]}" y2="${Cc[1]}" style="stroke:${C.hint}" stroke-width="4" stroke-linecap="round"/>
    <line x1="${Cc[0]}" y1="${Cc[1]}" x2="${B[0]}" y2="${B[1]}" style="stroke:${C.acc}" stroke-width="4" stroke-linecap="round"/>
    ${pill((A[0] + B[0]) / 2, 216, "x + 7", C.pri, 64)}
    ${pill(44, (A[1] + Cc[1]) / 2 + 5, "x", C.hint, 30)}
    <g transform="translate(${(Cc[0] + B[0]) / 2 + 6} ${(Cc[1] + B[1]) / 2 - 16}) rotate(22.6)">${pill(0, 5, "13", C.acc, 40)}</g>`;
  return wrapA11y(
    svg,
    "0 62 420 170",
    "Rettvinklet trekant",
    "Rettvinklet trekant med rett vinkel nede til venstre. Den loddrette kateten er x, den vannrette kateten er x pluss 7, og hypotenusen er 13.",
    caption,
  );
}

export const TASK_FIGURES: Record<string, string> = {
  ...KAP7_FIGURES,
  ...KAP5_FIGURES,
  ...KAP2_FIGURES,
  "1.13": figNumberLine({
    min: -4,
    max: 10,
    ticks: [-4, -2, 0, 2, 4, 6, 8, 10],
    noInterval: true,
    caption: "Tallinje med aksemarkeringer til oppgaven.",
  }),
  "1.31": figTriangleRows(3, "Solcellepanelene på det trekantformede jordet: rad 1, 2 og 3."),
  "1.OP3": figSequence(
    [5, 8, 12, 17, 23],
    ["?", "?", "?", "?"],
    "De fem første leddene i tallfølgen.",
  ),
  "1.OP5": figTank(2, 5, "Illustrasjon av vanntank fylt $\\tfrac{2}{5}$."),
  "2.15": figRightTriangle("2h", "h", "Rettvinklet trekant med grunnlinje $2h$ og høyde $h$."),
  "2.OP10": figSquareNumbers("De fire første kvadrattallene som prikkmønstre."),
  "2.56": figStaircase("Figur $n$ er en trekant av $n$ rader med kvadrater — antall = $T_n$."),
  "2.57": figLShape("Figur 3 i det L-formede mønsteret (et kvadrat der ett hjørne mangler)."),
  "3.2": figFootballPitch("Fotballbane: omkrets $2(l+b)=350$ m."),
  "3.10": figRect("x + 10", "x", "Sauegjerde formet som rektangel med areal $144\\,\\mathrm{m}^2$."),
  "3.13": figRect("x + 4", "x", "Rektangel med areal $45\\,\\mathrm{cm}^2$. Lengden er $4$ cm lenger enn bredden."),
  "3.24": figRectPerimeter54("Omkrets $54$ cm. Lengde er $3$ mer enn dobbel bredde."),
  "3.29": figRect("x + 2", "x", "Rektangel med areal $48$. Den ene siden er $2$ lenger enn den andre."),
  "3.34": figProportion(
    "4 personer",
    "3 dl fløte",
    "6 personer",
    "?",
    "Rett proporsjonal: mer folk $\\Rightarrow$ mer fløte, i samme forhold.",
  ),
  "3.40": figRect("b + 3", "b", "Hage med omkrets $46$ m. Lengden er $3$ m mer enn bredden."),
  "3.46": figPythagoras13("Rettvinklet trekant med kateter $x$ og $x+7$, og hypotenus $13$."),
  "3.54": figSimilarTriangles("a) Formlike trekanter i målestokk: den store har nøyaktig dobbelt så lange sider.") +
    figShadow("b) Stang og tre i målestokk. Solstrålene er parallelle, så trekantene er formlike."),
  "3.OP2": figRect("3b + 4", "b", "Rektangel med bredde $b$ og lengde $3b+4$."),
  "3.OP3": figCircle("r", "Sirkel med radius $r$ og omkrets $C = 10\\pi$."),
  "3.OP9": figProportion(
    "5 personer",
    "200 g ost",
    "8 personer",
    "?",
    "Rett proporsjonal: mer folk $\\Rightarrow$ mer ost, i samme forhold.",
  ),
  "4.0": figCoordinateGrid("Tomt koordinatsystem med akser og rutenett."),
  "4.3": figFunctionPlot({
    xmin: -1, xmax: 5, ymin: -2, ymax: 8, xstep: 1, ystep: 1,
    fns: [{ f: (x) => x * x - 4 * x + 3, color: "#6366f1", label: "g", labelX: 4.3 }],
    caption: "Grafen til $g(x) = x^2 - 4x + 3$.",
  }),
  "4.9": figFunctionPlot({
    xmin: -3, xmax: 6, ymin: -4, ymax: 5, xstep: 1, ystep: 1,
    fns: [
      { f: () => 3, color: "#64748b", label: "v", labelX: -2.8 },
      { f: (x) => x - 2, color: "#6366f1", label: "f", labelX: 5.3 },
      { f: (x) => -x + 2, color: "#34d399", label: "g", labelX: -2.6 },
      { f: (x) => 2 * x - 2, color: "#f59e0b", label: "h", labelX: 3.2 },
    ],
    caption: "Grafene til $v(x) = 3$, $f(x) = x - 2$, $g(x) = -x + 2$ og $h(x) = 2x - 2$.",
  }),
  "4.33": figFunctionPlot({
    xmin: 0, xmax: 3200, ymin: 0, ymax: 110, xstep: 500, ystep: 20,
    fns: [{ f: (m) => 1.2 * Math.pow(m, 0.55), color: "#6366f1", label: "T", labelX: 2900, from: 1000, to: 3000 }],
    xName: "m (g)",
    yName: "T (min)",
    fmt: (v) => String(v),
    caption: "Grafen til $T(m) = 1{,}2 \\cdot m^{0{,}55}$ for $1000 \\le m \\le 3000$.",
  }),
  "4.47": figFunctionPlot({
    xmin: 0, xmax: 20, ymin: 0, ymax: 220, xstep: 2, ystep: 20,
    fns: [
      { f: (t) => 200 - 180 * Math.pow(0.92, t), color: "#ef4444", label: "T", labelX: 18.6 },
      { f: () => 200, color: "#64748b", label: "", labelX: 0 },
    ],
    xName: "t (min)",
    yName: "T (°C)",
    fmt: (v) => String(v),
    caption: "Grafen til $T(t) = 200 - 180 \\cdot 0{,}92^t$ for $0 \\le t \\le 20$. Den grå linja er $T = 200$.",
  }),
  "4.8": figLinearGrid("Tomt koordinatsystem med rutenett og akser.", false),
  "4.27": figRational427("Graf til rasjonal funksjon med to greiner og stiplede asymptoter.", { withKeyPoints: false }),
  "4.45": figSecantsAndTangent("Parabelen $f(x)=-x^2+4x+2$ med sekanter på $[0,2]$ og $[2,4]$, samt tangent i $x=2$.", { withSlopes: false }),
  "4.48": figCubicGraph(false, "Grafen til $f(x)=0{,}25x^3-2x$ i intervallet $[-4, 4]$."),
  "4.54": figSignLine({
    label: "f'(x)",
    ticks: [{ label: "−1", kind: "zero" }, { label: "3", kind: "zero" }],
    left: "−",
    mids: ["+"],
    right: "−",
    caption: "Gitt fortegnslinje for den deriverte $f'(x)$.",
  }),
};

/** Pedagogiske fasit-figurer knyttet til spesifikke steg i løsningsforslag. */
export const TASK_FASIT_FIGURES: Record<string, Record<number, string>> = {
  ...KAP5_FASIT_FIGURES,
  "1.13": {
    1: figNumberLine({
      min: -4,
      max: 10,
      ticks: [-2, 0, 8],
      from: -2,
      to: 8,
      openFrom: false,
      openTo: true,
      caption: "Intervall $[-2, 8\\rangle$: lukket ved $-2$ (fylt sirkel) og åpen ved $8$ (åpen sirkel).",
    }),
  },
  "1.14": {
    0: figNumberLine({
      min: -15,
      max: 15,
      ticks: [-12, 0, 12],
      noInterval: true,
      caption: "Tallinjen viser at både $-12$ og $12$ har avstand $12$ fra origo.",
    }),
  },
  "1.31": {
    1: figSolarOddSquares("Mønster av oddetall: $1=1^2$, $1+3=4=2^2$, $1+3+5=9=3^2$. Totalt antall paneler er $n^2$.", true),
  },
  "1.OP3": {
    0: figSequence(
      [5, 8, 12, 17, 23],
      [3, 4, 5, 6],
      "Differansene øker med $1$ for hvert steg: $+3$, $+4$, $+5$, $+6$, …",
    ),
  },
  "1.OP9": {
    0: figNumberLine({
      min: -4,
      max: 6,
      ticks: [-3, 0, 2, 5],
      from: -3,
      to: 2,
      openFrom: false,
      openTo: true,
      caption: "Intervallet $[-3, 2\\rangle$: lukket ved $-3$ og åpent ved $2$.",
    }),
  },
  "2.OP3": {
    0: figSquareIdentity("Geometrisk tolkning av 1. kvadratsetning: $(a+b)^2 = a^2 + 2ab + b^2$."),
    1: figSecondSquare("Geometrisk tolkning av 2. kvadratsetning: $(a-b)^2 = a^2 - 2ab + b^2$. Kvadratet $b^2$ trekkes fra to ganger og må legges tilbake."),
    2: figDiffSquares("Geometrisk tolkning av konjugatsetningen: $a^2 - b^2 = (a+b)(a-b)$."),
  },
  "3.25": {
    0: figNumberLine({
      min: 0,
      max: 9,
      ticks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      from: 0,
      to: 6,
      openFrom: true,
      openTo: true,
      caption: "Løsningen for a): $x<6$ er strålen $\\langle\\leftarrow,6\\rangle$. Åpen ring: $6$ er ikke med.",
    }),
    1: figNumberLine({
      min: -6,
      max: 3,
      ticks: [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3],
      from: -6,
      to: -2,
      openFrom: true,
      openTo: false,
      caption: "Løsningen for b): $x\\le -2$ er strålen $\\langle\\leftarrow,-2]$. Fylt ring: $-2$ er med.",
    }),
  },
  "3.39": {
    0: figNumberLine({
      min: -2,
      max: 7,
      ticks: [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7],
      from: -2,
      to: 3,
      openFrom: true,
      openTo: false,
      caption: "a) $x\\le 3$: $\\langle\\leftarrow,3]$.",
    }),
    1: figNumberLine({
      min: -6,
      max: 3,
      ticks: [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3],
      from: -6,
      to: -2,
      openFrom: true,
      openTo: true,
      caption: "b) $x<-2$: $\\langle\\leftarrow,-2\\rangle$.",
    }),
    2: figNumberLine({
      min: -8,
      max: 1,
      ticks: [-8, -7, -6, -5, -4, -3, -2, -1, 0, 1],
      from: -5,
      to: 1,
      openFrom: false,
      openTo: true,
      caption: "c) $x\\ge -5$: $[-5,\\rightarrow\\rangle$.",
    }),
    3: figNumberLine({
      min: -5,
      max: 4,
      ticks: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4],
      from: -2,
      to: 4,
      openFrom: true,
      openTo: true,
      caption: "d) $x>-2$: $\\langle -2,\\rightarrow\\rangle$.",
    }),
    4: figNumberLine({
      min: -2,
      max: 6,
      ticks: [-2, -1, 0, 1, 2, 3, 4, 5, 6],
      from: -2,
      to: 10 / 3,
      openFrom: true,
      openTo: false,
      caption: "e) $x\\le \\frac{10}{3}\\approx 3{,}3$: $\\langle\\leftarrow,\\tfrac{10}{3}]$.",
    }),
  },
  "3.61": {
    3: figNumberLine({
      min: -8,
      max: 1,
      ticks: [-8, -7, -6, -5, -4, -3, -2, -1, 0, 1],
      from: -8,
      to: -4,
      openFrom: true,
      openTo: false,
      caption: "d) $x\\le -4$: $\\langle\\leftarrow,-4]$.",
    }),
  },
  "3.62": {
    1: figNumberLine({
      min: -4,
      max: 5,
      ticks: [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5],
      from: -2,
      to: 3,
      openFrom: true,
      openTo: false,
      caption: "b) $-2<x\\le 3$: $\\langle -2,3]$. Åpen ring i $-2$, fylt ring i $3$.",
    }),
  },
  "3.63": {
    0: figNumberLine({
      min: -4,
      max: 5,
      ticks: [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5],
      from: -2,
      to: 3,
      openFrom: true,
      openTo: true,
      caption: "a) $-2<x<3$: $\\langle -2,3\\rangle$. Endepunktene er ikke med fordi ulikheten er streng.",
    }),
  },
  "3.OP8": {
    0: figNumberLine({
      min: -1,
      max: 8,
      ticks: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8],
      from: -1,
      to: 4,
      openFrom: true,
      openTo: true,
      caption: "Løsningen for a): $x<4$ er strålen $\\langle\\leftarrow,4\\rangle$.",
    }),
    1: figNumberLine({
      min: -7,
      max: 2,
      ticks: [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2],
      from: -7,
      to: -3,
      openFrom: true,
      openTo: false,
      caption: "Løsningen for b): $x\\le -3$ er strålen $\\langle\\leftarrow,-3]$.",
    }),
  },
  "4.0": {
    1: figCoordinateGrid("Koordinatsystem med de fire kvadrantene merket.", { withQuadrants: true }),
    2: figCoordinateGrid("Punktene $(-1, -1)$ og $(1, 2)$ plassert i koordinatsystemet.", {
      points: [
        { x: -1, y: -1, label: "(-1, -1)" },
        { x: 1, y: 2, label: "(1, 2)" },
      ],
    }),
    3: figCoordinateGrid("Rett linje trukket gjennom punktene $(-1, -1)$ og $(1, 2)$.", {
      points: [
        { x: -1, y: -1, label: "(-1, -1)" },
        { x: 1, y: 2, label: "(1, 2)" },
      ],
      withLine: true,
    }),
  },
  "4.1": {
    0: figDomainRange("Eksempel på definisjonsmengde $D_f$ og verdimengde $V_f$."),
    2: figDomainRange("Eksempel på nullpunkt der grafen skjærer $x$-aksen ($y=0$)."),
  },
  "4.8": {
    0: figLinearGrid("Eksempel på en lineær funksjon (rett linje) tegnet i koordinatsystemet.", true),
  },
  "4.27": {
    0: figRational427("Loddrett asymptote $x=1$, vannrett asymptote $y=1$, og nullpunkt i $x=-2$.", { withKeyPoints: true }),
  },
  "4.45": {
    0: figSecantsAndTangent("Sekanter på $[0, 2]$ og $[2, 4]$ med stigningstall henholdsvis $2$ og $-2$.", { withSlopes: true }),
    2: figSecantsAndTangent("Tangenten i toppunktet $(2, 6)$ har stigningstall $0$.", { withSlopes: true }),
  },
  "4.48": {
    0: figCubicGraph(true, "Grafen til $f(x)=0{,}25x^3-2x$ med tangenter i $x=-2$ og $x=2$ (begge har stigningstall $1$)."),
    1: figCubicGraph(true, "Grafen til $f(x)=0{,}25x^3-2x$ med tangenter i $x=-2$ og $x=2$ (begge har stigningstall $1$)."),
  },
  "4.52": {
    2: figSignLine({
      label: "f(x)",
      ticks: [{ label: "−3", kind: "zero" }],
      left: "−",
      mids: [],
      right: "+",
      caption: "Fullført fortegnslinje for $f(x)=x+3$: negativ før $-3$, positiv etter.",
    }),
  },
  "4.53": {
    2: figSignLine({
      label: "g(x)",
      ticks: [{ label: "0", kind: "zero" }, { label: "4", kind: "zero" }],
      left: "−",
      mids: ["+"],
      right: "−",
      caption: "Fullført fortegnslinje for $g(x)$: negativ utenfor $[0, 4]$, positiv mellom.",
    }),
    4: figSignLine({
      label: "g'(x)",
      ticks: [{ label: "2", kind: "zero" }],
      left: "+",
      mids: [],
      right: "−",
      caption: "Fullført fortegnslinje for $g'(x)$: positiv før $2$, negativ etter.",
    }),
  },
  "5.OP1": {
    0: figNumberLine({
      min: 0,
      max: 8,
      ticks: [3, 5, 7],
      from: 3,
      to: 8,
      openFrom: true,
      openTo: true,
      caption: "Løsningen $x>3$ representert på tallinjen som intervallet $\\langle 3,\\infty\\rangle$.",
    }),
  },
  "5.OP8": {
    2: figParallelLines("Når $k=4$ er linjene $2x+y=5$ og $2x+y=2$ parallelle uten felles skjæringspunkt."),
  },
};

/** Noen id-er finnes både som ekstraoppgave og som md-oppgave med annet innhold.
 * Figuren vises bare når oppgaveteksten faktisk handler om den. */
export const TASK_FIGURE_REQUIRES: Record<string, RegExp> = {
  "3.24": /54/,
  "3.46": /hypotenus/i,
};
