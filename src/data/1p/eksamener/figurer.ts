/*
 * Figurer til de offisielle 1P-eksamenene (MAT1019, H21–V26), DesignBOT2.
 * Statiske SVG-er i samme stil som src/data/1p/exams-figurer.ts og kap6-figurer.ts: currentColor for akser og tekst,
 * svakt rutenett, kurvefarger via --fig1p-* med reserveverdier. Hver figur gjengir Udirs originalfigur med
 * tallene fra «figur:»-kommentaren i eksamensdataene. Figurene slås opp på id fra helpers.figur().
 */

const ink = "currentColor";
const C = {
  blue: "var(--fig1p-blue, #6366f1)",
  green: "var(--fig1p-green, #10b981)",
  red: "var(--fig1p-red, #ef4444)",
  amber: "var(--fig1p-amber, #f59e0b)",
  grey: "var(--fig1p-grey, #94a3b8)",
  purple: "var(--fig1p-purple, #a855f7)",
};
const W = 360;
const FS = 15;
const FL = 15;
const BG = "var(--bg-surface, #111827)";
const HALO = ` stroke="${BG}" stroke-width="4" stroke-linejoin="round" paint-order="stroke"`;
const CAP = "color:color-mix(in srgb, var(--text-main, currentColor) 72%, var(--text-muted, #94a3b8))";
const SOFT = `color-mix(in srgb, ${ink} 40%, transparent)`;
let clipSeq = 0;

export type ExamFigure = { h: number; svg: string; aria: string };

/** Pakker figuren inn med bildetekst «Figur til oppgave <nr>». */
export function renderExamFigure(f: ExamFigure, nr: string): string {
  return `<figure class="task-figure task-figure-1p"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${f.h}" width="100%" role="img" aria-label="${f.aria}" font-family="inherit">${f.svg}</svg><figcaption style="${CAP}">Figur til oppgave ${nr}</figcaption></figure>`;
}

function num(v: number): string {
  const r = Math.round(v * 1000) / 1000;
  return String(r).replace("-", "−").replace(".", ",");
}
const f1 = (v: number) => (Math.round(v * 10) / 10).toString();

function range(a: number, b: number, s: number): number[] {
  const out: number[] = [];
  const n = Math.round((b - a) / s);
  for (let i = 0; i <= n; i++) out.push(Math.round((a + i * s) * 1e6) / 1e6);
  return out;
}

function txt(x: number, y: number, t: string, o: { anchor?: string; size?: number; weight?: number; fill?: string; halo?: boolean; rot?: number } = {}): string {
  const rot = o.rot ? ` transform="rotate(${o.rot} ${f1(x)} ${f1(y)})"` : "";
  return `<text x="${f1(x)}" y="${f1(y)}" text-anchor="${o.anchor ?? "middle"}" font-size="${o.size ?? FL}"${o.weight ? ` font-weight="${o.weight}"` : ""} fill="${o.fill ?? ink}"${o.halo ? HALO : ""}${rot}>${t}</text>`;
}
const line = (x1: number, y1: number, x2: number, y2: number, o: { w?: number; color?: string; dash?: string; op?: number; cap?: string } = {}) =>
  `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${o.color ?? ink}" stroke-width="${o.w ?? 1.6}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}${o.op ? ` opacity="${o.op}"` : ""}${o.cap ? ` stroke-linecap="${o.cap}"` : ""}/>`;
const pts = (a: [number, number][]) => a.map(([x, y]) => `${f1(x)},${f1(y)}`).join(" ");
const poly = (a: [number, number][], fill: string, stroke = ink, w = 1.6, extra = "") =>
  `<polygon points="${pts(a)}" fill="${fill}" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round"${extra}/>`;
const circ = (x: number, y: number, r: number, fill: string, stroke = ink, w = 1.2) =>
  `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${w}"/>`;
function arrowHead(x: number, y: number, ang: number, size = 7, color = ink): string {
  const a = (ang * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a);
  const p = (dx: number, dy: number): [number, number] => [x + dx * c - dy * s, y + dx * s + dy * c];
  return `<polygon points="${pts([p(0, 0), p(-size, -size * 0.45), p(-size, size * 0.45)])}" fill="${color}"/>`;
}

/* ───────────────────────── koordinatsystem ───────────────────────── */

type Plot = { sx: (x: number) => number; sy: (y: number) => number; clip: string; svg: string; box: [number, number, number, number] };

function axes(o: {
  box: [number, number, number, number];
  xmin: number; xmax: number; ymin: number; ymax: number;
  xticks?: number[]; xlabels?: number[]; yticks?: number[]; ylabels?: number[];
  xName?: string; yName?: string;
  grid?: "solid" | "dash" | "none";
  fs?: number;
  xNameDy?: number;
  yNameAnchor?: string;
  yNameDx?: number;
}): Plot {
  const [L, T, w, hh] = o.box;
  const R = L + w, B = T + hh;
  const fs = o.fs ?? FS;
  const sx = (x: number) => L + ((x - o.xmin) / (o.xmax - o.xmin)) * w;
  const sy = (y: number) => B - ((y - o.ymin) / (o.ymax - o.ymin)) * hh;
  const ax = sy(Math.max(o.ymin, Math.min(o.ymax, 0))), ay = sx(Math.max(o.xmin, Math.min(o.xmax, 0)));
  const xt = o.xticks ?? [], yt = o.yticks ?? [], xl = o.xlabels ?? [], yl = o.ylabels ?? [];
  const p: string[] = [];
  const gridDash = o.grid === "dash" ? ' stroke-dasharray="3 3"' : "";
  if (o.grid !== "none") {
    for (const x of xt) p.push(`<line x1="${f1(sx(x))}" y1="${T}" x2="${f1(sx(x))}" y2="${B}" stroke="${ink}" stroke-width="0.6" opacity="0.18"${gridDash}/>`);
    for (const y of yt) p.push(`<line x1="${L}" y1="${f1(sy(y))}" x2="${R}" y2="${f1(sy(y))}" stroke="${ink}" stroke-width="0.6" opacity="0.18"${gridDash}/>`);
  }
  for (const x of xt) p.push(`<line x1="${f1(sx(x))}" y1="${f1(ax - 3)}" x2="${f1(sx(x))}" y2="${f1(ax + 3)}" stroke="${ink}" stroke-width="1.2"/>`);
  for (const y of yt) p.push(`<line x1="${f1(ay - 3)}" y1="${f1(sy(y))}" x2="${f1(ay + 3)}" y2="${f1(sy(y))}" stroke="${ink}" stroke-width="1.2"/>`);
  const labelBelow = ax >= B - 1; // x-aksen nederst: tall under; ellers også under aksen
  for (const x of xl) {
    if (x === 0 && yl.includes(0)) {
      p.push(`<text x="${f1(ay - 6)}" y="${f1(ax + fs + 2)}" text-anchor="end" font-size="${fs}" fill="${ink}"${HALO}>0</text>`);
    } else {
      p.push(`<text x="${f1(sx(x))}" y="${f1(ax + fs + 3)}" text-anchor="middle" font-size="${fs}" fill="${ink}"${HALO}>${num(x)}</text>`);
    }
  }
  for (const y of yl) {
    if (y === 0 && xl.includes(0)) continue;
    p.push(`<text x="${f1(ay - 6)}" y="${f1(sy(y) + fs * 0.35)}" text-anchor="end" font-size="${fs}" fill="${ink}"${HALO}>${num(y)}</text>`);
  }
  void labelBelow;
  p.push(`<line x1="${L}" y1="${f1(ax)}" x2="${R + 8}" y2="${f1(ax)}" stroke="${ink}" stroke-width="1.6"/>
    <polygon points="${R + 13},${f1(ax)} ${R + 4},${f1(ax - 4.5)} ${R + 4},${f1(ax + 4.5)}" fill="${ink}"/>
    <line x1="${f1(ay)}" y1="${B}" x2="${f1(ay)}" y2="${T - 8}" stroke="${ink}" stroke-width="1.6"/>
    <polygon points="${f1(ay)},${T - 13} ${f1(ay - 4.5)},${T - 4} ${f1(ay + 4.5)},${T - 4}" fill="${ink}"/>`);
  if (o.xName) p.push(txt(R + 10, ax + (o.xNameDy ?? 2 * fs + 8), o.xName, { anchor: "end", weight: 700 }));
  if (o.yName) p.push(txt(ay + (o.yNameDx ?? 10), T - 4, o.yName, { anchor: o.yNameAnchor ?? "start", weight: 700 }));
  const clip = `ex-clip-${++clipSeq}`;
  p.push(`<defs><clipPath id="${clip}"><rect x="${L - 1}" y="${T - 1}" width="${w + 2}" height="${hh + 2}"/></clipPath></defs>`);
  return { sx, sy, clip, svg: p.join(""), box: o.box };
}

