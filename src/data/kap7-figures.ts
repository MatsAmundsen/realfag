/**
 * Figurer til kapittel 7 (trigonometri). Samme mønster som task-figures.ts:
 * role="img" med <title>/<desc>, temafarger via CSS-variabler, rettvinkelmerke,
 * og mål nøyaktig som i oppgaveteksten. Ukjente vises som «?», aldri som svar.
 */

type Pt = [number, number];

const INK = "currentColor";
const FILL = "fill:var(--primary);fill-opacity:0.12";
const ARC = "stroke:var(--accent)";
const UNKNOWN = "fill:var(--hint-color)";

let uid = 0;
function a11y(svg: string, title: string, desc: string, caption: string, vb = "0 0 420 240"): string {
  const id = `k7fig-${++uid}`;
  return `<figure class="task-figure"><svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="100%" role="img" aria-labelledby="${id}-t ${id}-d"><title id="${id}-t">${title}</title><desc id="${id}-d">${desc}</desc>${svg}</svg><figcaption>${caption}</figcaption></figure>`;
}

const sub = (a: Pt, b: Pt): Pt => [a[0] - b[0], a[1] - b[1]];
const len = (v: Pt) => Math.hypot(v[0], v[1]);
const unit = (v: Pt): Pt => [v[0] / len(v), v[1] / len(v)];
const f = (n: number) => n.toFixed(1);

function label(p: Pt, text: string, opts: { unknown?: boolean; size?: number; anchor?: string } = {}): string {
  const style = opts.unknown ? UNKNOWN : "fill:currentColor";
  return `<text x="${f(p[0])}" y="${f(p[1])}" text-anchor="${opts.anchor ?? "middle"}" dominant-baseline="middle" font-size="${opts.size ?? 15}" font-weight="700" style="${style}">${text}</text>`;
}

/** Sidemål midt på siden a→b, skjøvet ut fra tyngdepunktet. */
function sideLabel(a: Pt, b: Pt, centroid: Pt, text: string, unknown = false, off = 16): string {
  const m: Pt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const d = unit(sub(b, a));
  let n: Pt = [-d[1], d[0]];
  const toC = sub(centroid, m);
  if (n[0] * toC[0] + n[1] * toC[1] > 0) n = [-n[0], -n[1]];
  const k = off + Math.abs(n[0]) * text.length * 4.3;
  return label([m[0] + n[0] * k, m[1] + n[1] * k], text, { unknown });
}

/** Vinkelbue i hjørne p mellom p→q og p→r, med tekst. */
function angleArc(p: Pt, q: Pt, r: Pt, text: string, rad = 28): string {
  const u = unit(sub(q, p));
  const v = unit(sub(r, p));
  const s: Pt = [p[0] + u[0] * rad, p[1] + u[1] * rad];
  const e: Pt = [p[0] + v[0] * rad, p[1] + v[1] * rad];
  const cross = u[0] * v[1] - u[1] * v[0];
  const bis = unit([u[0] + v[0], u[1] + v[1]]);
  const t: Pt = [p[0] + bis[0] * (rad + 17), p[1] + bis[1] * (rad + 17)];
  return `<path d="M${f(s[0])} ${f(s[1])} A${rad} ${rad} 0 0 ${cross > 0 ? 1 : 0} ${f(e[0])} ${f(e[1])}" fill="none" stroke-width="2" style="${ARC}"/>${text ? label(t, text, { size: 13 }) : ""}`;
}

/** Rettvinkelmerke i hjørne p. */
function rightMark(p: Pt, q: Pt, r: Pt, s = 14): string {
  const u = unit(sub(q, p));
  const v = unit(sub(r, p));
  const a: Pt = [p[0] + u[0] * s, p[1] + u[1] * s];
  const c: Pt = [p[0] + v[0] * s, p[1] + v[1] * s];
  const b: Pt = [a[0] + v[0] * s, a[1] + v[1] * s];
  return `<path d="M${f(a[0])} ${f(a[1])} L${f(b[0])} ${f(b[1])} L${f(c[0])} ${f(c[1])}" fill="none" stroke="${INK}" stroke-width="1.6"/>`;
}

function poly(pts: Pt[]): string {
  return `<polygon points="${pts.map((p) => `${f(p[0])},${f(p[1])}`).join(" ")}" style="${FILL}" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>`;
}

function centroid(pts: Pt[]): Pt {
  return [pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length];
}

function vertexLabel(p: Pt, c: Pt, text: string): string {
  const d = unit(sub(p, c));
  return label([p[0] + d[0] * 18, p[1] + d[1] * 18], text, { size: 14 });
}

