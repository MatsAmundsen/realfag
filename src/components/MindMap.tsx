import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Network, Trophy, X } from "lucide-react";
import {
  CHAPTER_MAPS,
  HELHET_EDGES,
  HELHET_NODES,
  OVERVIEW,
  clusterForNode,
  findConcept,
  type ConceptNode,
} from "@/data/mindmap";
import { CHAPTER_META, fagsok } from "@/data/content";
import { countChapter, countSubchapter, isOvingDelkap, type Progress } from "@/lib/progress";
import { useProgressStore } from "@/lib/progress-store";
import { PrereqMini } from "./PrereqMini";

type Tab = "helhet" | "kap1" | "kap2" | "kap3" | "kap4";

function tone(pct: number) {
  if (pct >= 100) return "done";
  if (pct > 0) return "mid";
  return "empty";
}

function subProgress(kapId: string, subId: string, p: Progress) {
  const kap = fagsok.find((k) => k.id === kapId);
  const dk = kap?.delkapitler.find((d) => d.id === subId);
  if (!kap || !dk) return { done: 0, total: 0, pct: 0 };
  return countSubchapter(kap, dk, p);
}

export function MindMap() {
  const [tab, setTab] = useState<Tab>("helhet");
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const concept = selected ? findConcept(selected) : undefined;
  const cluster = selected ? clusterForNode(selected) : undefined;

  return (
    <div className="mm">
      <OverviewPath tab={tab} onPick={setTab} />

      <div className="mm-tabs" role="tablist" aria-label="Kartvisning">
        <button type="button" role="tab" aria-selected={tab === "helhet"} className={tab === "helhet" ? "is-on" : ""} onClick={() => setTab("helhet")}>
          <Network size={15} /> Helhet
        </button>
        {OVERVIEW.map((o, i) => (
          <button
            key={o.id}
            type="button"
            role="tab"
            aria-selected={tab === o.kapId}
            className={tab === o.kapId ? "is-on" : ""}
            onClick={() => setTab(o.kapId as Tab)}
          >
            Kap. {i + 1}
          </button>
        ))}
      </div>

      {tab === "helhet" ? (
        <HelhetView onOpenChapter={(id) => setTab(id as Tab)} />
      ) : (
        <ChapterView
          kapId={tab}
          selected={selected}
          onSelect={(id) => setSelected((cur) => (cur === id ? null : id))}
        />
      )}

      {concept && cluster && (
        <>
          <button type="button" className="mm-drawer-backdrop" aria-label="Lukk" onClick={() => setSelected(null)} />
          <aside className="mm-drawer" role="dialog" aria-label={concept.label}>
            <header>
              <div>
                <p className="mm-drawer-kicker">{cluster.title}</p>
                <h3>{concept.label}</h3>
              </div>
              <button type="button" className="mm-drawer-close" onClick={() => setSelected(null)} aria-label="Lukk">
                <X size={18} />
              </button>
            </header>
            {concept.hint && <p className="mm-drawer-hint">{concept.hint}</p>}
            <NodeProgress kapId={concept.link.kapId} subId={concept.link.subId} />
            <PrereqMini subId={concept.link.subId} compact />
            <Link
              to="/oppgaver/$kapId/$subId"
              params={{ kapId: concept.link.kapId, subId: concept.link.subId }}
              hash={concept.link.hash}
              className="btn-primary mm-drawer-cta"
            >
              Gå til oppgavene <ArrowRight size={16} />
            </Link>
            <p className="mm-drawer-note">Noden peker på delkapittelet der du øver dette. Fargen i kartet følger fremgangen din.</p>
          </aside>
        </>
      )}
    </div>
  );
}

function OverviewPath({ tab, onPick }: { tab: Tab; onPick: (t: Tab) => void }) {
  const p = useProgressStore((s) => s.p);
  const examCount = Object.keys(p.exams).length;

  return (
    <div className="mm-path" aria-label="Læringsløype">
      {OVERVIEW.map((o, i) => {
        const kap = fagsok.find((k) => k.id === o.kapId);
        const ch = kap ? countChapter(kap, p) : { pct: 0 };
        const on = tab === o.kapId;
        return (
          <div key={o.id} className="mm-path-item">
            {i > 0 && <span className="mm-path-arrow" aria-hidden />}
            <button
              type="button"
              className={`mm-path-card mm-${o.kapId}${on ? " is-on" : ""} ${tone(ch.pct)}`}
              onClick={() => onPick(o.kapId as Tab)}
            >
              <strong>{o.title}</strong>
              <span>{o.short}</span>
              <em>{ch.pct}%</em>
            </button>
          </div>
        );
      })}
      <div className="mm-path-item">
        <span className="mm-path-arrow" aria-hidden />
        <Link to="/eksamen" className={`mm-path-card mm-exam${examCount ? " mid" : " empty"}`}>
          <Trophy size={16} />
          <strong>Eksamen</strong>
          <span>Sju sett</span>
          <em>{examCount ? `${examCount} levert` : "Ikke startet"}</em>
        </Link>
      </div>
    </div>
  );
}

