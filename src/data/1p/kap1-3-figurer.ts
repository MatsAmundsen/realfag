/*
 * 1P kap 1–3-figurer (DesignBOT2) som statiske SVG-er, samme stil som kap6-figurer.ts:
 * currentColor for linjer og tekst, viewBox 360 bred, --fig1p-* med reservefarger.
 * Hver figur tegner nøyaktig det som står i den skjulte «figur:»-kommentaren i kap1.ts, kap2.ts og kap3.ts.
 */

const ink = "currentColor";
const C = {
  blue: "var(--fig1p-blue, #6366f1)",
  green: "var(--fig1p-green, #10b981)",
  amber: "var(--fig1p-amber, #f59e0b)",
  violet: "var(--fig1p-violet, #a78bfa)",
};
const W = 360;
const FS = 15;
const CAP = "color:color-mix(in srgb, var(--text-main, currentColor) 72%, var(--text-muted, #94a3b8))";
const GRID = `stroke="${ink}" stroke-width="0.6" opacity="0.18"`;

function num(v: number): string {
  return String(v).replace("-", "−").replace(".", ",");
}

function wrap(id: string, svg: string, h: number, aria: string): string {
  return `<figure class="task-figure task-figure-1p"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${h}" width="100%" role="img" aria-label="${aria}" font-family="inherit">${svg}</svg><figcaption style="${CAP}">Figur til oppgave ${id}</figcaption></figure>`;
}

function txt(x: number, y: number, t: string, o: { size?: number; anchor?: string; weight?: number; fill?: string } = {}): string {
  return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${o.anchor ?? "middle"}" font-size="${o.size ?? FS}"${o.weight ? ` font-weight="${o.weight}"` : ""} fill="${o.fill ?? ink}">${t}</text>`;
}

function line(x1: number, y1: number, x2: number, y2: number, w = 1.4, extra = ""): string {
  return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${ink}" stroke-width="${w}"${extra}/>`;
}

/** P1.39: tallinje fra −3 til 5, hele tall merket, kort strek for hver halve, seks tomme bokser A–F over linja. */
function p1_39(): string {
  const L = 24, R = 336, y = 112;
  const sx = (v: number) => L + ((v + 3) / 8) * (R - L);
  let s = line(L - 10, y, R + 12, y, 1.6) + `<path d="M${R + 12} ${y - 5} L${R + 20} ${y} L${R + 12} ${y + 5}" fill="${ink}"/>`;
  for (let k = -6; k <= 10; k++) {
    const v = k / 2;
    const whole = k % 2 === 0;
    s += line(sx(v), y - (whole ? 7 : 4), sx(v), y + (whole ? 7 : 4), whole ? 1.4 : 1);
    if (whole) s += txt(sx(v), y + 26, num(v));
  }
  const bw = 40, gap = 12, x0 = (W - (6 * bw + 5 * gap)) / 2;
  "ABCDEF".split("").forEach((c, i) => {
    const x = x0 + i * (bw + gap);
    s += `<rect x="${x}" y="22" width="${bw}" height="32" rx="4" fill="none" stroke="${C.blue}" stroke-width="1.6"/>` + txt(x + bw / 2, 44, c, { weight: 700, fill: C.blue });
  });
  return wrap("P1.39", s, 150, "Tallinje fra −3 til 5 med hele tall merket og en kort strek for hver halve. Over tallinja står seks tomme bokser merket A til F, uten plassering.");
}

/** P2.15: akvarium som rett prisme, skrått ovenfra. Lengde 60 cm, bredde 3,0 dm, høyde 0,35 m. */
function p2_14(): string {
  const x = 70, y = 92, l = 180, h = 105, dx = 62, dy = -46;
  const f = (px: number, py: number) => `${px.toFixed(1)},${py.toFixed(1)}`;
  const fill = `fill="${C.blue}" stroke="${ink}" stroke-width="1.6" stroke-linejoin="round"`;
  let s = "";
  s += `<polygon points="${f(x, y)} ${f(x + l, y)} ${f(x + l, y + h)} ${f(x, y + h)}" ${fill} fill-opacity="0.16"/>`;
  s += `<polygon points="${f(x, y)} ${f(x + dx, y + dy)} ${f(x + l + dx, y + dy)} ${f(x + l, y)}" ${fill} fill-opacity="0.08"/>`;
  s += `<polygon points="${f(x + l, y)} ${f(x + l + dx, y + dy)} ${f(x + l + dx, y + h + dy)} ${f(x + l, y + h)}" ${fill} fill-opacity="0.26"/>`;
  s += line(x, y + h, x + dx, y + h + dy, 1, ` stroke-dasharray="4 4" opacity="0.55"`) + line(x + dx, y + dy, x + dx, y + h + dy, 1, ` stroke-dasharray="4 4" opacity="0.55"`) + line(x + dx, y + h + dy, x + l + dx, y + h + dy, 1, ` stroke-dasharray="4 4" opacity="0.55"`);
  s += txt(x + l / 2, y + h + 24, "60 cm");
  s += txt(x + l + dx / 2 + 12, y + h + dy / 2 + 22, "3,0 dm", { anchor: "start" });
  s += txt(x - 10, y + h / 2 + 5, "0,35 m", { anchor: "end" });
  return wrap("P2.15", s, 230, "Akvarium formet som et rett prisme, tegnet skrått ovenfra. Lengde 60 cm, bredde 3,0 dm og høyde 0,35 m.");
}

