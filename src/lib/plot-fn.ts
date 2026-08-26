export type PlotPoint = { x: number; y: number };

export type PlotSeries = {
  name: string;
  latex: string;
  variable: string;
  evalAt: (x: number) => number | null;
  clip?: { min: number; max: number; closedMin: boolean; closedMax: boolean };
};

export type PlotFeature = {
  kind: "vertex" | "intercept" | "endpoint" | "point";
  x: number;
  y: number;
  label: string;
};

export type PlotAsymptote = {
  kind: "v" | "h" | "oblique";
  x?: number;
  y?: number;
  m?: number;
  b?: number;
  label: string;
};

export type PlotSpec = {
  series: PlotSeries[];
  points: PlotPoint[];
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  features: PlotFeature[];
  asymptotes: PlotAsymptote[];
};

const MATH_IDS = new Set(["sin", "cos", "tan", "sqrt", "abs", "log", "exp", "min", "max", "pow", "PI", "E"]);

function latexToJs(input: string): string {
  let s = input.trim();
  s = s.replace(/\\left|\\right/g, "");
  s = s.replace(/\\mathrm\{([^{}]*)\}/g, "$1");
  s = s.replace(/\\operatorname\{([^{}]*)\}/g, "$1");
  s = s.replace(/\\text\{[^{}]*\}/g, "");
  s = s.replace(/\\,|\\;|\\!|\\:|~/g, " ");
  s = s.replace(/\\cdot|\\times/g, "*");
  s = s.replace(/\\pi\b/g, "PI");
  s = s.replace(/\\dfrac|\\tfrac/g, "\\frac");
  for (let i = 0; i < 6; i++) {
    s = s.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, "(($1)/($2))");
    s = s.replace(/\\sqrt\{([^{}]+)\}/g, "sqrt($1)");
  }
  s = s.replace(/\\sqrt\s*([0-9.]+)/g, "sqrt($1)");
  s = s.replace(/\\ln\b/g, "log");
  s = s.replace(/\\log\b/g, "log");
  s = s.replace(/\\sin\b/g, "sin");
  s = s.replace(/\\cos\b/g, "cos");
  s = s.replace(/\\tan\b/g, "tan");
  s = s.replace(/\\exp\b/g, "exp");
  s = s.replace(/\\abs\b/g, "abs");
  s = s.replace(/\^{([^{}]+)}/g, "**($1)");
  s = s.replace(/\^(\([^)]+\)|[0-9.]+|[a-zA-Z])/g, "**$1");
  // JS forbids `-x**2` (syntax error). Math `-x^2` means `-(x^2)`.
  s = s.replace(
    /(^|[+\-*/(,])-([A-Za-z_][A-Za-z0-9_]*|\d+(?:\.\d+)?)\*\*([A-Za-z0-9.]+|\([^)]+\))/g,
    "$1-($2**$3)",
  );
  s = s.replace(/\{/g, "(").replace(/\}/g, ")");
  s = s.replace(/(\d(?:\.\d+)?)(?=PI|E|[A-Za-z(])/g, "$1*");
  s = s.replace(/(PI|E)(?=PI|E|[A-Za-z(])/g, "$1*");
  s = s.replace(/\)(?=PI|E|[A-Za-z(])/g, ")*");
  s = s.replace(/([A-Za-z_][A-Za-z0-9_]*)\s*\(/g, (_full, id: string) => {
    if (MATH_IDS.has(id) || MATH_IDS.has(id.toLowerCase())) return `${id}(`;
    if (id.length === 1) return `${id}*(`;
    return `${id}(`;
  });
  s = s.replace(/\s+/g, "");
  return s;
}

function compile(rhs: string, variable: string): PlotSeries["evalAt"] | null {
  let js = latexToJs(rhs);
  if (variable !== "x") js = js.replace(new RegExp(`\\b${variable}\\b`, "g"), "x");
  const ids = js.match(/[A-Za-z_]+/g) || [];
  for (const id of ids) {
    if (id === "x") continue;
    if (MATH_IDS.has(id)) continue;
    return null;
  }
  const stripped = js.replace(/sin|cos|tan|sqrt|abs|log|exp|min|max|pow/g, "");
  if (!/^[-xPIE0-9+*/%.,()]+$/i.test(stripped)) return null;
  try {
    const fn = new Function(
      "x",
      `"use strict";
      const PI = Math.PI, E = Math.E;
      const sin = Math.sin, cos = Math.cos, tan = Math.tan;
      const sqrt = Math.sqrt, abs = Math.abs, log = Math.log, exp = Math.exp;
      const min = Math.min, max = Math.max, pow = Math.pow;
      const y = (${js});
      return (typeof y === "number" && Number.isFinite(y)) ? y : null;`,
    ) as (x: number) => number | null;
    let ok = 0;
    for (const t of [-4, -2, -1, -0.5, 0, 0.5, 1, 2, 4, 8, 12]) {
      try {
        if (fn(t) != null) ok += 1;
      } catch {
        /* skip */
      }
    }
    if (ok === 0) return null;
    return (x) => {
      try {
        return fn(x);
      } catch {
        return null;
      }
    };
  } catch {
    return null;
  }
}

function parseNum(raw: string): number | null {
  const t = raw.replace(/\\,/g, "").replace(",", ".").replace(/\$/g, "").trim();
  if (/\\rightarrow|infty|uendelig/i.test(t)) return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

type Clip = { min: number; max: number; closedMin: boolean; closedMax: boolean };

function parseDomain(html: string, name: string, variable: string): Clip | null {
  const letter = name.replace(/\(.*$/, "").replace(/[^A-Za-z]/g, "");
  const patterns = [
    new RegExp(
      `D[_\\\\{ ]*${letter}[_\\\\} ]*\\s*=\\s*([\\[\\]⟨〈])\\s*([^,\\]$]+)\\s*,\\s*([^\\]\\[$]+)\\s*([\\[\\]⟩〉])`,
    ),
    new RegExp(
      `D_${letter}\\s*=\\s*([\\[\\]⟨〈])\\s*([^,\\]$]+)\\s*,\\s*([^\\]\\[$]+)\\s*([\\[\\]⟩〉])`,
    ),
  ];
  for (const re of patterns) {
    const m = re.exec(html);
    if (!m) continue;
    const a = parseNum(m[2]!);
    const b = parseNum(m[3]!);
    if (a == null && b == null) continue;
    const min = a ?? (b as number) - 8;
    const max = b ?? (a as number) + 8;
    if (min >= max) continue;
    return {
      min,
      max,
      closedMin: m[1] === "[",
      closedMax: m[4] === "]",
    };
  }
  const interval = html.match(
    new RegExp(
      `fra\\s+\\$?${variable}\\s*=\\s*\\$?\\s*([\\d.,]+).*?til\\s+\\$?${variable}\\s*=\\s*\\$?\\s*([\\d.,]+)`,
      "i",
    ),
  );
  if (interval) {
    const a = parseNum(interval[1]!);
    const b = parseNum(interval[2]!);
    if (a != null && b != null && a < b) return { min: a, max: b, closedMin: true, closedMax: true };
  }
  return null;
}

function polesFromLatex(rhs: string, variable: string): number[] {
  const poles: number[] = [];
  const re = /\\(?:d|t)?frac\{[^{}]+\}\{([^{}]+)\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(rhs))) {
    const den = m[1]!.replace(/\s+/g, "");
    const linear = den.match(new RegExp(`^([+-]?\\d*(?:\\.\\d+)?)?${variable}([+-]\\d+(?:\\.\\d+)?)?$`));
    if (linear) {
      const a = linear[1] === "" || linear[1] === "+" || linear[1] == null ? 1 : linear[1] === "-" ? -1 : Number(linear[1]);
      const b = linear[2] == null ? 0 : Number(linear[2]);
      if (a) poles.push(-b / a);
    } else if (den === variable) {
      poles.push(0);
    }
  }
  return poles.filter((x) => Number.isFinite(x));
}

function fitQuadratic(evalAt: PlotSeries["evalAt"]) {
  const pts = [0, 1, 2, 3].map((x) => evalAt(x));
  if (pts.some((y) => y == null)) return null;
  const [y0, y1, y2, y3] = pts as number[];
  const a = (y2 - 2 * y1 + y0) / 2;
  const b = y1 - a - y0;
  const c = y0;
  if (Math.abs(a) < 1e-8) return null;
  if (Math.abs(9 * a + 3 * b + c - y3) > 1e-4) return null;
  const vx = -b / (2 * a);
  const vy = evalAt(vx);
  if (vy == null) return null;
  return { a, b, c, vx, vy };
}

function findZeros(evalAt: PlotSeries["evalAt"], lo: number, hi: number): number[] {
  const zeros: number[] = [];
  const steps = 240;
  const dx = (hi - lo) / steps;
  let prevX = lo;
  let prevY = evalAt(lo);
  for (let i = 1; i <= steps; i++) {
    const x = lo + i * dx;
    const y = evalAt(x);
    if (prevY != null && Math.abs(prevY) < 1e-8) {
      if (!zeros.some((z) => Math.abs(z - prevX) < 0.08)) zeros.push(prevX);
    } else if (prevY != null && y != null && prevY * y < 0 && Math.abs(prevY - y) < 80) {
      let a = prevX;
      let b = x;
      let fa = prevY;
      for (let k = 0; k < 18; k++) {
        const mid = (a + b) / 2;
        const fm = evalAt(mid);
        if (fm == null) break;
        if (fa * fm <= 0) b = mid;
        else {
          a = mid;
          fa = fm;
        }
      }
      const z = (a + b) / 2;
      if (!zeros.some((v) => Math.abs(v - z) < 0.08)) zeros.push(z);
    }
    prevX = x;
    prevY = y;
  }
  return zeros;
}

function isLinear(evalAt: PlotSeries["evalAt"]) {
  return linearCoeffs(evalAt) != null;
}

function linearCoeffs(evalAt: PlotSeries["evalAt"]): { a: number; b: number } | null {
  const y0 = evalAt(0);
  const y1 = evalAt(1);
  const y2 = evalAt(2);
  if (y0 == null || y1 == null || y2 == null) return null;
  if (Math.abs(y2 - 2 * y1 + y0) > 1e-6) return null;
  return { a: y1 - y0, b: y0 };
}

function impliedSqrtClip(evalAt: PlotSeries["evalAt"]): Clip | null {
  const neg = [-2, -1, -0.25].every((x) => evalAt(x) == null);
  const pos = [0.25, 1, 2].some((x) => evalAt(x) != null);
  const at0 = evalAt(0);
  if (neg && pos) {
    return { min: at0 != null ? 0 : 0, max: Number.POSITIVE_INFINITY, closedMin: at0 != null, closedMax: false };
  }
  return null;
}

function mentionedValues(html: string, variable: string): number[] {
  const out: number[] = [];
  const re = new RegExp(`\\$\\s*${variable}\\s*=\\s*(-?\\d+(?:[.,]\\d+)?)\\s*\\$`, "g");
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const n = Number(m[1]!.replace(",", "."));
    if (Number.isFinite(n) && Math.abs(n) < 5000) out.push(n);
  }
  return out;
}

function niceCoeff(n: number) {
  const i = Math.round(n);
  if (Math.abs(n - i) < 0.06) return i;
  return Math.round(n * 100) / 100;
}

function nicePad(span: number) {
  return Math.max(0.6, span * 0.18);
}

function expandAround(xs: number[], minSpan: number) {
  if (!xs.length) return { min: -5, max: 5 };
  let min = Math.min(...xs);
  let max = Math.max(...xs);
  const pad = nicePad(Math.max(max - min, minSpan * 0.5));
  min -= pad;
  max += pad;
  if (max - min < minSpan) {
    const mid = (min + max) / 2;
    min = mid - minSpan / 2;
    max = mid + minSpan / 2;
  }
  return { min, max };
}

function fmtTick(n: number) {
  if (!Number.isFinite(n)) return "—";
  const r = Math.round(n * 100) / 100;
  return String(r);
}

function seriesIntersections(series: PlotSeries[]): PlotPoint[] {
  const out: PlotPoint[] = [];
  const push = (xi: number, yi: number) => {
    if (!Number.isFinite(xi) || !Number.isFinite(yi)) return;
    if (Math.abs(xi) > 500 || Math.abs(yi) > 20000) return;
    if (!out.some((p) => Math.abs(p.x - xi) < 0.08 && Math.abs(p.y - yi) < 0.08)) {
      out.push({ x: xi, y: yi });
    }
  };

  for (let i = 0; i < series.length; i++) {
    for (let j = i + 1; j < series.length; j++) {
      const a = series[i]!;
      const b = series[j]!;
      const A = linearCoeffs(a.evalAt);
      const B = linearCoeffs(b.evalAt);
      if (A && B) {
        if (Math.abs(A.a - B.a) < 1e-9) continue;
        const xi = (B.b - A.b) / (A.a - B.a);
        const yi = A.a * xi + A.b;
        push(xi, yi);
        continue;
      }
      const scan = 48;
      let prevX = -scan;
      let prevYa = a.evalAt(prevX);
      let prevYb = b.evalAt(prevX);
      for (let k = 1; k <= 360; k++) {
        const x = -scan + (2 * scan * k) / 360;
        const ya = a.evalAt(x);
        const yb = b.evalAt(x);
        if (ya == null || yb == null || prevYa == null || prevYb == null) {
          prevX = x;
          prevYa = ya;
          prevYb = yb;
          continue;
        }
        const d0 = prevYa - prevYb;
        const d1 = ya - yb;
        if (d0 === 0 || d0 * d1 < 0) {
          let lo = prevX;
          let hi = x;
          let flo = d0;
          for (let t = 0; t < 18; t++) {
            const mid = (lo + hi) / 2;
            const ym = a.evalAt(mid);
            const zn = b.evalAt(mid);
            if (ym == null || zn == null) break;
            const dm = ym - zn;
            if (flo * dm <= 0) hi = mid;
            else {
              lo = mid;
              flo = dm;
            }
          }
          const xi = (lo + hi) / 2;
          const yi = a.evalAt(xi);
          if (yi != null) push(xi, yi);
        }
        prevX = x;
        prevYa = ya;
        prevYb = yb;
      }
    }
  }
  return out;
}

function buildWindow(
  series: PlotSeries[],
  points: PlotPoint[],
  html: string,
): Pick<PlotSpec, "xMin" | "xMax" | "yMin" | "yMax" | "features" | "asymptotes"> {
  const features: PlotFeature[] = [];
  const asymptotes: PlotAsymptote[] = [];
  const xs: number[] = points.map((p) => p.x);
  const ys: number[] = points.map((p) => p.y);
  let clip: Clip | null = null;

  for (const s of series) {
    const named = parseDomain(html, s.name, s.variable);
    const sqrtClip = impliedSqrtClip(s.evalAt);
    const mentioned = mentionedValues(html, s.variable);
    if (named) {
      s.clip = named;
      clip = named;
      xs.push(named.min, named.max);
    } else if (sqrtClip) {
      const hi = mentioned.length ? Math.max(10, ...mentioned.map((v) => v + 1)) : 10;
      s.clip = { min: 0, max: hi, closedMin: sqrtClip.closedMin, closedMax: false };
      clip = s.clip;
      xs.push(0, hi);
    }
    for (const v of mentioned) xs.push(v);

    const poles = polesFromLatex(s.latex, s.variable);
    for (const p of poles) {
      if (!asymptotes.some((a) => a.kind === "v" && Math.abs((a.x ?? 0) - p) < 1e-6)) {
        asymptotes.push({ kind: "v", x: p, label: `x = ${fmtTick(p)}` });
      }
      xs.push(p - 1.8, p + 1.8);
    }
    const linear = isLinear(s.evalAt);
    const quad = linear ? null : fitQuadratic(s.evalAt);
    if (quad) {
      const inside = !s.clip || (quad.vx >= s.clip.min - 1e-6 && quad.vx <= s.clip.max + 1e-6);
      if (inside) {
        xs.push(quad.vx);
        ys.push(quad.vy);
        features.push({
          kind: "vertex",
          x: quad.vx,
          y: quad.vy,
          label: quad.a > 0 ? "bunnpunkt" : "toppunkt",
        });
      }
    }
    const y0 = s.evalAt(0);
    if (y0 != null && Math.abs(y0) < 20000 && (!s.clip || (0 >= s.clip.min - 1e-9 && 0 <= s.clip.max + 1e-9))) {
      xs.push(0);
      ys.push(y0);
      features.push({ kind: "intercept", x: 0, y: y0, label: `(0, ${fmtTick(y0)})` });
    }
    const scanLo = s.clip ? s.clip.min - 0.2 : quad ? quad.vx - 8 : -10;
    const scanHi = s.clip && Number.isFinite(s.clip.max) ? s.clip.max + 0.2 : quad ? quad.vx + 8 : 10;
    for (const z of findZeros(s.evalAt, scanLo, scanHi)) {
      if (s.clip && (z < s.clip.min - 1e-6 || z > s.clip.max + 1e-6)) continue;
      xs.push(z);
      ys.push(0);
      features.push({ kind: "intercept", x: z, y: 0, label: `(${fmtTick(z)}, 0)` });
    }
    if (s.clip && Number.isFinite(s.clip.max) && s.clip.max - s.clip.min < 50) {
      const ends: number[] = [];
      if (s.clip.closedMin) ends.push(s.clip.min);
      if (s.clip.closedMax) ends.push(s.clip.max);
      for (const x of ends) {
        const y = s.evalAt(x);
        if (y == null) continue;
        ys.push(y);
        if (!features.some((f) => Math.abs(f.x - x) < 1e-6 && Math.abs(f.y - y) < 1e-6)) {
          features.push({
            kind: "endpoint",
            x,
            y,
            label: `(${fmtTick(x)}, ${fmtTick(y)})`,
          });
        }
      }
    }
    for (const v of mentioned) {
      const y = s.evalAt(v);
      if (y == null) continue;
      ys.push(y);
      if (!features.some((f) => Math.abs(f.x - v) < 0.05)) {
        features.push({ kind: "point", x: v, y, label: `(${fmtTick(v)}, ${fmtTick(y)})` });
      }
    }

    if (!linear && !quad && poles.length) {
      const yA = s.evalAt(400);
      const yB = s.evalAt(700);
      if (yA != null && yB != null && Math.abs(yA - yB) < 0.2) {
        const ha = niceCoeff((yA + yB) / 2);
        asymptotes.push({ kind: "h", y: ha, label: `y = ${fmtTick(ha)}` });
        ys.push(ha);
      } else if (yA != null && yB != null) {
        const mRaw = (yB - yA) / 300;
        const bRaw = yA - mRaw * 400;
        const m = niceCoeff(mRaw);
        const b = niceCoeff(bRaw);
        const yCheck = s.evalAt(120);
        if (yCheck != null && Math.abs(yCheck - (mRaw * 120 + bRaw)) < 0.8 && Math.abs(m) > 0.08 && Math.abs(m) < 12) {
          const label = b === 0 ? `y = ${fmtTick(m)}x` : `y = ${fmtTick(m)}x${b >= 0 ? "+" : ""}${fmtTick(b)}`;
          asymptotes.push({ kind: "oblique", m, b, label });
        }
      }
    }
  }

  for (const p of points) {
    if (!features.some((f) => Math.abs(f.x - p.x) < 0.05 && Math.abs(f.y - p.y) < 0.05)) {
      features.push({ kind: "point", x: p.x, y: p.y, label: `(${fmtTick(p.x)}, ${fmtTick(p.y)})` });
    }
  }

  const crosses = series.length >= 2 ? seriesIntersections(series) : [];
  for (const p of crosses) {
    xs.push(p.x);
    ys.push(p.y);
  }
  const q1Cross =
    crosses.length > 0 && crosses.every((p) => p.x >= -0.4 && p.y >= -4);
  const modelHint =
    /\b(kr|kroner|økter|økt|turer|GB|abonnement|inntekt|kostnad|solgte|poeng|månedskort|sesongkort|drop-in|enheter)\b/i.test(
      html.replace(/<[^>]+>/g, " "),
    );
  const modelingScale =
    modelHint &&
    (crosses.some((p) => Math.abs(p.y) > 40 || Math.abs(p.x) > 8) ||
      (points.length >= 2 &&
        points.every((p) => p.x >= -0.2 && p.y >= -0.2) &&
        points.some((p) => p.y > 30)));

  if (crosses.length && modelingScale && q1Cross) {
    const cx = crosses.map((p) => p.x);
    const cy = crosses.map((p) => p.y);
    const xHi = Math.max(...cx, 4) * 1.22 + 3;
    const yHi = Math.max(...cy, 8) * 1.12 + 12;
    xs.length = 0;
    ys.length = 0;
    xs.push(0, ...cx, xHi);
    ys.push(0, ...cy, yHi);
    for (const f of features) {
      if (f.x >= -0.6 && f.x <= xHi + 0.4 && f.y >= -4 && f.y <= yHi * 1.05) {
        xs.push(f.x);
        ys.push(f.y);
      }
    }
  } else if (modelingScale && !crosses.length && points.length >= 2) {
    const px = points.map((p) => p.x);
    const py = points.map((p) => p.y);
    xs.length = 0;
    ys.length = 0;
    xs.push(0, ...px, Math.max(...px) * 1.3 + 2);
    ys.push(0, ...py, Math.max(...py) * 1.2 + 8);
  } else if (crosses.length) {
    const cx = crosses.map((p) => p.x);
    const cy = crosses.map((p) => p.y);
    const xLo = Math.min(...cx) - 3.2;
    const xHi = Math.max(...cx) + 3.2;
    xs.length = 0;
    xs.push(...cx, xLo, xHi);
    ys.length = 0;
    ys.push(...cy);
    for (let i = features.length - 1; i >= 0; i--) {
      const f = features[i]!;
      if (f.x < xLo - 0.4 || f.x > xHi + 0.4) {
        if (f.kind === "intercept") features.splice(i, 1);
        continue;
      }
      xs.push(f.x);
      ys.push(f.y);
    }
  }

  let xMin: number;
  let xMax: number;
  if (clip && Number.isFinite(clip.min) && Number.isFinite(clip.max) && clip.max - clip.min < 40) {
    const span = clip.max - clip.min;
    const pad = Math.max(0.6, span * 0.22);
    xMin = clip.min - pad;
    xMax = clip.max + pad;
    if (clip.min >= 0) xMin = Math.max(xMin, -0.45);
  } else {
    const box = expandAround(xs.length ? xs : [-3, 3], 6);
    xMin = box.min;
    xMax = box.max;
    if (xMax - xMin > 24 && !clip && !modelingScale) {
      const interesting = xs.filter((x) => Math.abs(x) < 18);
      const box2 = expandAround(interesting.length ? interesting : [xMin, xMax], 6);
      if (box2.max - box2.min <= 22) {
        xMin = box2.min;
        xMax = box2.max;
      }
    }
  }

  const sampleYs: number[] = [...ys];
  for (const s of series) {
    const lo = s.clip ? s.clip.min : xMin;
    const hi = s.clip ? s.clip.max : xMax;
    const poles = new Set(
      asymptotes.filter((a) => a.kind === "v" && a.x != null).map((a) => a.x as number),
    );
    for (let i = 0; i <= 80; i++) {
      const x = lo + ((hi - lo) * i) / 80;
      if ([...poles].some((p) => Math.abs(x - p) < (hi - lo) * 0.03)) continue;
      const y = s.evalAt(x);
      if (y != null && Math.abs(y) < 1e4) sampleYs.push(y);
    }
  }

  const featureYs = features.map((f) => f.y).filter((y) => Number.isFinite(y));
  const hasPoles = asymptotes.some((a) => a.kind === "v");
  const hasQuad = features.some((f) => f.kind === "vertex");
  const core = featureYs.length ? featureYs : sampleYs;
  let yMin = core.length ? Math.min(...core) : -4;
  let yMax = core.length ? Math.max(...core) : 4;
  if (modelingScale && ys.length) {
    yMin = Math.min(yMin, ...ys, 0);
    yMax = Math.max(yMax, ...ys);
  }
  if (!clip && (yMin > 0 || yMax < 0) && Math.abs(yMin) < 20 && Math.abs(yMax) < 20) {
    if (yMin > 0) yMin = 0;
    if (yMax < 0) yMax = 0;
  }
  if (clip && yMin > 0) yMin = 0;

  if (sampleYs.length && !hasQuad && crosses.length === 0 && !modelingScale) {
    const sorted = [...sampleYs].sort((a, b) => a - b);
    const loS = sorted[Math.floor(sorted.length * 0.06)]!;
    const hiS = sorted[Math.floor(sorted.length * 0.94)]!;
    if (clip) {
      yMin = Math.min(yMin, loS);
      yMax = Math.max(yMax, hiS);
    } else if (!hasPoles) {
      if (loS < yMin && yMin - loS < Math.max(12, (yMax - yMin) * 2)) yMin = loS;
      if (hiS > yMax && hiS - yMax < Math.max(12, (yMax - yMin) * 2)) yMax = hiS;
    }
  }

  if (hasPoles) {
    const ha = asymptotes.find((a) => a.kind === "h")?.y ?? 0;
    yMin = Math.min(yMin, ha - 8, -6);
    yMax = Math.max(yMax, ha + 8, 6);
  }

  const yPad = nicePad(Math.max(yMax - yMin, 3));
  const firstQuad = Boolean(clip && featureYs.length && Math.min(...featureYs) > 1);
  yMin -= firstQuad ? Math.min(3, yPad * 0.25) : yPad;
  yMax += yPad;
  if (yMax - yMin < 5) {
    const mid = (yMin + yMax) / 2;
    yMin = mid - 2.6;
    yMax = mid + 2.6;
  }
  if (firstQuad) yMin = Math.max(yMin, -2);
  if (modelingScale) {
    xMin = Math.max(xMin, -Math.max(1.5, xMax * 0.06));
    yMin = Math.max(yMin, -Math.max(8, yMax * 0.05));
  }

  return { xMin, xMax, yMin, yMax, features, asymptotes };
}

const FIGURE_RE =
  /figuren viser|grafen viser|grafene viser|gitt grafen|vises under|er tegnet under|er tegnet i samme|er tegnet sammen|kontrollgraf|ruteark|løses grafisk|bruk figuren|cas\/graftegner viser|stiplede niv|se grafene/i;

/** Only auto-draw when the oppgave actually gir en figur, ikke når f(x)= bare står i teksten. */
export function wantsFigure(html: string): boolean {
  if (!html) return false;
  return FIGURE_RE.test(html.replace(/<[^>]+>/g, " "));
}

const FN_DEF = /\$\s*([A-Za-z][A-Za-z0-9]*)\s*\(\s*([a-z])\s*\)\s*=\s*([^$]+?)\$/g;
const POINT_RE = /\(\s*(-?\d+(?:[.,]\d+)?)\s*,\s*(-?\d+(?:[.,]\d+)?)\s*\)/g;

function extractGivenPoints(html: string): PlotPoint[] {
  const masked = html
    .replace(/\$/g, "")
    .replace(/ligger punktet\s*\([^)]+\)/gi, " ")
    .replace(/punktet\s*\([^)]+\)\s+ligger/gi, " ")
    .replace(/testen?\s+om punktet\s*\([^)]+\)/gi, " ");
  const points: PlotPoint[] = [];
  const pr = new RegExp(POINT_RE.source, "g");
  let m: RegExpExecArray | null;
  while ((m = pr.exec(masked))) {
    const x = Number(String(m[1]).replace(",", "."));
    const y = Number(String(m[2]).replace(",", "."));
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    if (Math.abs(x) > 500 || Math.abs(y) > 20000) continue;
    if (points.some((p) => p.x === x && p.y === y)) continue;
    points.push({ x, y });
  }
  return points;
}

