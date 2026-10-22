/**
 * Figurer til kapittel 2 (algebra og figurtall). Samme mønster som kap7-figures.ts:
 * role="img" med <title>/<desc>, temafarger via CSS-variabler og mållinjer.
 * Målene følger oppgaveteksten; figurene viser aldri svaret.
 */

const INK = "currentColor";
const P = "fill:var(--primary);fill-opacity:0.16";
const P2 = "fill:var(--primary);fill-opacity:0.30";
const A = "fill:var(--accent);fill-opacity:0.18";
const A2 = "fill:var(--accent);fill-opacity:0.32";
const W = "fill:#f59e0b;fill-opacity:0.22";
const R = "fill:#ef4444;fill-opacity:0.16";

let uid = 0;
function a11y(svg: string, title: string, desc: string, caption: string, vb = "0 0 420 240"): string {
  const id = `k2fig-${++uid}`;
  return `<figure class="task-figure"><svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="100%" role="img" aria-labelledby="${id}-t ${id}-d"><title id="${id}-t">${title}</title><desc id="${id}-d">${desc}</desc>${svg}</svg><figcaption>${caption}</figcaption></figure>`;
}

function t(x: number, y: number, s: string, o: { size?: number; anchor?: string; style?: string; weight?: number } = {}): string {
  return `<text x="${x}" y="${y}" text-anchor="${o.anchor ?? "middle"}" dominant-baseline="middle" font-size="${o.size ?? 14}" font-weight="${o.weight ?? 700}" style="${o.style ?? "fill:currentColor"}">${s}</text>`;
}
function rect(x: number, y: number, w: number, h: number, style: string, extra = ""): string {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" style="${style}" stroke="${INK}" stroke-width="1.8" ${extra}/>`;
}
/** Vannrett mållinje med endestreker og etikett over (eller under). */
function hdim(x1: number, x2: number, y: number, lab: string, below = false): string {
  return `<g stroke="${INK}" stroke-width="1.2" opacity="0.85"><line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}"/><line x1="${x1}" y1="${y - 5}" x2="${x1}" y2="${y + 5}"/><line x1="${x2}" y1="${y - 5}" x2="${x2}" y2="${y + 5}"/></g>${t((x1 + x2) / 2, below ? y + 13 : y - 11, lab, { size: 13 })}`;
}
/** Loddrett mållinje med etikett til venstre (eller høyre). */
function vdim(x: number, y1: number, y2: number, lab: string, right = false): string {
  return `<g stroke="${INK}" stroke-width="1.2" opacity="0.85"><line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}"/><line x1="${x - 5}" y1="${y1}" x2="${x + 5}" y2="${y1}"/><line x1="${x - 5}" y1="${y2}" x2="${x + 5}" y2="${y2}"/></g>${t(right ? x + 8 : x - 8, (y1 + y2) / 2, lab, { size: 13, anchor: right ? "start" : "end" })}`;
}

