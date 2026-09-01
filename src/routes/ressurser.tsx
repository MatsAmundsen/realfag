import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { fagstoff } from "@/data/content";
import { KatexHtml } from "@/components/KatexHtml";
import { useVideoPlayer } from "@/components/VideoPlayer";
import { extractYoutubeId, runPythonEditor } from "@/lib/py-runner";

type RessursSearch = { t?: string };

function readTab(search: RessursSearch) {
  const t = typeof search.t === "string" ? search.t : "";
  return fagstoff.some((f) => f.id === t) ? t : fagstoff[0]?.id || "tallmengder";
}

export const Route = createFileRoute("/ressurser")({
  validateSearch: (search: Record<string, unknown>): RessursSearch => ({
    t: typeof search.t === "string" ? search.t : undefined,
  }),
  component: RessurserPage,
});

function RessurserPage() {
  const search = Route.useSearch();
  const tab = readTab(search);
  const current = fagstoff.find((f) => f.id === tab) || fagstoff[0];
  const [html, setHtml] = useState(current?.html || "");
  const [loading, setLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const player = useVideoPlayer();

  useEffect(() => {
    if (!current) return;
    let cancelled = false;
    if (current.html) {
      setHtml(current.html);
      setLoading(false);
      return () => {
        cancelled = true;
      };
    }
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
    const raw = e.target;
    const el = raw instanceof Element ? raw : (raw as Node | null)?.parentElement;
    if (!el) return;

    const runBtn = el.closest("[data-run]");
    if (runBtn) {
      e.preventDefault();
      void runPythonEditor(runBtn.getAttribute("data-run"));
      return;
    }

    const yt = el.closest("a[href*='youtube.com'], a[href*='youtu.be']");
    if (yt instanceof HTMLAnchorElement) {
      const id = extractYoutubeId(yt.getAttribute("href") || yt.href);
      if (id) {
        e.preventDefault();
        const title =
          yt.querySelector(".vid-card-title")?.textContent?.trim() ||
          yt.textContent?.replace(/\s+/g, " ").trim() ||
          "Video";
        player?.open({ tittel: title, url: yt.href });
      }
    }
  }

  return (
    <section className="view-section full-page">
      <div className="page-intro">
        <h1>Ressurser</h1>
        <p>Fagbibliotek med tallmengder, brøkregning, kvadratrøtter, programmering og temavideoer.</p>
      </div>
      <nav className="res-tabs" aria-label="Fagbibliotek">
        {fagstoff.map((f) => (
          <a
            key={f.id}
            href={`/ressurser?t=${encodeURIComponent(f.id)}`}
            className={f.id === tab ? "is-on" : ""}
            aria-current={f.id === tab ? "page" : undefined}
          >
            {f.tittel.replace("Fagbibliotek: ", "")}
          </a>
        ))}
      </nav>
      <div
        className="res-html"
        ref={contentRef}
        onClick={onContentClick}
        onKeyDown={(e) => {
          if (e.key !== "Tab") return;
          const t = e.target as HTMLElement;
          if (!t.classList.contains("py-code")) return;
          e.preventDefault();
          const ta = t as HTMLTextAreaElement;
          const s = ta.selectionStart;
          const end = ta.selectionEnd;
          ta.value = `${ta.value.slice(0, s)}    ${ta.value.slice(end)}`;
          ta.selectionStart = ta.selectionEnd = s + 4;
        }}
      >
        {loading ? (
          <p className="res-loading">Laster fagstoff…</p>
        ) : (
          <article className="task-card fagstoff-article">
            <h3 className="task-title" style={{ marginBottom: "1rem" }}>
              {current?.tittel}
            </h3>
            <div className="fagstoff-content">
              <KatexHtml html={html} mode="article" />
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
