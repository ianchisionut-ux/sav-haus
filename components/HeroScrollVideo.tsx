"use client";

import { useEffect, useRef } from "react";

const SOURCE =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/ef243cce-b7da-438b-b34f-87db237b43c1.mp4";

/**
 * The video is a visual timeline. It never autoplay-loops: scrolling the
 * homepage forwards and backwards seeks through the original footage.
 */
export default function HeroScrollVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const chapter = document.getElementById("hero-film");
    if (!video || !chapter) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;
    let ready = false;

    video.pause();
    video.muted = true;

    const seekToScroll = () => {
      frameId = 0;
      if (!ready || reducedMotion.matches || !Number.isFinite(video.duration)) return;

      const rect = chapter.getBoundingClientRect();
      const travel = Math.max(1, chapter.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / travel));
      const endTime = Math.max(0, video.duration - 0.04);
      const destination = progress * endTime;

      if (Math.abs(video.currentTime - destination) > 0.035) {
        try {
          video.currentTime = destination;
        } catch {
          // The poster remains visible until the media is seekable.
        }
      }
    };

    const schedule = () => {
      if (!frameId) frameId = window.requestAnimationFrame(seekToScroll);
    };

    const onReady = () => {
      ready = true;
      schedule();
    };

    video.addEventListener("loadedmetadata", onReady);
    video.addEventListener("canplay", onReady);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    reducedMotion.addEventListener("change", schedule);

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) onReady();

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      video.removeEventListener("loadedmetadata", onReady);
      video.removeEventListener("canplay", onReady);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={SOURCE}
      poster="/images/hero.jpg"
      aria-label="Prezentare video a construcției unei case, controlată prin derularea paginii"
      className="absolute inset-0 h-full w-full object-cover"
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      controlsList="nodownload noplaybackrate nofullscreen"
    />
  );
}