/** 2.OP3 b): (a−b)² = a² − 2ab + b². To hele ab-striper trekkes fra; hjørnet b² er trukket fra to ganger. */
export function figSecondSquare(caption: string): string {
  const x = 120, y = 40, a = 160, b = 50;
  const svg = `
    ${rect(x, y, a, a, "fill:none")}
    ${rect(x, y, a - b, a - b, P2)}
    ${t(x + (a - b) / 2, y + (a - b) / 2, "(a − b)²", { size: 16 })}
    <rect x="${x + a - b + 3}" y="${y + 3}" width="${b - 6}" height="${a - 6}" style="${R}" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="5 3"/>
    <rect x="${x + 3}" y="${y + a - b + 3}" width="${a - 6}" height="${b - 6}" style="${W}" stroke="#f59e0b" stroke-width="1.6" stroke-dasharray="5 3"/>
    ${rect(x + a - b, y + a - b, b, b, A2)}
    ${t(x + a - b / 2, y + (a - b) / 2, "ab", { size: 14, style: "fill:#ef4444" })}
    ${t(x + (a - b) / 2, y + a - b / 2, "ab", { size: 14, style: "fill:#f59e0b" })}
    ${t(x + a - b / 2, y + a - b / 2, "b²", { size: 13 })}
    ${hdim(x, x + a, y - 22, "a")}
    ${hdim(x, x + a - b, y + a + 14, "a − b", true)}${hdim(x + a - b, x + a, y + a + 14, "b", true)}
    ${vdim(x - 14, y, y + a, "a")}
    ${t(x + a + 16, y + 40, "a · b (rød)", { size: 12, anchor: "start", style: "fill:#ef4444" })}
    ${t(x + a + 16, y + 62, "b · a (oransje)", { size: 12, anchor: "start", style: "fill:#f59e0b" })}
    ${t(x + a + 16, y + 92, "b² trekkes fra", { size: 12, anchor: "start", style: "fill:var(--accent)" })}
    ${t(x + a + 16, y + 110, "to ganger: + b²", { size: 12, anchor: "start", style: "fill:var(--accent)" })}`;
  return a11y(
    svg,
    "Andre kvadratsetning som arealfigur",
    "Et kvadrat med side a. Fra det trekkes en rød stripe på a ganger b langs høyre side og en oransje stripe på b ganger a langs bunnen. Stripene overlapper i hjørnet b i andre, som dermed er trukket fra to ganger og må legges til igjen. Igjen står kvadratet (a minus b) i andre.",
    caption,
    "0 0 420 250",
  );
}

/** 2.OP3 c): a² − b² = (a + b)(a − b). L-formen klippes og legges om til et rektangel. */
export function figDiffSquares(caption: string): string {
  const x = 20, y = 40, a = 110, b = 40, c = a - b;
  const rx = 210, ry = 62;
  const svg = `
    ${rect(x, y, a, c, P)}
    ${rect(x, y + c, c, b, A)}
    <rect x="${x + c}" y="${y + c}" width="${b}" height="${b}" fill="none" stroke="${INK}" stroke-width="1.4" stroke-dasharray="4 3" opacity="0.6"/>
    ${t(x + c + b / 2, y + c + b / 2, "− b²", { size: 12 })}
    ${t(x + a / 2, y + c / 2, "a(a − b)", { size: 13 })}
    ${t(x + c / 2, y + c + b / 2, "b(a − b)", { size: 12 })}
    ${hdim(x, x + a, y - 14, "a")}
    ${vdim(x + a + 12, y, y + c, "a − b", true)}
    ${t(x + a / 2, y + a + 22, "a² − b²", { size: 14 })}
    <path d="M${x + a + 60},${y + 60} L${rx - 12},${y + 60}" stroke="${INK}" stroke-width="1.6" fill="none"/>
    <path d="M${rx - 18},${y + 54} L${rx - 10},${y + 60} L${rx - 18},${y + 66}" stroke="${INK}" stroke-width="1.6" fill="none"/>
    ${rect(rx, ry, a, c, P)}
    ${rect(rx + a, ry, b, c, A)}
    ${t(rx + a / 2, ry + c / 2, "a(a − b)", { size: 13 })}
    ${t(rx + a + b / 2, ry + c / 2, "b(a−b)", { size: 10 })}
    ${hdim(rx, rx + a, ry + c + 12, "a", true)}${hdim(rx + a, rx + a + b, ry + c + 12, "b", true)}
    ${hdim(rx, rx + a + b, ry - 14, "a + b")}
    ${vdim(rx + a + b + 10, ry, ry + c, "a − b", true)}
    ${t(rx + (a + b) / 2, ry + c + 50, "(a + b)(a − b)", { size: 14 })}`;
  return a11y(
    svg,
    "Konjugatsetningen som arealfigur",
    "Til venstre et kvadrat med side a der hjørnekvadratet b i andre er fjernet. L-formen deles i et rektangel a ganger (a minus b) og et rektangel b ganger (a minus b). Til høyre er den minste biten flyttet inntil den store, og sammen danner de et rektangel med sider a pluss b og a minus b.",
    caption,
    "0 0 420 230",
  );
}

