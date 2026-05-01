import { useEffect, useState, useCallback } from "react";
import { makeT, LANGUAGES } from "./i18n";

const KEY = "bs.lang";

export function useLanguage() {
  const [lang, setLangState] = useState(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem(KEY);
    if (saved && LANGUAGES.find((l) => l.code === saved)) return saved;
    const nav = (navigator.language || "en").toLowerCase();
    return nav.startsWith("id") ? "id" : "en";
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, lang);
    } catch {}
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const setLang = useCallback((code) => {
    if (LANGUAGES.find((l) => l.code === code)) setLangState(code);
  }, []);

  const t = makeT(lang);
  return { lang, setLang, t };
}

export function LangToggle({ lang, setLang, dark = false }) {
  return (
    <div
      data-testid="lang-toggle"
      className={`inline-flex items-center rounded-full p-0.5 text-xs ${
        dark ? "bg-white/10 text-white" : "bg-black/5 text-neutral-700"
      }`}
    >
      {LANGUAGES.map((l) => {
        const active = lang === l.code;
        return (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            data-testid={`lang-${l.code}`}
            className={`px-3 py-1 rounded-full transition-colors ${
              active ? (dark ? "bg-white text-black" : "bg-black text-white") : ""
            }`}
            aria-label={l.name}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
