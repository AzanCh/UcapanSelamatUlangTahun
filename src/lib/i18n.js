// Simple i18n dictionary — en (English) & id (Bahasa Indonesia)
export const LANGUAGES = [
  { code: "en", label: "EN", name: "English" },
  { code: "id", label: "ID", name: "Bahasa Indonesia" },
];

const dict = {
  en: {
    // Landing — header
    "nav.themes": "Themes",
    "nav.features": "Features",
    "nav.pricing": "Pricing",
    "nav.create": "Create greeting",

    // Landing — hero
    "hero.badge": "Premium Template · v1",
    "hero.title.1": "The most heartfelt",
    "hero.title.2": "way to say",
    "hero.title.3": "happy birthday.",
    "hero.subtitle":
      "A premium, mobile-first birthday greeting builder. Five distinct themes, cinematic animations, custom music, photo timelines, and a unique shareable link — ready to ship as a digital product.",
    "hero.cta.create": "Create your greeting",
    "hero.cta.preview": "Preview themes",
    "hero.tag.themes": "5 Themes",
    "hero.tag.mobile": "Mobile-first",
    "hero.tag.commercial": "Commercial use",
    "hero.preview.label": "Live preview",
    "hero.preview.headline": "Happy Birthday, Olivia.",
    "hero.preview.sub": "Curtain opens · Music plays · Confetti falls",

    // Marquee items left as-is (theme names are universal)

    // Themes section
    "themes.eyebrow": "Five distinct moods",
    "themes.title": "Pick the feeling.",
    "themes.subtitle":
      "Each theme is its own world — different fonts, color logic, and motion physics. Not just color swaps.",
    "themes.try": "Try this style →",
    "themes.cardLine": "Happy Birthday — built for the {name} soul.",

    // Features
    "features.eyebrow": "Everything included",
    "features.title": "Built to feel premium.",
    "features.body":
      "Every detail is intentional — from the slow curtain reveal to the bento photo grid, from the soft confetti to the music pill. Sell it, gift it, customize it.",
    "feature.curtain.title": "Animated curtain opener",
    "feature.curtain.desc": "A cinematic 'Open Message' moment that makes recipients smile before they even read.",
    "feature.story.title": "Emotional storytelling",
    "feature.story.desc": "Long-form personal message with elegant typewriter reveal as readers scroll.",
    "feature.gallery.title": "Bento photo gallery",
    "feature.gallery.desc": "Asymmetric, editorial layouts — far from a boring 3×3 grid.",
    "feature.music.title": "Background music",
    "feature.music.desc": "Pick from curated royalty-free tracks or paste any audio URL.",
    "feature.themes.title": "5 distinct themes",
    "feature.themes.desc": "Romantic, Elegant, Playful, Minimalist, Luxury — each with its own typography & motion.",
    "feature.share.title": "Unique shareable URL",
    "feature.share.desc": "Every greeting gets its own personalized link, ready for WhatsApp.",

    // Pricing
    "pricing.eyebrow": "A digital product, ready to ship",
    "pricing.title": "One template. Endless joy.",
    "pricing.body":
      "Use this template to gift unforgettable birthday experiences — or sell it as a service. The unique URL system makes every greeting personal.",
    "pricing.cta": "Start creating",

    // Footer
    "footer.tagline": "Birthday Story · A premium greeting template",

    // Create — header
    "create.back": "Home",
    "create.steps": "Customize → Preview → Share",
    "create.publish": "Publish & get URL",
    "create.publishing": "Publishing…",

    // Create — sections
    "create.step1.eyebrow": "Step 01",
    "create.step1.title": "Recipient & message",
    "create.field.recipient": "Recipient's name",
    "create.field.recipient.ph": "e.g. Olivia",
    "create.field.sender": "From (signature)",
    "create.field.sender.ph": "e.g. Mike",
    "create.field.date": "Birthday date",
    "create.field.intro": "Intro line (short)",
    "create.field.intro.ph": "A one-liner above the countdown",
    "create.field.long": "Personal message (long)",
    "create.field.long.ph": "Pour your heart out…",

    "create.step2.eyebrow": "Step 02",
    "create.step2.title": "Theme & style",
    "create.field.accent": "Accent color (override)",
    "create.field.music": "Background music",
    "create.field.music.ph": "…or paste any audio URL",
    "create.field.musicNone": "No music",
    "create.field.musicUpload": "Or upload your own music",
    "create.field.lang": "Greeting language",

    "create.step3.eyebrow": "Step 03",
    "create.step3.title": "Photos & memories",
    "create.tab.photos": "Photos",
    "create.tab.highlights": "Timeline",
    "create.photo.url.ph": "https://image-url.jpg",
    "create.photo.caption.ph": "Caption (optional)",
    "create.photo.upload.cta": "Click to upload photos · or drop them here",
    "create.photo.upload.hint": "JPG, PNG, WEBP, GIF, HEIC · max 10MB each · multiple allowed",
    "create.photo.advanced": "Advanced · paste image URLs",
    "create.photo.addUrl": "Add another URL",
    "create.addPhoto": "Add photo",
    "create.highlight.year": "Year",
    "create.highlight.title": "Title",
    "create.highlight.desc": "Short description",
    "create.addHighlight": "Add highlight",

    "create.preview.label": "Live preview",
    "create.preview.theme": "Theme",
    "create.preview.note": "The full curtain animation, music, and confetti play on the published page.",
    "toast.error.name": "Please enter the recipient's name",
    "toast.error.message": "Please write a personal message",
    "toast.error.create": "Could not create greeting. Please try again.",
    "toast.success.create": "Greeting created!",

    // Greeting — UI strings
    "g.curtain.eyebrow": "A message just for you",
    "g.curtain.titleLine1": "Happy Birthday,",
    "g.curtain.subtitle": "Someone has prepared something special for you.",
    "g.curtain.cta": "Open Message →",
    "g.hero.from": "From {name}",
    "g.hero.celebration": "A celebration",
    "g.countdown.today.label": "Today is the day",
    "g.countdown.today.title.1": "It's",
    "g.countdown.today.title.2": "your",
    "g.countdown.today.title.3": "Birthday!",
    "g.countdown.label": "Counting down to your day",
    "g.countdown.days": "Days",
    "g.countdown.hours": "Hours",
    "g.countdown.minutes": "Minutes",
    "g.countdown.seconds": "Seconds",
    "g.message.eyebrow": "A few words for you",
    "g.gallery.eyebrow": "Memories captured",
    "g.gallery.title": "A gallery of you.",
    "g.gallery.count.one": "moment",
    "g.gallery.count.many": "moments",
    "g.timeline.eyebrow": "Highlight moments",
    "g.timeline.title": "The story so far.",
    "g.share.eyebrow": "Pass the joy",
    "g.share.title": "Share this moment.",
    "g.share.whatsapp": "Share on WhatsApp",
    "g.share.copy": "Copy link",
    "g.share.copied": "Copied!",
    "g.audio.play": "Play music",
    "g.audio.pause": "Pause music",
    "g.footer.byName": "Made with love by {name}",
    "g.footer.default": "Made with love",
    "g.share.text": "🎉 A special birthday message for {name}: {url}",
    "g.404.title": "No greeting here.",
    "g.404.body": "This birthday link may have expired or doesn't exist.",
    "g.404.back": "Back to home",
    "g.loading": "Loading your greeting…",
  },
  id: {
    "nav.themes": "Tema",
    "nav.features": "Fitur",
    "nav.pricing": "Harga",
    "nav.create": "Buat ucapan",

    "hero.badge": "Template Premium · v1",
    "hero.title.1": "Cara paling tulus",
    "hero.title.2": "untuk mengucapkan",
    "hero.title.3": "selamat ulang tahun.",
    "hero.subtitle":
      "Pembuat ucapan ulang tahun premium, mobile-first. Lima tema berbeda, animasi sinematik, musik kustom, linimasa foto, dan tautan unik untuk dibagikan — siap dijual sebagai produk digital.",
    "hero.cta.create": "Buat ucapanmu",
    "hero.cta.preview": "Lihat tema",
    "hero.tag.themes": "5 Tema",
    "hero.tag.mobile": "Mobile-first",
    "hero.tag.commercial": "Komersial",
    "hero.preview.label": "Pratinjau langsung",
    "hero.preview.headline": "Selamat Ulang Tahun, Olivia.",
    "hero.preview.sub": "Tirai terbuka · Musik bermain · Confetti turun",

    "themes.eyebrow": "Lima suasana berbeda",
    "themes.title": "Pilih perasaannya.",
    "themes.subtitle":
      "Setiap tema punya dunianya sendiri — font, logika warna, dan dinamika animasi yang berbeda. Bukan sekadar ganti warna.",
    "themes.try": "Coba gaya ini →",
    "themes.cardLine": "Selamat Ulang Tahun — dibuat untuk jiwa {name}.",

    "features.eyebrow": "Semuanya termasuk",
    "features.title": "Dibuat terasa premium.",
    "features.body":
      "Setiap detail disengaja — dari pembukaan tirai yang lambat hingga galeri bento, dari confetti lembut hingga tombol musik. Jual, hadiahkan, atau sesuaikan.",
    "feature.curtain.title": "Tirai pembuka beranimasi",
    "feature.curtain.desc": "Momen sinematik 'Buka Pesan' yang bikin penerima tersenyum sebelum membaca.",
    "feature.story.title": "Cerita yang menyentuh",
    "feature.story.desc": "Pesan panjang personal dengan reveal mesin tik elegan saat di-scroll.",
    "feature.gallery.title": "Galeri foto bento",
    "feature.gallery.desc": "Tata letak asimetris dan editorial — jauh dari grid 3×3 yang membosankan.",
    "feature.music.title": "Musik latar",
    "feature.music.desc": "Pilih dari trek bebas royalti atau tempel URL audio apa pun.",
    "feature.themes.title": "5 tema berbeda",
    "feature.themes.desc": "Romantis, Elegan, Playful, Minimalis, Luxury — masing-masing dengan tipografi & gerak khasnya.",
    "feature.share.title": "URL unik untuk dibagikan",
    "feature.share.desc": "Setiap ucapan punya tautan personal sendiri, siap untuk WhatsApp.",

    "pricing.eyebrow": "Produk digital, siap dijual",
    "pricing.title": "Satu template. Sukacita tanpa batas.",
    "pricing.body":
      "Gunakan template ini untuk menghadiahkan ulang tahun yang tak terlupakan — atau jual sebagai jasa. Sistem URL unik membuat setiap ucapan terasa personal.",
    "pricing.cta": "Mulai membuat",

    "footer.tagline": "Birthday Story · Template ucapan premium",

    "create.back": "Beranda",
    "create.steps": "Sesuaikan → Pratinjau → Bagikan",
    "create.publish": "Terbitkan & dapatkan URL",
    "create.publishing": "Menerbitkan…",

    "create.step1.eyebrow": "Langkah 01",
    "create.step1.title": "Penerima & pesan",
    "create.field.recipient": "Nama penerima",
    "create.field.recipient.ph": "mis. Olivia",
    "create.field.sender": "Dari (tanda tangan)",
    "create.field.sender.ph": "mis. Mike",
    "create.field.date": "Tanggal ulang tahun",
    "create.field.intro": "Kalimat pembuka (singkat)",
    "create.field.intro.ph": "Satu kalimat di atas hitung mundur",
    "create.field.long": "Pesan personal (panjang)",
    "create.field.long.ph": "Curahkan isi hatimu…",

    "create.step2.eyebrow": "Langkah 02",
    "create.step2.title": "Tema & gaya",
    "create.field.accent": "Warna aksen (override)",
    "create.field.music": "Musik latar",
    "create.field.music.ph": "…atau tempel URL audio apa pun",
    "create.field.musicNone": "Tanpa musik",
    "create.field.musicUpload": "Atau unggah musik milikmu",
    "create.field.lang": "Bahasa ucapan",

    "create.step3.eyebrow": "Langkah 03",
    "create.step3.title": "Foto & kenangan",
    "create.tab.photos": "Foto",
    "create.tab.highlights": "Linimasa",
    "create.photo.url.ph": "https://url-gambar.jpg",
    "create.photo.caption.ph": "Keterangan (opsional)",
    "create.photo.upload.cta": "Klik untuk unggah foto · atau seret ke sini",
    "create.photo.upload.hint": "JPG, PNG, WEBP, GIF, HEIC · maks 10MB per foto · bisa banyak sekaligus",
    "create.photo.advanced": "Lanjutan · tempel URL gambar",
    "create.photo.addUrl": "Tambah URL lagi",
    "create.addPhoto": "Tambah foto",
    "create.highlight.year": "Tahun",
    "create.highlight.title": "Judul",
    "create.highlight.desc": "Deskripsi singkat",
    "create.addHighlight": "Tambah momen",

    "create.preview.label": "Pratinjau langsung",
    "create.preview.theme": "Tema",
    "create.preview.note": "Animasi tirai, musik, dan confetti penuh akan tampil di halaman publik.",
    "toast.error.name": "Tolong masukkan nama penerima",
    "toast.error.message": "Tolong tulis pesan personal",
    "toast.error.create": "Gagal membuat ucapan. Coba lagi.",
    "toast.success.create": "Ucapan berhasil dibuat!",

    "g.curtain.eyebrow": "Sebuah pesan untukmu",
    "g.curtain.titleLine1": "Selamat Ulang Tahun,",
    "g.curtain.subtitle": "Seseorang menyiapkan sesuatu yang istimewa untukmu.",
    "g.curtain.cta": "Buka Pesan →",
    "g.hero.from": "Dari {name}",
    "g.hero.celebration": "Sebuah perayaan",
    "g.countdown.today.label": "Hari ini harimu",
    "g.countdown.today.title.1": "Ini",
    "g.countdown.today.title.2": "hari",
    "g.countdown.today.title.3": "ulang tahunmu!",
    "g.countdown.label": "Hitung mundur menuju harimu",
    "g.countdown.days": "Hari",
    "g.countdown.hours": "Jam",
    "g.countdown.minutes": "Menit",
    "g.countdown.seconds": "Detik",
    "g.message.eyebrow": "Beberapa kata untukmu",
    "g.gallery.eyebrow": "Kenangan yang terabadikan",
    "g.gallery.title": "Galeri tentang kamu.",
    "g.gallery.count.one": "momen",
    "g.gallery.count.many": "momen",
    "g.timeline.eyebrow": "Momen istimewa",
    "g.timeline.title": "Kisah sejauh ini.",
    "g.share.eyebrow": "Bagikan kebahagiaan",
    "g.share.title": "Bagikan momen ini.",
    "g.share.whatsapp": "Bagikan ke WhatsApp",
    "g.share.copy": "Salin tautan",
    "g.share.copied": "Tersalin!",
    "g.audio.play": "Putar musik",
    "g.audio.pause": "Jeda musik",
    "g.footer.byName": "Dibuat dengan cinta oleh {name}",
    "g.footer.default": "Dibuat dengan cinta",
    "g.share.text": "🎉 Pesan ulang tahun spesial untuk {name}: {url}",
    "g.404.title": "Ucapan tidak ditemukan.",
    "g.404.body": "Tautan ini mungkin sudah kedaluwarsa atau tidak ada.",
    "g.404.back": "Kembali ke beranda",
    "g.loading": "Memuat ucapanmu…",
  },
};

export function makeT(lang) {
  const L = dict[lang] ? lang : "en";
  return (key, vars) => {
    let s = dict[L][key];
    if (s === undefined) s = dict.en[key] ?? key;
    if (vars) {
      Object.keys(vars).forEach((k) => {
        s = s.replace(new RegExp(`\\{${k}\\}`, "g"), vars[k]);
      });
    }
    return s;
  };
}