function curve(P: Plot, f: (x: number) => number, a: number, b: number, color: string, wd = 2.6, n = 240): string {
  const q: string[] = [];
  for (let i = 0; i <= n; i++) {
    const x = a + ((b - a) * i) / n;
    q.push(`${i ? "L" : "M"}${f1(P.sx(x))},${f1(P.sy(f(x)))}`);
  }
  return `<path d="${q.join(" ")}" fill="none" stroke="${color}" stroke-width="${wd}" stroke-linejoin="round" clip-path="url(#${P.clip})"/>`;
}

function seg(P: Plot, x1: number, y1: number, x2: number, y2: number, color: string, wd = 2.6, dash = ""): string {
  return `<line x1="${f1(P.sx(x1))}" y1="${f1(P.sy(y1))}" x2="${f1(P.sx(x2))}" y2="${f1(P.sy(y2))}" stroke="${color}" stroke-width="${wd}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ""} clip-path="url(#${P.clip})"/>`;
}

function dot(P: Plot, x: number, y: number, label: string, dx: number, dy: number, anchor = "start", color = ink, size = 13): string {
  return `<circle cx="${f1(P.sx(x))}" cy="${f1(P.sy(y))}" r="4.2" fill="${color}" stroke="${BG}" stroke-width="1.2"/>` +
    (label ? `<text x="${f1(P.sx(x) + dx)}" y="${f1(P.sy(y) + dy)}" text-anchor="${anchor}" font-size="${size}" font-weight="700" fill="${ink}"${HALO}>${label}</text>` : "");
}

function dropLines(P: Plot, x: number, y: number): string {
  return line(P.sx(x), P.sy(y), P.sx(x), P.sy(0), { w: 1, dash: "4 3", op: 0.55 }) + line(P.sx(x), P.sy(y), P.sx(0), P.sy(y), { w: 1, dash: "4 3", op: 0.55 });
}

const pt = (x: number, y: number) => `(${num(x)}, ${num(y)})`;

/* ═════════════════════════════ V22 ═════════════════════════════ */

function v22_d1_2(): ExamFigure {
  const L = 66, T = 44, w = 262, hh = 190, B = T + hh;
  const sy = (y: number) => B - (y / 1200) * hh;
  let s = txt(L + w / 2, 22, "Elever ved skolen", { weight: 700, size: 16 });
  for (const y of range(0, 1200, 200)) {
    s += line(L, sy(y), L + w, sy(y), { w: 0.6, op: 0.18 }) + line(L - 3, sy(y), L + 3, sy(y), { w: 1.2 });
    s += txt(L - 6, sy(y) + 5, num(y), { anchor: "end", size: FS, halo: true });
  }
  const data: [number, number][] = [[2018, 700], [2019, 800], [2020, 900], [2021, 1000]];
  const bw = 40, gap = (w - 4 * bw) / 5;
  data.forEach(([yr, v], i) => {
    const x = L + gap + i * (bw + gap);
    s += `<rect x="${f1(x)}" y="${f1(sy(v))}" width="${bw}" height="${f1(B - sy(v))}" fill="${C.green}" fill-opacity="0.85" stroke="${ink}" stroke-width="1.2"/>`;
    s += txt(x + bw / 2, B + 19, String(yr), { size: FS });
  });
  s += line(L, B, L + w, B, { w: 1.6 }) + line(L, T - 6, L, B, { w: 1.6 });
  s += txt(L + w / 2, B + 42, "År", { weight: 700 });
  s += txt(18, T + hh / 2, "Antall elever", { weight: 700, rot: -90 });
  return { h: 278, svg: s, aria: "Søylediagram med tittel Elever ved skolen. Førsteaksen År med fire søyler: 2018, 2019, 2020 og 2021. Andreaksen Antall elever fra 0 til 1200 med hjelpelinjer for hver 200. Søylene er omtrent 700, 800, 900 og 1000 høye." };
}

function v22_d1_3b(): ExamFigure {
  const P = axes({ box: [56, 34, 270, 230], xmin: 0, xmax: 5.3, ymin: 0, ymax: 110, xticks: range(0, 5, 1), xlabels: range(0, 5, 1), yticks: range(0, 100, 20), ylabels: range(0, 100, 20), xName: "Vekt (kg)", yName: "Pris (kr)" });
  let s = P.svg + seg(P, 0, 0, 5, 100, C.green);
  for (let k = 1; k <= 5; k++) s += dot(P, k, 20 * k, pt(k, 20 * k), 8, 20, "start");
  return { h: 300, svg: s, aria: "Koordinatsystem med Vekt (kg) fra 0 til 5 og Pris (kr) fra 0 til 100. Rett linje fra origo gjennom punktene (1, 20), (2, 40), (3, 60), (4, 80) og (5, 100)." };
}

function v22_d1_6(): ExamFigure {
  const s = `<rect x="70" y="30" width="220" height="73" rx="2" fill="${C.green}" fill-opacity="0.16" stroke="${ink}" stroke-width="2"/>`;
  return { h: 132, svg: s, aria: "Et tomt rektangel som er lengre enn det er høyt, uten mål eller bokstaver. Brukes bare som skisse." };
}

function v22_d2_2(): ExamFigure {
  const P = axes({ box: [56, 28, 280, 310], xmin: 0, xmax: 305, ymin: 0, ymax: 1550, xticks: range(0, 300, 25), xlabels: range(0, 300, 50), yticks: range(0, 1500, 100), ylabels: range(100, 1500, 100), xName: "Antall kilometer", yName: "Kroner", fs: 13, xNameDy: 38 });
  let s = P.svg;
  const lines: [string, string, number, number][] = [["A", C.purple, 600, 4], ["B", C.blue, 900, 2], ["C", C.green, 700, 3]];
  for (const [, col, a, b] of lines) s += seg(P, 0, a, 305, a + b * 305, col);
  s += txt(P.sx(0) + 8, P.sy(600) + 18, "Firma A", { anchor: "start", fill: C.purple, weight: 700, halo: true });
  s += txt(P.sx(0) + 8, P.sy(900) - 8, "Firma B", { anchor: "start", fill: C.blue, weight: 700, halo: true });
  s += txt(P.sx(0) + 8, P.sy(700) + 18, "Firma C", { anchor: "start", fill: C.green, weight: 700, halo: true });
  return { h: 392, svg: s, aria: "Koordinatsystem med Kroner fra 100 til 1500 og Antall kilometer fra 0 til 300. Tre rette linjer: Firma A (lilla) starter i (0, 600) og er brattest, Firma B (blå) starter i (0, 900) og er slakest, Firma C (grønn) starter i (0, 700). A og C krysser i (100, 1000), A og B i (150, 1200) og B og C i (200, 1300)." };
}

/* isometrisk kloss: enhetsvektorer på skjermen */
function isoCubes(ox: number, oy: number, s: number, cubes: [number, number, number][]): string {
  const cx = Math.cos(Math.PI / 6) * s, cy = 0.5 * s;
  const P = (x: number, y: number, z: number): [number, number] => [ox + (x - y) * cx, oy + (x + y) * cy - z * s];
  const top = `color-mix(in srgb, ${C.green} 55%, white)`;
  const left = `color-mix(in srgb, ${C.green} 62%, black)`;
  const right = C.green;
  const sk = `color-mix(in srgb, ${ink} 70%, transparent)`;
  const order = [...cubes].sort((a, b) => a[2] - b[2] || a[0] + a[1] - (b[0] + b[1]));
  let out = "";
  for (const [i, j, k] of order) {
    out += poly([P(i, j, k + 1), P(i + 1, j, k + 1), P(i + 1, j + 1, k + 1), P(i, j + 1, k + 1)], top, sk, 1.1);
    out += poly([P(i, j + 1, k), P(i + 1, j + 1, k), P(i + 1, j + 1, k + 1), P(i, j + 1, k + 1)], left, sk, 1.1);
    out += poly([P(i + 1, j, k), P(i + 1, j + 1, k), P(i + 1, j + 1, k + 1), P(i + 1, j, k + 1)], right, sk, 1.1);
  }
  return out;
}

function v22_d2_6(): ExamFigure {
  const s0 = 24;
  const f2: [number, number, number][] = [];
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) f2.push([i, j, 0]);
  f2.push([0.5, 0.5, 1]);
  const f3: [number, number, number][] = [];
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) f3.push([i, j, 0]);
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) f3.push([i + 0.5, j + 0.5, 1]);
  f3.push([1, 1, 2]);
  const base = 150;
  let s = isoCubes(48, base - s0 * 1.0 - 12, s0, [[0, 0, 0]]);
  s += isoCubes(172, base - s0 * 2.0 - 20, s0, f2);
  s += isoCubes(300, base - s0 * 3.0 - 24 + 0, s0, f3);
  s += txt(48, 176, "Figur 1") + txt(172, 176, "Figur 2") + txt(300, 176, "Figur 3");
  return { h: 190, svg: s, aria: "Tre figurer av små grønne terninger i 3D. Figur 1 er én kloss. Figur 2 er et nederste lag på 2 ganger 2 klosser med én kloss oppå. Figur 3 er et nederste lag på 3 ganger 3 klosser, et lag på 2 ganger 2 over det og én kloss øverst." };
}

