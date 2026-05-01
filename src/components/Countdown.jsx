import { useEffect, useState } from "react";

function diff(target) {
  const now = new Date();
  const t = new Date(target);
  const thisYear = new Date(now.getFullYear(), t.getMonth(), t.getDate(), 0, 0, 0);
  let target2 = thisYear;
  const isToday =
    now.getFullYear() === thisYear.getFullYear() &&
    now.getMonth() === thisYear.getMonth() &&
    now.getDate() === thisYear.getDate();
  if (!isToday && now > thisYear) {
    target2 = new Date(now.getFullYear() + 1, t.getMonth(), t.getDate(), 0, 0, 0);
  }
  const ms = target2 - now;
  const days = Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((ms / (1000 * 60 * 60)) % 24));
  const minutes = Math.max(0, Math.floor((ms / (1000 * 60)) % 60));
  const seconds = Math.max(0, Math.floor((ms / 1000) % 60));
  return { isToday, days, hours, minutes, seconds };
}

export default function Countdown({ date, theme, t }) {
  const [s, setS] = useState(() => diff(date));
  const tt = t || ((k) => k);
  useEffect(() => {
    const i = setInterval(() => setS(diff(date)), 1000);
    return () => clearInterval(i);
  }, [date]);

  if (s.isToday) {
    return (
      <div className="text-center" data-testid="countdown-today">
        <p className={`${theme.bodyClass} text-xs uppercase tracking-[0.3em] mb-3`} style={{ color: theme.sub }}>
          {tt("g.countdown.today.label")}
        </p>
        <h3 className={`${theme.headingClass} text-4xl sm:text-5xl`} style={{ color: theme.text }}>
          {tt("g.countdown.today.title.1")}{" "}
          <span style={{ color: theme.accent }}>{tt("g.countdown.today.title.2")}</span>{" "}
          {tt("g.countdown.today.title.3")}
        </h3>
      </div>
    );
  }

  const cells = [
    { label: tt("g.countdown.days"), value: s.days },
    { label: tt("g.countdown.hours"), value: s.hours },
    { label: tt("g.countdown.minutes"), value: s.minutes },
    { label: tt("g.countdown.seconds"), value: s.seconds },
  ];

  return (
    <div className="text-center" data-testid="countdown-block">
      <p className={`${theme.bodyClass} text-xs uppercase tracking-[0.3em] mb-5`} style={{ color: theme.sub }}>
        {tt("g.countdown.label")}
      </p>
      <div className="grid grid-cols-4 gap-3 sm:gap-5 max-w-xl mx-auto">
        {cells.map((c) => (
          <div
            key={c.label}
            className="px-3 py-5"
            style={{
              background: theme.surface,
              color: theme.text,
              border: `1px solid ${theme.accent}33`,
              borderRadius: theme.key === "playful" ? "1rem" : theme.key === "minimalist" ? 0 : 6,
            }}
          >
            <div className={`${theme.headingClass} text-3xl sm:text-4xl`} style={{ color: theme.text }}>
              {String(c.value).padStart(2, "0")}
            </div>
            <div className={`${theme.bodyClass} text-[10px] uppercase tracking-[0.25em] mt-1`} style={{ color: theme.sub }}>
              {c.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
