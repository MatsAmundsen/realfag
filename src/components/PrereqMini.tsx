import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight } from "lucide-react";
import { PREREQS } from "@/data/mindmap";

export function PrereqMini({
  subId,
  compact = false,
}: {
  subId: string;
  compact?: boolean;
}) {
  const data = PREREQS[subId];
  if (!data) return null;

  return (
    <div className={`prereq-mini${compact ? " is-compact" : ""}`}>
      <p className="prereq-kicker">Byggeklosser</p>
      <h3>{data.title}</h3>
      {!compact && <p className="prereq-blurb">{data.blurb}</p>}
      <div className="prereq-flow">
        <div className="prereq-inputs">
          {data.inputs.map((inp) => (
            <Link
              key={`${inp.subId}-${inp.label}`}
              to="/oppgaver/$kapId/$subId"
              params={{ kapId: inp.kapId, subId: inp.subId }}
              className={`prereq-chip ${inp.role}`}
            >
              <span className="prereq-chip-id">{inp.subId}</span>
              {inp.label}
            </Link>
          ))}
        </div>
        <div className="prereq-join" aria-hidden>
          <ArrowDown size={16} className="prereq-join-v" />
          <ArrowRight size={16} className="prereq-join-h" />
        </div>
        <Link
          to="/oppgaver/$kapId/$subId"
          params={{ kapId: `kap${subId[0]}`, subId }}
          className="prereq-center"
        >
          {data.title}
        </Link>
      </div>
    </div>
  );
}
