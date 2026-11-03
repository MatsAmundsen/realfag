import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { fagsok as fagsok1T } from "@/data/content";
import { fagsok1P } from "@/data/1p";
import { countSubchapter, isOvingDelkap } from "@/lib/progress";
import { useProgressStore } from "@/lib/progress-store";

/**
 * Delkapittelmeny for mobil. Sidemenyen (ChapterSidebar) er skjult under 900 px,
 * så uten denne finnes ingen vei til andre delkapitler eller øveprøven enn «Neste».
 * Skjules på bred skjerm via CSS (.mobile-subnav).
 */
export function MobilDelkapNav({ kapId, subId, fag = "1T" }: { kapId: string; subId: string; fag?: "1T" | "1P" }) {
  const is1P = fag === "1P";
  const kap = (is1P ? fagsok1P : fagsok1T).find((k) => k.id === kapId);
  const subTo = is1P ? "/1p/oppgaver/$kapId/$subId" : "/oppgaver/$kapId/$subId";
  const p = useProgressStore((s) => s.p);
  const [open, setOpen] = useState(false);
  const listId = useId();

  const toggleRef = useRef<HTMLButtonElement>(null);
  const valgtViaLenke = useRef(false);

  // Lukk listen når du har valgt et delkapittel eller byttet kapittel.
  // Er det valgt via en lenke i denne menyen, flyttes fokus til knappen (lenken forsvinner/skjules, og fokus ville ellers havne på body).
  useEffect(() => {
    setOpen(false);
    if (valgtViaLenke.current) {
      valgtViaLenke.current = false;
      toggleRef.current?.focus();
    }
  }, [kapId, subId]);

  if (!kap || kap.delkapitler.length === 0) return null;
  const current = kap.delkapitler.find((d) => d.id === subId);
  const currentTitle = current ? (isOvingDelkap(current) ? "Øveprøve" : current.tittel) : "Velg delkapittel";
  const ove = kap.delkapitler.find((d) => isOvingDelkap(d));

  return (
    <nav
      className="mobile-subnav"
      aria-label="Delkapitler i dette kapittelet"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) valgtViaLenke.current = true;
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          setOpen(false);
          toggleRef.current?.focus();
        }
      }}
    >
      <button
        ref={toggleRef}
        type="button"
        className="mobile-subnav-toggle"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="mobile-subnav-label">
          <span className="mobile-subnav-kicker">Delkapitler</span>
          <span className="mobile-subnav-current">{currentTitle}</span>
        </span>
        <ChevronDown size={18} className={`mobile-subnav-chevron${open ? " is-open" : ""}`} aria-hidden="true" />
      </button>
      {ove && ove.id !== subId ? (
        <Link to={subTo} params={{ kapId: kap.id, subId: ove.id }} className="mobile-subnav-ove">
          Ta øveprøven for kapittelet
        </Link>
      ) : null}
      <div id={listId} className="mobile-subnav-list" hidden={!open}>
        {kap.delkapitler.map((dk) => {
          const sub = countSubchapter(kap, dk, p);
          const oving = isOvingDelkap(dk);
          return (
            <Link
              key={dk.id}
              to={subTo}
              params={{ kapId: kap.id, subId: dk.id }}
              aria-current={dk.id === subId ? "page" : undefined}
              className={`subchapter-btn${dk.id === subId ? " active" : ""}${oving ? " is-oveprove" : ""}`}
            >
              <span className="subchapter-btn-title">{oving ? "Øveprøve" : dk.tittel}</span>
              <span className={`subchapter-btn-meta${sub.pct === 100 ? " is-complete" : ""}`}>
                {sub.done}/{sub.total}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
