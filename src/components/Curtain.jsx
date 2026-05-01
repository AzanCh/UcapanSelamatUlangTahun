import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Curtain({ open, onOpen, theme, recipientName, t }) {
  const tt = t || ((k) => k);
  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          key="curtain"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 overflow-hidden"
          data-testid="greeting-curtain"
        >
          <motion.div
            className="absolute top-0 left-0 h-full w-1/2"
            initial={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            style={{ background: theme.surface }}
          />
          <motion.div
            className="absolute top-0 right-0 h-full w-1/2"
            initial={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            style={{ background: theme.surface }}
          />
          <div className="relative z-10 h-full flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center max-w-xl"
              style={{ color: theme.text }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 180, damping: 14 }}
                className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs uppercase tracking-[0.25em]"
                style={{ border: `1px solid ${theme.accent}`, color: theme.accent, borderRadius: 999 }}
              >
                <Sparkles className="w-3 h-3" /> {tt("g.curtain.eyebrow")}
              </motion.div>
              <h1 className={`${theme.headingClass} text-5xl sm:text-6xl lg:text-7xl leading-[1.05]`}>
                {tt("g.curtain.titleLine1")}
                <br />
                <span style={{ color: theme.accent }}>{recipientName || "Friend"}</span>
              </h1>
              <p className={`${theme.bodyClass} mt-6`} style={{ color: theme.sub }}>
                {tt("g.curtain.subtitle")}
              </p>
              <motion.button
                onClick={onOpen}
                data-testid="open-greeting-button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`${theme.btnRadius} mt-10 inline-flex items-center gap-2 px-8 py-4 text-sm tracking-widest uppercase`}
                style={{
                  background: theme.accent,
                  color: theme.bg,
                  fontFamily: "Manrope, sans-serif",
                  letterSpacing: "0.18em",
                }}
              >
                {tt("g.curtain.cta")}
              </motion.button>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-12"
              >
                <a
                  href="https://azzaleazahira.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="curtain-brand-credit"
                  className={`${theme.bodyClass} inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.35em]`}
                  style={{ color: theme.sub }}
                >
                  Crafted by{" "}
                  <span style={{ color: theme.accent, fontWeight: 500 }}>azzaleazahira.id</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