function v22_d2_8(): ExamFigure {
  const x0 = 36, gapx = 36, top = 62;
  const counts = [3, 6, 9, 3, 6, 9, 3, 6, 9];
  const dy = 24, r = 7;
  let s = `<rect x="${x0 - 14}" y="${top - 8}" width="${8 * gapx + 28}" height="8" rx="2" fill="${C.grey}" stroke="${ink}" stroke-width="1.2"/>`;
  // målestokk
  const my = 26;
  s += line(x0, my, x0 + 8 * gapx, my, { w: 1.6 }) + line(x0, my - 6, x0, my + 6, { w: 1.6 }) + line(x0 + 8 * gapx, my - 6, x0 + 8 * gapx, my + 6, { w: 1.6 });
  s += txt(x0 + 4 * gapx, my - 8, "80 cm", { weight: 700, halo: true });
  counts.forEach((n, i) => {
    const x = x0 + i * gapx;
    s += line(x, top, x, top + n * dy + 2, { w: 1.2, op: 0.8 });
    for (let k = 0; k < n; k++) s += circ(x, top + 14 + k * dy, r, C.amber, ink, 1.1);
  });
  return { h: top + 9 * dy + 18, svg: s, aria: "Lysgardin med 9 tråder som henger fra en vannrett list, med målestokken 80 cm over hele bredden fra første til siste tråd. Trådene har 3, 6, 9, 3, 6, 9, 3, 6 og 9 gule lyspærer med like store mellomrom." };
}

/* ═════════════════════════════ H21 ═════════════════════════════ */

function h21_d1_5(): ExamFigure {
  const k = 36;
  const xmin = -1.6, xmax = 5, ymin = -3.3, ymax = 4.3;
  const P = axes({ box: [30, 24, (xmax - xmin) * k, (ymax - ymin) * k], xmin, xmax, ymin, ymax, grid: "none", xName: "x", yName: "y", xNameDy: -10 });
  let s = P.svg;
  s += poly([[P.sx(1.5), P.sy(0)], [P.sx(4), P.sy(0)], [P.sx(2), P.sy(-1)]], C.green, "none", 0, ' fill-opacity="0.55"');
  s += seg(P, xmin, 3 - 2 * xmin, xmax, 3 - 2 * xmax, C.blue) + seg(P, xmin, 0.5 * xmin - 2, xmax, 0.5 * xmax - 2, C.amber);
  s += txt(P.sx(-0.55) - 6, P.sy(3 + 1.1) + 2, "f", { fill: C.blue, weight: 700, size: 17, halo: true });
  s += txt(P.sx(4.55), P.sy(0.5 * 4.55 - 2) - 8, "g", { fill: C.amber, weight: 700, size: 17, halo: true });
  s += dot(P, 0, 3, pt(0, 3), 9, -8) + dot(P, 0, -2, pt(0, -2), -9, 20, "end") + dot(P, 2, -1, pt(2, -1), 4, 24, "middle");
  return { h: 24 + (ymax - ymin) * k + 14, svg: s, aria: "Koordinatsystem uten tallmerking med to rette linjer. Linja f synker bratt og skjærer andreaksen i (0, 3). Linja g stiger sakte og skjærer andreaksen i (0, −2). Linjene skjærer hverandre i (2, −1) under førsteaksen. Trekanten mellom f, g og førsteaksen, med hjørner i (1,5; 0), (4; 0) og (2, −1), er fylt med grønt." };
}

function h21_d2_3c(): ExamFigure {
  const F = (x: number) => 50 * x + 500 - 500 * Math.pow(2, x / 10);
  const P = axes({ box: [60, 26, 270, 270], xmin: 0, xmax: 13.8, ymin: -92, ymax: 52, xticks: range(0, 13, 1), xlabels: range(0, 13, 1), yticks: range(-90, 50, 10), ylabels: range(-80, 40, 20), xName: "x (år)", yName: "F(x)", xNameDy: -10, fs: 13 });
  let s = P.svg + curve(P, F, 0, 13, C.green);
  s += dot(P, 0, 0, "(0, 0)", -8, -8, "end") + dot(P, 5.29, 43.04, "(5,29; 43,04)", 10, -6) + dot(P, 10, 0, "(10, 0)", 0, -10, "middle");
  s += dot(P, 13, F(13), "", 0, 0);
  return { h: 330, svg: s, aria: "Graf til F(x) = 50x + 500 − 500·2^(x/10) for x fra 0 til 13. Kurven starter i (0, 0), stiger til toppunktet (5,29; 43,04), krysser førsteaksen i (10, 0) og synker videre til omtrent (13, −81,1). Førsteakse x (år) fra 0 til 13, andreakse F(x) fra −90 til 50." };
}

function can(x: number, yb: number, d: number, h: number, ry: number): string {
  const r = d / 2;
  const body = `color-mix(in srgb, ${C.amber} 80%, ${BG})`;
  return `<path d="M${f1(x - r)},${f1(yb - h)} L${f1(x - r)},${f1(yb)} A${r},${ry} 0 0 0 ${f1(x + r)},${f1(yb)} L${f1(x + r)},${f1(yb - h)} Z" fill="${body}" stroke="${ink}" stroke-width="1.1" stroke-linejoin="round"/>` +
    `<ellipse cx="${f1(x)}" cy="${f1(yb - h)}" rx="${r}" ry="${ry}" fill="${C.grey}" fill-opacity="0.9" stroke="${ink}" stroke-width="1.1"/>`;
}

function h21_d2_7(): ExamFigure {
  const d = 27, h = 26, ry = 5.5;
  let s = "";
  // Figur 1: trekant sett forfra, 4 etasjer
  const cx1 = 90, base1 = 176;
  for (let row = 3; row >= 0; row--)
    for (let c = 0; c <= row; c++) s += can(cx1 + (c - row / 2) * d, base1 - (3 - row) * h, d, h, ry);
  s += txt(cx1, 216, "Figur 1");
  // Figur 2: tetraeder, 3 lag
  const cx2 = 266, base2 = 176, ds = 25, zs = h * 0.9;
  const ground = (rows: number, shiftY: number, layer: number): [number, number, number][] => {
    const out: [number, number, number][] = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c <= r; c++) out.push([(c - r / 2) * ds, r * ds * 0.866 + shiftY, layer]);
    return out;
  };
  const cans = [...ground(3, 0, 0), ...ground(2, 0.577 * ds, 1), ...ground(1, 1.155 * ds, 2)];
  cans.sort((a, b) => a[2] - b[2] || a[1] - b[1]);
  for (const [X, Y, Z] of cans) s += can(cx2 + X, base2 - 22 + Y * 0.5 - Z * zs, ds, h, ry);
  s += txt(cx2, 216, "Figur 2");
  return { h: 232, svg: s, aria: "To bilder av boksstabler. Figur 1: et tårn med fire etasjer sett forfra som en trekant, med 1, 2, 3 og 4 bokser fra toppen. Figur 2: en pyramide med trekantet grunnflate, med 1 boks øverst, 3 i midten og 6 nederst. Boksene er sylindere." };
}

function h21_d2_8(): ExamFigure {
  const cs = 33, x0 = 15, y0 = 8;
  const blue = new Set([1, 2, 11, 12]), green = new Set([27, 28, 37, 38]);
  let s = "";
  for (let r = 0; r < 10; r++)
    for (let c = 0; c < 10; c++) {
      const n = r * 10 + c + 1;
      const fill = blue.has(n) ? `color-mix(in srgb, ${C.blue} 45%, transparent)` : green.has(n) ? `color-mix(in srgb, ${C.green} 70%, transparent)` : "none";
      s += `<rect x="${x0 + c * cs}" y="${y0 + r * cs}" width="${cs}" height="${cs}" fill="${fill}" stroke="${ink}" stroke-width="0.9"/>`;
      s += txt(x0 + c * cs + cs / 2, y0 + r * cs + cs / 2 + 4.5, String(n), { size: 13 });
    }
  const sq = (r: number, c: number, col: string) => `<rect x="${x0 + c * cs + 1}" y="${y0 + r * cs + 1}" width="${2 * cs - 2}" height="${2 * cs - 2}" fill="none" stroke="${col}" stroke-width="2.6" rx="2"/>`;
  s += sq(0, 0, C.blue) + sq(2, 6, C.green);
  return { h: y0 + 10 * cs + 8, svg: s, aria: "Tabell med tallene 1 til 100 i ti rader og ti kolonner, rad 1 med 1 til 10 og rad 10 med 91 til 100. Et blått kvadrat ligger over de fire tallene 1, 2, 11 og 12, og et grønt kvadrat over 27, 28, 37 og 38." };
}

/* ═════════════════════════════ H22 ═════════════════════════════ */

