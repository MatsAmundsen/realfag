/*
 * 1P-figurer (kap 4 og 5) som statiske SVG-er, i samme stil som 1T-figurene i task-figures.ts:
 * currentColor for akser og tekst, svakt rutenett (opacity 0.18), fylte punkter og fete etiketter.
 * Kurvefargene er CSS-variabler (--fig1p-*) med egne verdier for lyst og mørkt tema (matteguiden.css),
 * valgt slik at de har minst 4,5:1 mot kortbakgrunnen i begge temaer.
 * Mobil først: viewBox er 360 bred, og tallene har font-size 15, slik at de blir minst 12 px ved 390 px skjerm.
 * Hver figur tegner nøyaktig det som står i den skjulte «figur:»-kommentaren i kap4.ts/kap5.ts.
 */

const ink = "currentColor";
const C = {
  blue: "var(--fig1p-blue)",
  green: "var(--fig1p-green)",
  red: "var(--fig1p-red)",
  amber: "var(--fig1p-amber)",
  grey: "var(--fig1p-grey)",
};
const W = 360;
const FS = 15; // tall på aksene
const FL = 15; // etiketter og aksetitler

/** Bakgrunnsrand rundt akse-tall, så kurver som krysser ikke dekker minustegn og sifre. */
const CAP = "color:color-mix(in srgb, var(--text-main, currentColor) 72%, var(--text-muted, currentColor))";
const HALO = ' stroke="var(--bg-surface, #111827)" stroke-width="4" stroke-linejoin="round" paint-order="stroke"';

let clipSeq = 0;

function num(v: number): string {
  const r = Math.round(v * 1000) / 1000;
  return String(r).replace("-", "−").replace(".", ",");
}

/**
 * Etiketter (bokstaver, linjenumre, mål) løftes til slutt i SVG-en og får halo (paint-order stroke i bakgrunnsfargen), så tall og etiketter
 * leses oppå kurver og linjer. Akse-tall blir liggende under kurvene og plasseres så kurvene ikke går gjennom dem. Kurvene tegnes hele – ingen hull der eleven leser av svar.
 */
function textOnTop(svg: string): string {
  const texts: string[] = [];
  const rest = svg.replace(/<text [^>]*>[^<]*<\/text>/g, (t) => {
    if (t.includes("data-ax=")) return t; // akse-tall blir liggende under kurvene, så de aldri lager hull i dem
    texts.push(t.includes("paint-order") ? t : t.replace("<text ", `<text ${HALO.trim()} `));
    return "";
  });
  return rest + `<g class="fig-labels">${texts.join("")}</g>`;
}

function wrap(id: string, svg: string, h: number, aria: string): string {
  svg = textOnTop(svg);
  return `<figure class="task-figure task-figure-1p"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${h}" width="100%" role="img" aria-label="${aria}" font-family="inherit">${svg}</svg><figcaption style="${CAP}">Figur til oppgave ${id}</figcaption></figure>`;
}

function range(a: number, b: number, s: number): number[] {
  const out: number[] = [];
  const n = Math.round((b - a) / s);
  for (let i = 0; i <= n; i++) out.push(Math.round((a + i * s) * 1e6) / 1e6);
  return out;
}

type Plot = {
  sx: (x: number) => number;
  sy: (y: number) => number;
  clip: string;
  svg: string;
};

