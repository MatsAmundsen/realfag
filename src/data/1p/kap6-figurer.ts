/*
 * 1P kap 6-figurer (DesignBOT2) som statiske SVG-er, i samme stil som DesignBOTs src/data/1p/figurer.ts
 * (kap 4–5): currentColor for akser og tekst, svakt rutenett (opacity 0.18), viewBox 360 bred, tall i font-size 15.
 * Kurvefargene bruker --fig1p-* med reserveverdier, så figurene virker også før temavariablene er flettet inn.
 * Hver figur tegner nøyaktig det som står i den skjulte «figur:»-kommentaren i kap6.ts.
 */

const ink = "currentColor";
const C = {
  blue: "var(--fig1p-blue, #6366f1)",
  green: "var(--fig1p-green, #10b981)",
  red: "var(--fig1p-red, #ef4444)",
  amber: "var(--fig1p-amber, #f59e0b)",
  grey: "var(--fig1p-grey, #94a3b8)",
};
const W = 360;
const FS = 15;
const FL = 15;
const BG = "var(--bg-surface, #111827)";
const HALO = ` stroke="${BG}" stroke-width="4" stroke-linejoin="round" paint-order="stroke"`;
const CAP = "color:color-mix(in srgb, var(--text-main, currentColor) 72%, var(--text-muted, #94a3b8))";
let clipSeq = 0;

function num(v: number): string {
  const r = Math.round(v * 1000) / 1000;
  return String(r).replace("-", "−").replace(".", ",");
}

function wrap(id: string, svg: string, h: number, aria: string): string {
  return `<figure class="task-figure task-figure-1p"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${h}" width="100%" role="img" aria-label="${aria}" font-family="inherit">${svg}</svg><figcaption style="${CAP}">Figur til oppgave ${id}</figcaption></figure>`;
}

function range(a: number, b: number, s: number): number[] {
  const out: number[] = [];
  const n = Math.round((b - a) / s);
  for (let i = 0; i <= n; i++) out.push(Math.round((a + i * s) * 1e6) / 1e6);
  return out;
}

type Plot = { sx: (x: number) => number; sy: (y: number) => number; clip: string; svg: string };

function axes(o: {
  box: [number, number, number, number];
  xmin: number; xmax: number; ymin: number; ymax: number;
  xticks: number[]; xlabels: number[]; yticks: number[]; ylabels: number[];
  xName: string; yName: string;
}): Plot {
  const [L, T, w, hh] = o.box;
  const R = L + w, B = T + hh;
  const sx = (x: number) => L + ((x - o.xmin) / (o.xmax - o.xmin)) * w;
  const sy = (y: number) => B - ((y - o.ymin) / (o.ymax - o.ymin)) * hh;
  const ax = sy(0), ay = sx(0);
  const p: string[] = [];
  for (const x of o.xticks) p.push(`<line x1="${sx(x).toFixed(1)}" y1="${T}" x2="${sx(x).toFixed(1)}" y2="${B}" stroke="${ink}" stroke-width="0.6" opacity="0.18"/>`);
  for (const y of o.yticks) p.push(`<line x1="${L}" y1="${sy(y).toFixed(1)}" x2="${R}" y2="${sy(y).toFixed(1)}" stroke="${ink}" stroke-width="0.6" opacity="0.18"/>`);
  for (const x of o.xticks) p.push(`<line x1="${sx(x).toFixed(1)}" y1="${ax - 3}" x2="${sx(x).toFixed(1)}" y2="${ax + 3}" stroke="${ink}" stroke-width="1.2"/>`);
  for (const y of o.yticks) p.push(`<line x1="${ay - 3}" y1="${sy(y).toFixed(1)}" x2="${ay + 3}" y2="${sy(y).toFixed(1)}" stroke="${ink}" stroke-width="1.2"/>`);
  for (const x of o.xlabels) p.push(`<text x="${sx(x).toFixed(1)}" y="${(ax + FS + 3).toFixed(1)}" text-anchor="middle" font-size="${FS}" fill="${ink}"${HALO}>${num(x)}</text>`);
  for (const y of o.ylabels) p.push(`<text x="${(ay - 5).toFixed(1)}" y="${(sy(y) + FS * 0.35).toFixed(1)}" text-anchor="end" font-size="${FS}" fill="${ink}"${HALO}>${num(y)}</text>`);
  p.push(`<line x1="${L}" y1="${ax}" x2="${R + 8}" y2="${ax}" stroke="${ink}" stroke-width="1.6"/>
    <polygon points="${R + 13},${ax} ${R + 4},${ax - 4.5} ${R + 4},${ax + 4.5}" fill="${ink}"/>
    <line x1="${ay}" y1="${B}" x2="${ay}" y2="${T - 8}" stroke="${ink}" stroke-width="1.6"/>
    <polygon points="${ay},${T - 13} ${ay - 4.5},${T - 4} ${ay + 4.5},${T - 4}" fill="${ink}"/>`);
  p.push(`<text x="${R + 10}" y="${(ax + 2 * FS + 8).toFixed(1)}" text-anchor="end" font-size="${FL}" font-weight="700" fill="${ink}">${o.xName}</text>`);
  p.push(`<text x="${ay + 10}" y="${T - 4}" font-size="${FL}" font-weight="700" fill="${ink}">${o.yName}</text>`);
  const clip = `p6-clip-${++clipSeq}`;
  p.push(`<defs><clipPath id="${clip}"><rect x="${L}" y="${T}" width="${w}" height="${hh}"/></clipPath></defs>`);
  return { sx, sy, clip, svg: p.join("") };
}