// 7.1 — kateter 6 og 8 (skala 22 px/cm), hypotenus ukjent.
function fig71(): string {
  const C: Pt = [120, 200], A: Pt = [120 + 8 * 22, 200], B: Pt = [120, 200 - 6 * 22];
  const g = centroid([A, B, C]);
  const svg = poly([A, B, C]) + rightMark(C, A, B) +
    sideLabel(C, A, g, "8 cm") + sideLabel(C, B, g, "6 cm") + sideLabel(A, B, g, "?", true);
  return a11y(svg, "Rettvinklet trekant", "Rettvinklet trekant med kateter 6 cm og 8 cm. Hypotenusen er ukjent og merket med spørsmålstegn.", "Katetene er $6$ cm og $8$ cm. Hypotenusen er ukjent.");
}

// 7.11 — pinne 1,5 m / skygge 2,0 m, tre ? / skygge 14 m (ikke i skala mellom de to).
function fig711(): string {
  const g = 205;
  const p0: Pt = [75, g], p1: Pt = [75, g - 60], ps: Pt = [75 + 80, g];
  const t0: Pt = [205, g], t1: Pt = [205, g - 146], ts: Pt = [205 + 195, g];
  const svg = `<line x1="20" y1="${g}" x2="410" y2="${g}" stroke="${INK}" stroke-width="1.6" stroke-opacity="0.6"/>` +
    poly([p0, p1, ps]) + rightMark(p0, ps, p1, 11) + poly([t0, t1, ts]) + rightMark(t0, ts, t1) +
    `<line x1="${p0[0]}" y1="${g}" x2="${p1[0]}" y2="${p1[1]}" stroke="${INK}" stroke-width="5"/>` +
    `<line x1="${t0[0]}" y1="${g}" x2="${t1[0]}" y2="${t1[1]}" stroke-width="6" style="stroke:var(--accent)"/>` +
    label([p0[0] - 4, p1[1] - 14], "pinne", { size: 12, anchor: "start" }) + label([t0[0] - 4, t1[1] - 14], "tre", { size: 12, anchor: "start" }) +
    label([67, g - 30], "1,5 m", { size: 13, anchor: "end" }) + label([115, g + 18], "2,0 m", { size: 13 }) +
    label([193, g - 75], "?", { unknown: true, anchor: "end" }) + label([302, g + 18], "14 m", { size: 13 });
  return a11y(svg, "Pinne og tre med skygger", "To rettvinklede trekanter dannet av sollyset. Pinnen er 1,5 m høy med skygge 2,0 m. Treet har skygge 14 m og ukjent høyde.", "Pinnen og treet kaster skygge samtidig. Figuren er ikke i målestokk.", "0 0 420 230");
}

// 7.19 — 25 m fra treet, vinkel 38° opp til toppen, høyde ukjent.
function fig719(): string {
  const O: Pt = [90, 210], F: Pt = [330, 210];
  const T: Pt = [330, 210 - 240 * Math.tan((38 * Math.PI) / 180)];
  const g = centroid([O, F, T]);
  const svg = poly([O, F, T]) + rightMark(F, O, T) + angleArc(O, F, T, "38°", 40) +
    sideLabel(O, F, g, "25 m") + sideLabel(F, T, g, "?", true) + vertexLabel(O, g, "du");
  return a11y(svg, "Høyden til et tre", "Rettvinklet trekant. Avstanden langs bakken til treet er 25 m, vinkelen opp til toppen er 38 grader, og høyden er ukjent.", "Avstand $25$ m langs flat mark og vinkel $38^\\circ$ opp til toppen.");
}

// 7.24 — enhetssirkel med v = 150°.
function fig724(): string {
  const c: Pt = [210, 150], r = 105, v = (150 * Math.PI) / 180;
  const P: Pt = [c[0] + r * Math.cos(v), c[1] - r * Math.sin(v)];
  const arcEnd: Pt = [c[0] + 30 * Math.cos(v), c[1] - 30 * Math.sin(v)];
  const svg = `<line x1="70" y1="${c[1]}" x2="355" y2="${c[1]}" stroke="${INK}" stroke-width="1.5"/><line x1="${c[0]}" y1="270" x2="${c[0]}" y2="28" stroke="${INK}" stroke-width="1.5"/>` +
    `<path d="M349 ${c[1] - 5} L357 ${c[1]} L349 ${c[1] + 5} M${c[0] - 5} 34 L${c[0]} 26 L${c[0] + 5} 34" fill="none" stroke="${INK}" stroke-width="1.5"/>` +
    label([362, c[1] + 14], "x", { size: 13 }) + label([c[0] + 12, 26], "y", { size: 13 }) +
    `<circle cx="${c[0]}" cy="${c[1]}" r="${r}" style="${FILL}" stroke="${INK}" stroke-width="2"/>` +
    `<line x1="${c[0]}" y1="${c[1]}" x2="${f(P[0])}" y2="${f(P[1])}" stroke-width="2.6" style="stroke:var(--primary-light)"/>` +
    `<path d="M${c[0] + 30} ${c[1]} A30 30 0 0 0 ${f(arcEnd[0])} ${f(arcEnd[1])}" fill="none" stroke-width="2" style="${ARC}"/>` +
    label([c[0] + 22, c[1] - 40], "150°", { size: 13 }) +
    `<circle cx="${f(P[0])}" cy="${f(P[1])}" r="5" style="fill:var(--hint-color)"/>` + label([P[0] - 16, P[1] - 14], "P", { size: 14 }) +
    label([c[0] + r + 8, c[1] + 14], "1", { size: 13 }) + label([c[0] - 10, c[1] + 14], "O", { size: 12 });
  return a11y(svg, "Enhetssirkel med vinkel 150 grader", "Enhetssirkel med radius 1. Vinkelen 150 grader er målt fra positiv x-akse, og punktet P ligger på sirkelen i andre kvadrant.", "Vinkelen $v=150^\\circ$ i enhetssirkelen.", "0 0 420 290");
}