/** Koordinatsystem i boksen [x0, x0+w] × [y0, y0+h] (plottområdet). */
function axes(o: {
  box: [number, number, number, number];
  xmin: number; xmax: number; ymin: number; ymax: number;
  xticks: number[]; xlabels: number[];
  yticks: number[]; ylabels: number[];
  xName: string; yName: string;
  ylabelDy?: Record<number, number>; // loddrett forskyvning av enkelttall på y-aksen (f.eks. over en linje)
  edge?: boolean; // tallene langs underkant og venstrekant av plottet (utenfor klippeboksen), når linjer krysser aksene i tallene
  xlabelDx?: Record<number, number>; // sideforskyvning av enkelttall på x-aksen
  titles?: boolean; // lange aksetitler: x-tittel under tallene, y-tittel over aksen
  fs?: number;
}): Plot {
  const [L, T, w, hh] = o.box;
  const R = L + w, B = T + hh;
  const fs = o.fs ?? FS;
  const sx = (x: number) => L + ((x - o.xmin) / (o.xmax - o.xmin)) * w;
  const sy = (y: number) => B - ((y - o.ymin) / (o.ymax - o.ymin)) * hh;
  const ax = o.ymin <= 0 && o.ymax >= 0 ? sy(0) : B;
  const ay = o.xmin <= 0 && o.xmax >= 0 ? sx(0) : L;
  const p: string[] = [];
  for (const x of o.xticks) p.push(`<line x1="${sx(x).toFixed(1)}" y1="${T}" x2="${sx(x).toFixed(1)}" y2="${B}" stroke="${ink}" stroke-width="0.6" opacity="0.18"/>`);
  for (const y of o.yticks) p.push(`<line x1="${L}" y1="${sy(y).toFixed(1)}" x2="${R}" y2="${sy(y).toFixed(1)}" stroke="${ink}" stroke-width="0.6" opacity="0.18"/>`);
  for (const x of o.xticks) p.push(`<line x1="${sx(x).toFixed(1)}" y1="${ax - 3}" x2="${sx(x).toFixed(1)}" y2="${ax + 3}" stroke="${ink}" stroke-width="1.2"/>`);
  for (const y of o.yticks) p.push(`<line x1="${ay - 3}" y1="${sy(y).toFixed(1)}" x2="${ay + 3}" y2="${sy(y).toFixed(1)}" stroke="${ink}" stroke-width="1.2"/>`);
  for (const x of o.xlabels) p.push(`<text x="${(sx(x) + (o.xlabelDx?.[x] ?? 0)).toFixed(1)}" y="${((o.edge ? B + 4 : ax) + Math.max(fs, 15) + 8).toFixed(1)}" text-anchor="middle" font-size="${fs}" fill="${ink}" data-ax="x"${HALO}>${num(x)}</text>`);
  /* Bare én «0» i origo: hopp over y-tallet 0 når x-aksen allerede har 0 der aksene møtes. */
  const dobbel0 = o.xlabels.includes(0) && Math.abs(ay - sx(0)) < 0.5 && Math.abs(ax - sy(0)) < 0.5;
  for (const y of o.ylabels.filter((v) => !(dobbel0 && v === 0))) p.push(`<text x="${((o.edge ? L : ay) - 5).toFixed(1)}" y="${(sy(y) + fs * 0.35 + (o.ylabelDy?.[y] ?? 0)).toFixed(1)}" text-anchor="end" data-ax="y" font-size="${fs}" fill="${ink}"${HALO}>${num(y)}</text>`);
  p.push(`<line x1="${L}" y1="${ax}" x2="${R + 8}" y2="${ax}" stroke="${ink}" stroke-width="1.6"/>
    <polygon points="${R + 13},${ax} ${R + 4},${ax - 4.5} ${R + 4},${ax + 4.5}" fill="${ink}"/>
    <line x1="${ay}" y1="${B}" x2="${ay}" y2="${T - 8}" stroke="${ink}" stroke-width="1.6"/>
    <polygon points="${ay},${T - 13} ${ay - 4.5},${T - 4} ${ay + 4.5},${T - 4}" fill="${ink}"/>`);
  if (o.titles) {
    p.push(`<text x="${R + 10}" y="${(ax + 2 * fs + 16).toFixed(1)}" text-anchor="end" font-size="${FL}" font-weight="700" fill="${ink}">${o.xName}</text>`);
    p.push(`<text x="${ay + 10}" y="${T - 4}" font-size="${FL}" font-weight="700" fill="${ink}">${o.yName}</text>`);
  } else {
    p.push(`<text x="${R + 6}" y="${ax - 9}" text-anchor="end" font-size="${FL}" font-weight="700" fill="${ink}" font-style="italic">${o.xName}</text>`);
    p.push(`<text x="${ay + 9}" y="${T - 2}" font-size="${FL}" font-weight="700" fill="${ink}" font-style="italic">${o.yName}</text>`);
  }
  const clip = `p1-clip-${++clipSeq}`;
  p.push(`<defs><clipPath id="${clip}"><rect x="${L}" y="${T}" width="${w}" height="${hh}"/></clipPath></defs>`);
  return { sx, sy, clip, svg: p.join("") };
}