function curve(P: Plot, f: (x: number) => number, a: number, b: number, color: string): string {
  const pts: string[] = [];
  for (let i = 0; i <= 240; i++) {
    const x = a + ((b - a) * i) / 240;
    pts.push(`${i ? "L" : "M"}${P.sx(x).toFixed(1)},${P.sy(f(x)).toFixed(1)}`);
  }
  return `<path d="${pts.join(" ")}" fill="none" stroke="${color}" stroke-width="2.6" clip-path="url(#${P.clip})"/>`;
}

function dot(P: Plot, x: number, y: number, label: string, dx: number, dy: number, anchor = "start"): string {
  return `<circle cx="${P.sx(x).toFixed(1)}" cy="${P.sy(y).toFixed(1)}" r="4.2" fill="${ink}"/>` +
    `<text x="${(P.sx(x) + dx).toFixed(1)}" y="${(P.sy(y) + dy).toFixed(1)}" text-anchor="${anchor}" font-size="13" font-weight="700" fill="${ink}"${HALO}>${label}</text>`;
}

function lbl(x: number, y: number, t: string, color = ink, anchor = "middle"): string {
  return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}" font-size="${FL}" font-weight="700" fill="${color}">${t}</text>`;
}

/** Kvadratiske brikker: celler [kolonne, rad] (rad 0 øverst) med sidelengde s fra (x, y). */
function tiles(x: number, y: number, s: number, cells: [number, number][], color = C.blue): string {
  return cells.map(([c, r]) => `<rect x="${x + c * s}" y="${y + r * s}" width="${s}" height="${s}" fill="${color}" fill-opacity="0.22" stroke="${ink}" stroke-width="1.3"/>`).join("");
}

/* ───────────────────────────── 6B/6C ───────────────────────────── */

function p6_14(): string {
  const P = axes({ box: [52, 30, 280, 250], xmin: 0, xmax: 10, ymin: 0, ymax: 2000,
    xticks: range(0, 10, 1), xlabels: range(0, 10, 2), yticks: range(0, 2000, 200), ylabels: range(0, 2000, 400), xName: "Timer", yName: "Lønn (kr)" });
  const s = P.svg + curve(P, (x) => 180 * x, 0, 10, C.blue) + curve(P, (x) => 300 + 150 * x, 0, 10, C.green) +
    dot(P, 0, 0, "(0 , 0)", 8, -6) + dot(P, 5, 900, "(5 , 900)", 8, 18) + dot(P, 0, 300, "(0 , 300)", 8, -8) + dot(P, 8, 1500, "(8 , 1500)", -8, -10, "end") +
    lbl(P.sx(9.3), P.sy(180 * 9.3) - 12, "Ane", C.blue) + lbl(P.sx(4), P.sy(300 + 150 * 4) - 12, "Bo", C.green);
  return wrap("P6.14", s, 330, "Koordinatsystem med Timer fra 0 til 10 og Lønn (kr) fra 0 til 2000. Linja til Ane går gjennom origo og (5, 900). Linja til Bo starter i (0, 300) og går gjennom (8, 1500).");
}

