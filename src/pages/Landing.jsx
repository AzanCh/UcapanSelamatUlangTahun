import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Heart, Wand2, Music, Image as ImageIcon, Share2, Palette, ArrowRight, Check } from "lucide-react";
import { useLenis } from "../lib/useLenis";
import { THEME_LIST } from "../lib/themes";
import { useLanguage, LangToggle } from "../lib/useLanguage";

const HERO_IMG =
  "https://images.unsplash.com/photo-1582180834946-f3d376b18376?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600";

export default function Landing() {
  useLenis();
  const { lang, setLang, t } = useLanguage();

  const FEATURES = [
    { icon: Wand2, title: t("feature.curtain.title"), desc: t("feature.curtain.desc") },
    { icon: Heart, title: t("feature.story.title"), desc: t("feature.story.desc") },
    { icon: ImageIcon, title: t("feature.gallery.title"), desc: t("feature.gallery.desc") },
    { icon: Music, title: t("feature.music.title"), desc: t("feature.music.desc") },
    { icon: Palette, title: t("feature.themes.title"), desc: t("feature.themes.desc") },
    { icon: Share2, title: t("feature.share.title"), desc: t("feature.share.desc") },
  ];

  return (
    <div className="bg-[#FAFAFA] text-[#0A0A0A]">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2" data-testid="logo-link">
            <div className="w-8 h-8 rounded-md bg-black text-white grid place-items-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display-bold text-lg tracking-tight">Birthday Story</span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-500">by azzaleazahira.id</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-700">
            <a href="#themes" className="hover:text-black">{t("nav.themes")}</a>
            <a href="#features" className="hover:text-black">{t("nav.features")}</a>
            <a href="#pricing" className="hover:text-black">{t("nav.pricing")}</a>
          </nav>
          <div className="flex items-center gap-3">
            <LangToggle lang={lang} setLang={setLang} />
            <Link
              to="/create"
              data-testid="header-create-cta"
              className="hidden sm:inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm transition-transform hover:scale-105"
            >
              {t("nav.create")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      <section className="px-6 sm:px-10 pt-20 pb-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-xs tracking-widest uppercase"
            >
              <Sparkles className="w-3 h-3" /> {t("hero.badge")}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display-bold text-5xl sm:text-7xl lg:text-[88px] leading-[0.95] mt-6 tracking-tight"
            >
              {t("hero.title.1")}
              <br />
              {t("hero.title.2")}
              <br />
              <span className="italic font-elegant-h">{t("hero.title.3")}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8 text-lg text-neutral-600 max-w-xl leading-relaxed"
            >
              {t("hero.subtitle")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/create"
                data-testid="hero-create-cta"
                className="group inline-flex items-center gap-2 bg-black text-white px-6 py-4 rounded-md text-sm tracking-wider uppercase hover:scale-105 transition-transform"
              >
                {t("hero.cta.create")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#themes"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-md text-sm tracking-wider uppercase border border-black/15 hover:bg-black hover:text-white transition-colors"
              >
                {t("hero.cta.preview")}
              </a>
            </motion.div>
            <div className="mt-10 flex items-center gap-6 text-xs text-neutral-500 uppercase tracking-widest">
              <span className="inline-flex items-center gap-2"><Check className="w-3 h-3" /> {t("hero.tag.themes")}</span>
              <span className="inline-flex items-center gap-2"><Check className="w-3 h-3" /> {t("hero.tag.mobile")}</span>
              <span className="inline-flex items-center gap-2"><Check className="w-3 h-3" /> {t("hero.tag.commercial")}</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src={HERO_IMG} alt="Premium birthday cake" className="w-full h-[560px] object-cover" />
              <div className="absolute bottom-4 left-4 right-4 backdrop-blur-md bg-white/80 rounded-xl p-4 border border-white/60">
                <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">{t("hero.preview.label")}</p>
                <p className="font-elegant-h text-2xl mt-1 leading-tight">{t("hero.preview.headline")}</p>
                <p className="text-xs text-neutral-600 mt-1">{t("hero.preview.sub")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-black/5 bg-white overflow-hidden">
        <div className="marquee-track flex whitespace-nowrap py-5 text-sm uppercase tracking-[0.3em] text-neutral-500">
          {Array.from({ length: 2 }).map((_, j) => (
            <span key={j} className="flex items-center gap-12 pr-12">
              <span>· Romantic</span>
              <span>· Elegant</span>
              <span>· Playful</span>
              <span>· Minimalist</span>
              <span>· Luxury</span>
              <span>· Confetti</span>
              <span>· WhatsApp Share</span>
              <span>· Custom Music</span>
              <span>· Photo Timeline</span>
              <span>· Countdown</span>
            </span>
          ))}
        </div>
      </section>

      <section id="themes" className="px-6 sm:px-10 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">{t("themes.eyebrow")}</p>
              <h2 className="font-display-bold text-4xl sm:text-6xl tracking-tight mt-2">{t("themes.title")}</h2>
            </div>
            <p className="max-w-md text-neutral-600">{t("themes.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {THEME_LIST.map((th, i) => (
              <motion.div
                key={th.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative overflow-hidden rounded-xl border"
                style={{ borderColor: `${th.accent}55` }}
                data-testid={`theme-card-${th.key}`}
              >
                <div className="p-8 sm:p-10 min-h-[300px] flex flex-col justify-between" style={{ background: th.bg, color: th.text }}>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: th.sub }}>{th.vibe}</p>
                    <h3 className={`${th.headingClass} text-4xl sm:text-5xl mt-3`}>{th.name}</h3>
                    <p className={`${th.bodyClass} mt-3 text-sm`} style={{ color: th.sub }}>
                      {t("themes.cardLine", { name: th.name.toLowerCase() })}
                    </p>
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="inline-block w-10 h-10 rounded-full" style={{ background: th.accent }} />
                    <Link
                      to={`/create?theme=${th.key}`}
                      data-testid={`theme-cta-${th.key}`}
                      className="text-xs uppercase tracking-[0.25em] underline underline-offset-4"
                      style={{ color: th.text }}
                    >
                      {t("themes.try")}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="px-6 sm:px-10 py-24 bg-white border-y border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">{t("features.eyebrow")}</p>
              <h2 className="font-display-bold text-4xl sm:text-5xl mt-2 tracking-tight">{t("features.title")}</h2>
              <p className="mt-6 text-neutral-600 leading-relaxed">{t("features.body")}</p>
            </div>
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="p-6 rounded-xl border border-black/10 bg-[#FAFAFA]"
                >
                  <f.icon className="w-5 h-5" />
                  <h3 className="mt-4 font-display-bold text-lg">{f.title}</h3>
                  <p className="text-sm text-neutral-600 mt-2 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="px-6 sm:px-10 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">{t("pricing.eyebrow")}</p>
          <h2 className="font-display-bold text-4xl sm:text-6xl mt-2 tracking-tight">{t("pricing.title")}</h2>
          <p className="mt-6 text-neutral-600 max-w-xl mx-auto">{t("pricing.body")}</p>
          <div className="mt-10 inline-flex flex-col sm:flex-row gap-3">
            <Link
              to="/create"
              data-testid="footer-create-cta"
              className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-md text-sm tracking-wider uppercase hover:scale-105 transition-transform"
            >
              {t("pricing.cta")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-6 sm:px-10 py-12 border-t border-black/5 text-center">
        <p className="font-display-bold text-sm tracking-tight">
          {t("footer.tagline")}
        </p>
        <a
          href="https://azzaleazahira.id"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="brand-credit"
          className="inline-flex items-center gap-2 mt-3 text-xs uppercase tracking-[0.3em] text-neutral-500 hover:text-black transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-black" />
          Crafted by <span className="font-medium text-black">azzaleazahira.id</span>
        </a>
      </footer>
    </div>
  );
}