/** Trekant ABC fra to sider og vinkelen mellom (i A), tegnet i skala. */
function sas(bLen: number, cLen: number, deg: number, s: number, ox: number, oy: number): [Pt, Pt, Pt] {
  const A: Pt = [ox, oy];
  const B: Pt = [ox + cLen * s, oy];
  const t = (deg * Math.PI) / 180;
  const C: Pt = [ox + bLen * s * Math.cos(t), oy - bLen * s * Math.sin(t)];
  return [A, B, C];
}

// 7.31 — sider 7 cm og 10 cm, vinkel 52° mellom dem.
function fig731(): string {
  const [A, B, C] = sas(7, 10, 52, 26, 70, 200);
  const g = centroid([A, B, C]);
  const svg = poly([A, B, C]) + angleArc(A, B, C, "52°", 34) + sideLabel(A, B, g, "10 cm") + sideLabel(A, C, g, "7 cm");
  return a11y(svg, "Trekant med to sider og vinkelen mellom", "Trekant der to sider er 7 cm og 10 cm, og vinkelen mellom dem er 52 grader.", "To sider og vinkelen mellom dem.");
}

// 7.38 — ∠A = 40°, ∠B = 75°, a = 8 (siden BC, motstående A).
function fig738(): string {
  const A0 = (40 * Math.PI) / 180, B0 = (75 * Math.PI) / 180;
  const a = 8, c = (a * Math.sin(Math.PI - A0 - B0)) / Math.sin(A0);
  const s = 260 / c;
  const A: Pt = [80, 205], B: Pt = [80 + c * s, 205];
  const C: Pt = [B[0] - a * s * Math.cos(B0), 205 - a * s * Math.sin(B0)];
  const g = centroid([A, B, C]);
  const svg = poly([A, B, C]) + angleArc(A, B, C, "40°", 40) + angleArc(B, A, C, "75°", 30) +
    sideLabel(B, C, g, "a = 8") + vertexLabel(A, g, "A") + vertexLabel(B, g, "B") + vertexLabel(C, g, "C");
  return a11y(svg, "Trekant ABC", "Trekant ABC med vinkel A lik 40 grader, vinkel B lik 75 grader og siden a lik 8, motstående vinkel A.", "$\\angle A=40^\\circ$, $\\angle B=75^\\circ$ og $a=8$.", "0 0 420 235");
}

// 7.45 — b = 5, c = 7, ∠A = 60°, a ukjent.
function fig745(): string {
  const [A, B, C] = sas(5, 7, 60, 38, 70, 205);
  const g = centroid([A, B, C]);
  const svg = poly([A, B, C]) + angleArc(A, B, C, "60°", 30) + sideLabel(A, B, g, "c = 7") + sideLabel(A, C, g, "b = 5") +
    sideLabel(B, C, g, "a = ?", true, 24) + vertexLabel(A, g, "A") + vertexLabel(B, g, "B") + vertexLabel(C, g, "C");
  return a11y(svg, "Trekant ABC", "Trekant ABC med b lik 5, c lik 7 og vinkel A lik 60 grader. Siden a er ukjent.", "$b=5$, $c=7$ og $\\angle A=60^\\circ$. Siden $a$ er ukjent.", "0 0 420 235");
}

export const KAP7_FIGURES: Record<string, string> = {
  "7.1": fig71(),
  "7.11": fig711(),
  "7.19": fig719(),
  "7.24": fig724(),
  "7.31": fig731(),
  "7.38": fig738(),
  "7.45": fig745(),
};
