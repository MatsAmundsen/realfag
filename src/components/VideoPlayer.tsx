import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { extractYoutubeId } from "@/lib/py-runner";
import type { TemaVideo } from "@/data/content";

type Player = { id: string; title: string };

type VideoPlayerApi = {
  open: (video: TemaVideo) => void;
};

const VideoPlayerContext = createContext<VideoPlayerApi | null>(null);

export function useVideoPlayer(): VideoPlayerApi | null {
  return useContext(VideoPlayerContext);
}

export function youtubeThumb(url: string): string | null {
  const id = extractYoutubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}

export function VideoPlayerProvider({ children }: { children: ReactNode }) {
  const [player, setPlayer] = useState<Player | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const api = useMemo<VideoPlayerApi>(
    () => ({
      open(video) {
        const id = extractYoutubeId(video.url);
        if (!id) return;
        if (!triggerRef.current) triggerRef.current = document.activeElement as HTMLElement | null;
        setPlayer({ id, title: video.tittel });
      },
    }),
    [],
  );

  useEffect(() => {
    const w = window as Window & {
      __mgOpenYoutube?: (id: string, title: string) => void;
    };
    w.__mgOpenYoutube = (id, title) => {
      if (!triggerRef.current) triggerRef.current = document.activeElement as HTMLElement | null;
      setPlayer({ id, title });
    };
    return () => {
      if (w.__mgOpenYoutube) delete w.__mgOpenYoutube;
    };
  }, []);

  useEffect(() => {
    if (!player) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setPlayer(null);
        return;
      }
      if (e.key !== "Tab" || !cardRef.current) return;
      const items = Array.from(
        cardRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), iframe, a[href], [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const inside = active instanceof Node && cardRef.current.contains(active);
      if (e.shiftKey && (active === first || !inside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !inside)) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [player]);

  useEffect(() => {
    if (player) return;
    const t = triggerRef.current;
    triggerRef.current = null;
    if (t && t.isConnected) t.focus();
  }, [player]);

  return (
    <VideoPlayerContext.Provider value={api}>
      {children}
      {player && (
        <div
          className="yt-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={player.title}
          onClick={() => setPlayer(null)}
        >
          <div className="yt-lightbox-card" ref={cardRef} onClick={(e) => e.stopPropagation()}>
            <div className="yt-lightbox-bar">
              <strong>{player.title}</strong>
              <button ref={closeRef} type="button" className="quiz-close-btn" aria-label="Lukk video" onClick={() => setPlayer(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="yt-lightbox-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${player.id}?autoplay=1&rel=0`}
                title={player.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </VideoPlayerContext.Provider>
  );
}
