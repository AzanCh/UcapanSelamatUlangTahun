import { useMemo } from "react";

export default function Balloons({ colors = ["#FF8B3D", "#D19CA8", "#C5A880", "#D4AF37"], count = 8 }) {
  const items = useMemo(() => {
    return new Array(count).fill(0).map((_, i) => ({
      left: Math.round((i / count) * 100 + (Math.random() * 8 - 4)),
      delay: Math.random() * 8,
      duration: 14 + Math.random() * 10,
      color: colors[i % colors.length],
      size: 32 + Math.round(Math.random() * 22),
    }));
  }, [count, colors]);
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-[5]">
      {items.map((b, i) => (
        <span
          key={i}
          className="balloon"
          style={{
            left: `${b.left}%`,
            background: b.color,
            width: b.size,
            height: b.size * 1.25,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}