function curve(P: Plot, f: (x: number) => number, a: number, b: number, color: string, opts: { dash?: boolean; width?: number } = {}): string {
  const pts: string[] = [];
  for (let i = 0; i <= 240; i++) {
    const x = a + ((b - a) * i) / 240;
    pts.push(`${i ? "L" : "M"}${P.sx(x).toFixed(1)},${P.sy(f(x)).toFixed(1)}`);
  }
  return `<path d="${pts.join(" ")}" fill="none" stroke="${color}" stroke-width="${opts.width ?? 2.6}"${opts.dash ? ' stroke-dasharray="6 4"' : ""} clip-path="url(#${P.clip})"/>`;
}

function seg(P: Plot, x1: number, y1: number, x2: number, y2: number, color: string, opts: { dash?: boolean; width?: number } = {}): string {
  return `<line x1="${P.sx(x1).toFixed(1)}" y1="${P.sy(y1).toFixed(1)}" x2="${P.sx(x2).toFixed(1)}" y2="${P.sy(y2).toFixed(1)}" stroke="${color}" stroke-width="${opts.width ?? 2.6}"${opts.dash ? ' stroke-dasharray="6 4"' : ""} clip-path="url(#${P.clip})"/>`;
}

function dot(P: Plot, x: number, y: number, label?: string, dx = 7, dy = -7, anchor = "start", r = 4.2): string {
  const c = `<circle cx="${P.sx(x).toFixed(1)}" cy="${P.sy(y).toFixed(1)}" r="${r}" fill="${ink}"/>`;
  return label ? c + `<text x="${(P.sx(x) + dx).toFixed(1)}" y="${(P.sy(y) + dy).toFixed(1)}" text-anchor="${anchor}" font-size="${FL}" font-weight="700" fill="${ink}">${label}</text>` : c;
}

function lbl(x: number, y: number, t: string, color = ink, anchor = "start", italic = false): string {
  return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}" font-size="${FL}" font-weight="700" fill="${color}"${italic ? ' font-style="italic"' : ""}>${t}</text>`;
}

/* ───────────────────────────── Kap 4 ───────────────────────────── */

function p4_1(): string {
  const h = 340;
  const P = axes({ box: [22, 24, 310, 290], xmin: -5, xmax: 5, ymin: -5, ymax: 5,
    xticks: range(-5, 5, 1), xlabels: range(-5, 5, 1).filter((v) => v !== 0),
    yticks: range(-5, 5, 1), ylabels: range(-5, 5, 1).filter((v) => v !== 0), xName: "x", yName: "y", xlabelDx: { [-1]: -6 } });
  const s = P.svg + dot(P, 4, 2, "A") + dot(P, -3, 1, "B") + dot(P, -2, -4, "C") + dot(P, 0, 3, "D") + dot(P, 3, -2, "E");
  return wrap("P4.1", s, h, "Koordinatsystem med x og y fra −5 til 5. Punktene A (4, 2), B (−3, 1), C (−2, −4), D (0, 3) og E (3, −2).");
}

function p4_4(): string {
  const h = 300;
  const P = axes({ box: [24, 24, 306, 250], xmin: -50, xmax: 57, ymin: -10, ymax: 10,
    xticks: range(-50, 50, 10), xlabels: [-40, -20, 20, 40], yticks: range(-10, 10, 2), ylabels: [-8, -4, 4, 8], xName: "x", yName: "y" });
  const s = P.svg + dot(P, 30, 6, "A") + dot(P, -20, 4, "B") + dot(P, -40, -8, "C") + dot(P, 0, -6, "D") + dot(P, 50, 0, "E", 0, 25, "middle");
  return wrap("P4.4", s, h, "Koordinatsystem med x fra −50 til 50, én strek per 10, og y fra −10 til 10, én strek per 2. Punktene A (30, 6), B (−20, 4), C (−40, −8), D (0, −6) og E (50, 0).");
}