function h22_d1_3(): ExamFigure {
  const P = axes({ box: [36, 26, 312, 270], xmin: -13, xmax: 112, ymin: -2, ymax: 11.5, xticks: range(-10, 110, 10), xlabels: range(-10, 100, 10).filter((v) => v <= 60 || v % 20 === 0), yticks: range(-2, 11, 1), ylabels: range(-2, 10, 2), xName: "x", yName: "y", fs: 11.5, xNameDy: -10 });
  let s = P.svg + curve(P, Math.sqrt, 0, 110, C.green);
  s += dot(P, 4, 2, "(4, 2)", 9, 17) + dot(P, 25, 5, "(25, 5)", -7, -9, "end") + dot(P, 49, 7, "(49, 7)", -7, -9, "end") + dot(P, 81, 9, "(81, 9)", -7, -9, "end") + dot(P, 100, 10, "(100, 10)", -7, -9, "end");
  return { h: 330, svg: s, aria: "Koordinatsystem med x-akse fra −10 til ca. 110 og y-akse fra −2 til ca. 11. Grafen er en grønn kurve som starter i origo, stiger bratt først og flater gradvis ut. Fem markerte punkter: (4, 2), (25, 5), (49, 7), (81, 9) og (100, 10)." };
}

function h22_d1_4(): ExamFigure {
  const P = axes({ box: [58, 28, 276, 270], xmin: -10, xmax: 152, ymin: -50, ymax: 580, xticks: range(20, 140, 20), xlabels: range(20, 140, 20), yticks: range(100, 500, 100), ylabels: range(100, 500, 100), xName: "US gallon", yName: "Liter", xNameDy: 34 });
  let s = P.svg + seg(P, 0, 0, 150, 3.79 * 150, C.green);
  s += dot(P, 42, 159, "(42, 159)", 9, 20) + dot(P, 142, 538, "(142, 538)", -9, -8, "end");
  return { h: 340, svg: s, aria: "Koordinatsystem med US gallon på førsteaksen (merker 20, 40 og så videre til 140) og Liter på andreaksen (merker 100 til 500). Rett linje fra origo oppover mot høyre gjennom punktene (42, 159) og (142, 538)." };
}

function h22_d2_3(): ExamFigure {
  const P = axes({ box: [60, 28, 272, 270], xmin: 0, xmax: 108, ymin: 0, ymax: 135, xticks: range(0, 105, 5), xlabels: range(0, 100, 10), yticks: range(0, 130, 10), ylabels: range(10, 130, 10), xName: "Tid (minutter)", yName: "Fart (km/h)", fs: 13, xNameDy: 38 });
  const s = P.svg + curve(P, (x) => 3600 / x, 27.7, 105, C.green);
  return { h: 345, svg: s, aria: "Koordinatsystem med Fart (km/h) på andreaksen fra 0 til 130 og Tid (minutter) på førsteaksen fra 0 til ca. 105. En fallende kurve fra øverst til venstre ved tid 28 og fart 130 som flater ut mot høyre, gjennom omtrent (30, 120), (40, 90), (60, 60) og (90, 40). Ingen punkter er markert." };
}

function h22_d2_6(): ExamFigure {
  const px = 180, py = 24, len = 150, a = (35 * Math.PI) / 180;
  const A: [number, number] = [px - len * Math.sin(a), py + len * Math.cos(a)];
  const B: [number, number] = [px + len * Math.sin(a), py + len * Math.cos(a)];
  let s = line(px - 110, py, px + 110, py, { w: 2.4 });
  for (let x = px - 108; x <= px + 100; x += 14) s += line(x + 10, py - 9, x, py, { w: 1, op: 0.55 });
  s += `<path d="M${f1(A[0])},${f1(A[1])} A${len},${len} 0 0 0 ${f1(B[0])},${f1(B[1])}" fill="none" stroke="${ink}" stroke-width="1" stroke-dasharray="4 4" opacity="0.5"/>`;
  s += line(px, py, A[0], A[1], { w: 1.8 }) + line(px, py, B[0], B[1], { w: 1.8 });
  s += circ(px, py, 3.5, ink);
  s += circ(A[0], A[1], 14, C.amber, ink, 1.6) + circ(B[0], B[1], 14, C.amber, ink, 1.6);
  s += txt(A[0] - 22, A[1] - 8, "A", { anchor: "end", weight: 700 }) + txt(B[0] + 22, B[1] - 8, "B", { anchor: "start", weight: 700 });
  const mid: [number, number] = [(px + A[0]) / 2, (py + A[1]) / 2];
  s += txt(mid[0] - 10, mid[1] - 4, "Snor", { anchor: "end", halo: true });
  s += txt(A[0], A[1] + 34, "Pendelkule", { halo: true });
  return { h: 214, svg: s, aria: "Skisse av en pendel med en snor festet i taket og en pendelkule nederst. Pendelen er tegnet i to posisjoner: A til venstre og B til høyre. Snoren er merket Snor og kula er merket Pendelkule." };
}

/* ═════════════════════════════ H23 ═════════════════════════════ */

function h23_d2_5(): ExamFigure {
  const k = 24, L = 24, T = 18;
  const P = axes({ box: [L, T, 13.4 * k, 7.6 * k], xmin: -6.7, xmax: 6.7, ymin: -0.9, ymax: 6.7, xticks: range(-6, 6, 1), xlabels: range(-6, 6, 2), yticks: range(1, 6, 1), ylabels: range(2, 6, 2), xName: "x", yName: "y", fs: 13, xNameDy: -8 });
  let s = P.svg;
  const X = P.sx, Y = P.sy;
  s += `<rect x="${f1(X(-3))}" y="${f1(Y(3))}" width="${f1(X(3) - X(-3))}" height="${f1(Y(0) - Y(3))}" fill="${C.green}" fill-opacity="0.22" stroke="${C.green}" stroke-width="2"/>`;
  s += poly([[X(-6), Y(0)], [X(6), Y(0)], [X(0), Y(6)]], "none", ink, 2.2);
  s += dot(P, -6, 0, "A", 0, -13, "middle", ink, 15) + dot(P, 6, 0, "B", 0, -13, "middle", ink, 15) + dot(P, 0, 6, "C", 9, 6, "start", ink, 15) + dot(P, 3, 3, "P", 9, -8, "start", ink, 15);
  return { h: T + 7.6 * k + 22, svg: s, aria: "Koordinatsystem med trekant ABC der A er (−6, 0), B er (6, 0) og C er (0, 6). Et rektangel med en side på AB har de to øvre hjørnene på AC og BC og er symmetrisk om y-aksen. Punktet P(x, y) er rektangelets øvre høyre hjørne på linjestykket BC." };
}

function h23_d2_6(): ExamFigure {
  const k = 0.74, x0 = 62, top = 52;
  const pts2: [number, number][] = [[0, 100]];
  let x = 0, y = 100;
  const lens: number[] = [];
  for (let i = 0; i < 16; i++) lens.push(100 * Math.pow(0.9, i));
  let s = "";
  lens.forEach((len, i) => {
    let nx = x, ny = y;
    if (i % 2 === 0) { const up = (i / 2) % 2 === 0; ny = y + (up ? -len : len); } else nx = x + len;
    const vertical = i % 2 === 0;
    s += line(x0 + x * k, top + y * k, x0 + nx * k, top + ny * k, { w: vertical ? 3 : 2.6, color: vertical ? C.green : ink, op: vertical ? 1 : 0.8, cap: "round" });
    x = nx; y = ny; pts2.push([x, y]);
  });
  s += txt(x0 - 8, top + 50 * k + 5, "100 cm", { anchor: "end", weight: 700 });
  s += txt(x0 + 45 * k, top - 8, "90 cm", { weight: 700 });
  s += circ(x0, top + 100 * k, 4.5, ink);
  return { h: top + 100 * k + 20, svg: s, aria: "Sikksakkmønster av 16 linjestykker som blir stadig kortere mot høyre, vekselvis loddrette og vannrette. Første stykke er loddrett, 100 cm, og går oppover. Så følger et vannrett stykke på 90 cm, et loddrett på 81 cm nedover, et vannrett på 72,9 cm, et loddrett på ca. 65,6 cm oppover og så videre, hvert stykke 90 prosent av det forrige." };
}

function h23_d2_7(): ExamFigure {
  const cx = 150, cy = 120, a = 125, b = 84;
  let s = `<ellipse cx="${cx}" cy="${cy}" rx="${a}" ry="${b}" fill="none" stroke="${ink}" stroke-width="2.2"/>`;
  s += line(cx, cy, cx + a, cy, { w: 3, color: C.green }) + line(cx, cy, cx, cy - b, { w: 3, color: C.green });
  s += circ(cx, cy, 4.8, ink) + circ(cx + a, cy, 4.8, ink) + circ(cx, cy - b, 4.8, ink);
  s += txt(cx - 10, cy + 20, "S", { anchor: "end", weight: 700, size: 16 }) + txt(cx + a + 12, cy + 20, "A", { anchor: "start", weight: 700, size: 16 }) + txt(cx + 12, cy - b - 8, "B", { anchor: "start", weight: 700, size: 16 });
  s += txt(cx + a / 2, cy - 9, "a", { weight: 700, size: 16, fill: C.green, halo: true }) + txt(cx - 10, cy - b / 2 + 5, "b", { anchor: "end", weight: 700, size: 16, fill: C.green, halo: true });
  return { h: 232, svg: s, aria: "Ellipse med sentrum S. Den horisontale halvaksen SA er a og den vertikale halvaksen SB er b, tegnet som grønne linjestykker. S, A og B er markert med punkter." };
}

