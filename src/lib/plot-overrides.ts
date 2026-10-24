import type { PlotSpec } from "./plot-fn";

/**
 * Faste grafvinduer og klipp per oppgave (kap 5, MatteBOTs figurbestilling).
 * Endrer bare visningen — aldri uttrykk, tall eller tekst i oppgaven.
 */
export type PlotOverride = {
  /** x-vindu [min, max] */
  x?: [number, number];
  /** y-vindu [min, max] */
  y?: [number, number];
  /** Praktisk modell: tegn bare x ≥ 0. */
  nonNegative?: boolean;
  /** Tegn selv om oppgaveteksten mangler utløserfrase. */
  force?: boolean;
  /** Ekstra serier når teksten ikke har f(x)=… (rhs i LaTeX-lik syntaks). */
  extra?: { name: string; rhs: string }[];
  /** Tegnforklaring (samme rekkefølge som seriene). */
  legend?: string[];
};

export const PLOT_OVERRIDES: Record<string, PlotOverride> = {
  // 1. Vinduer som viser alle skjæringspunkt
  "5.31": { x: [-3, 4], y: [-4, 6] },
  "5.32": { x: [-3, 4], y: [-3, 5] },
  "5.34": { x: [-4, 5], y: [-5, 7] },
  "5E.10": { x: [-3, 3], y: [-4, 6] },
  "5.OP7": { x: [-4, 4], y: [-8, 16] },
  // 2. Oppgaver som manglet figur
  "5.46": { force: true, x: [-1, 5], y: [-2, 5] },
  "5.51": { force: true, x: [-3, 2], y: [-3, 3] },
  "5.7": {
    force: true,
    x: [-2, 5],
    y: [-3, 8],
    extra: [
      { name: "m=1", rhs: "4-x" },
      { name: "m=2", rhs: "4-2x" },
      { name: "2x+y=6", rhs: "6-2x" },
    ],
    legend: ["mx + y = 4 med m = 1", "mx + y = 4 med m = 2", "2x + y = 6"],
  },
};

export function applyPlotOverride(spec: PlotSpec, o: PlotOverride): PlotSpec {
  const out: PlotSpec = { ...spec, series: spec.series.map((s) => ({ ...s })) };
  if (o.legend) out.legend = o.legend;
  if (o.x) [out.xMin, out.xMax] = o.x;
  if (o.y) [out.yMin, out.yMax] = o.y;
  if (o.nonNegative) {
    // Litt luft til venstre så y-aksen og x = 0 synes.
    if (!o.x) out.xMin = Math.min(-(out.xMax - Math.max(0, out.xMin)) * 0.04, -0.3);
    for (const s of out.series) {
      const lo = Math.max(0, s.clip?.min ?? 0);
      const hi = s.clip && Number.isFinite(s.clip.max) ? s.clip.max : out.xMax;
      s.clip = { min: lo, max: hi, closedMin: true, closedMax: s.clip?.closedMax ?? false };
    }
    out.features = out.features.filter((f) => f.x >= -1e-9);
  }
  out.features = out.features.filter(
    (f) => f.x >= out.xMin && f.x <= out.xMax && f.y >= out.yMin && f.y <= out.yMax,
  );
  out.points = out.points.filter((p) => p.x >= out.xMin && p.x <= out.xMax);
  return out;
}
