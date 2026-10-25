/*
 * Figurer til 1P-eksamensoppgaver (DesignBOT2), samme stil som kap6-figurer.ts:
 * statiske SVG-er, viewBox 360 bred, currentColor for tekst, --fig1p-* med reservefarger.
 * Hver figur tegner nøyaktig det som står i den skjulte «figur:»-kommentaren i exams.ts.
 */

const ink = "currentColor";
const C = {
  blue: "var(--fig1p-blue, #6366f1)",
};
const W = 360;
const FL = 15;
const CAP = "color:color-mix(in srgb, var(--text-main, currentColor) 72%, var(--text-muted, #94a3b8))";

function wrap(nr: string, svg: string, h: number, aria: string): string {
  return `<figure class="task-figure task-figure-1p"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${h}" width="100%" role="img" aria-label="${aria}" font-family="inherit">${svg}</svg><figcaption style="${CAP}">Figur til oppgave ${nr}</figcaption></figure>`;
}

function lbl(x: number, y: number, t: string): string {
  return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="middle" font-size="${FL}" font-weight="700" fill="${ink}">${t}</text>`;
}

/** P7-d1-6: figur n er et (n+1)·(n+1)-kvadrat av brikker der hjørnebrikken øverst til høyre mangler (3, 8, 15 brikker). */
function p7_d1_6(): string {
  const s0 = 22, base = 120;
  const xs = [24, 104, 210];
  let s = "";
  [1, 2, 3].forEach((n, i) => {
    const m = n + 1;
    const y0 = base - m * s0;
    for (let r = 0; r < m; r++)
      for (let c = 0; c < m; c++) {
        if (r === 0 && c === m - 1) continue;
        s += `<rect x="${xs[i] + c * s0}" y="${y0 + r * s0}" width="${s0}" height="${s0}" fill="${C.blue}" fill-opacity="0.22" stroke="${ink}" stroke-width="1.3"/>`;
      }
    s += lbl(xs[i] + (m * s0) / 2, base + 24, `Figur ${n}`);
  });
  return wrap("6", s, 156, "Tre figurer av kvadratiske brikker. Hver figur er et kvadrat med n + 1 brikker langs hver side der hjørnebrikken øverst til høyre mangler. Figur 1 har 3 brikker, figur 2 har 8 og figur 3 har 15.");
}

/** P7-d2-3: søylediagram over strømforbruk per måned (kWh), uten tall på søylene. */
function p7_d2_3(): string {
  const vals = [2100, 1900, 1600, 1200, 800, 600, 500, 600, 900, 1300, 1700, 2000];
  const mnd = ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"];
  const x0 = 56, x1 = 348, y0 = 250, y1 = 30, ymax = 2500;
  const sy = (v: number) => y0 - (v / ymax) * (y0 - y1);
  const grid = "color-mix(in srgb, currentColor 18%, transparent)";
  let s = "";
  for (let v = 100; v <= ymax; v += 100) {
    const y = sy(v).toFixed(1);
    s += `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="${grid}" stroke-width="${v % 500 === 0 ? 1 : 0.6}"/>`;
  }
  for (let v = 0; v <= ymax; v += 500)
    s += `<text x="${x0 - 6}" y="${(sy(v) + 4).toFixed(1)}" text-anchor="end" font-size="12" fill="${ink}">${v}</text>`;
  const step = (x1 - x0) / 12, bw = step * 0.64;
  vals.forEach((v, i) => {
    const x = x0 + i * step + (step - bw) / 2;
    s += `<rect x="${x.toFixed(1)}" y="${sy(v).toFixed(1)}" width="${bw.toFixed(1)}" height="${(y0 - sy(v)).toFixed(1)}" fill="${C.blue}" fill-opacity="0.85"/>`;
    s += `<text x="${(x0 + (i + 0.5) * step).toFixed(1)}" y="${y0 + 16}" text-anchor="middle" font-size="11" fill="${ink}">${mnd[i]}</text>`;
  });
  s += `<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" stroke="${ink}" stroke-width="1.4"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y1 - 8}" stroke="${ink}" stroke-width="1.4"/>`;
  s += `<text x="${x0 - 44}" y="16" font-size="13" font-weight="700" fill="${ink}">Forbruk (kWh)</text>`;
  return wrap("3", s, 276, "Søylediagram over strømforbruk per måned. Forbruk (kWh) fra 0 til 2500. Januar 2100, februar 1900, mars 1600, april 1200, mai 800, juni 600, juli 500, august 600, september 900, oktober 1300, november 1700, desember 2000.");
}

export const P1P_EXAM_FIGURES: Record<string, string> = {
  "P7-d1-6": p7_d1_6(),
  "P7-d2-3": p7_d2_3(),
};
