import type { StudyMode } from "@/data/types";

export function ModeToggle({
  mode,
  onChange,
  proveLabel = "Prøvemodus",
  oveLabel = "Øvemodus",
}: {
  mode: StudyMode;
  onChange: (m: StudyMode) => void;
  proveLabel?: string;
  oveLabel?: string;
}) {
  return (
    <div className="mode-toggle" role="tablist" aria-label="Studiemodus">
      <button
        type="button"
        role="tab"
        aria-selected={mode === "prove"}
        className={mode === "prove" ? "is-on" : ""}
        onClick={() => onChange("prove")}
      >
        {proveLabel}
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === "ove"}
        className={mode === "ove" ? "is-on" : ""}
        onClick={() => onChange("ove")}
      >
        {oveLabel}
      </button>
    </div>
  );
}