function p6_22(): string {
  const P = axes({ box: [52, 30, 280, 250], xmin: 0, xmax: 20, ymin: 0, ymax: 500,
    xticks: range(0, 20, 1), xlabels: range(0, 20, 5), yticks: range(0, 500, 50), ylabels: range(0, 500, 100), xName: "Antall besøk", yName: "Pris per besøk (kr)" });
  const s = P.svg + curve(P, (x) => 1500 / x, 3, 20, C.blue) +
    dot(P, 4, 375, "(4 , 375)", 9, 4) + dot(P, 10, 150, "(10 , 150)", 6, -10) + dot(P, 15, 100, "(15 , 100)", 4, -12);
  return wrap("P6.22", s, 330, "Koordinatsystem med Antall besøk fra 0 til 20 og Pris per besøk (kr) fra 0 til 500. Fallende kurve y = 1500 delt på x for x fra 3 til 20, med punktene (4, 375), (10, 150) og (15, 100).");
}

/* ───────────────────────────── 6D/6E ───────────────────────────── */

function p6_32(): string {
  const seat = 13, gap = 3, cx = 224;
  let s = "";
  const rows = [12, 14, 16];
  rows.forEach((n, i) => {
    const y = 200 - i * 46;
    const w = n * seat + (n - 1) * gap;
    for (let k = 0; k < n; k++) s += `<rect x="${(cx - w / 2 + k * (seat + gap)).toFixed(1)}" y="${y}" width="${seat}" height="${seat}" rx="3" fill="${C.blue}" fill-opacity="0.25" stroke="${ink}" stroke-width="1.2"/>`;
    s += lbl(12, y + 12, `Rad ${i + 1}`, ink, "start") + lbl(cx, y + seat + 16, `${n} seter`, C.blue);
  });
  s += lbl(12, 76 - 46 + 12 + 40, "Rad 4", ink, "start");
  for (let k = 0; k < 5; k++) s += `<circle cx="${cx - 24 + k * 12}" cy="${200 - 3 * 46 + 22}" r="2.6" fill="${ink}"/>`;
  s += lbl(cx, 250, "Banen (foran)", C.grey);
  return wrap("P6.32", s, 262, "Tribune sett ovenfra. Rad 1 nederst med 12 seter, rad 2 med 14 seter, rad 3 med 16 seter. Rad 4 er antydet med prikker.");
}

function p6_33(): string {
  const s0 = 22, base = 140;
  let s = "";
  [1, 2, 3].forEach((n, i) => {
    const x = 18 + i * 112, up = n + 1, right = n;
    const cells: [number, number][] = [];
    for (let r = 0; r < up; r++) cells.push([0, r]);
    for (let c = 1; c <= right; c++) cells.push([c, up - 1]);
    s += tiles(x, base - up * s0, s0, cells) + lbl(x + 40, base + 24, `Figur ${n}`);
  });
  return wrap("P6.33", s, 176, "Tre L-formede figurer av like kvadratiske brikker. Figur 1: 2 brikker loddrett og 1 til høyre for den nederste, 3 brikker. Figur 2: 3 loddrett og 2 til høyre, 5 brikker. Figur 3: 4 loddrett og 3 til høyre, 7 brikker.");
}

function p6_36(): string {
  const s0 = 16, base = 96;
  let s = "";
  const xs = [14, 112, 222];
  [1, 2, 3].forEach((n, i) => {
    const cells: [number, number][] = [];
    for (let r = 0; r < n; r++) for (let c = 0; c < n + 3; c++) cells.push([c, r]);
    s += tiles(xs[i], base - n * s0, s0, cells) + lbl(xs[i] + ((n + 3) * s0) / 2, base + 24, `Figur ${n}`);
  });
  return wrap("P6.36", s, 132, "Tre rektangler av like kvadratiske brikker. Figur 1: 1 rad med 4 brikker. Figur 2: 2 rader med 5 brikker. Figur 3: 3 rader med 6 brikker.");
}

