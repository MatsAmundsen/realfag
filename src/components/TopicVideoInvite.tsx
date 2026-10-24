import { Video } from "lucide-react";
import type { TemaVideo } from "@/data/content";
import { useVideoPlayer, youtubeThumb } from "./VideoPlayer";

/**
 * Videoer for et delkapittel. Én video: stort kort som før.
 * Flere: liste med én knapp per video («Video n Tittel»).
 * Ingen iframe lastes før eleven åpner en video (lightbox i VideoPlayer).
 */
export function TopicVideoInvite({ videos }: { videos: TemaVideo[] }) {
  const player = useVideoPlayer();
  if (videos.length === 0) return null;

  if (videos.length === 1) {
    const video = videos[0];
    const thumb = youtubeThumb(video.url);
    return (
      <div className="topic-video-invite">
        {thumb && (
          <button
            type="button"
            className="topic-video-thumb"
            onClick={() => player?.open(video)}
            aria-label={`Spill av ${video.tittel}`}
          >
            <img src={thumb} alt="" width={480} height={270} loading="lazy" decoding="async" />
            <span className="vid-play" aria-hidden="true">
              ▶
            </span>
          </button>
        )}
        <div className="topic-video-copy">
          <p>Ny i temaet? Én kort forklaring — så kan du øve.</p>
          <strong>{video.tittel}</strong>
          <button type="button" className="hint-btn topic-video-btn" onClick={() => player?.open(video)}>
            <Video size={16} /> Se video
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="topic-video-invite topic-video-multi" aria-labelledby="topic-video-heading">
      <div className="topic-video-copy">
        <h2 id="topic-video-heading" className="topic-video-heading">
          <Video size={16} aria-hidden="true" /> Videoer i temaet ({videos.length})
        </h2>
        <p>Ny i temaet? Velg en kort forklaring — så kan du øve.</p>
      </div>
      <ol className="topic-video-list">
        {videos.map((video, i) => {
          const thumb = youtubeThumb(video.url);
          const name = `Video ${i + 1} ${video.tittel}`;
          return (
            <li key={video.url}>
              <button
                type="button"
                className="topic-video-item"
                onClick={() => player?.open(video)}
                aria-label={`Spill av ${name}`}
              >
                <span className="topic-video-item-thumb" aria-hidden="true">
                  {thumb && <img src={thumb} alt="" width={480} height={270} loading="lazy" decoding="async" />}
                  <span className="vid-play">▶</span>
                </span>
                <span className="topic-video-item-text">
                  <span className="topic-video-item-num">Video {i + 1}</span>{" "}
                  <span className="topic-video-item-title">{video.tittel}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
