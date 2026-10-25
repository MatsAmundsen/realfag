import { Link } from "@tanstack/react-router";
import { ChevronDown, House } from "lucide-react";
import { fagsok as fagsok1T, CHAPTER_META as CHAPTER_META_1T } from "@/data/content";
import { fagsok1P, CHAPTER_META_1P } from "@/data/1p";
import { countChapter, countSubchapter, isOvingDelkap } from "@/lib/progress";
import { useProgressStore } from "@/lib/progress-store";
import { useEffect, useState } from "react";

export function ChapterSidebar({ kapId, subId, fag = "1T" }: { kapId?: string; subId?: string; fag?: "1T" | "1P" }) {
  const is1P = fag === "1P";
  const fagsok = is1P ? fagsok1P : fagsok1T;
  const CHAPTER_META = is1P ? CHAPTER_META_1P : CHAPTER_META_1T;
  const subTo = is1P ? "/1p/oppgaver/$kapId/$subId" : "/oppgaver/$kapId/$subId";
  const p = useProgressStore((s) => s.p);
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    kapId ? { [kapId]: true } : { kap1: true },
  );

  useEffect(() => {
    if (kapId) setOpen({ [kapId]: true });
  }, [kapId]);

  return (
    <aside className="sidebar chapter-sidebar">
      <div className="sidebar-header">
        <Link to={is1P ? "/1p" : "/"} className="sidebar-home-btn">
          <House size={16} /> Forside
        </Link>
        <Link to={is1P ? "/1p/oppgaver" : "/oppgaver"} className="sidebar-home-btn">
          Alle kapitler
        </Link>
      </div>
      <div className="kap-switch compact">
        {fagsok.map((kap, i) => {
          const first = kap.delkapitler[0];
          if (!first) return null;
          return (
            <Link
              key={kap.id}
              to={subTo}
              params={{ kapId: kap.id, subId: first.id }}
              className={kap.id === kapId ? "is-on" : ""}
            >
              {is1P ? kap.id.replace(/^p1kap/, "") : i + 1}
            </Link>
          );
        })}
      </div>
      <div id="chapter-list">
        {fagsok.map((kap) => {
          const ch = countChapter(kap, p);
          const expanded = Boolean(open[kap.id]);
          const first = kap.delkapitler[0];
          return (
            <div key={kap.id} className={`chapter-group${expanded ? " expanded" : ""}`}>
              <div className="chapter-btn-row">
                {first ? (
                  <Link
                    to={subTo}
                    params={{ kapId: kap.id, subId: kap.id === kapId && subId ? subId : first.id }}
                    className={`chapter-btn${kap.id === kapId ? " active" : ""}`}
                  >
                    <span className="chapter-btn-main">
                      <span className="chapter-btn-title" title={CHAPTER_META[kap.id]?.short || kap.tittel}>{CHAPTER_META[kap.id]?.short || kap.tittel}</span>
                    </span>
                    <span className={`chapter-btn-pct${ch.pct === 100 ? " is-complete" : ""}`}>{ch.pct}%</span>
                  </Link>
                ) : (
                  <span className="chapter-btn">{kap.tittel}</span>
                )}
                <button
                  type="button"
                  className="chapter-chevron-btn"
                  aria-label={expanded ? "Skjul delkapitler" : "Vis delkapitler"}
                  aria-expanded={expanded}
                  onClick={() => setOpen((s) => ({ ...s, [kap.id]: !s[kap.id] }))}
                >
                  <ChevronDown className="chapter-chevron" size={16} />
                </button>
              </div>
              <div className="subchapter-list">
                {kap.delkapitler.map((dk) => {
                  const sub = countSubchapter(kap, dk, p);
                  return (
                    <Link
                      key={dk.id}
                      to={subTo}
                      params={{ kapId: kap.id, subId: dk.id }}
                      className={`subchapter-btn${dk.id === subId && kap.id === kapId ? " active" : ""}${isOvingDelkap(dk) ? " is-oveprove" : ""}`}
                    >
                      <span className="subchapter-btn-title" title={isOvingDelkap(dk) ? "Øveprøve" : dk.tittel}>
                        {isOvingDelkap(dk) ? "Øveprøve" : dk.tittel}
                      </span>
                      <span className={`subchapter-btn-meta${sub.pct === 100 ? " is-complete" : ""}`}>
                        {sub.done}/{sub.total}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
