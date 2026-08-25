import { useId, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Maximize2, X } from "lucide-react";
import { samplePlot, type PlotSpec } from "@/lib/plot-fn";

const COLORS = ["var(--primary-light)", "var(--accent)", "#38bdf8", "var(--hint-color)"];

function niceStep(span: number, target = 7) {
  const raw = Math.abs(span) / Math.max(target, 1);
  if (!Number.isFinite(raw) || raw === 0) return 1;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const r = raw / mag;
  const nice = r <= 1.2 ? 1 : r <= 2.5 ? 2 : r <= 5.5 ? 5 : 10;
  return nice * mag;
}

function ticks(min: number, max: number, step: number) {
  const out: number[] = [];
  const start = Math.ceil((min + step * 0.15) / step) * step;
  for (let v = start; v < max - step * 0.12; v = Math.round((v + step) * 1e8) / 1e8) {
    if (Math.abs(v) < step * 1e-6) continue;
    out.push(v);
  }
  return out;
}

function fmt(n: number) {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) >= 1000) return n.toExponential(1);
  const r = Math.round(n * 100) / 100;
  return String(r);
}

function GraphSvg({ spec, large }: { spec: PlotSpec; large?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const W = large ? 760 : 360;
  const H = large ? 500 : 250;
  const padL = large ? 52 : 40;
  const padR = large ? 28 : 22;
  const padT = large ? 28 : 22;
  const padB = large ? 38 : 30;
  const { xMin, xMax, yMin, yMax } = spec;
  const sampled = useMemo(() => samplePlot(spec, large ? 360 : 240), [spec, large]);
  const xScale = (x: number) => padL + ((x - xMin) / (xMax - xMin || 1)) * (W - padL - padR);
  const yScale = (y: number) => H - padB - ((y - yMin) / (yMax - yMin || 1)) * (H - padT - padB);
  const ox = xScale(0);
  const oy = yScale(0);
  const xAxisY = oy >= padT && oy <= H - padB ? oy : H - padB;
  const yAxisX = ox >= padL && ox <= W - padR ? ox : padL;
  const xStep = niceStep(xMax - xMin);
  const yStep = niceStep(yMax - yMin);
  const arrow = `arrow-${uid}`;

  const clip = spec.series.find((s) => s.clip)?.clip;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Graf til funksjonen" className="fn-svg">
      <defs>
        <marker id={arrow} markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
          <path d="M0,0 L8,3.5 L0,7 Z" fill="var(--text-muted)" />
        </marker>
        <clipPath id={`plot-${uid}`}>
          <rect x={padL} y={padT} width={W - padL - padR} height={H - padT - padB} />
        </clipPath>
      </defs>
      <rect x="0" y="0" width={W} height={H} fill="var(--bg-elevated)" rx="12" />
      {ticks(xMin, xMax, xStep).map((x) => (
        <g key={`x${x}`}>
          <line x1={xScale(x)} y1={padT} x2={xScale(x)} y2={H - padB} stroke="var(--border)" strokeWidth="1" />
          <text
            x={xScale(x)}
            y={Math.min(H - 8, xAxisY + 15)}
            fill="var(--text-muted)"
            fontSize={large ? 12 : 10}
            textAnchor="middle"
          >
            {fmt(x)}
          </text>
        </g>
      ))}
      {ticks(yMin, yMax, yStep).map((y) => (
        <g key={`y${y}`}>
          <line x1={padL} y1={yScale(y)} x2={W - padR} y2={yScale(y)} stroke="var(--border)" strokeWidth="1" />
          <text
            x={Math.max(8, yAxisX - 8)}
            y={yScale(y) + 4}
            fill="var(--text-muted)"
            fontSize={large ? 12 : 10}
            textAnchor="end"
          >
            {fmt(y)}
          </text>
        </g>
      ))}
      {clip && (
        <rect
          x={xScale(clip.min)}
          y={padT}
          width={Math.max(0, xScale(clip.max) - xScale(clip.min))}
          height={H - padT - padB}
          fill="var(--primary-subtle)"
          opacity="0.35"
          clipPath={`url(#plot-${uid})`}
        />
      )}
      <line
        x1={padL}
        y1={xAxisY}
        x2={W - padR}
        y2={xAxisY}
        stroke="var(--text-muted)"
        strokeWidth="1.6"
        markerEnd={`url(#${arrow})`}
      />
      <line
        x1={yAxisX}
        y1={H - padB}
        x2={yAxisX}
        y2={padT}
        stroke="var(--text-muted)"
        strokeWidth="1.6"
        markerEnd={`url(#${arrow})`}
      />
      <text x={W - padR + 2} y={xAxisY - 7} fill="var(--text-muted)" fontSize={large ? 13 : 11}>
        {spec.series[0]?.variable || "x"}
      </text>
      <text x={yAxisX + 8} y={padT + 2} fill="var(--text-muted)" fontSize={large ? 13 : 11}>
        y
      </text>
      <g clipPath={`url(#plot-${uid})`}>
        {spec.asymptotes.map((a, i) => {
          if (a.kind === "v" && a.x != null) {
            return (
              <line
                key={`av${i}`}
                x1={xScale(a.x)}
                y1={padT}
                x2={xScale(a.x)}
                y2={H - padB}
                stroke="var(--hint-color)"
                strokeWidth="1.4"
                strokeDasharray="5 4"
              />
            );
          }
          if (a.kind === "h" && a.y != null) {
            return (
              <line
                key={`ah${i}`}
                x1={padL}
                y1={yScale(a.y)}
                x2={W - padR}
                y2={yScale(a.y)}
                stroke="var(--hint-color)"
                strokeWidth="1.4"
                strokeDasharray="5 4"
              />
            );
          }
          if (a.kind === "oblique" && a.m != null && a.b != null) {
            const y1 = a.m * xMin + a.b;
            const y2 = a.m * xMax + a.b;
            return (
              <line
                key={`ao${i}`}
                x1={xScale(xMin)}
                y1={yScale(y1)}
                x2={xScale(xMax)}
                y2={yScale(y2)}
                stroke="var(--hint-color)"
                strokeWidth="1.4"
                strokeDasharray="5 4"
              />
            );
          }
          return null;
        })}
        {sampled.map((segs, i) => {
          const color = COLORS[i % COLORS.length];
          return segs.map((slice, j) => {
            if (slice.length < 2) return null;
            const d = slice
              .map((p, k) => `${k === 0 ? "M" : "L"}${xScale(p.x).toFixed(1)},${yScale(p.y).toFixed(1)}`)
              .join(" ");
            return (
              <path
                key={`${spec.series[i]?.name || i}-${j}`}
                d={d}
                fill="none"
                stroke={color}
                strokeWidth={large ? 2.8 : 2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          });
        })}
      </g>
      {spec.features.map((f, i) => {
        const cx = xScale(f.x);
        const cy = yScale(f.y);
        if (cx < padL - 4 || cx > W - padR + 4 || cy < padT - 4 || cy > H - padB + 4) return null;
        const label = large || f.kind === "vertex" || f.kind === "endpoint";
        const flip = cx > W - 90;
        return (
          <g key={`f${i}`}>
            <circle
              cx={cx}
              cy={cy}
              r={large ? 5 : 4}
              fill={f.kind === "vertex" ? "var(--accent)" : "var(--bg-elevated)"}
              stroke={f.kind === "vertex" ? "var(--bg-elevated)" : "var(--accent)"}
              strokeWidth="2"
            />
            {label && (
              <text
                x={cx + (flip ? -8 : 8)}
                y={cy - 8}
                fill="var(--text-main)"
                fontSize={large ? 12 : 10}
                textAnchor={flip ? "end" : "start"}
              >
                {f.label}
              </text>
            )}
          </g>
        );
      })}
      {spec.asymptotes.map((a, i) => {
        if (!large) return null;
        if (a.kind === "v" && a.x != null) {
          return (
            <text key={`al${i}`} x={xScale(a.x) + 6} y={padT + 12} fill="var(--hint-color)" fontSize="11">
              {a.label}
            </text>
          );
        }
        if (a.kind === "h" && a.y != null) {
          return (
            <text key={`al${i}`} x={padL + 6} y={yScale(a.y) - 6} fill="var(--hint-color)" fontSize="11">
              {a.label}
            </text>
          );
        }
        return null;
      })}
    </svg>
  );
}

export function FunctionPlot({ spec }: { spec: PlotSpec }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className="fn-plot" onClick={() => setOpen(true)} aria-label="Forstørr grafen">
        <GraphSvg spec={spec} />
        <span className="fn-plot-legend">
          {spec.series.map((s, i) => (
            <span key={s.name} style={{ color: COLORS[i % COLORS.length] }}>
              {s.name}
            </span>
          ))}
          {spec.series.find((s) => s.clip) && <span className="fn-domain">D = definisjonsmengde</span>}
          <Maximize2 size={14} />
        </span>
      </button>
      {open &&
        createPortal(
          <div className="fn-lightbox" onClick={() => setOpen(false)} role="dialog" aria-modal="true">
            <div className="fn-lightbox-card" onClick={(e) => e.stopPropagation()}>
              <header>
                <strong>{spec.series.map((s) => s.name).join(" , ") || "Koordinatsystem"}</strong>
                <button type="button" className="nav-btn" onClick={() => setOpen(false)} aria-label="Lukk">
                  <X size={18} />
                </button>
              </header>
              <GraphSvg spec={spec} large />
              <p className="fn-lightbox-note">
                Nullpunkt, ekstremalpunkt og endepunkt er merket. Klikk utenfor for å lukke.
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