function p4_7(): string {
  const h = 300;
  const P = axes({ box: [26, 24, 300, 250], xmin: -400, xmax: 400, ymin: -10, ymax: 10,
    xticks: range(-400, 400, 50), xlabels: [-400, -200, 200, 400], yticks: range(-10, 10, 2.5), ylabels: [-10, -5, 5, 10], xName: "x", yName: "y" });
  const s = P.svg + dot(P, 250, 7.5, "A") + dot(P, -150, 5, "B") + dot(P, 0, -7.5, "C") + dot(P, 350, -2.5, "D", -8, 5, "end") + dot(P, -300, 0, "E", 0, -10, "middle");
  return wrap("P4.7", s, h, "Koordinatsystem med x fra −400 til 400, én strek per 50, og y fra −10 til 10, én strek per 2,5. Punktene A (250, 7,5), B (−150, 5), C (0, −7,5), D (350, −2,5) og E (−300, 0).");
}

function p4_10(): string {
  const h = 300;
  const P = axes({ box: [40, 26, 290, 244], xmin: 0, xmax: 10, ymin: 0, ymax: 90,
    xticks: range(0, 10, 1), xlabels: range(0, 10, 1), yticks: range(0, 90, 10), ylabels: range(0, 90, 10), xName: "x", yName: "f(x)" });
  const s = P.svg + seg(P, 0, 30, 10, 80, C.blue) + lbl(P.sx(7.6), P.sy(5 * 7.6 + 30) - 10, "f", C.blue, "end", true);
  return wrap("P4.10", s, h, "Koordinatsystem med x fra 0 til 10 og f(x) fra 0 til 90. En rett linje f fra (0, 30) til (10, 80).");
}

function p4_14(): string {
  const h = 350;
  const P = axes({ box: [32, 24, 298, 280], xmin: -1, xmax: 9, ymin: -3, ymax: 7,
    xticks: range(-1, 9, 1), xlabels: range(-1, 9, 1).filter((v) => v !== 0), yticks: range(-3, 7, 1), ylabels: range(-3, 7, 1).filter((v) => v !== 0), xName: "x", yName: "y", edge: true });
  const f = (x: number) => 0.5 * (x - 2) * (x - 6);
  const s = P.svg + curve(P, f, 0, 8, C.blue) + dot(P, 0, 6) + dot(P, 8, 6);
  return wrap("P4.14", s, h, "Parabel tegnet for x fra 0 til 8, med fylte endepunkter i (0, 6) og (8, 6). Grafen går gjennom (2, 0), (4, −2) og (6, 0).");
}

function p4_23(): string {
  const h = 262;
  const P = axes({ box: [22, 26, 310, 196], xmin: -10, xmax: 10, ymin: 0, ymax: 8,
    xticks: range(-10, 10, 2), xlabels: range(-10, 10, 2).filter((v) => v !== 0), yticks: range(0, 8, 2), ylabels: [2, 4, 6, 8], xName: "x", yName: "y", edge: true });
  const f = (x: number) => 4 * 1.05 ** x, g = (x: number) => 4 * 0.95 ** x;
  const s = P.svg + curve(P, f, -10, 10, C.blue) + curve(P, g, -10, 10, C.green) +
    lbl(P.sx(7.8), P.sy(f(7.8)) - 16, "f", C.blue, "middle", true) + lbl(P.sx(-8.6), P.sy(g(-8.6)) - 15, "g", C.green, "middle", true);
  return wrap("P4.23", s, h, "Koordinatsystem med x fra −10 til 10 og y fra 0 til 8. Grafen til f stiger mot høyre, og grafen til g synker. Begge går gjennom (0, 4).");
}