function p6_37(): string {
  const s0 = 18;
  let s = "";
  const xs = [16, 104, 214];
  [1, 2, 3].forEach((n, i) => {
    const x = xs[i] + s0, y = 130 - (n + 1) * s0;
    const cells: [number, number][] = [];
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) cells.push([c, r]);
    s += tiles(x, y, s0, cells);
    s += tiles(x - s0, y - s0, s0, [[0, 0], [n + 1, 0], [0, n + 1], [n + 1, n + 1]], C.amber);
    s += lbl(x + (n * s0) / 2, 172, `Figur ${n}`);
  });
  return wrap("P6.37", s, 184, "Tre figurer av like kvadratiske brikker. Hver figur er et kvadrat på n ganger n brikker med én ekstra brikke som bare berører hvert av de fire hjørnene på skrå. Figur 1: 1 + 4 = 5, figur 2: 4 + 4 = 8, figur 3: 9 + 4 = 13 brikker.");
}

function p6_38(): string {
  const d = 22, r = 6.5;
  let s = "";
  const cxs = [50, 160, 285];
  [1, 2, 3].forEach((n, i) => {
    const cx = cxs[i], top = 30;
    for (let row = 0; row < n; row++)
      for (let k = 0; k <= row; k++) s += `<circle cx="${(cx + (k - row / 2) * d).toFixed(1)}" cy="${top + row * d}" r="${r}" fill="${C.green}" stroke="${ink}" stroke-width="1"/>`;
    for (let k = 0; k < n; k++) s += `<circle cx="${cx}" cy="${top + (n + k) * d}" r="${r}" fill="${C.amber}" stroke="${ink}" stroke-width="1"/>`;
    s += lbl(cx, 196, `Figur ${n}`);
  });
  return wrap("P6.38", s, 208, "Tre figurer av lys formet som juletrær. Figur 1: 1 lys i trekanten og 1 lys i stammen. Figur 2: trekant med radene 1 og 2 og en stamme på 2 lys under midten. Figur 3: trekant med radene 1, 2 og 3 og en stamme på 3 lys.");
}

function p6_40(): string {
  const d = 40, x0 = 110, y0 = 30, r = 13;
  const cols = [C.blue, C.amber];
  let s = "";
  // Lag k (0–3) er de prikkene der max(rad, kolonne) = k, regnet fra hjørnet nede til venstre.
  for (let row = 0; row < 4; row++)
    for (let col = 0; col < 4; col++) {
      const k = Math.max(row, col);
      s += `<circle cx="${x0 + col * d}" cy="${y0 + (3 - row) * d}" r="${r}" fill="${cols[k % 2]}" stroke="${ink}" stroke-width="1.2"/>`;
    }
  // Tallet for hvert lag står i hjørneprikken til L-en (rad k, kolonne k).
  ["1", "3", "5", "7"].forEach((t, k) => {
    s += `<text x="${x0 + k * d}" y="${y0 + (3 - k) * d + 5}" text-anchor="middle" font-size="${FL}" font-weight="800" fill="#fff" stroke="#111" stroke-width="2.5" paint-order="stroke">${t}</text>`;
  });
  return wrap("P6.40", s, 190, "Kvadrat på 4 ganger 4 prikker delt i fire L-formede lag i to farger som veksler: 1 prikk i hjørnet, så 3, så 5, så 7 prikker.");
}

function p6_op5(): string {
  const s0 = 12, base = 104;
  let s = "";
  const xs = [8, 62, 132, 222];
  [1, 2, 3, 4].forEach((n, i) => {
    const cells: [number, number][] = [];
    for (let r = 0; r < n; r++) for (let c = 0; c < n + 1; c++) cells.push([c, r]);
    const x = xs[i];
    s += tiles(x, base - n * s0, s0, cells);
    s += tiles(x + (n + 1) * s0 + 6, base - 2 * s0, s0, [[0, 0], [0, 1]], C.amber);
    s += lbl(x + ((n + 2) * s0) / 2, base + 24, `Figur ${n}`);
  });
  return wrap("P6.OP5", s, 138, "Fire figurer av like kvadratiske brikker: et rektangel med n rader og n + 1 brikker i hver rad, pluss 2 løse brikker til høyre. Figur 1: 2 + 2 = 4, figur 2: 6 + 2 = 8, figur 3: 12 + 2 = 14, figur 4: 20 + 2 = 22 brikker.");
}

export const P1P_KAP6_FIGURES: Record<string, string> = {
  "P6.14": p6_14(), "P6.22": p6_22(), "P6.32": p6_32(), "P6.33": p6_33(), "P6.36": p6_36(),
  "P6.37": p6_37(), "P6.38": p6_38(), "P6.40": p6_40(), "P6.OP5": p6_op5(),
};
