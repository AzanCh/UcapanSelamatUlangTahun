import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Copy, Check } from "lucide-react";
import Curtain from "./Curtain";
import AudioPlayer from "./AudioPlayer";
import CelebrationConfetti from "./CelebrationConfetti";
import Balloons from "./Balloons";
import Countdown from "./Countdown";
import TypeReveal from "./TypeReveal";
import { THEMES } from "../lib/themes";
import { makeT } from "../lib/i18n";

export default function GreetingRenderer({ data, isPreview = false, shareUrl = "" }) {
  const themeKey = data?.theme || "elegant";
  const baseTheme = THEMES[themeKey] || THEMES.elegant;
  const accent = data?.accent_color || baseTheme.accent;
  const theme = { ...baseTheme, accent };

  const lang = data?.language || "en";
  const t = makeT(lang);

  const [open, setOpen] = useState(isPreview);
  const [copied, setCopied] = useState(false);

  const photos = (data?.photos || []).filter((p) => p && p.url);
  const highlights = data?.highlights || [];

  const handleOpen = () => setOpen(true);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const onWhatsApp = () => {
    const text = t("g.share.text", {
      name: data?.recipient_name || (lang === "id" ? "kamu" : "you"),
      url: shareUrl || window.location.href,
    });
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const containerStyle = { background: theme.bg, color: theme.text };

  const spans = [
    "col-span-8 row-span-2 aspect-[16/11]",
    "col-span-4 row-span-1 aspect-square",
    "col-span-4 row-span-1 aspect-square",
    "col-span-5 row-span-1 aspect-[5/4]",
    "col-span-7 row-span-1 aspect-[7/4]",
    "col-span-12 row-span-1 aspect-[16/6]",
  ];

  const confettiColors = [theme.accent, theme.text, theme.sub, "#ffffff"];

  return (
    <div className="relative min-h-screen" style={containerStyle} data-testid={`greeting-${themeKey}`}>
      {!isPreview && (
        <Curtain open={open} onOpen={handleOpen} theme={theme} recipientName={data?.recipient_name} t={t} />
      )}

      {open && (
        <CelebrationConfetti trigger={open} colors={confettiColors} persistent={themeKey === "playful"} />
      )}

      {open && themeKey !== "minimalist" && themeKey !== "luxury" && (
        <Balloons
          count={themeKey === "playful" ? 12 : 6}
          colors={[theme.accent, "#ffffff", theme.surface, theme.text]}
        />
      )}

      {data?.music_url && open && (
        <AudioPlayer src={data.music_url} accent={theme.accent} text={theme.bg} autoPlay={!isPreview} t={t} />
      )}

      {themeKey === "luxury" && <div className="grain absolute inset-0 z-[1] pointer-events-none" />}

      {/* Hero */}
      <section
        className={`relative z-10 px-6 sm:px-10 pt-20 pb-16 ${
          themeKey === "minimalist" ? "sm:pt-32 sm:pb-24" : ""
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: open ? 1 : 0, y: open ? 0 : 12 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className={`${theme.bodyClass} text-xs uppercase tracking-[0.3em] mb-4`}
            style={{ color: theme.sub }}
          >
            {data?.sender_name ? t("g.hero.from", { name: data.sender_name }) : t("g.hero.celebration")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: open ? 1 : 0, y: open ? 0 : 24 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className={`${theme.headingClass} text-5xl sm:text-7xl lg:text-8xl leading-[1.02]`}
            style={{ color: theme.text }}
          >
            {t("g.curtain.titleLine1")}
            <br />
            <span style={{ color: theme.accent }}>{data?.recipient_name || (lang === "id" ? "Sahabat" : "Friend")}</span>
          </motion.h1>

          {data?.intro_message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: open ? 1 : 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className={`${theme.bodyClass} mt-8 text-base sm:text-lg max-w-2xl`}
              style={{ color: theme.sub }}
            >
              {data.intro_message}
            </motion.p>
          )}

          <div className="mt-14">
            <Countdown date={data?.birthday_date} theme={theme} t={t} />
          </div>
        </div>
      </section>

      {data?.long_message && (
        <section className="relative z-10 px-6 sm:px-10 py-20" data-testid="long-message-section">
          <div className="max-w-2xl mx-auto">
            <p className={`${theme.bodyClass} text-xs uppercase tracking-[0.3em] mb-6`} style={{ color: theme.sub }}>
              {t("g.message.eyebrow")}
            </p>
            <TypeReveal
              text={data.long_message}
              className={`${theme.bodyClass} text-lg sm:text-xl leading-loose whitespace-pre-line`}
              style={{ color: theme.text }}
            />
          </div>
        </section>
      )}

      {photos.length > 0 && (
        <section className="relative z-10 px-6 sm:px-10 py-16" data-testid="gallery-section">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <div>
                <p className={`${theme.bodyClass} text-xs uppercase tracking-[0.3em]`} style={{ color: theme.sub }}>
                  {t("g.gallery.eyebrow")}
                </p>
                <h2 className={`${theme.headingClass} text-3xl sm:text-5xl mt-2`} style={{ color: theme.text }}>
                  {t("g.gallery.title")}
                </h2>
              </div>
              <div className="text-xs" style={{ color: theme.sub }}>
                {photos.length} {photos.length > 1 ? t("g.gallery.count.many") : t("g.gallery.count.one")}
              </div>
            </div>
            <div className="grid grid-cols-12 auto-rows-[100px] sm:auto-rows-[140px] gap-3 sm:gap-4">
              {photos.slice(0, 6).map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: i * 0.06 }}
                  className={`relative overflow-hidden ${spans[i % spans.length]}`}
                  style={{
                    borderRadius:
                      themeKey === "minimalist"
                        ? 0
                        : themeKey === "elegant" || themeKey === "luxury"
                        ? 4
                        : themeKey === "playful"
                        ? 28
                        : 24,
                    border: themeKey === "elegant" ? `1px solid ${theme.accent}55` : "none",
                  }}
                >
                  <img
                    src={p.url}
                    alt={p.caption || `memory-${i}`}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                  {p.caption && (
                    <div className={`${theme.bodyClass} absolute bottom-0 left-0 right-0 px-3 py-2 text-xs`}
                      style={{ background: "rgba(0,0,0,0.45)", color: "#fff" }}>
                      {p.caption}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {highlights.length > 0 && (
        <section className="relative z-10 px-6 sm:px-10 py-20" data-testid="highlights-section">
          <div className="max-w-3xl mx-auto">
            <p className={`${theme.bodyClass} text-xs uppercase tracking-[0.3em]`} style={{ color: theme.sub }}>
              {t("g.timeline.eyebrow")}
            </p>
            <h2 className={`${theme.headingClass} text-3xl sm:text-5xl mt-2 mb-12`} style={{ color: theme.text }}>
              {t("g.timeline.title")}
            </h2>
            <div className="relative pl-6 sm:pl-10">
              <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: `${theme.accent}66` }} />
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: i * 0.06 }}
                  className="relative pb-10"
                >
                  <span className="absolute -left-[27px] sm:-left-[42px] top-1 w-3 h-3 rounded-full" style={{ background: theme.accent }} />
                  <div className={`${theme.bodyClass} text-xs uppercase tracking-[0.3em] mb-2`} style={{ color: theme.accent }}>
                    {h.year}
                  </div>
                  <h3 className={`${theme.headingClass} text-2xl sm:text-3xl`} style={{ color: theme.text }}>
                    {h.title}
                  </h3>
                  {h.description && (
                    <p className={`${theme.bodyClass} mt-2 text-base`} style={{ color: theme.sub }}>
                      {h.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative z-10 px-6 sm:px-10 py-24" data-testid="share-section">
        <div className="max-w-3xl mx-auto text-center">
          <p className={`${theme.bodyClass} text-xs uppercase tracking-[0.3em]`} style={{ color: theme.sub }}>
            {t("g.share.eyebrow")}
          </p>
          <h2 className={`${theme.headingClass} text-3xl sm:text-5xl mt-2`} style={{ color: theme.text }}>
            {t("g.share.title")}
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onWhatsApp}
              data-testid="share-whatsapp-button"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm tracking-wider transition-transform duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "#25D366",
                color: "#0b3d2e",
                fontFamily: "Manrope, sans-serif",
                borderRadius: themeKey === "minimalist" ? 0 : 999,
              }}
            >
              <Share2 className="w-4 h-4" /> {t("g.share.whatsapp")}
            </button>
            <button
              onClick={onCopy}
              data-testid="copy-link-button"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm tracking-wider transition-transform duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "transparent",
                color: theme.text,
                border: `1px solid ${theme.accent}`,
                fontFamily: "Manrope, sans-serif",
                borderRadius: themeKey === "minimalist" ? 0 : 999,
              }}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? t("g.share.copied") : t("g.share.copy")}
            </button>
          </div>
        </div>
      </section>

      <footer
        className="relative z-10 px-6 sm:px-10 py-10 text-center"
        style={{ borderTop: `1px solid ${theme.accent}22`, color: theme.sub }}
      >
        <p className={`${theme.bodyClass} text-xs uppercase tracking-[0.3em]`}>
          {data?.sender_name ? t("g.footer.byName", { name: data.sender_name }) : t("g.footer.default")} · Birthday Story
        </p>
        <a
          href="https://azzaleazahira.id"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="brand-credit"
          className={`${theme.bodyClass} inline-flex items-center gap-2 mt-3 text-[10px] uppercase tracking-[0.3em] transition-opacity hover:opacity-80`}
          style={{ color: theme.accent }}
        >
          <span className="w-1 h-1 rounded-full" style={{ background: theme.accent }} />
          Crafted by <span style={{ color: theme.text, fontWeight: 500 }}>azzaleazahira.id</span>
        </a>
      </footer>
    </div>
  );
}
