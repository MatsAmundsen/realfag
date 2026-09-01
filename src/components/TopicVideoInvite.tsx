import { Video } from "lucide-react";
import type { TemaVideo } from "@/data/content";
import { useVideoPlayer, youtubeThumb } from "./VideoPlayer";

export function TopicVideoInvite({ video }: { video: TemaVideo }) {
  const player = useVideoPlayer();
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
          <img src={thumb} alt="" />
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