/** P2.S2: tre enhetstrapper (lengde, areal, volum) med · faktor ned og : faktor opp på hvert trinn. */
function p2_s2(): string {
  const cols: { title: string; units: string[]; k: string; color: string }[] = [
    { title: "Lengde", units: ["km", "hm", "dam", "m", "dm", "cm", "mm"], k: "10", color: C.blue },
    { title: "Areal", units: ["km²", "hm²", "dam²", "m²", "dm²", "cm²", "mm²"], k: "100", color: C.green },
    { title: "Volum", units: ["m³", "dm³ = L", "cm³ = mL", "mm³"], k: "1000", color: C.violet },
  ];
  const top = 46, step = 38, bh = 24;
  let s = "";
  cols.forEach((c, ci) => {
    const cx = [50, 164, 287][ci];
    const bw = [40, 48, 62][ci];
    s += txt(cx, 22, c.title, { weight: 700 });
    c.units.forEach((u, i) => {
      const yy = top + i * step;
      s += `<rect x="${(cx - bw / 2).toFixed(1)}" y="${yy}" width="${bw}" height="${bh}" rx="4" fill="${c.color}" fill-opacity="0.16" stroke="${c.color}" stroke-width="1.4"/>` + txt(cx, yy + 17, u, { size: 12.5 });
      if (i < c.units.length - 1) {
        const a = yy + bh + 2, b = yy + step - 2, m = (a + b) / 2;
        const xr = cx + bw / 2 + 4, xl = cx - bw / 2 - 4;
        s += line(xr, a, xr, b - 3, 1.2) + `<path d="M${xr - 3} ${b - 4} L${xr} ${b} L${xr + 3} ${b - 4}" fill="${ink}"/>` + txt(xr + 4, m + 4, `·${c.k}`, { size: 10.5, anchor: "start" });
        s += line(xl, b, xl, a + 3, 1.2) + `<path d="M${xl - 3} ${a + 4} L${xl} ${a} L${xl + 3} ${a + 4}" fill="${ink}"/>` + txt(xl - 4, m + 4, `:${c.k}`, { size: 10.5, anchor: "end" });
      }
    });
  });
  return wrap("P2.S2", s, 312, "Tre enhetstrapper. Lengde: km, hm, dam, m, dm, cm, mm, med ganger 10 ned og delt på 10 opp på hvert trinn. Areal: km², hm², dam², m², dm², cm², mm², med ganger 100 og delt på 100. Volum: m³, dm³ (lik liter), cm³ (lik milliliter), mm³, med ganger 1000 og delt på 1000.");
}

/** P3.6: stolpediagram «Andel som sykler til skolen», 2022 32 %, 2023 40 %, 2024 34 %, andreakse 0–50 %. */
function p3_6(): string {
  const L = 64, R = 340, B = 238, T = 48, max = 50;
  const sy = (v: number) => B - (v / max) * (B - T);
  let s = txt(W / 2, 20, "Andel som sykler til skolen", { weight: 700 });
  for (let v = 5; v <= max; v += 5) s += `<line x1="${L}" y1="${sy(v).toFixed(1)}" x2="${R}" y2="${sy(v).toFixed(1)}" ${GRID}/>`;
  for (let v = 0; v <= max; v += 10) s += line(L - 4, sy(v), L, sy(v), 1.2) + txt(L - 8, sy(v) + 5, `${v} %`, { anchor: "end", size: 13 });
  const data: [string, number][] = [["2022", 32], ["2023", 40], ["2024", 34]];
  const stepX = (R - L) / 3, bw = stepX * 0.5;
  data.forEach(([yr, v], i) => {
    const cx = L + (i + 0.5) * stepX;
    s += `<rect x="${(cx - bw / 2).toFixed(1)}" y="${sy(v).toFixed(1)}" width="${bw.toFixed(1)}" height="${(B - sy(v)).toFixed(1)}" fill="${C.amber}" fill-opacity="0.85"/>` + txt(cx, B + 20, yr);
  });
  s += line(L, B, R, B, 1.6) + line(L, B, L, T - 10, 1.6);
  return wrap("P3.6", s, 260, "Stolpediagram «Andel som sykler til skolen». 2022: 32 prosent, 2023: 40 prosent, 2024: 34 prosent. Andreaksen går fra 0 til 50 prosent.");
}

export const P1P_KAP1_3_FIGURES: Record<string, string> = {
  "P1.39": p1_39(),
  "P2.15": p2_14(),
  "P2.S2": p2_s2(),
  "P3.6": p3_6(),
};
