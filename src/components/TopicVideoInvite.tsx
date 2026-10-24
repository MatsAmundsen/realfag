import { Video } from "lucide-react";
import type { TemaVideo } from "@/data/content";
import { useVideoPlayer, youtubeThumb } from "./VideoPlayer";

/** Temavideoer øverst i et delkapittel: første video stort, resten som en liste under. */
export function TopicVideoInvite({ videos }: { videos: TemaVideo[] }) {
  const player = useVideoPlayer();
  const [video, ...more] = videos;
  if (!video) return null;
  const thumb = youtubeThumb(video.url);

  return (
    <div className="topic-video-invite">
      <div className="topic-video-main">
        {thumb && (
          <button
            type="button"
            className="topic-video-thumb"
            onClick={() => player?.open(video)}
            aria-label={`Spill av ${video.tittel}`}
          >
            <img src={thumb} alt="" />
            <span className="vid-play" aria-hidden="true">
              ▶
            </span>
          </button>
        )}
        <div className="topic-video-copy">
          <p>
            {more.length
              ? `Ny i temaet? ${videos.length} korte forklaringer — start med den første.`
              : "Ny i temaet? Én kort forklaring — så kan du øve."}
          </p>
          <strong>{video.tittel}</strong>
          <button type="button" className="hint-btn topic-video-btn" onClick={() => player?.open(video)}>
            <Video size={16} /> Se video
          </button>
        </div>
      </div>
      {more.length > 0 && (
        <ul className="topic-video-more" aria-label="Flere videoer i temaet">
          {more.map((v, i) => {
            const t = youtubeThumb(v.url);
            return (
              <li key={v.url}>
                <button type="button" className="topic-video-more-btn" onClick={() => player?.open(v)}>
                  {t ? <img src={t} alt="" loading="lazy" /> : <Video size={18} aria-hidden="true" />}
                  <span>
                    <small>Video {i + 2}</small>{" "}
                    <span className="topic-video-more-title">{v.tittel}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
