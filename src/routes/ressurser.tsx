import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { fagstoff } from "@/data/content";
import { KatexHtml } from "@/components/KatexHtml";

export const Route = createFileRoute("/ressurser")({ component: RessurserPage });

function RessurserPage() {
  const [tab, setTab] = useState(fagstoff[0]?.id || "brokregning");
  const current = fagstoff.find((f) => f.id === tab) || fagstoff[0];
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!current) return;
    let cancelled = false;
    if (current.src) {
      setLoading(true);
      fetch(current.src)
        .then((r) => r.text())
        .then((text) => {
          if (!cancelled) {
            setHtml(text);
            setLoading(false);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setHtml("<p>Kunne ikke laste ressursen.</p>");
            setLoading(false);
          }
        });
    } else {
      setHtml(current.html || "");
      setLoading(false);
    }
    return () => {
      cancelled = true;
    };
  }, [current]);

  function onContentClick(e: React.MouseEvent) {
    const el = (e.target as HTMLElement).closest("[data-fag-scroll], [data-brok-scroll]");
    if (!el) return;
    e.preventDefault();
    const id = el.getAttribute("data-fag-scroll") || el.getAttribute("data-brok-scroll");
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="view-section full-page">
      <div className="page-intro">
        <h1>Ressurser</h1>
        <p>Fagbibliotek med tallmengder, brøkregning, kvadratrøtter, programmering og temavideoer.</p>
      </div>
      <div className="res-tabs">
        {fagstoff.map((f) => (
          <button key={f.id} type="button" className={f.id === tab ? "is-on" : ""} onClick={() => setTab(f.id)}>
            {f.tittel.replace("Fagbibliotek: ", "")}
          </button>
        ))}
      </div>
      <div className="res-html" onClick={onContentClick}>
        {loading ? (
          <p className="res-loading">Laster fagstoff…</p>
        ) : (
          <article className="task-card fagstoff-article">
            <h3 className="task-title" style={{ marginBottom: "1rem" }}>
              {current?.tittel}
            </h3>
            <div className="fagstoff-content">
              <KatexHtml html={html} />
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
