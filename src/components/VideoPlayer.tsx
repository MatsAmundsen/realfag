import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
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

  const api = useMemo<VideoPlayerApi>(
    () => ({
      open(video) {
        const id = extractYoutubeId(video.url);
        if (!id) return;
        setPlayer({ id, title: video.tittel });
      },
    }),
    [],
  );

  useEffect(() => {
    const w = window as Window & {
      __mgOpenYoutube?: (id: string, title: string) => void;
    };
    w.__mgOpenYoutube = (id, title) => setPlayer({ id, title });
    return () => {
      if (w.__mgOpenYoutube) delete w.__mgOpenYoutube;
    };
  }, []);

  useEffect(() => {
    if (!player) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPlayer(null);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
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
          <div className="yt-lightbox-card" onClick={(e) => e.stopPropagation()}>
            <div className="yt-lightbox-bar">
              <strong>{player.title}</strong>
              <button type="button" className="quiz-close-btn" aria-label="Lukk video" onClick={() => setPlayer(null)}>
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
