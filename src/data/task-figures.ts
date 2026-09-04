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

/** Tomt koordinatsystem med akser og fire kvadranter. */
export function figCoordinateGrid(caption: string): string {
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

    <!-- Kvadranter -->
    <text x="${ox + 85}" y="${oy - 55}" text-anchor="middle" font-size="15" font-weight="800" fill="#6366f1" opacity="0.85">1. kvadrant (I)</text>
    <text x="${ox - 85}" y="${oy - 55}" text-anchor="middle" font-size="15" font-weight="800" fill="#6366f1" opacity="0.85">2. kvadrant (II)</text>
    <text x="${ox - 85}" y="${oy + 75}" text-anchor="middle" font-size="15" font-weight="800" fill="#6366f1" opacity="0.85">3. kvadrant (III)</text>
    <text x="${ox + 85}" y="${oy + 75}" text-anchor="middle" font-size="15" font-weight="800" fill="#6366f1" opacity="0.85">4. kvadrant (IV)</text>
  `;
  return wrapH(svg, caption, "Koordinatsystem med akser og fire kvadranter", 260);
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

/** Rutenett med en stiplet hjelpelinje som viser en rett linje. */
export function figLinearGrid(caption: string): string {
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

    <!-- Stiplet referanselinje gjennom origo -->
    <line x1="${ox - 3 * step}" y1="${oy + 3 * step * 0.7}" x2="${ox + 3 * step}" y2="${oy - 3 * step * 0.7}" stroke="#818cf8" stroke-width="2.2" stroke-dasharray="6 4"/>
    <circle cx="${ox}" cy="${oy}" r="4" fill="#818cf8"/>
    <text x="${ox + 75}" y="${oy - 55}" font-size="12" font-weight="700" fill="#818cf8">stiplet linje (rett linje)</text>
  `;
  return wrapH(svg, caption, "Rutenett med akser og en stiplet hjelpelinje", 240);
}