/** 2.29: kvadrat med side s og rektangel med sider s+2 og s−1. */
export function figSquareAndRect(opts: { sq: string; rw: string; rh: string; s: number; w: number; h: number; caption: string; desc: string }): string {
  const { s, w, h } = opts;
  const base = 200;
  const x1 = 40, x2 = x1 + s + 50;
  const svg = `
    ${rect(x1, base - s, s, s, P)}
    ${t(x1 + s / 2, base - s / 2, "kvadrat", { size: 12, weight: 600 })}
    ${hdim(x1, x1 + s, base + 14, opts.sq, true)}
    ${vdim(x1 - 10, base - s, base, opts.sq)}
    ${rect(x2, base - h, w, h, A)}
    ${t(x2 + w / 2, base - h / 2, "rektangel", { size: 12, weight: 600 })}
    ${hdim(x2, x2 + w, base + 14, opts.rw, true)}
    ${vdim(x2 + w + 10, base - h, base, opts.rh, true)}`;
  return a11y(svg, `Kvadrat med side ${opts.sq} og rektangel med sider ${opts.rw} og ${opts.rh}`, opts.desc, opts.caption, "0 0 420 245");
}

/** 2.19: ramme med ytre og indre mål. */
export function figFrameDims(caption: string): string {
  const x = 70, y = 40, W0 = 270, H0 = 180, w = 150, h = 120;
  const ix = x + (W0 - w) / 2, iy = y + (H0 - h) / 2;
  const svg = `
    <path d="M${x},${y}h${W0}v${H0}h-${W0}z M${ix},${iy}v${h}h${w}v-${h}z" fill-rule="evenodd" style="${P2}" stroke="${INK}" stroke-width="2"/>
    ${hdim(x, x + W0, y - 16, "x + 5")}
    ${vdim(x - 14, y, y + H0, "x + 2")}
    ${hdim(ix, ix + w, iy + 18, "x + 1", true)}
    ${vdim(ix + w - 18, iy, iy + h, "x")}
    ${t(x + W0 / 2, y + (iy - y) / 2, "ramme", { size: 12, weight: 600 })}
    ${t(ix + w / 2, iy + h / 2 + 18, "åpning", { size: 12, weight: 600, style: "fill:var(--text-muted)" })}`;
  return a11y(
    svg,
    "Rektangulær ramme med mål",
    "Et ytre rektangel med bredde x pluss 5 og høyde x pluss 2. Inne i det er en åpning med bredde x pluss 1 og høyde x. Rammen er det fargede området mellom dem.",
    caption,
    "0 0 420 245",
  );
}

/** OP9: rektangel i forholdet 3:1 (l = 12, b = ?). */
export function figRect31(caption: string): string {
  const x = 60, y = 40, w = 300, h = 100;
  const svg = `
    ${rect(x, y, w, h, P)}
    ${t(x + w / 2, y + h / 2, "A = 48", { size: 15 })}
    ${hdim(x, x + w, y - 14, "l = 12")}
    ${vdim(x + w + 12, y, y + h, "b = ?", true)}`;
  return a11y(
    svg,
    "Rektangel med lengde 12 og ukjent bredde",
    "Et rektangel med areal 48 og lengde 12. Bredden b er ukjent. Figuren er tegnet i målestokk.",
    caption,
    "0 0 420 165",
  );
}

/** 2.58: n rader med n+2 prikker; de to hjørneprikkene i øverste rad mangler. */
export function figDotPatternMissing(caption: string): string {
  const sp = 22;
  const fig = (ox: number, n: number, col: string) => {
    let out = "";
    for (let r = 0; r < n; r++)
      for (let c = 0; c < n + 2; c++) {
        const cx = ox + c * sp, cy = 40 + r * sp;
        const miss = r === 0 && (c === 0 || c === n + 1);
        out += miss
          ? `<circle cx="${cx}" cy="${cy}" r="6" fill="none" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="3 2"/><path d="M${cx - 3.5},${cy - 3.5}l7,7m0,-7l-7,7" stroke="#ef4444" stroke-width="1.6"/>`
          : `<circle cx="${cx}" cy="${cy}" r="5.5" style="fill:${col}"/>`;
      }
    return out;
  };
  const svg = `
    ${fig(60, 1, "var(--primary)")}
    ${t(60 + sp, 40 + 30, "Figur 1", { size: 13 })}
    ${fig(220, 2, "var(--accent)")}
    ${t(220 + 1.5 * sp, 40 + sp + 30, "Figur 2", { size: 13 })}
    <circle cx="140" cy="122" r="6" fill="none" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="3 2"/><path d="M136.5,118.5l7,7m0,-7l-7,7" stroke="#ef4444" stroke-width="1.6"/>
    ${t(154, 122, "= hjørneprikk som mangler", { size: 12, anchor: "start", weight: 600 })}`;
  return a11y(
    svg,
    "Prikkmønster for figur 1 og figur 2",
    "Figur 1 har 1 rad med plass til 3 prikker, figur 2 har 2 rader med plass til 4 prikker. I begge figurene mangler de to hjørneprikkene i øverste rad; de er vist som røde, stiplede ringer med kryss.",
    caption,
    "0 0 420 140",
  );
}

