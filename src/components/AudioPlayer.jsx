import { useEffect, useRef, useState } from "react";
import { Play, Pause, Music2 } from "lucide-react";

export default function AudioPlayer({ src, accent = "#0A0A0A", text = "#fff", autoPlay = false, t }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const tt = t || ((k) => (k === "g.audio.play" ? "Play music" : "Pause music"));

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.55;
    if (autoPlay) {
      const tryPlay = async () => {
        try {
          await a.play();
          setPlaying(true);
        } catch {
          setPlaying(false);
        }
      };
      tryPlay();
    }
  }, [src, autoPlay]);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      try {
        await a.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  if (!src) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={toggle}
        data-testid="audio-toggle-button"
        className={`pulse-soft flex items-center gap-2 px-4 py-3 rounded-full backdrop-blur-md text-sm font-medium shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95`}
        style={{ background: accent, color: text, border: `1px solid ${text}22` }}
        aria-label={playing ? tt("g.audio.pause") : tt("g.audio.play")}
      >
        {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        <Music2 className="w-4 h-4 opacity-70" />
        <span className="hidden sm:inline">{playing ? tt("g.audio.pause") : tt("g.audio.play")}</span>
      </button>
      <audio ref={audioRef} src={src} loop preload="auto" />
    </div>
  );
}
