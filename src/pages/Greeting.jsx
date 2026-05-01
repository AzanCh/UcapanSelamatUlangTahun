import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGreeting } from "../lib/api";
import GreetingRenderer from "../components/GreetingRenderer";
import { useLenis } from "../lib/useLenis";
import { makeT } from "../lib/i18n";

export default function Greeting() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  useLenis();

  useEffect(() => {
    let live = true;
    fetchGreeting(slug)
      .then((d) => { if (live) setData(d); })
      .catch(() => live && setError("not_found"));
    return () => { live = false; };
  }, [slug]);

  if (error) {
    const t = makeT("en"); // fallback when no data
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-3">404</p>
          <h1 className="font-elegant-h text-4xl sm:text-5xl mb-2">{t("g.404.title")}</h1>
          <p className="text-neutral-500">{t("g.404.body")}</p>
          <a href="/" className="inline-block mt-6 underline">{t("g.404.back")}</a>
        </div>
      </div>
    );
  }
  if (!data) {
    const t = makeT("en");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-sm text-neutral-500 tracking-wider uppercase animate-pulse">{t("g.loading")}</div>
      </div>
    );
  }
  return <GreetingRenderer data={data} shareUrl={window.location.href} />;
}
