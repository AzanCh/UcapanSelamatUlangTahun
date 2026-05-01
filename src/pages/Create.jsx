import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Trash2, Sparkles, Check, ChevronRight } from "lucide-react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Toaster, toast } from "sonner";
import { THEME_LIST, MUSIC_TRACKS, SAMPLE_PHOTOS } from "../lib/themes";
import GreetingRenderer from "../components/GreetingRenderer";
import { createGreeting, uploadAudio, uploadImage } from "../lib/api";
import { useLanguage, LangToggle } from "../lib/useLanguage";
import { LANGUAGES } from "../lib/i18n";

const today = () => new Date().toISOString().slice(0, 10);

const DEFAULT_FORM_EN = {
  recipient_name: "Olivia",
  sender_name: "With love, your team",
  birthday_date: today(),
  intro_message: "Today is for celebrating you — every laugh, every memory, every dream ahead.",
  long_message:
    "Where do I even begin? You make ordinary days feel like soft little celebrations. The way you laugh, the way you listen, the way you keep going — it's all such a quiet kind of magic.\n\nThis page is a tiny corner of the internet built only for you. A pause. A breath. A reminder that you are loved deeply and noticed often.\n\nHappy Birthday. May this year be your most tender, most adventurous, most you.",
  highlights: [
    { year: "2019", title: "We met", description: "An unforgettable first chapter." },
    { year: "2022", title: "First adventure", description: "The road trip we still talk about." },
    { year: "2025", title: "Today", description: "And here we are — celebrating you." },
  ],
};

const DEFAULT_FORM_ID = {
  recipient_name: "Olivia",
  sender_name: "Dengan cinta, dari kami",
  birthday_date: today(),
  intro_message: "Hari ini untuk merayakanmu — setiap tawa, setiap kenangan, setiap mimpi di depan.",
  long_message:
    "Dari mana aku harus mulai? Kamu membuat hari biasa terasa seperti perayaan kecil yang lembut. Cara kamu tertawa, cara kamu mendengarkan, cara kamu terus melangkah — semuanya adalah keajaiban yang tenang.\n\nHalaman ini adalah sudut kecil internet yang dibuat hanya untukmu. Sebuah jeda. Sebuah napas. Sebuah pengingat bahwa kamu dicintai dengan tulus dan diperhatikan setiap saat.\n\nSelamat Ulang Tahun. Semoga tahun ini menjadi yang paling lembut, paling penuh petualangan, paling menjadi dirimu.",
  highlights: [
    { year: "2019", title: "Kita bertemu", description: "Awal cerita yang tak terlupakan." },
    { year: "2022", title: "Petualangan pertama", description: "Perjalanan yang masih kita kenang." },
    { year: "2025", title: "Hari ini", description: "Dan di sinilah kita — merayakanmu." },
  ],
};

function buildDefaults(lang) {
  const base = lang === "id" ? DEFAULT_FORM_ID : DEFAULT_FORM_EN;
  return {
    ...base,
    photos: SAMPLE_PHOTOS.slice(0, 4).map((url) => ({ url, caption: "" })),
    theme: "elegant",
    music_url: MUSIC_TRACKS[0].url,
    accent_color: "",
    language: lang,
  };
}