/** 2.16: sentrerte sekskanttall C₁–C₄, samme etikettstil som de andre figurene. */
export function figHexNumbers(caption: string): string {
  const sp = 11;
  const dirs = [0, 60, 120, 180, 240, 300].map((d) => [Math.cos((d * Math.PI) / 180), Math.sin((d * Math.PI) / 180)]);
  const hex = (cx: number, cy: number, n: number) => {
    let out = "";
    for (let k = 1; k < n; k++) {
      const corners = dirs.map(([dx, dy]) => [cx + dx * k * sp, cy + dy * k * sp]);
      out += `<polygon points="${corners.map((p) => p.map((v) => v.toFixed(1)).join(",")).join(" ")}" fill="none" stroke="var(--accent)" stroke-width="1.2" opacity="0.7"/>`;
      for (let i = 0; i < 6; i++) {
        const [x1, y1] = corners[i], [x2, y2] = corners[(i + 1) % 6];
        for (let j = 0; j < k; j++) out += `<circle cx="${(x1 + ((x2 - x1) * j) / k).toFixed(1)}" cy="${(y1 + ((y2 - y1) * j) / k).toFixed(1)}" r="3.2" style="fill:var(--accent)"/>`;
      }
    }
    return out + `<circle cx="${cx}" cy="${cy}" r="3.2" style="fill:var(--accent)"/>`;
  };
  const cy = 70;
  const xs = [30, 85, 170, 300];
  const svg = xs
    .map((x, i) => hex(x, cy, i + 1) + t(x, 145, `C<tspan baseline-shift="sub" font-size="10">${i + 1}</tspan>`, { size: 14 }))
    .join("");
  return a11y(
    svg,
    "De fire første sentrerte sekskanttallene",
    "Fire prikkfigurer. C1 er én prikk. C2 er en prikk med en sekskant rundt. C3 og C4 får én ny sekskant-ring for hver figur, slik at hver ring har 6 flere prikker enn den forrige. Prikkene skal telles i oppgaven.",
    caption,
    "0 0 380 160",
  );
}

/** 2.30: x² + 4x er et (x+2)²-kvadrat minus hjørnet 2² = 4. */
export function figCompleteSquare(caption: string): string {
  const x = 110, y = 40, X = 120, k = 40;
  const svg = `
    ${rect(x, y, X, X, P2)}
    ${t(x + X / 2, y + X / 2, "x²", { size: 16 })}
    ${rect(x + X, y, k, X, A)}
    ${t(x + X + k / 2, y + X / 2, "2x", { size: 13 })}
    ${rect(x, y + X, X, k, A)}
    ${t(x + X / 2, y + X + k / 2, "2x", { size: 13 })}
    <rect x="${x + X}" y="${y + X}" width="${k}" height="${k}" fill="none" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="4 3"/>
    ${t(x + X + k / 2, y + X + k / 2, "4", { size: 13, style: "fill:#ef4444" })}
    ${hdim(x, x + X, y - 14, "x")}${hdim(x + X, x + X + k, y - 14, "2")}
    ${vdim(x - 12, y, y + X, "x")}${vdim(x - 12, y + X, y + X + k, "2")}
    ${t(x + X + k + 16, y + 30, "x² + 2x + 2x = x² + 4x", { size: 12, anchor: "start", weight: 600 })}
    ${t(x + X + k + 16, y + 52, "mangler hjørnet 2² = 4", { size: 12, anchor: "start", weight: 600, style: "fill:#ef4444" })}
    ${t(x + X + k + 16, y + 82, "x² + 4x = (x + 2)² − 4", { size: 13, anchor: "start" })}`;
  return a11y(
    svg,
    "Fullstendig kvadrat: x i andre pluss 4x",
    "Et kvadrat x i andre med to striper på 2 ganger x, én langs høyre side og én langs bunnen. Sammen nesten et kvadrat med side x pluss 2; bare hjørnet 2 ganger 2, altså 4, mangler. Derfor er x i andre pluss 4x lik (x pluss 2) i andre minus 4.",
    caption,
    "0 0 420 225",
  );
}

