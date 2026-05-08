import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { useLocation } from "react-router";

const HlsPlayer = () => {
  const location = useLocation();
  const src = location.state?.video ?? "";
  const videoRef = useRef<null | HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    }
    // For Safari/iOS which has native support
    else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }
  }, [src]);

  return (
    <div className="w-full h-full">
      <video
        className="object-contain h-full w-full"
        autoPlay
        ref={videoRef}
        controls
      />
    </div>
  );
};

export default HlsPlayer;