/** Parabel med sekanter og horisontal tangent. */
export function figSecantsAndTangent(caption: string): string {
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

    <!-- Sekant [0, 2] stigning +2 -->
    <line x1="85" y1="170" x2="235" y2="50" stroke="#34d399" stroke-width="2" stroke-dasharray="5 4"/>
    <text x="135" y="98" font-size="11" font-weight="700" fill="#34d399">sekant [0,2] (stigning 2)</text>

    <!-- Sekant [2, 4] stigning -2 -->
    <line x1="185" y1="50" x2="335" y2="170" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 4"/>
    <text x="285" y="98" font-size="11" font-weight="700" fill="#f59e0b">sekant [2,4] (stigning −2)</text>

    <!-- Horisontal tangent i (2, 6) -->
    <line x1="130" y1="70" x2="290" y2="70" stroke="#ec4899" stroke-width="2.2"/>
    <text x="210" y="58" text-anchor="middle" font-size="11" font-weight="700" fill="#ec4899">tangent i (2,6) (stigning 0)</text>

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
  const pad = 60;
  const n = opts.ticks.length;
  const xs = opts.ticks.map((_, i) => pad + ((w - 2 * pad) * i) / Math.max(n - 1, 1));
  const axis = `
    <line x1="20" y1="${y}" x2="${w - 20}" y2="${y}" stroke="${ink}" stroke-width="2"/>
    <polygon points="${w - 20},${y} ${w - 30},${y - 4} ${w - 30},${y + 4}" fill="${ink}"/>
  `;
  const lbl = opts.label
    ? `<text x="18" y="${y - 12}" font-size="13" font-weight="700" fill="${ink}">${opts.label}</text>`
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
      { x1: 25, x2: xs[0]! - 8, s: opts.left || "" },
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
    const pad = 65;
    const n = ticks.length;
    const xAtVal = (v: number) => pad + ((v - (-1)) / 6) * (w - 2 * pad);
    const xs = ticks.map((t) => xAtVal(Number(t.label.replace("−", "-"))));

    const axis = `
      <line x1="20" y1="${y}" x2="${w - 20}" y2="${y}" stroke="${ink}" stroke-width="2"/>
      <polygon points="${w - 20},${y} ${w - 30},${y - 4} ${w - 30},${y + 4}" fill="${ink}"/>
    `;
    const lbl = `<text x="18" y="${y - 12}" font-size="13" font-weight="700" fill="${ink}">${label}</text>`;
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
        { x1: 25, x2: xs[0]! - 8, s: left || "" },
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
    <text x="${ox1 + sp}" y="${oy1 + 32}" text-anchor="middle" font-size="13" font-weight="700" fill="${ink}">Figur 1 (1 prikk)</text>

    ${dots2.join("")}
    <text x="${ox2 + 1.5 * sp}" y="${oy2 + sp + 32}" text-anchor="middle" font-size="13" font-weight="700" fill="${ink}">Figur 2 (6 prikker)</text>
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
export function figRational427(caption: string): string {
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
    <text x="${asymX + 6}" y="32" font-size="11" font-weight="700" fill="#ef4444">x = 1</text>

    <line x1="30" y1="${asymY}" x2="390" y2="${asymY}" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="5 4"/>
    <text x="340" y="${asymY - 6}" font-size="11" font-weight="700" fill="#ef4444">y = 1</text>

    <!-- Kurver -->
    <path d="${dLeft}" fill="none" stroke="#6366f1" stroke-width="2.6"/>
    <path d="${dRight}" fill="none" stroke="#6366f1" stroke-width="2.6"/>

    <!-- Nøkkelpunkter -->
    <circle cx="${ox - 2 * step}" cy="${oy}" r="4.5" fill="#34d399"/>
    <text x="${ox - 2 * step - 8}" y="${oy - 8}" text-anchor="end" font-size="11" font-weight="700" fill="#34d399">(−2, 0)</text>

    <circle cx="${ox}" cy="${oy + 2 * step}" r="4.5" fill="#34d399"/>
    <text x="${ox + 8}" y="${oy + 2 * step + 4}" font-size="11" font-weight="700" fill="#34d399">(0, −2)</text>
  `;
  return wrapH(svg, caption, "Graf til rasjonal funksjon med to greiner og stiplede asymptoter", 235);
}

/** Oddetall bygger kvadrater (for 1.31). */
export function figSolarOddSquares(caption: string): string {
  const s = 18;
  const svg = `
    <!-- 1x1 -->
    <rect x="50" y="60" width="${s}" height="${s}" rx="2" fill="rgba(99,102,241,0.4)" stroke="${ink}" stroke-width="1.2"/>
    <text x="${50 + s / 2}" y="105" text-anchor="middle" font-size="12" font-weight="700" fill="${ink}">1 = 1²</text>

    <!-- 2x2 -->
    <rect x="130" y="42" width="${s}" height="${s}" rx="2" fill="rgba(99,102,241,0.4)" stroke="${ink}" stroke-width="1.2"/>
    <rect x="${130 + s}" y="42" width="${s}" height="${s}" rx="2" fill="rgba(52,211,153,0.4)" stroke="${ink}" stroke-width="1.2"/>
    <rect x="130" y="${42 + s}" width="${s}" height="${s}" rx="2" fill="rgba(52,211,153,0.4)" stroke="${ink}" stroke-width="1.2"/>
    <rect x="${130 + s}" y="${42 + s}" width="${s}" height="${s}" rx="2" fill="rgba(52,211,153,0.4)" stroke="${ink}" stroke-width="1.2"/>
    <text x="${130 + s}" y="105" text-anchor="middle" font-size="12" font-weight="700" fill="${ink}">1+3 = 2²</text>

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
    <text x="${250 + 1.5 * s}" y="105" text-anchor="middle" font-size="12" font-weight="700" fill="${ink}">1+3+5 = 3²</text>
  `;
  return wrapH(svg, caption, "Oddetall danner kvadrater", 125);
}

export const TASK_FIGURES: Record<string, string> = {
  "1.13": figNumberLine({
    min: -4,
    max: 10,
    ticks: [-2, 0, 8],
    from: -2,
    to: 8,
    openFrom: false,
    openTo: true,
    caption: "Intervall $[-2, 8\\rangle$: lukket ved $-2$ (fylt sirkel) og åpen ved $8$ (åpen sirkel).",
  }),
  "1.14": figNumberLine({
    min: -15,
    max: 15,
    ticks: [-12, 0, 12],
    noInterval: true,
    caption: "Tallinjen med markeringer for $-12$, $0$ og $12$.",
  }),
  "1.31": figSolarOddSquares("Mønster av oddetall: $1$, $1+3=4=2^2$, $1+3+5=9=3^2$."),
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
  "2.58": figDotPatternGrid("Prikkmønster med $n$ rader og $n+2$ prikker, der $2$ hjørneprikker mangler."),
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
  "4.0": figCoordinateGrid("Tomt koordinatsystem med akser og fire kvadranter (I, II, III, IV)."),
  "4.1": figDomainRange("Definisjonsmengde $D_f$ leses på $x$-aksen, verdimengde $V_f$ på $y$-aksen, og nullpunkt der grafen skjærer $x$-aksen."),
  "4.8": figLinearGrid("Koordinatsystem med rutenett og en stiplet hjelpelinje som viser en rett linje."),
  "4.27": figRational427("Graf til rasjonal funksjon med to greiner og stiplede asymptoter $x=1$ og $y=1$."),
  "4.45": figSecantsAndTangent("Parabelen $f(x)=-x^2+4x+2$ med sekanter på $[0,2]$ og $[2,4]$, samt horisontal tangent i toppunktet $(2,6)$."),
  "4.48": figCubicGraph(false, "Grafen til $f(x)=0{,}25x^3-2x$ i intervallet $[-4, 4]$."),
  "4.52": figSignLine({
    label: "f(x)",
    ticks: [{ label: "−3", kind: "zero" }],
    caption: "Fortegnslinje for $f(x)=x+3$ med nullpunkt i $x=-3$.",
  }),
  "4.53": figDualSignLine({
    label1: "g(x)",
    ticks1: [{ label: "0", kind: "zero" }, { label: "4", kind: "zero" }],
    label2: "g'(x)",
    ticks2: [{ label: "2", kind: "zero" }],
    caption: "Fortegnslinjer for $g(x)$ og $g'(x)$ med markerte nullpunkter.",
  }),
  "4.54": figSignLine({
    label: "f'(x)",
    ticks: [{ label: "−1", kind: "zero" }, { label: "3", kind: "zero" }],
    left: "−",
    mids: ["+"],
    right: "−",
    caption: "Gitt fortegnslinje for den deriverte $f'(x)$.",
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

/** Pedagogiske fasit-figurer knyttet til spesifikke steg i løsningsforslag. */
export const TASK_FASIT_FIGURES: Record<string, Record<number, string>> = {
  "2.OP3": {
    1: figSquareIdentityMinus("Geometrisk tolkning: $(a-b)^2 = a^2 - 2ab + b^2$. Kvadratet $b^2$ trekkes fra to ganger og må legges tilbake."),
  },
  "4.48": {
    0: figCubicGraph(true, "Grafen til $f(x)=0{,}25x^3-2x$ med tangenter i $x=-2$ og $x=2$ (begge har stigningstall $1$)."),
    1: figCubicGraph(true, "Grafen til $f(x)=0{,}25x^3-2x$ med tangenter i $x=-2$ og $x=2$ (begge har stigningstall $1$)."),
  },
  "4.52": {
    1: figSignLine({
      label: "f(x)",
      ticks: [{ label: "−3", kind: "zero" }],
      left: "−",
      mids: [],
      right: "+",
      caption: "Fullført fortegnslinje for $f(x)=x+3$: negativ før $-3$, positiv etter.",
    }),
  },
  "4.53": {
    1: figSignLine({
      label: "g(x)",
      ticks: [{ label: "0", kind: "zero" }, { label: "4", kind: "zero" }],
      left: "−",
      mids: ["+"],
      right: "−",
      caption: "Fullført fortegnslinje for $g(x)$: negativ utenfor $[0, 4]$, positiv mellom.",
    }),
    2: figSignLine({
      label: "g'(x)",
      ticks: [{ label: "2", kind: "zero" }],
      left: "+",
      mids: [],
      right: "−",
      caption: "Fullført fortegnslinje for $g'(x)$: positiv før $2$, negativ etter.",
    }),
  },
};