function p4_25(): string {
  const h = 340;
  const P = axes({ box: [34, 24, 294, 280], xmin: -2, xmax: 5, ymin: -4, ymax: 5,
    xticks: range(-2, 5, 1), xlabels: range(-2, 5, 1).filter((v) => v !== 0), yticks: range(-4, 5, 1), ylabels: range(-4, 5, 1).filter((v) => v !== 0), xName: "x", yName: "y", edge: true });
  const lines: [(x: number) => number, string, number][] = [
    [(x) => -x + 3, C.blue, -1.4],
    [(x) => 2 * x - 3, C.green, 3.9],
    [() => -1, C.red, 4.4],
    [(x) => x + 1, C.amber, 2],
  ];
  let s = P.svg;
  for (const [f, c] of lines) s += curve(P, f, -2, 5, c);
  // Nummer i sirkel ved hver linje, fritt ved siden av linjen (linjene skal være hele)
  const tags: [number, number, string][] = [[-1.4, -1.4 * -1 + 3, "1"], [3.2, 2 * 3.2 - 3, "2"], [-1.6, -1, "3"], [2.0, 3, "4"]];
  const off: [number, number][] = [[15, -15], [16, 8], [0, 18], [-15, -15]]; // vinkelrett ut fra linjen, så sirkelen aldri dekker den
  tags.forEach(([x, y, t], i) => {
    const cx = P.sx(x) + off[i][0], cy = P.sy(y) + off[i][1];
    s += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="10.5" fill="var(--bg-surface, #111827)" stroke="${lines[i][1]}" stroke-width="2"/>` +
      `<text x="${cx.toFixed(1)}" y="${(cy + 5).toFixed(1)}" text-anchor="middle" font-size="${FL}" font-weight="700" fill="${ink}">${t}</text>`;
  });
  return wrap("P4.25", s, h, "Fire rette linjer. Linje 1 gjennom (0, 3) og (3, 0). Linje 2 gjennom (0, −3) og (3, 3). Linje 3 vannrett gjennom (0, −1). Linje 4 gjennom (0, 1) og (3, 4).");
}

function p4_37(): string {
  const h = 330;
  const P = axes({ box: [34, 24, 298, 278], xmin: 0, xmax: 7, ymin: 0, ymax: 16,
    xticks: range(0, 7, 1), xlabels: range(0, 7, 1), yticks: range(0, 16, 2), ylabels: range(0, 16, 2), xName: "x", yName: "y" });
  const f = (x: number) => 0.5 * x * x - 2 * x + 5;
  const s = P.svg + curve(P, (x) => 2 * x - 1, 0, 7, C.grey, { width: 2 }) + curve(P, f, 0, 7, C.blue) +
    seg(P, 2, 3, 6, 3, C.red, { dash: true, width: 2.2 }) + seg(P, 6, 3, 6, 11, C.red, { dash: true, width: 2.2 }) +
    dot(P, 2, 3, "A", -4, 29, "middle") + dot(P, 6, 11, "B", -10, -4, "end");
  return wrap("P4.37", s, h, "Grafen til f for x fra 0 til 7 med bunnpunkt (2, 3). Punktene A (2, 3) og B (6, 11). En grå rett linje gjennom A og B, og en rød stiplet rettvinklet trekant: vannrett fra A til (6, 3) og loddrett opp til B.");
}

function p4_40(): string {
  const h = 330;
  const P = axes({ box: [30, 24, 300, 278], xmin: 0, xmax: 6, ymin: 0, ymax: 10,
    xticks: range(0, 6, 1), xlabels: range(0, 6, 1), yticks: range(0, 10, 1), ylabels: range(0, 10, 1), xName: "x", yName: "y" });
  const f = (x: number) => 0.25 * x * x + 1;
  const s = P.svg + seg(P, 0, 0, 6, 6, C.green) + curve(P, f, 0, 6, C.blue) +
    seg(P, 2, 2, 3, 2, C.red, { width: 2.2 }) + seg(P, 3, 2, 3, 3, C.red, { width: 2.2 }) +
    lbl(P.sx(2.5), P.sy(2) + 21, "1", C.red, "middle") + lbl(P.sx(3) + 6, P.sy(2.5) + 5, "1", C.red) +
    dot(P, 2, 2, "A", -8, -6, "end") + dot(P, 4, 5, "B", -8, -6, "end");
  return wrap("P4.40", s, h, "Grafen til f for x fra 0 til 6. Punktene A (2, 2) og B (4, 5). En grønn tangent gjennom A fra (0, 0) til (6, 6), og en rød stigningstrekant ved A: 1 bort og 1 opp.");
}

function p4_41(): string {
  const h = 320;
  const P = axes({ box: [32, 24, 298, 248], xmin: -1, xmax: 7, ymin: -5, ymax: 5,
    xticks: range(-1, 7, 1), xlabels: range(-1, 7, 1).filter((v) => v !== 0), yticks: range(-5, 5, 1), ylabels: range(-5, 5, 1).filter((v) => v !== 0), xName: "x", yName: "y", edge: true });
  const s = P.svg + curve(P, (x) => -((x - 3) ** 2) + 4, 0, 6, C.blue);
  return wrap("P4.41", s, h, "Parabel med nullpunkter i (1, 0) og (5, 0) og toppunkt (3, 4), tegnet for x fra 0 til 6.");
}

function p4_44(): string {
  const h = 300;
  const P = axes({ box: [26, 24, 300, 248], xmin: 0, xmax: 5, ymin: -1, ymax: 5,
    xticks: range(0, 5, 1), xlabels: range(1, 5, 1), yticks: range(-1, 5, 1), ylabels: range(-1, 5, 1).filter((v) => v !== 0), xName: "x", yName: "y" });
  const f = (x: number) => x ** 3 - 6 * x * x + 9 * x;
  const s = P.svg + curve(P, f, 0, 4.3, C.blue) +
    dot(P, 0.5, 3.125, "A", -8, -4, "end") + dot(P, 1, 4, "B", 0, -11, "middle") + dot(P, 2, 2, "C", 8, -4) +
    dot(P, 3, 0, "D", 0, -11, "middle") + dot(P, 4, 4, "E", -9, -4, "end");
  return wrap("P4.44", s, h, "Grafen til f for x fra 0 til 4,3. Punktene A (0,5, 3,125), B (1, 4) toppunkt, C (2, 2), D (3, 0) bunnpunkt og E (4, 4).");
}

function p4_49(): string {
  const h = 320;
  const P = axes({ box: [40, 28, 290, 238], xmin: 0, xmax: 12, ymin: 0, ymax: 90,
    xticks: range(0, 12, 1), xlabels: range(0, 12, 1), yticks: range(0, 90, 10), ylabels: range(0, 90, 10), xName: "Tid (timer)", yName: "Vannhøyde (cm)", titles: true });
  const s = P.svg + seg(P, 0, 20, 12, 80, C.blue) + dot(P, 0, 20) + dot(P, 12, 80);
  return wrap("P4.49", s, h, "Førsteaksen Tid (timer) fra 0 til 12, andreaksen Vannhøyde (cm) fra 0 til 90. En rett linje fra (0, 20) til (12, 80) med fylte endepunkter.");
}

function p4_56(): string {
  const h = 230;
  const x0 = 80, x1 = 280, y0 = 40, y1 = 170;
  const s = `
    <line x1="30" y1="${y0}" x2="330" y2="${y0}" stroke="${C.grey}" stroke-width="9" stroke-linecap="round"/>
    ${lbl(180, y0 - 13, "Vegg", ink, "middle")}
    <rect x="${x0}" y="${y0 + 4.5}" width="${x1 - x0}" height="${y1 - y0 - 4.5}" fill="${C.green}" fill-opacity="0.12" stroke="none"/>
    <polyline points="${x0},${y0 + 4.5} ${x0},${y1} ${x1},${y1} ${x1},${y0 + 4.5}" fill="none" stroke="${C.green}" stroke-width="3" stroke-dasharray="8 5"/>
    ${lbl(x0 - 12, (y0 + y1) / 2 + 6, "x", ink, "end", true)}
    ${lbl(x1 + 12, (y0 + y1) / 2 + 6, "x", ink, "start", true)}
    ${lbl(180, y1 + 26, "44 − 2x", ink, "middle")}`;
  return wrap("P4.56", s, h, "Sett ovenfra: en vegg øverst og et rektangel under veggen. De tre andre sidene er gjerde. De to sidene vinkelrett på veggen er x, og siden parallelt med veggen er 44 minus 2x.");
}

function p4_57(): string {
  const h = 230;
  // Venstre: kvadrat 12 cm med hjørnekvadrater x
  const L = 22, T = 30, S = 150, c = 30;
  const hatch = `<defs><pattern id="p1-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="${C.grey}" stroke-width="2"/></pattern><marker id="p1-arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,1 L10,5 L0,9 z" fill="${ink}"/></marker></defs>`;
  const corners = [[L, T], [L + S - c, T], [L, T + S - c], [L + S - c, T + S - c]]
    .map(([x, y]) => `<rect x="${x}" y="${y}" width="${c}" height="${c}" fill="url(#p1-hatch)" stroke="${ink}" stroke-width="1.4"/>`).join("");
  const fold = `<rect x="${L + c}" y="${T + c}" width="${S - 2 * c}" height="${S - 2 * c}" fill="none" stroke="${ink}" stroke-width="1.4" stroke-dasharray="5 4"/>`;
  const left = `<rect x="${L}" y="${T}" width="${S}" height="${S}" fill="${C.blue}" fill-opacity="0.10" stroke="${ink}" stroke-width="2"/>` + corners + fold +
    lbl(L + S / 2, T - 10, "12 cm", ink, "middle") +
    `<line x1="${L + c + 4}" y1="${T + S - c - 10}" x2="${L + S - c - 4}" y2="${T + S - c - 10}" stroke="${ink}" stroke-width="1.4" marker-start="url(#p1-arr)" marker-end="url(#p1-arr)"/>` +
    lbl(L + S / 2, T + S - c - 17, "12 − 2x", ink, "middle") +
    lbl(L + c / 2, T + S + 20, "x", ink, "middle", true) + lbl(L - 6, T + c / 2 + 5, "x", ink, "end", true);
  // Høyre: åpen eske i perspektiv
  const bx = 190, by = 150, bw = 80, bd = 40, bh = 52; // front-bunn venstre hjørne
  const dx = bd * 0.75, dy = -bd * 0.55;
  const p = (x: number, y: number) => `${x.toFixed(1)},${y.toFixed(1)}`;
  const A = [bx, by], B2 = [bx + bw, by], Cc = [bx + bw + dx, by + dy], D = [bx + dx, by + dy];
  const up = (q: number[]) => [q[0], q[1] - bh];
  const box = `
    <polygon points="${p(D[0], D[1])} ${p(Cc[0], Cc[1])} ${p(up(Cc)[0], up(Cc)[1])} ${p(up(D)[0], up(D)[1])}" fill="${C.blue}" fill-opacity="0.06" stroke="${ink}" stroke-width="1.2" stroke-dasharray="4 3"/>
    <line x1="${D[0]}" y1="${D[1]}" x2="${A[0]}" y2="${A[1]}" stroke="${ink}" stroke-width="1.2" stroke-dasharray="4 3"/>
    <polygon points="${p(B2[0], B2[1])} ${p(Cc[0], Cc[1])} ${p(up(Cc)[0], up(Cc)[1])} ${p(up(B2)[0], up(B2)[1])}" fill="${C.blue}" fill-opacity="0.16" stroke="${ink}" stroke-width="2"/>
    <polygon points="${p(A[0], A[1])} ${p(B2[0], B2[1])} ${p(up(B2)[0], up(B2)[1])} ${p(up(A)[0], up(A)[1])}" fill="${C.blue}" fill-opacity="0.22" stroke="${ink}" stroke-width="2"/>
    <polygon points="${p(up(A)[0], up(A)[1])} ${p(up(B2)[0], up(B2)[1])} ${p(up(Cc)[0], up(Cc)[1])} ${p(up(D)[0], up(D)[1])}" fill="none" stroke="${ink}" stroke-width="2"/>
    ${lbl(bx + bw / 2, by + 30, "12 − 2x", ink, "middle")}
    ${lbl(bx + bw + dx / 2 + 8, by + dy / 2 + 17, "12 − 2x", ink, "start")}
    ${lbl(bx - 7, by - bh / 2 + 5, "x", ink, "end", true)}`;
  return wrap("P4.57", hatch + left + box, h + 10, "Til venstre: et kvadrat med side 12 cm, med et lite skravert kvadrat med side x i hvert hjørne, midtfeltet 12 minus 2x og stiplede brettelinjer. Til høyre: en åpen eske med bunn 12 minus 2x ganger 12 minus 2x og høyde x.");
}

/* ───────────────────────────── Kap 5 ───────────────────────────── */

function p5_5(): string {
  const h = 290;
  const u = 40; // 1 m = 40 enheter
  const cx = 180, yTop = 34, yMid = yTop + 3 * u, yBot = yMid + 2 * u;
  const tl = cx - 2 * u, tr = cx + 2 * u, bl = cx - 3 * u, br = cx + 3 * u;
  const s = `
    <polygon points="${tl},${yTop} ${tr},${yTop} ${br},${yMid} ${bl},${yMid}" fill="${C.green}" fill-opacity="0.14" stroke="${ink}" stroke-width="2.2"/>
    <polygon points="${bl},${yMid} ${br},${yMid} ${cx},${yBot}" fill="${C.amber}" fill-opacity="0.16" stroke="${ink}" stroke-width="2.2"/>
    <line x1="${tr - 22}" y1="${yTop}" x2="${tr - 22}" y2="${yMid}" stroke="${ink}" stroke-width="1.6" stroke-dasharray="6 4"/>
    <line x1="${cx}" y1="${yMid}" x2="${cx}" y2="${yBot}" stroke="${ink}" stroke-width="1.6" stroke-dasharray="6 4"/>
    ${lbl(cx, yTop - 10, "4 m", ink, "middle")}
    ${lbl(cx, yMid - 9, "6 m", ink, "middle")}
    ${lbl(tr - 30, (yTop + yMid) / 2 + 5, "3 m", ink, "end")}
    ${lbl(cx + 8, (yMid + yBot) / 2 + 4, "2 m", ink, "start")}`;
  return wrap("P5.5", s, h, "Blomsterbed sett ovenfra. Et trapes med parallelle sider 4 m øverst og 6 m nederst og høyde 3 m. Under trapeset en trekant med grunnlinje 6 m, felles med trapeset, og høyde 2 m, med spissen ned.");
}

function p5_10(): string {
  const h = 340;
  const P = axes({ box: [40, 30, 290, 254], xmin: 0, xmax: 7, ymin: 0, ymax: 140,
    xticks: range(0, 7, 1), xlabels: range(0, 7, 1), yticks: range(0, 140, 10), ylabels: range(0, 140, 20), xName: "Dager", yName: "Sider", titles: true });
  return wrap("P5.10", P.svg, h, "Tomt koordinatsystem. Førsteaksen Dager fra 0 til 7, andreaksen Sider fra 0 til 140 med merker for hver 10.");
}

function p5_12(): string {
  const data: [string, number[]][] = [
    ["A", [1, 2.6, 3.9, 5.6, 7, 8.4, 10]],
    ["B", [10, 5.8, 3.2, 2, 3, 6, 10.2]],
    ["C", [11.5, 7.8, 5.2, 3.5, 2.3, 1.5, 1]],
    ["D", [0, 0.3, 1.2, 2.7, 4.8, 7.5, 10.8]],
  ];
  const cw = 180, ch = 200;
  let s = "";
  data.forEach(([name, ys], i) => {
    const ox = (i % 2) * cw, oy = Math.floor(i / 2) * ch;
    const P = axes({ box: [ox + 30, oy + 30, cw - 50, ch - 64], xmin: 0, xmax: 6, ymin: 0, ymax: 12,
      xticks: range(0, 6, 1), xlabels: range(0, 6, 1), yticks: range(0, 12, 2), ylabels: range(0, 12, 2), xName: "", yName: "" });
    s += P.svg + ys.map((y, x) => `<circle cx="${P.sx(x).toFixed(1)}" cy="${P.sy(y).toFixed(1)}" r="3.6" fill="${C.blue}"/>`).join("") +
      `<text x="${ox + cw - 14}" y="${oy + 24}" text-anchor="end" font-size="17" font-weight="800" fill="${ink}">${name}</text>`;
  });
  const aria = "Fire små koordinatsystemer A til D, førsteakse 0 til 6 og andreakse 0 til 12. " +
    data.map(([n, ys]) => `${n}: ${ys.map((y, x) => `(${x}, ${num(y)})`).join(", ")}.`).join(" ");
  return wrap("P5.12", s, 2 * ch, aria);
}

export const P1P_FIGURES: Record<string, string> = {
  "P4.1": p4_1(), "P4.4": p4_4(), "P4.7": p4_7(), "P4.10": p4_10(), "P4.14": p4_14(),
  "P4.23": p4_23(), "P4.25": p4_25(), "P4.37": p4_37(), "P4.40": p4_40(), "P4.41": p4_41(),
  "P4.44": p4_44(), "P4.49": p4_49(), "P4.56": p4_56(), "P4.57": p4_57(),
  "P5.5": p5_5(), "P5.10": p5_10(), "P5.12": p5_12(),
};