/** 2.37: L-mønsteret (kvadrat med side n+1 minus ett hjørne) for n = 1, 2, 3. */
export function figLDots(caption: string): string {
  const sp = 20;
  const fig = (ox: number, n: number) => {
    let out = "";
    const m = n + 1;
    for (let r = 0; r < m; r++)
      for (let c = 0; c < m; c++) {
        const cx = ox + c * sp, cy = 30 + (4 - m) * sp + r * sp;
        out += r === 0 && c === m - 1
          ? `<circle cx="${cx}" cy="${cy}" r="5" fill="none" stroke="${INK}" stroke-width="1.2" stroke-dasharray="3 2" opacity="0.5"/>`
          : `<circle cx="${cx}" cy="${cy}" r="5" style="fill:var(--primary)"/>`;
      }
    return out + t(ox + (n * sp) / 2, 30 + 3 * sp + 16, `n = ${n}`, { size: 13 });
  };
  const svg = fig(50, 1) + fig(150, 2) + fig(270, 3);
  return a11y(
    svg,
    "L-mønsteret for n = 1, 2 og 3",
    "Tre prikkfigurer. Figur n er et kvadrat med n pluss 1 prikker på hver side der prikken i øvre høyre hjørne mangler (vist som stiplet ring). Prikkene skal telles i oppgaven.",
    caption,
    "0 0 380 120",
  );
}

export const KAP2_FIGURES: Record<string, string> = {
  "2.16": figHexNumbers("De fire første sentrerte sekskanttallene $C_1$, $C_2$, $C_3$ og $C_4$."),
  "2.19": figFrameDims("Rammens areal = ytre rektangel minus den indre åpningen."),
  "2.29": figSquareAndRect({
    sq: "s", rw: "s + 2", rh: "s − 1", s: 90, w: 120, h: 75,
    caption: "Kvadrat med side $s$ og rektangel med sider $s+2$ og $s-1$.",
    desc: "Til venstre et kvadrat med side s. Til høyre et rektangel som er 2 lenger og 1 lavere enn kvadratet: sidene er s pluss 2 og s minus 1.",
  }),
  "2.30": figCompleteSquare("Arealmodell: $x^2+4x$ er kvadratet $(x+2)^2$ minus hjørnet $2^2=4$."),
  "2.37": figLDots("L-mønsteret fra oppgave 2.57 for $n=1$, $2$ og $3$."),
  "2.58": figDotPatternMissing("Prikkmønster for figur 1 og figur 2. De to hjørneprikkene i øverste rad mangler."),
  "2.OP9": figRect31("Areal $A=l\\cdot b=48$. Finn $b$. Tegnet i forholdet $3:1$."),
};

/** Oppgaver der SVG-figuren erstatter et eldre bilde. */
export const FIGURE_REPLACES_IMAGE = new Set(["2.16"]);

/** 2.55: figuren som står inne i oppgaveteksten. */
export const FIG_2_55 = figSquareAndRect({
  sq: "s", rw: "s + 3", rh: "s", s: 80, w: 125, h: 80,
  caption: "Kvadrat med side $s$ og rektangel med sider $s$ og $s+3$.",
  desc: "Til venstre et kvadrat med side s. Ved siden av et rektangel med samme høyde s og bredde s pluss 3.",
});