export default function Create() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();
  const [form, setForm] = useState(() => {
    const queryTheme = params.get("theme");
    const base = buildDefaults(lang);
    if (queryTheme && THEME_LIST.find((x) => x.key === queryTheme)) base.theme = queryTheme;
    return base;
  });
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoProgress, setPhotoProgress] = useState({ done: 0, total: 0 });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onUploadAudio = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("audio/")) {
      toast.error(lang === "id" ? "File harus berupa audio" : "File must be audio");
      e.target.value = "";
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      toast.error(lang === "id" ? "Ukuran maksimum 15MB" : "Max size is 15MB");
      e.target.value = "";
      return;
    }
    setUploading(true);
    setUploadProgress(0);
    try {
      const res = await uploadAudio(file, (p) => setUploadProgress(p));
      set("music_url", res.url);
      setUploadedFileName(file.name);
      toast.success(lang === "id" ? "Musik berhasil diunggah" : "Music uploaded");
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.detail;
      toast.error(msg || (lang === "id" ? "Gagal mengunggah musik" : "Upload failed"));
    } finally {
      setUploading(false);
      setUploadProgress(0);
      e.target.value = "";
    }
  };

  const clearUploadedAudio = () => {
    set("music_url", "");
    setUploadedFileName("");
  };

  const updatePhoto = (i, k, v) =>
    setForm((f) => ({ ...f, photos: f.photos.map((p, j) => (i === j ? { ...p, [k]: v } : p)) }));
  const addPhoto = () => setForm((f) => ({ ...f, photos: [...f.photos, { url: "", caption: "" }] }));
  const removePhoto = (i) => setForm((f) => ({ ...f, photos: f.photos.filter((_, j) => i !== j) }));

  const onUploadPhotos = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const valid = files.filter((f) => f.type.startsWith("image/"));
    if (!valid.length) {
      toast.error(lang === "id" ? "File harus berupa gambar" : "Please choose image files");
      e.target.value = "";
      return;
    }
    setPhotoUploading(true);
    setPhotoProgress({ done: 0, total: valid.length });
    const uploaded = [];
    for (let i = 0; i < valid.length; i++) {
      const file = valid[i];
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name}: ${lang === "id" ? "ukuran maks 10MB" : "max size 10MB"}`);
        continue;
      }
      try {
        const res = await uploadImage(file);
        uploaded.push({ url: res.url, caption: "" });
        setPhotoProgress({ done: i + 1, total: valid.length });
      } catch (err) {
        const msg = err?.response?.data?.detail;
        toast.error(msg || `${file.name}: ${lang === "id" ? "gagal" : "failed"}`);
      }
    }
    if (uploaded.length) {
      setForm((f) => ({ ...f, photos: [...f.photos, ...uploaded] }));
      toast.success(
        lang === "id"
          ? `${uploaded.length} foto diunggah`
          : `${uploaded.length} photo${uploaded.length > 1 ? "s" : ""} uploaded`
      );
    }
    setPhotoUploading(false);
    setPhotoProgress({ done: 0, total: 0 });
    e.target.value = "";
  };

  const updateHighlight = (i, k, v) =>
    setForm((f) => ({
      ...f,
      highlights: f.highlights.map((p, j) => (i === j ? { ...p, [k]: v } : p)),
    }));
  const addHighlight = () =>
    setForm((f) => ({ ...f, highlights: [...f.highlights, { year: "", title: "", description: "" }] }));
  const removeHighlight = (i) =>
    setForm((f) => ({ ...f, highlights: f.highlights.filter((_, j) => i !== j) }));

  const previewData = useMemo(
    () => ({ ...form, photos: form.photos.filter((p) => p.url && p.url.trim()) }),
    [form]
  );

  const handleSubmit = async () => {
    if (!form.recipient_name.trim()) {
      toast.error(t("toast.error.name"));
      return;
    }
    if (!form.long_message.trim()) {
      toast.error(t("toast.error.message"));
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        photos: form.photos.filter((p) => p.url && p.url.trim()),
        highlights: form.highlights.filter((h) => h.title && h.title.trim()),
      };
      const res = await createGreeting(payload);
      toast.success(t("toast.success.create"));
      navigate(`/g/${res.slug}`);
    } catch (e) {
      console.error(e);
      toast.error(t("toast.error.create"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A]">
      <Toaster richColors position="top-center" />
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/80 border-b border-black/5">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-8 py-3 flex items-center justify-between gap-3">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-neutral-700 hover:text-black" data-testid="back-home">
            <ArrowLeft className="w-4 h-4" /> {t("create.back")}
          </Link>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-500">{t("create.steps")}</span>
          </div>
          <div className="flex items-center gap-2">
            <LangToggle lang={lang} setLang={setLang} />
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              data-testid="publish-greeting-btn"
              className="bg-black text-white hover:bg-black/90"
            >
              {submitting ? t("create.publishing") : t("create.publish")} <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 py-6 grid lg:grid-cols-12 gap-6">
        {/* Form */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-5">
          <div className="bg-white border border-black/10 rounded-xl p-5 sm:p-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-2">{t("create.step1.eyebrow")}</p>
            <h2 className="font-display-bold text-2xl">{t("create.step1.title")}</h2>

            <div className="grid grid-cols-1 gap-4 mt-5">
              <div>
                <Label htmlFor="recipient_name">{t("create.field.recipient")}</Label>
                <Input id="recipient_name" data-testid="input-recipient-name" value={form.recipient_name}
                  onChange={(e) => set("recipient_name", e.target.value)} placeholder={t("create.field.recipient.ph")} />
              </div>
              <div>
                <Label htmlFor="sender_name">{t("create.field.sender")}</Label>
                <Input id="sender_name" data-testid="input-sender-name" value={form.sender_name}
                  onChange={(e) => set("sender_name", e.target.value)} placeholder={t("create.field.sender.ph")} />
              </div>
              <div>
                <Label htmlFor="birthday_date">{t("create.field.date")}</Label>
                <Input id="birthday_date" type="date" data-testid="input-birthday-date" value={form.birthday_date}
                  onChange={(e) => set("birthday_date", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="intro_message">{t("create.field.intro")}</Label>
                <Input id="intro_message" data-testid="input-intro-message" value={form.intro_message}
                  onChange={(e) => set("intro_message", e.target.value)} placeholder={t("create.field.intro.ph")} />
              </div>
              <div>
                <Label htmlFor="long_message">{t("create.field.long")}</Label>
                <Textarea id="long_message" data-testid="input-long-message" rows={8} value={form.long_message}
                  onChange={(e) => set("long_message", e.target.value)} placeholder={t("create.field.long.ph")} />
              </div>
            </div>
          </div>

          <div className="bg-white border border-black/10 rounded-xl p-5 sm:p-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-2">{t("create.step2.eyebrow")}</p>
            <h2 className="font-display-bold text-2xl">{t("create.step2.title")}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-5">
              {THEME_LIST.map((th) => (
                <button
                  key={th.key}
                  onClick={() => set("theme", th.key)}
                  data-testid={`theme-selector-${th.key}`}
                  className={`relative p-3 text-left rounded-lg border transition-all ${
                    form.theme === th.key ? "ring-2 ring-black border-transparent" : "border-black/10 hover:border-black/30"
                  }`}
                  style={{ background: th.bg, color: th.text }}
                >
                  <span className="block text-[9px] uppercase tracking-[0.25em]" style={{ color: th.sub }}>
                    {th.vibe.split("·")[0]}
                  </span>
                  <span className={`${th.headingClass} block text-lg mt-1`}>{th.name}</span>
                  <span className="absolute bottom-2 right-2 w-4 h-4 rounded-full" style={{ background: th.accent }} />
                  {form.theme === th.key && (
                    <Check className="absolute top-2 right-2 w-4 h-4" style={{ color: th.accent }} />
                  )}
                </button>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="accent_color">{t("create.field.accent")}</Label>
                <div className="flex items-center gap-2 mt-1">
                  <input id="accent_color" type="color" data-testid="input-accent-color"
                    value={form.accent_color || THEME_LIST.find((x) => x.key === form.theme).accent}
                    onChange={(e) => set("accent_color", e.target.value)}
                    className="w-10 h-10 rounded border border-black/10 cursor-pointer" />
                  <Input value={form.accent_color} onChange={(e) => set("accent_color", e.target.value)} placeholder="#D4AF37" />
                </div>
              </div>
              <div>
                <Label>{t("create.field.music")}</Label>
                <Select
                  value={form.music_url ? form.music_url : "__none__"}
                  onValueChange={(v) => {
                    set("music_url", v === "__none__" ? "" : v);
                    if (v !== form.music_url) setUploadedFileName("");
                  }}
                >
                  <SelectTrigger data-testid="select-music"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">{t("create.field.musicNone")}</SelectItem>
                    {MUSIC_TRACKS.map((tr) => (
                      <SelectItem key={tr.id} value={tr.url}>{tr.name}</SelectItem>
                    ))}
                    {uploadedFileName && form.music_url && (
                      <SelectItem value={form.music_url}>
                        ↑ {uploadedFileName}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <Input className="mt-2" data-testid="input-custom-music" value={form.music_url}
                  onChange={(e) => { set("music_url", e.target.value); setUploadedFileName(""); }}
                  placeholder={t("create.field.music.ph")} />

                {/* Upload music */}
                <div className="mt-3 p-3 rounded-lg border border-dashed border-black/15 bg-[#FAFAFA]">
                  <Label htmlFor="music-upload" className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                    {t("create.field.musicUpload")}
                  </Label>
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      id="music-upload"
                      type="file"
                      accept="audio/*"
                      onChange={onUploadAudio}
                      disabled={uploading}
                      data-testid="input-upload-music"
                      className="block w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-black file:text-white hover:file:bg-black/80 file:cursor-pointer cursor-pointer"
                    />
                    {form.music_url && uploadedFileName && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={clearUploadedAudio}
                        data-testid="clear-uploaded-music-btn"
                        title={lang === "id" ? "Hapus" : "Clear"}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  {uploading && (
                    <div className="mt-2">
                      <div className="h-1 bg-black/10 rounded overflow-hidden">
                        <div className="h-full bg-black transition-all" style={{ width: `${uploadProgress}%` }} />
                      </div>
                      <p className="text-[10px] mt-1 text-neutral-500 uppercase tracking-widest">
                        {lang === "id" ? "Mengunggah…" : "Uploading…"} {uploadProgress}%
                      </p>
                    </div>
                  )}
                  {uploadedFileName && !uploading && (
                    <p className="text-[11px] mt-2 text-neutral-600 truncate" data-testid="uploaded-music-name">
                      ✓ {uploadedFileName}
                    </p>
                  )}
                  <p className="text-[10px] mt-2 text-neutral-500">
                    {lang === "id" ? "MP3, WAV, OGG, M4A · maks 15MB" : "MP3, WAV, OGG, M4A · max 15MB"}
                  </p>
                </div>
              </div>
              <div className="sm:col-span-2">
                <Label>{t("create.field.lang")}</Label>
                <Select value={form.language} onValueChange={(v) => set("language", v)}>
                  <SelectTrigger data-testid="select-greeting-language"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((l) => (
                      <SelectItem key={l.code} value={l.code}>{l.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="bg-white border border-black/10 rounded-xl p-5 sm:p-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-2">{t("create.step3.eyebrow")}</p>
            <h2 className="font-display-bold text-2xl">{t("create.step3.title")}</h2>
            <Tabs defaultValue="photos" className="mt-4">
              <TabsList>
                <TabsTrigger value="photos" data-testid="tab-photos">{t("create.tab.photos")}</TabsTrigger>
                <TabsTrigger value="highlights" data-testid="tab-highlights">{t("create.tab.highlights")}</TabsTrigger>
              </TabsList>
              <TabsContent value="photos" className="space-y-3 pt-3">
                {/* Upload zone */}
                <label
                  htmlFor="photo-upload"
                  className={`block w-full p-5 rounded-lg border border-dashed cursor-pointer transition-colors text-center ${
                    photoUploading ? "border-black/40 bg-black/5" : "border-black/15 bg-[#FAFAFA] hover:bg-black/5"
                  }`}
                  data-testid="photo-upload-zone"
                >
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={onUploadPhotos}
                    disabled={photoUploading}
                    data-testid="input-upload-photos"
                    className="hidden"
                  />
                  <div className="flex flex-col items-center gap-1">
                    <Plus className="w-5 h-5 text-neutral-700" />
                    <p className="text-sm font-medium">
                      {photoUploading
                        ? `${lang === "id" ? "Mengunggah" : "Uploading"} ${photoProgress.done}/${photoProgress.total}…`
                        : t("create.photo.upload.cta")}
                    </p>
                    <p className="text-[11px] text-neutral-500">
                      {t("create.photo.upload.hint")}
                    </p>
                  </div>
                </label>

                {/* Thumbnails grid */}
                {form.photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {form.photos.map((p, i) => (
                      <div
                        key={i}
                        className="relative group rounded-lg overflow-hidden border border-black/10 bg-neutral-100 aspect-square"
                        data-testid={`photo-thumb-${i}`}
                      >
                        {p.url ? (
                          <img
                            src={p.url}
                            alt={`photo-${i}`}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.style.opacity = 0.3; }}
                          />
                        ) : (
                          <div className="w-full h-full grid place-items-center text-[10px] text-neutral-500 px-2 text-center">
                            {lang === "id" ? "URL kosong" : "No URL"}
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removePhoto(i)}
                          data-testid={`remove-photo-${i}`}
                          className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/70 text-white grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <input
                          value={p.caption}
                          onChange={(e) => updatePhoto(i, "caption", e.target.value)}
                          placeholder={t("create.photo.caption.ph")}
                          className="absolute bottom-0 left-0 right-0 px-2 py-1 text-[11px] bg-black/60 text-white placeholder-white/60 outline-none focus:bg-black/80"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Advanced: paste URL */}
                <details className="rounded-lg border border-black/10 px-3 py-2">
                  <summary className="text-xs uppercase tracking-[0.2em] text-neutral-500 cursor-pointer">
                    {t("create.photo.advanced")}
                  </summary>
                  <div className="space-y-2 pt-3">
                    {form.photos.map((p, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Input
                          value={p.url}
                          onChange={(e) => updatePhoto(i, "url", e.target.value)}
                          placeholder={t("create.photo.url.ph")}
                          data-testid={`input-photo-url-${i}`}
                        />
                      </div>
                    ))}
                    <Button variant="outline" onClick={addPhoto} data-testid="add-photo-btn" className="w-full">
                      <Plus className="w-4 h-4 mr-2" /> {t("create.photo.addUrl")}
                    </Button>
                  </div>
                </details>
              </TabsContent>
              <TabsContent value="highlights" className="space-y-3 pt-3">
                {form.highlights.map((h, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2 p-3 rounded-lg border border-black/10">
                    <Input className="col-span-3" value={h.year} onChange={(e) => updateHighlight(i, "year", e.target.value)}
                      placeholder={t("create.highlight.year")} data-testid={`input-highlight-year-${i}`} />
                    <Input className="col-span-8" value={h.title} onChange={(e) => updateHighlight(i, "title", e.target.value)}
                      placeholder={t("create.highlight.title")} data-testid={`input-highlight-title-${i}`} />
                    <Button variant="ghost" size="icon" className="col-span-1" onClick={() => removeHighlight(i)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Textarea className="col-span-12" rows={2} value={h.description}
                      onChange={(e) => updateHighlight(i, "description", e.target.value)}
                      placeholder={t("create.highlight.desc")} />
                  </div>
                ))}
                <Button variant="outline" onClick={addHighlight} data-testid="add-highlight-btn" className="w-full">
                  <Plus className="w-4 h-4 mr-2" /> {t("create.addHighlight")}
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="sticky top-[68px]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 inline-flex items-center gap-2">
                <Sparkles className="w-3 h-3" /> {t("create.preview.label")}
              </p>
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                {t("create.preview.theme")}: {form.theme}
              </span>
            </div>
            <motion.div
              key={`${form.theme}-${form.language}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl overflow-hidden border border-black/10 shadow-xl bg-white"
              style={{ height: "78vh" }}
              data-testid="live-preview"
            >
              <div className="h-full overflow-y-auto">
                <GreetingRenderer data={previewData} isPreview />
              </div>
            </motion.div>
            <p className="mt-3 text-xs text-neutral-500 text-center">{t("create.preview.note")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