function h23_d2_8(): ExamFigure {
  const P = axes({ box: [34, 26, 296, 110], xmin: 0, xmax: 1, ymin: 0, ymax: 1, grid: "none", xName: "Tilbakelagt strekning", yName: "Fart", xNameDy: 22 });
  const dump = (x: number, c: number, d: number, sg: number) => d * Math.exp(-0.5 * ((x - c) / sg) ** 2);
  const v = (x: number) => 0.9 - dump(x, 0.15, 0.4, 0.024) - dump(x, 0.46, 0.64, 0.017) - dump(x, 0.76, 0.3, 0.04);
  let s = P.svg + curve(P, v, 0.02, 0.93, C.green, 2.8, 400);
  // seks baner A–F
  const cell = (col: number, row: number) => [18 + col * 114, 176 + row * 92] as const;
  const mark = (x: number, y: number) => circ(x, y, 4, C.red, C.red, 1);
  const stroke = (d: string) => `<path d="${d}" fill="none" stroke="${C.blue}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>`;
  const arr = (ox: number, oy: number, x: number, y: number, ang: number) => arrowHead(ox + x, oy + y, ang, 7, C.blue);
  const shapes: { name: string; draw: (ox: number, oy: number) => string }[] = [
    { name: "A", draw: (ox, oy) => {
      const r = (t: number) => 25 + 17 * Math.cos(3 * t - 0.4) + 6 * Math.cos(6 * t + 1.1);
      const P2 = (t: number): [number, number] => [ox + 50 + r(t) * Math.cos(t) * 1.08, oy + 36 + r(t) * Math.sin(t) * 0.95];
      let d = "";
      for (let i = 0; i <= 180; i++) { const [x, y] = P2((i / 180) * Math.PI * 2); d += `${i ? "L" : "M"}${f1(x)},${f1(y)}`; }
      let o = stroke(d + "Z");
      for (const t of [-0.9, 1.45, 3.45]) {
        const [x, y] = P2(t), [x2, y2] = P2(t + 0.02);
        o += arrowHead(x, y, (Math.atan2(y2 - y, x2 - x) * 180) / Math.PI, 7, C.blue);
      }
      const [mx, my] = P2(3.95);
      return o + mark(mx, my);
    } },
    { name: "B", draw: (ox, oy) => stroke(`M${ox + 8},${oy + 40} L${ox + 8},${oy + 20} Q${ox + 8},${oy + 12} ${ox + 16},${oy + 15} L${ox + 94},${oy + 48} Q${ox + 98},${oy + 52} ${ox + 92},${oy + 52} L${ox + 18},${oy + 52} Q${ox + 8},${oy + 52} ${ox + 8},${oy + 44} Z`) + arr(ox, oy, 56, 32, 23) + arr(ox, oy, 50, 52, 180) + mark(ox + 8, oy + 30) },
    { name: "C", draw: (ox, oy) => stroke(`M${ox + 10},${oy + 62} L${ox + 10},${oy + 14} L${ox + 68},${oy + 14} L${ox + 50},${oy + 62} Z`) + arr(ox, oy, 10, 36, -90) + arr(ox, oy, 42, 14, 0) + arr(ox, oy, 60, 38, 111) + arr(ox, oy, 30, 62, 180) + mark(ox + 10, oy + 62) },
    { name: "D", draw: (ox, oy) => stroke(`M${ox + 6},${oy + 30} Q${ox + 6},${oy + 22} ${ox + 14},${oy + 22} L${ox + 18},${oy + 22} Q${ox + 23},${oy + 48} ${ox + 28},${oy + 22} L${ox + 46},${oy + 22} Q${ox + 51},${oy + 58} ${ox + 56},${oy + 22} L${ox + 66},${oy + 22} Q${ox + 75},${oy + 40} ${ox + 84},${oy + 22} L${ox + 86},${oy + 22} Q${ox + 94},${oy + 22} ${ox + 94},${oy + 30} L${ox + 94},${oy + 46} Q${ox + 94},${oy + 62} ${ox + 86},${oy + 62} L${ox + 14},${oy + 62} Q${ox + 6},${oy + 62} ${ox + 6},${oy + 54} Z`) + arr(ox, oy, 38, 22, 0) + arr(ox, oy, 94, 40, 90) + arr(ox, oy, 52, 62, 180) + mark(ox + 8, oy + 27) },
    { name: "E", draw: (ox, oy) => stroke(`M${ox + 50},${oy + 4} L${ox + 84},${oy + 62} L${ox + 16},${oy + 62} Z`) + arr(ox, oy, 67, 33, 60) + arr(ox, oy, 50, 62, 180) + mark(ox + 33, oy + 33) },
    { name: "F", draw: (ox, oy) => stroke(`M${ox + 50},${oy + 2} L${ox + 88},${oy + 50} L${ox + 14},${oy + 66} Z`) + arr(ox, oy, 69, 26, 52) + arr(ox, oy, 51, 58, 168) + mark(ox + 32, oy + 34) },
  ];
  shapes.forEach((sh, i) => {
    const [ox, oy] = cell(i % 3, Math.floor(i / 3));
    s += sh.draw(ox, oy);
    s += txt(ox + (i % 3 === 0 ? 0 : 0), oy + 78, sh.name, { anchor: "start", weight: 700, size: 16 });
  });
  return { h: 176 + 92 + 90, svg: s, aria: "Del 1: graf med Tilbakelagt strekning på førsteaksen og Fart på andreaksen. Farten er konstant høy, men har tre nedsenkninger: den første er middels dyp og smal, den andre er dypest og smalest, den tredje er grunnest og bredest. Del 2: seks baner A til F med rød start og piler som viser kjøreretning. A er en propellformet bane med flere svinger, B en langstrakt trekant, C en firkant med to rette vinkler, D et avlangt avrundet rektangel med tre hakk på toppen, E en likesidet trekant og F en skjev spiss trekant." };
}

/* ═════════════════════════════ H24 ═════════════════════════════ */

function h24_d1_5(): ExamFigure {
  const P = axes({ box: [56, 28, 276, 300], xmin: -90, xmax: 172, ymin: -140, ymax: 270, xticks: range(-80, 160, 20), xlabels: range(-80, 160, 40), yticks: range(-100, 250, 50), ylabels: range(-100, 250, 50), xName: "Grader celsius (°C)", yName: "Grader fahrenheit (°F)", grid: "dash", fs: 13, xNameDy: -10 });
  const s = P.svg + dot(P, -40, -40, pt(-40, -40), 8, 20) + dot(P, 0, 32, pt(0, 32), 9, -9) + dot(P, 100, 212, pt(100, 212), -8, -10, "end");
  return { h: 372, svg: s, aria: "Koordinatsystem med x-akse Grader celsius (°C) fra −80 til ca. 170 og y-akse Grader fahrenheit (°F) fra ca. −130 til 260, med stiplede hjelpelinjer. Tre markerte punkter: (−40, −40), (0, 32) og (100, 212). Ingen linje er tegnet gjennom punktene." };
}