function HelhetView({ onOpenChapter }: { onOpenChapter: (kapId: string) => void }) {
  const p = useProgressStore((s) => s.p);
  const byKap = useMemo(() => {
    const map: Record<string, typeof HELHET_NODES> = { kap1: [], kap2: [], kap3: [], kap4: [] };
    HELHET_NODES.forEach((n) => {
      map[n.kapId]?.push(n);
    });
    return map;
  }, []);

  return (
    <div className="mm-helhet">
      <div className="mm-helhet-cols">
        {OVERVIEW.map((o) => (
          <section key={o.kapId} className={`mm-helhet-col mm-${o.kapId}`}>
            <button type="button" className="mm-helhet-head" onClick={() => onOpenChapter(o.kapId)}>
              <strong>{CHAPTER_META[o.kapId]?.short || o.title}</strong>
              <span>Åpne detaljkart</span>
            </button>
            <ul>
              {(byKap[o.kapId] || []).map((node) => {
                const sub = subProgress(node.kapId, node.subId, p);
                return (
                  <li key={node.id}>
                    <Link
                      to="/oppgaver/$kapId/$subId"
                      params={{ kapId: node.kapId, subId: node.subId }}
                      className={`mm-node ${tone(sub.pct)}`}
                    >
                      <strong>{node.id}</strong>
                      <span>{node.label}</span>
                      <em>{sub.pct}%</em>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <div className="mm-edges">
        <h3>Slik henger det sammen</h3>
        <p>Hver pil er en avhengighet. Klikk for å hoppe til oppgavene der du øver destinasjonen.</p>
        <ul>
          {HELHET_EDGES.map((e) => {
            const from = HELHET_NODES.find((n) => n.id === e.from);
            const to = HELHET_NODES.find((n) => n.id === e.to);
            if (!from || !to) return null;
            return (
              <li key={`${e.from}-${e.to}`}>
                <Link to="/oppgaver/$kapId/$subId" params={{ kapId: from.kapId, subId: from.subId }} className="mm-edge-from">
                  {from.id}
                </Link>
                <span className={`mm-edge-arrow${e.dashed ? " is-dash" : ""}`} aria-hidden />
                {e.label && <span className="mm-edge-label">{e.label}</span>}
                <Link to="/oppgaver/$kapId/$subId" params={{ kapId: to.kapId, subId: to.subId }} className="mm-edge-to">
                  {to.id} {to.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function ChapterView({
  kapId,
  selected,
  onSelect,
}: {
  kapId: string;
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  const p = useProgressStore((s) => s.p);
  const detail = CHAPTER_MAPS[kapId];
  const kap = fagsok.find((k) => k.id === kapId);
  if (!detail || !kap) return null;
  const oving = kap.delkapitler.find((d) => isOvingDelkap(d));

  return (
    <div className={`mm-chapter mm-${kapId}`}>
      <div className="mm-chapter-intro">
        <h2>{detail.title}</h2>
        <p>{detail.blurb}</p>
      </div>
      <div className="mm-clusters">
        {detail.clusters.map((c) => {
          const sub = subProgress(kapId, c.subId, p);
          return (
            <article key={c.id} className={`mm-cluster ${tone(sub.pct)}`}>
              <header>
                <Link to="/oppgaver/$kapId/$subId" params={{ kapId, subId: c.subId }}>
                  {c.title}
                </Link>
                <span>{sub.pct}%</span>
              </header>
              <div className={`mm-stack${c.layout === "row" ? " is-row" : ""}`}>
                {c.nodes.map((node) => (
                  <ConceptButton
                    key={node.id}
                    node={node}
                    pct={sub.pct}
                    active={selected === node.id}
                    onSelect={onSelect}
                  />
                ))}
              </div>
            </article>
          );
        })}
      </div>
      <p className="mm-next">{detail.nextLabel}</p>
      {oving && (
        <Link to="/oppgaver/$kapId/$subId" params={{ kapId, subId: oving.id }} className="mm-oving">
          Øveprøve for {kap.tittel.replace("Kapittel ", "kapittel ")}
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}

function ConceptButton({
  node,
  pct,
  active,
  onSelect,
}: {
  node: ConceptNode;
  pct: number;
  active: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      className={`mm-node ${tone(pct)}${active ? " is-on" : ""}`}
      onClick={() => onSelect(node.id)}
    >
      {node.label}
    </button>
  );
}

function NodeProgress({ kapId, subId }: { kapId: string; subId: string }) {
  const p = useProgressStore((s) => s.p);
  const sub = subProgress(kapId, subId, p);
  return (
    <div className="mm-drawer-progress">
      <div>
        <strong>{sub.done} av {sub.total}</strong> merket ferdig
      </div>
      <div className="progress-track lg">
        <div className={`progress-fill${sub.pct === 100 ? " is-complete" : ""}`} style={{ width: `${sub.pct}%` }} />
      </div>
    </div>
  );
}
