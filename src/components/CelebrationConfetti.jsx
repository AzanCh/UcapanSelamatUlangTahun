import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function CelebrationConfetti({ trigger, colors, persistent = false }) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState(false);
  const [pieces, setPieces] = useState(220);

  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!trigger) return;
    setActive(true);
    setPieces(persistent ? 90 : 280);
    if (!persistent) {
      const t1 = setTimeout(() => setPieces(60), 3500);
      const t2 = setTimeout(() => setActive(false), 6500);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [trigger, persistent]);

  if (!active) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      <Confitti pieces={pieces} colors={colors} size={size} />
    </div>
  );
}

// Inner wrapper to keep imports clean
function Confitti({ pieces, colors, size }) {
  return (
    <Confetti
      width={size.w}
      height={size.h}
      numberOfPieces={pieces}
      recycle={true}
      gravity={0.18}
      colors={colors}
      tweenDuration={6000}
    />
  );
}