function h24_d2_8(): ExamFigure {
  const fill = `color-mix(in srgb, ${C.grey} 45%, transparent)`;
  const w = 100, hh = 64, q = 22, y0 = 16;
  const cap = (x: number, lines: string[]) => lines.map((l, i) => txt(x + w / 2, y0 + hh + 24 + i * 17, l, { size: 13 })).join("");
  const xs = [8, 130, 252];
  let s = `<rect x="${xs[0]}" y="${y0}" width="${w}" height="${hh}" fill="${fill}" stroke="${ink}" stroke-width="1.2"/>`;
  s += cap(xs[0], ["Metallplate", "med form som", "et rektangel"]);
  s += `<rect x="${xs[1]}" y="${y0}" width="${w}" height="${hh}" fill="${fill}" stroke="${ink}" stroke-width="1.2"/>`;
  for (const [cx, cy] of [[0, 0], [w - q, 0], [0, hh - q], [w - q, hh - q]]) s += `<rect x="${xs[1] + cx}" y="${y0 + cy}" width="${q}" height="${q}" fill="none" stroke="${ink}" stroke-width="1.2" stroke-dasharray="3 3"/>`;
  s += cap(xs[1], ["Skjær bort et", "kvadrat i", "hvert hjørne"]);
  const x3 = xs[2];
  s += poly([[x3 + q, y0], [x3 + w - q, y0], [x3 + w - q, y0 + q], [x3 + w, y0 + q], [x3 + w, y0 + hh - q], [x3 + w - q, y0 + hh - q], [x3 + w - q, y0 + hh], [x3 + q, y0 + hh], [x3 + q, y0 + hh - q], [x3, y0 + hh - q], [x3, y0 + q], [x3 + q, y0 + q]], fill, ink, 1.2);
  s += `<rect x="${x3 + q}" y="${y0 + q}" width="${w - 2 * q}" height="${hh - 2 * q}" fill="none" stroke="${ink}" stroke-width="1.2" stroke-dasharray="3 3"/>`;
  s += cap(x3, ["Brett langs", "de stiplede", "linjene for å", "lage en kasse"]);
  return { h: y0 + hh + 24 + 4 * 17 + 6, svg: s, aria: "Tre skisser ved siden av hverandre med grå fyll. 1: et liggende rektangel, Metallplate med form som et rektangel. 2: samme rektangel med et lite kvadrat med stiplet kant i hvert hjørne, Skjær bort et kvadrat i hvert hjørne. 3: det kryssformede stykket med stiplede brettelinjer langs kvadratenes sider, Brett langs de stiplede linjene for å lage en kasse." };
}

/* ═════════════════════════════ V24 ═════════════════════════════ */

function v24_d1_3(): ExamFigure {
  const P = axes({ box: [50, 24, 284, 300], xmin: 0, xmax: 15.6, ymin: 0, ymax: 1150, xticks: range(0, 15, 1), xlabels: range(0, 15, 1).filter((v) => v < 10 || v % 2 === 0), yticks: range(0, 1100, 100), ylabels: range(100, 1100, 100), xName: "x", yName: "y", grid: "dash", fs: 12, xNameDy: 34 });
  let s = P.svg;
  s += curve(P, (x) => 125 * x, 0, 15.6, C.green) + curve(P, (x) => 300 + 50 * x, 0, 15.6, C.purple);
  s += curve(P, (x) => 1000 / x, 0.85, 15.6, C.blue) + curve(P, (x) => 1000 * Math.pow(0.68, x), 0, 15.6, C.red);
  const lab = (x: number, y: number, t: string, col: string) => txt(P.sx(x), P.sy(y), t, { fill: col, weight: 700, size: 17, halo: true });
  s += lab(8.9, 1090, "f", C.green) + lab(14.6, 1090, "g", C.purple) + lab(1.55, 720, "p", C.blue) + lab(0.35, 560, "q", C.red);
  return { h: 372, svg: s, aria: "Koordinatsystem med x fra 0 til 15 og y fra 0 til 1100, med stiplede hjelpelinjer. Fire grafer: f er en rett linje fra origo gjennom (4, 500) og (8, 1000). g er en rett linje fra (0, 300) gjennom (4, 500) og (12, 900). p er en avtakende kurve gjennom (2, 500), (5, 200) og (10, 100). q er en avtakende kurve fra (0, 1000) som flater raskt ut mot x-aksen." };
}

/* ═════════════════════════════ V23 ═════════════════════════════ */

function v23_d2_2(): ExamFigure {
  const pw = 180, ph = 150;
  const sh: { n: string; f: (t: number) => number }[] = [
    { n: "A", f: (t) => t + 0.15 * Math.sin(2 * Math.PI * t) },
    { n: "B", f: (t) => 4 * t * (1 - t) },
    { n: "C", f: (t) => (t < 0.4 ? t : t < 0.55 ? 0.4 : 0.4 + (t - 0.55)) },
    { n: "D", f: (t) => (t < 0.35 ? 2 * t : t < 0.6 ? 0.7 : 0.7 * (1 - (t - 0.6) / 0.4)) },
  ];
  let s = "";
  sh.forEach((c, i) => {
    const ox = (i % 2) * pw + 10, oy = Math.floor(i / 2) * (ph + 10) + 8;
    const L = ox + 14, B = oy + ph - 34, w = pw - 44, hh = ph - 72, T = B - hh;
    s += line(L, B, L + w + 6, B, { w: 1.6 }) + arrowHead(L + w + 12, B, 0, 9) + line(L, B, L, T - 6, { w: 1.6 }) + arrowHead(L, T - 12, -90, 9);
    const q: string[] = [];
    for (let k = 0; k <= 160; k++) { const t = k / 160; q.push(`${k ? "L" : "M"}${f1(L + t * w)},${f1(B - c.f(t) * hh)}`); }
    s += `<path d="${q.join("")}" fill="none" stroke="${C.green}" stroke-width="2.6" stroke-linejoin="round"/>`;
    s += txt(L + 4, T - 14, "y kilometer", { anchor: "start", size: 13, weight: 700 });
    s += txt(L + w + 8, B + 20, "x minutter", { anchor: "end", size: 13, weight: 700 });
    s += txt(L + w - 8, T + 12, c.n, { weight: 800, size: 17 });
  });
  return { h: 2 * (ph + 10) + 6, svg: s, aria: "Fire små grafer A, B, C og D med x minutter på førsteaksen og y kilometer på andreaksen. A er en S-formet kurve som stiger, flater ut og stiger igjen. B er en kurve som stiger til en topp og deretter synker. C er en rett linje som stiger, har et kort vannrett stykke og stiger videre med samme helning. D er en rett linje som stiger, et vannrett stykke på toppen og så en rett linje som synker tilbake til førsteaksen." };
}

function v23_d2_3(): ExamFigure {
  const grass = `color-mix(in srgb, ${C.green} 30%, transparent)`;
  const water = `color-mix(in srgb, ${C.blue} 45%, transparent)`;
  let s = poly([[6, 28], [124, 28], [30, 150], [6, 150]], water, "none", 0);
  s += `<path d="M14,52 q8,-5 16,0 t16,0 M10,92 q8,-5 16,0 t16,0 M6,132 q8,-5 16,0" fill="none" stroke="${C.blue}" stroke-width="1.6"/>`;
  s += poly([[124, 28], [336, 28], [336, 150], [30, 150]], grass, "none", 0);
  s += line(124, 28, 30, 150, { w: 1.4, op: 0.55 });
  // gjerdet: bakre, høyre og fremre side; elvesiden er åpen
  const BL: [number, number] = [150, 52], BR: [number, number] = [286, 52], FR: [number, number] = [214, 126], FL: [number, number] = [78, 126];
  s += `<polyline points="${pts([BL, BR, FR, FL])}" fill="none" stroke="${C.amber}" stroke-width="3.4" stroke-linejoin="round"/>`;
  for (const [x, y] of [BL, BR, FR, FL]) s += `<rect x="${x - 3.5}" y="${y - 8}" width="7" height="16" rx="1.5" fill="${C.amber}" stroke="${ink}" stroke-width="1"/>`;
  // telt
  s += poly([[182, 98], [204, 98], [193, 74]], C.red, ink, 1.4) + line(193, 74, 193, 98, { w: 1, op: 0.6 });
  // Lengde
  s += line(300, 62, 228, 132, { w: 1.6 }) + arrowHead(228, 132, 134, 8) + arrowHead(300, 62, -46, 8);
  s += txt(320, 108, "Lengde", { anchor: "middle", weight: 700, halo: true });
  // Bredde
  s += line(78, 152, 214, 152, { w: 1.6 }) + arrowHead(214, 152, 0, 8) + arrowHead(78, 152, 180, 8);
  s += txt(146, 176, "Bredde", { weight: 700 });
  s += txt(40, 18, "Elv", { weight: 700, size: 14 });
  return { h: 190, svg: s, aria: "Perspektivskisse av en grønn eng ved en elv. Elven ligger langs venstre side av et rektangulært område med et rødt telt. Gjerdet står på de tre andre sidene og ikke langs elven. Siden som går parallelt med elven er merket Lengde, og siden som går vinkelrett på elven er merket Bredde." };
}

function v23_d2_4(): ExamFigure {
  const k = 0.5, L = 40, B = 300, T = 20;
  const sx = (x: number) => L + x * k, sy = (y: number) => B - y * k;
  let s = line(L - 6, B, sx(560), B, { w: 1.6 }) + arrowHead(sx(560) + 6, B, 0, 9) + line(L, B + 6, L, sy(545), { w: 1.6 }) + arrowHead(L, sy(545) - 6, -90, 9);
  s += txt(sx(560) + 8, B + 22, "Vekt (kg)", { anchor: "end", weight: 700 }) + txt(L + 10, T - 2, "Pris (kroner)", { anchor: "start", weight: 700 });
  const P: [string, number, number, number, number][] = [["A", 71, 176, -4, -12], ["B", 196, 128, 12, -8], ["C", 448, 176, 12, 18], ["D", 514, 279, 4, -14], ["E", 402, 445, 12, -8], ["F", 196, 499, 12, -4]];
  for (const [n, x, y, dx, dy] of P) s += circ(sx(x), sy(y), 4.6, ink, BG, 1.2) + txt(sx(x) + dx, sy(y) + dy, n, { anchor: dx < 0 ? "end" : "start", weight: 700, size: 16, halo: true });
  return { h: B + 36, svg: s, aria: "Koordinatsystem med Vekt (kg) på førsteaksen og Pris (kroner) på andreaksen, uten tall på aksene. Seks punkter A, B, C, D, E og F. A og C ligger på samme høyde, B og F ligger rett over hverandre, og A og F ligger på en rett linje gjennom origo." };
}