export function extractPlots(html: string): PlotSpec | null {
  if (!html || !wantsFigure(html)) return null;
  const series: PlotSeries[] = [];
  const seen = new Set<string>();

  const hiddenRe = /<!--\s*plot:\s*([A-Za-z][A-Za-z0-9]*)\s*\(\s*([a-z])\s*\)\s*=\s*([^>]+?)\s*-->/g;
  const hidden: { name: string; variable: string; rhs: string }[] = [];
  let hm: RegExpExecArray | null;
  while ((hm = hiddenRe.exec(html))) {
    hidden.push({ name: hm[1]!, variable: hm[2]!, rhs: hm[3]!.trim() });
  }

  const defs =
    hidden.length > 0
      ? hidden
      : [...html.matchAll(new RegExp(FN_DEF.source, "g"))].map((m) => ({
          name: m[1]!,
          variable: m[2]!,
          rhs: m[3]!.trim(),
        }));

  for (const def of defs) {
    const { name, variable, rhs } = def;
    if (seen.has(name)) continue;
    if (/\b[a-z]\s*\(/i.test(rhs.replace(/\\(?:sin|cos|tan|sqrt|ln|log|exp|frac|dfrac|tfrac|cdot|pi|left|right)\b/g, ""))) {
      continue;
    }
    const evalAt = compile(rhs, variable);
    if (!evalAt) continue;
    seen.add(name);
    series.push({ name: `${name}(${variable})`, latex: rhs, variable, evalAt });
  }

  const points = extractGivenPoints(html);

  if (series.length === 0 && points.length >= 2 && points.length % 2 === 0) {
    for (let i = 0; i < points.length; i += 2) {
      const a = points[i]!;
      const b = points[i + 1]!;
      if (a.x === b.x) continue;
      const slope = (b.y - a.y) / (b.x - a.x);
      const c = a.y - slope * a.x;
      series.push({
        name: points.length === 2 ? "linje" : `linje ${i / 2 + 1}`,
        latex: "",
        variable: "x",
        evalAt: (x) => slope * x + c,
      });
    }
  }

  if (series.length === 0 && points.length < 2) return null;

  const win = buildWindow(series, points, html);
  return { series, points, ...win };
}

export function samplePlot(spec: PlotSpec, steps = 280) {
  return spec.series.map((s) => {
    const lo = s.clip ? s.clip.min : spec.xMin;
    const hi = s.clip ? s.clip.max : spec.xMax;
    const poles = spec.asymptotes.filter((a) => a.kind === "v" && a.x != null).map((a) => a.x as number);
    const cuts = [lo, hi, ...poles.filter((p) => p > lo && p < hi)].sort((a, b) => a - b);
    const segs: { x: number; y: number }[][] = [];
    for (let c = 0; c < cuts.length - 1; c++) {
      let a = cuts[c]!;
      let b = cuts[c + 1]!;
      const span = spec.xMax - spec.xMin || 1;
      if (poles.some((p) => Math.abs(p - a) < 1e-9)) a += span * 0.004;
      if (poles.some((p) => Math.abs(p - b) < 1e-9)) b -= span * 0.004;
      if (b <= a) continue;
      const n = Math.max(24, Math.round((steps * (b - a)) / Math.max(hi - lo, 1e-6)));
      const pts: { x: number; y: number }[] = [];
      let prev: number | null = null;
      for (let i = 0; i <= n; i++) {
        const x = a + ((b - a) * i) / n;
        if (s.clip && (x < s.clip.min - 1e-9 || x > s.clip.max + 1e-9)) continue;
        const y = s.evalAt(x);
        if (y == null || Math.abs(y) > 1e5) {
          if (pts.length > 1) segs.push(pts.splice(0, pts.length));
          else pts.length = 0;
          prev = null;
          continue;
        }
        if (prev != null && Math.abs(y - prev) > (spec.yMax - spec.yMin) * 0.9) {
          if (pts.length > 1) segs.push(pts.splice(0, pts.length));
          else pts.length = 0;
        }
        pts.push({ x, y });
        prev = y;
      }
      if (pts.length > 1) segs.push(pts);
    }
    return segs;
  });
}