function v23_d2_5(): ExamFigure {
  const d = 16, r = 7;
  const col = { red: "#dc2626", green: "#16a34a", black: "#1f2937", orange: "#f97316", yellow: "#facc15", brown: "#92400e" };
  const Ks: { n: number; stem: number; arm: number; c: string; x: number }[] = [
    { n: 1, stem: 5, arm: 2, c: col.yellow, x: 24 },
    { n: 2, stem: 7, arm: 3, c: col.brown, x: 134 },
    { n: 3, stem: 9, arm: 4, c: col.orange, x: 244 },
  ];
  const cy = 98;
  let s = "";
  for (const K of Ks) {
    const mid = (K.stem - 1) / 2;
    for (let i = 0; i < K.stem; i++) {
      const c = i === 0 || i === K.stem - 1 ? col.red : i === mid ? col.black : col.green;
      s += circ(K.x, cy + (i - mid) * d, r, c, ink, 1);
    }
    s += circ(K.x + 14, cy, r, col.orange, ink, 1);
    for (let j = 1; j <= K.arm; j++) {
      s += circ(K.x + 14 + j * 13, cy - j * d, r, K.c, ink, 1);
      s += circ(K.x + 14 + j * 13, cy + j * d, r, K.c, ink, 1);
    }
    s += `<text x="${K.x + 38}" y="${cy + 4.5 * d + 22}" text-anchor="middle" font-size="${FL}" font-weight="700" fill="${ink}">K<tspan dy="4" font-size="11">${K.n}</tspan></text>`;
  }
  return { h: cy + 4.5 * d + 36, svg: s, aria: "Tre K-er laget av Non Stop-drops i ulike farger. K1 har en loddrett stamme av 5 drops, to skråstriper med 2 drops hver og 1 drops i midten, til sammen 10. K2 har stamme av 7, to skråstriper med 3 drops hver og 1 i midten, til sammen 14. K3 har stamme av 9, to skråstriper med 4 drops hver og 1 i midten, til sammen 18." };
}

/* ═════════════════════════════ V25 ═════════════════════════════ */

function v25_d1_6(): ExamFigure {
  const s0 = 15;
  const tile = (x: number, y: number, c: number, r: number) =>
    `<rect x="${x + c * s0}" y="${y + r * s0}" width="${s0}" height="${s0}" fill="${C.green}" fill-opacity="0.32" stroke="${C.green}" stroke-width="1.6"/>`;
  const xs = [26, 112, 214];
  let s = "";
  [1, 2, 3].forEach((n, i) => {
    const cells: [number, number][] = [];
    for (let r = 0; r < n; r++) for (let c = 1; c <= n; c++) cells.push([c, r]);
    cells.push([0, n]);
    for (let r = n; r < 2 * n; r++) cells.push([n + 1, r]);
    for (let c = 1; c <= n; c++) cells.push([c, n + c]);
    for (const [c, r] of cells) s += tile(xs[i], 10 + (3 - n) * s0, c, r);
    s += txt(xs[i] + ((n + 2) * s0) / 2, 10 + 7 * s0 + 24, `Figur ${n}`);
  });
  return { h: 10 + 7 * s0 + 40, svg: s, aria: "Tre figurer av små grønne kvadrater merket Figur 1, Figur 2 og Figur 3. Figur 1: fire kvadrater i en ring rundt et tomt felt. Figur 2: en 2 ganger 2-blokk øverst, ett kvadrat til venstre under blokken, to på høyre side nedover og to skrått nedover mot venstre under blokken. Figur 3: en 3 ganger 3-blokk øverst, ett kvadrat til venstre, tre på høyre side nedover og tre skrått nedover under blokken." };
}

function v25_d1_8(): ExamFigure {
  const P = axes({ box: [40, 34, 290, 250], xmin: 0, xmax: 25.5, ymin: 0, ymax: 340, grid: "none", xName: "Antall hektogram godteri", yName: "Pris for bøtta med godteri (kroner)", xNameDy: 26 });
  let s = P.svg + seg(P, 0, 30, 25.5, 30 + 12 * 25.5, C.green);
  s += dot(P, 5, 90, "(5, 90)", 9, 20) + dot(P, 20, 270, "(20, 270)", 9, 20);
  return { h: 34 + 250 + 44, svg: s, aria: "Koordinatsystem uten tall på aksene. x-aksen er Antall hektogram godteri og y-aksen er Pris for bøtta med godteri (kroner). En rett, stigende linje starter over origo på y-aksen. To markerte punkter: (5, 90) og (20, 270)." };
}

/* ═════════════════════════════ V26 ═════════════════════════════ */

function v26_d2_3(): ExamFigure {
  const r = Math.pow(1 / 14, 1 / 9);
  const p = (x: number) => 7000 * Math.pow(r, x), q = (x: number) => 2000 + 7000 * Math.pow(r, x);
  const ph = 216;
  const panel = (i: number, which: "p" | "pq" | "q"): string => {
    const oy = i * ph;
    const P = axes({ box: [66, oy + 32, 258, 140], xmin: 0, xmax: 32, ymin: 0, ymax: 9700, xticks: range(0, 30, 5), xlabels: range(5, 30, 5), yticks: range(0, 8000, 2000), ylabels: range(2000, 8000, 2000), xName: "x", yName: "y", fs: 13, xNameDy: 34, yNameAnchor: "end", yNameDx: -8 });
    let s = txt(195, oy + 14, which === "p" ? "Modellen p" : which === "q" ? "Modellen q" : "Modellen p og modellen q", { weight: 700, size: 15 }) + P.svg;
    if (which !== "p") s += seg(P, 0, 2000, 32, 2000, C.red, 1.4, "5 4") + curve(P, q, 0, 31, C.red);
    if (which !== "q") s += curve(P, p, 0, 31, C.blue);
    if (which === "p") s += dot(P, 0, 7000, "(0, 7000)", 9, 18) + dot(P, 9, 500, "(9, 500)", 9, -10);
    if (which === "q") s += dot(P, 0, 9000, "(0, 9000)", 14, -6) + dot(P, 9, 2500, "(9, 2500)", 9, -10);
    if (which === "pq") s += dot(P, 0, 9000, "(0, 9000)", 14, -6) + dot(P, 0, 7000, "(0, 7000)", 14, 22) + dot(P, 9, 2500, "(9, 2500)", 9, -10) + dot(P, 9, 500, "(9, 500)", 9, -10);
    if (which === "pq") s += txt(P.sx(20), P.sy(p(20)) - 22, "p", { fill: C.blue, weight: 700, size: 17, halo: true });
    if (which === "pq") s += txt(P.sx(20), P.sy(q(20)) - 18, "q", { fill: C.red, weight: 700, size: 17, halo: true });
    return s;
  };
  return { h: 3 * ph - 6, svg: panel(0, "p") + panel(1, "pq") + panel(2, "q"), aria: "Tre små diagrammer for x fra 0 til 30. Først grafen til p alene med punktene (0, 7000) og (9, 500) og asymptote y = 0. Så p og q sammen. Til slutt q alene med punktene (0, 9000) og (9, 2500) og en vannrett stiplet asymptote y = 2000." };
}

/* ═════════════════════════════ H25 ═════════════════════════════ */

function h25_d1_5(): ExamFigure {
  const P = axes({ box: [58, 28, 272, 300], xmin: 0, xmax: 12.4, ymin: 0, ymax: 2250, xticks: range(0, 12, 1), xlabels: range(0, 12, 1).filter((v) => v < 10 || v % 2 === 0), yticks: range(0, 2200, 200), ylabels: range(400, 2000, 400), xName: "Antall timer", yName: "Lønn", grid: "dash", fs: 13, xNameDy: 36 });
  const s = P.svg + seg(P, 0, 0, 12.4, 200 * 12.4, C.green) + seg(P, 0, 0, 12.4, 180 * 12.4, C.blue);
  return { h: 378, svg: s, aria: "Koordinatsystem med to rette linjer fra origo. Førsteaksen er Antall timer fra 0 til 12 med hjelpelinjer for hver time. Andreaksen er Lønn i kroner, merket 400, 800, 1200, 1600 og 2000 med stiplede hjelpelinjer for hver 200. Den grønne linja går gjennom (10, 2000) og den blå gjennom (10, 1800)." };
}

function h25_d1_7(): ExamFigure {
  const u = 24, r = 9.6;
  const cols = ["#d9e021", "#f97316", "#ef2b2d", "#7c3a16"];
  const dir = (k: number): [number, number] => { const a = (72 * k * Math.PI) / 180; return [Math.cos(a), -Math.sin(a)]; };
  const x0s = [20, 62, 122, 224], base = 130;
  let s = "";
  x0s.forEach((px, n) => {
    const seen = new Set<string>();
    const dots: { x: number; y: number; layer: number }[] = [];
    const add = (x: number, y: number, layer: number) => {
      const key = `${Math.round(x * 10)},${Math.round(y * 10)}`;
      if (!seen.has(key)) { seen.add(key); dots.push({ x, y, layer }); }
    };
    add(px, base, 0);
    for (let sd = 1; sd <= n; sd++) {
      let x = px, y = base;
      const vs: [number, number][] = [];
      for (let e = 0; e < 5; e++) {
        vs.push([x, y]);
        const [dx, dy] = dir(e);
        for (let k = 0; k < sd; k++) { add(x + dx * u * k, y + dy * u * k, sd); }
        x += dx * u * sd; y += dy * u * sd;
      }
      s += poly(vs, "none", ink, 2, ' stroke-opacity="0.55"');
    }
    for (const d of dots) s += circ(d.x, d.y, r, cols[d.layer], ink, 1);
  });
  return { h: base + 20, svg: s, aria: "Fire figurer av fargede prikker ved siden av hverandre: 1 prikk, 5 prikker i en liten femkant, 12 prikker i to femkanter i hverandre med felles hjørne nederst til venstre, og 22 prikker i tre femkanter. Hver ny femkant legger til et lag av prikker i en ny farge." };
}

function h25_d2_2(): ExamFigure {
  const pw = 120, ph = 108;
  const sig = (t: number) => { const f = (x: number) => 1 / (1 + Math.exp(-11 * (x - 0.5))); return 0.06 + 0.88 * (f(t) - f(0)) / (f(1) - f(0)); };
  const lin = (a: number, b: number, c: number, d: number, t: number) => b + ((t - a) / (c - a)) * (d - b);
  const defs: { f: (t: number) => number | null; t0?: number }[] = [
    { f: (t) => 0.95 - 0.85 * t },
    { f: sig },
    { f: (t) => (t <= 0.3 ? 0.2 : t >= 0.37 && t <= 0.65 ? 0.5 : t >= 0.72 ? 0.84 : null) },
    { f: (t) => 0.95 * Math.exp(-3.2 * t) },
    { f: (t) => 0.05 + 0.9 * t },
    { f: (t) => Math.sqrt(t) * 0.95 + 0.03 },
    { f: (t) => (t <= 0.5 ? 0.1 + 0.04 * (Math.exp(4 * t) - 1) : 0.1 + 0.04 * (Math.exp(2) - 1) + 0.16 * Math.exp(2) * (t - 0.5)) },
    { f: (t) => (t < 0.06 ? null : Math.min(1, 0.06 / t) * 0.95), t0: 0.06 },
    { f: (t) => (t <= 0.25 ? lin(0, 0.04, 0.25, 0.6, t) : t <= 0.62 ? lin(0.25, 0.6, 0.62, 0.74, t) : lin(0.62, 0.74, 1, 0.98, t)) },
  ];
  let s = "";
  defs.forEach((dd, i) => {
    const ox = (i % 3) * pw + 6, oy = Math.floor(i / 3) * ph + 4;
    const L = ox + 14, B = oy + ph - 18, w = pw - 34, hh = ph - 40, T = B - hh;
    s += line(L, B, L + w + 4, B, { w: 1.5 }) + arrowHead(L + w + 10, B, 0, 8) + line(L, B, L, T - 4, { w: 1.5 }) + arrowHead(L, T - 10, -90, 8);
    s += txt(L + w + 8, B + 15, "x", { size: 13, weight: 700, anchor: "end" }) + txt(L + 8, T - 8, "y", { size: 13, weight: 700, anchor: "start" });
    let path = "", pen = false;
    for (let k = 0; k <= 200; k++) {
      const t = k / 200, v = dd.f(t);
      if (v === null) { pen = false; continue; }
      path += `${pen ? "L" : "M"}${f1(L + t * w)},${f1(B - v * hh)}`; pen = true;
    }
    s += `<path d="${path}" fill="none" stroke="${C.green}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
    s += txt(L + w - 6, T + 8, String(i + 1), { weight: 800, size: 16 });
  });
  return { h: 3 * ph + 6, svg: s, aria: "Ni små diagrammer med nummer 1 til 9 og aksene x og y, kun kurver uten tall på aksene. 1: rett fallende linje. 2: S-kurve. 3: trappetrinn med tre vannrette stykker, hvert høyere enn det forrige. 4: eksponentielt avtakende kurve. 5: rett stigende linje. 6: raskt stigende kurve som flater ut. 7: starter over null, stiger først langsomt langs en kurve og så som et rett stykke. 8: sterkt avtakende kurve fra svært høy verdi mot x-aksen. 9: stigende kurve med tre rette stykker: først bratt, så slakt, så middels bratt." };
}

function h25_d2_7(): ExamFigure {
  const x0 = 70, y0 = 36, len = 150, hh = 100, r = hh / 2;
  const fill = `color-mix(in srgb, ${C.green} 30%, transparent)`;
  let s = `<path d="M${x0},${y0} L${x0 + len},${y0} A${r},${r} 0 0 1 ${x0 + len},${y0 + hh} L${x0},${y0 + hh} Z" fill="${fill}" stroke="${C.green}" stroke-width="2.6" stroke-linejoin="round"/>`;
  // mål: x langs venstre kant, y langs øvre kant
  s += line(x0 - 20, y0, x0 - 20, y0 + hh, { w: 1.4 }) + arrowHead(x0 - 20, y0, -90, 7) + arrowHead(x0 - 20, y0 + hh, 90, 7);
  s += line(x0 - 24, y0, x0 - 16, y0, { w: 1 }) + line(x0 - 24, y0 + hh, x0 - 16, y0 + hh, { w: 1 });
  s += txt(x0 - 30, y0 + hh / 2 + 5, "x", { anchor: "end", weight: 700, size: 17 });
  s += line(x0, y0 - 18, x0 + len, y0 - 18, { w: 1.4 }) + arrowHead(x0, y0 - 18, 180, 7) + arrowHead(x0 + len, y0 - 18, 0, 7);
  s += line(x0, y0 - 22, x0, y0 - 14, { w: 1 }) + line(x0 + len, y0 - 22, x0 + len, y0 - 14, { w: 1 });
  s += txt(x0 + len / 2, y0 - 26, "y", { weight: 700, size: 17 });
  return { h: y0 + hh + 20, svg: s, aria: "Skisse av blomsterbedet: et liggende rektangel med en halvsirkel i høyre ende. Venstre kant er rett, og øvre og nedre kant er like lange. Målet x er den korte siden, lik halvsirkelens diameter, og y er den lange siden." };
}

/* ═════════════════════════════ register ═════════════════════════════ */

export const EKSAMEN_FIGURER: Record<string, ExamFigure> = {
  "p1-v26-d2-3": v26_d2_3(),
  "p1-h25-d1-5": h25_d1_5(),
  "p1-h25-d1-7": h25_d1_7(),
  "p1-h25-d2-2": h25_d2_2(),
  "p1-h25-d2-7": h25_d2_7(),
  "p1-v25-d1-6": v25_d1_6(),
  "p1-v25-d1-8": v25_d1_8(),
  "p1-h24-d1-5": h24_d1_5(),
  "p1-h24-d2-8": h24_d2_8(),
  "p1-v24-d1-3": v24_d1_3(),
  "p1-h23-d2-5": h23_d2_5(),
  "p1-h23-d2-6": h23_d2_6(),
  "p1-h23-d2-7": h23_d2_7(),
  "p1-h23-d2-8": h23_d2_8(),
  "p1-v23-d2-2": v23_d2_2(),
  "p1-v23-d2-3": v23_d2_3(),
  "p1-v23-d2-4": v23_d2_4(),
  "p1-v23-d2-5": v23_d2_5(),
  "p1-h22-d1-3": h22_d1_3(),
  "p1-h22-d1-4": h22_d1_4(),
  "p1-h22-d2-3": h22_d2_3(),
  "p1-h22-d2-6": h22_d2_6(),
  "p1-v22-d1-2": v22_d1_2(),
  "p1-v22-d1-3b": v22_d1_3b(),
  "p1-v22-d1-6": v22_d1_6(),
  "p1-v22-d2-2": v22_d2_2(),
  "p1-v22-d2-6": v22_d2_6(),
  "p1-v22-d2-8": v22_d2_8(),
  "p1-h21-d1-5": h21_d1_5(),
  "p1-h21-d2-3c": h21_d2_3c(),
  "p1-h21-d2-7": h21_d2_7(),
  "p1-h21-d2-8": h21_d2_8(),
};
