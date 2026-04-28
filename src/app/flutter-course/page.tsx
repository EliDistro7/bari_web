'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/language';

type Lang = 'en' | 'sw';

// ─── Unsplash image URLs ──────────────────────────────────────────────────────
const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&q=85&auto=format&fit=crop',
  phase1: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80&auto=format&fit=crop',
  phase2: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80&auto=format&fit=crop',
  phase3: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80&auto=format&fit=crop',
  phase4: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&auto=format&fit=crop',
  build: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80&auto=format&fit=crop',
  cta: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1600&q=80&auto=format&fit=crop',
};

// ─── Types ────────────────────────────────────────────────────────────────────
type Phase = {
  num: string;
  label: string;
  weeks: string;
  image: string;
  imageAlt: string;
  topics: string[];
  milestone: string;
};

// ─── Content ─────────────────────────────────────────────────────────────────
const T = {
  en: {
    navBack: 'Bari Kaneno',
    navCta: 'Enroll',
    badge: 'Flutter · 3 months · 2026',
    headline: 'Build a Flutter App from Zero to Shipped',
    subheadline:
      'A hands-on, outcome-first programme. You leave with a working Notebook app installed on your own phone — not just theory.',
    instructor: 'Taught by Bari Kaneno · Dar es Salaam',
    ctaPrimary: 'Message on WhatsApp to Enroll',
    ctaSecondary: 'Download Syllabus',
    stats: [
      { value: '12', label: 'Weeks' },
      { value: '36', label: 'Sessions, 1 hr each' },
      { value: '1', label: 'Real app, on your phone' },
      { value: 'EN / SW', label: 'Bilingual delivery' },
    ],
    whyTitle: 'Why this course',
    why: [
      {
        title: 'Project-first',
        body: 'Every concept is tied to building the NoteBook app. Nothing is taught in isolation — every line of code goes into the final product.',
      },
      {
        title: 'Bilingual',
        body: 'Sessions, notes and homework are delivered in English or Kiswahili based on your preference. Switch any time.',
      },
      {
        title: 'Live mentorship',
        body: 'Not a recorded video course. Live 1-hour sessions with Bari, code review on your actual work, and WhatsApp support between sessions.',
      },
      {
        title: 'You ship on day 84',
        body: 'The course ends with you installing your release APK on your own phone and presenting it as a real product.',
      },
    ],
    phasesTitle: 'The 4 phases',
    phases: [
      {
        num: '01',
        label: 'Foundation',
        weeks: 'Weeks 1 – 3',
        image: IMAGES.phase1,
        imageAlt: 'Laptop with code on screen',
        topics: [
          'Dart language — types, classes, null safety',
          'Widget tree, StatefulWidget, hot reload',
          'Layout — Row, Column, constraints',
          'Forms, lists, interactive state',
        ],
        milestone: 'Working single-screen NoteBook app — add, pin, filter',
      },
      {
        num: '02',
        label: 'Building',
        weeks: 'Weeks 4 – 6',
        image: IMAGES.phase2,
        imageAlt: 'Building multi-screen app interfaces',
        topics: [
          'Multi-screen navigation — push, pop, pass data',
          'Bottom navigation, drawers, search',
          'SharedPreferences for settings',
          'JSON file persistence — notes survive restarts',
        ],
        milestone: 'Multi-screen app with dark mode and persistent notes',
      },
      {
        num: '03',
        label: 'Connecting',
        weeks: 'Weeks 7 – 9',
        image: IMAGES.phase3,
        imageAlt: 'Pair programming session',
        topics: [
          'Provider state management',
          'Auto-save with debounced streams',
          '4-state pattern — loading, error, empty, data',
          'SnackBars, dialogs, undo delete',
        ],
        milestone: 'Fully reactive app — dark mode, bilingual UI, graceful errors',
      },
      {
        num: '04',
        label: 'Polish and Ship',
        weeks: 'Weeks 10 – 12',
        image: IMAGES.phase4,
        imageAlt: 'Person holding phone with app',
        topics: [
          'ThemeData design system — light and dark',
          'Animations and micro-interactions',
          'Unit tests and widget tests',
          'Release APK installed on your real device',
        ],
        milestone: 'Capstone demo and release APK on your phone',
      },
    ] satisfies Phase[],
    whatTitle: 'What you will build',
    whatItems: [
      'Note creation and editing — full-screen editor',
      'Categories: Ideas, Tasks, Reminders, Personal',
      'Pin important notes — grouped sections',
      'Real-time search across title and body',
      'Dark and light mode with persistent preference',
      'Bilingual UI toggle — English and Kiswahili',
      'Auto-save drafts with debounced streams',
      'Swipe to delete with undo',
      'JSON persistence — notes survive restarts',
      'Release APK on your own Android device',
    ],
    stackTitle: 'Tech stack',
    stack: [
      { label: 'Flutter 3', sub: 'UI framework' },
      { label: 'Dart 3', sub: 'Language' },
      { label: 'Provider', sub: 'State management' },
      { label: 'SharedPreferences', sub: 'Settings storage' },
      { label: 'path_provider', sub: 'File persistence' },
      { label: 'flutter_test', sub: 'Testing' },
    ],
    faqTitle: 'Common questions',
    faqs: [
      {
        q: 'Do I need coding experience?',
        a: 'You need basic programming knowledge — understanding variables, loops and functions in any language. No Dart or Flutter experience required.',
      },
      {
        q: 'What device do I need?',
        a: 'A laptop with at least 8 GB RAM running Windows, Mac or Linux. An Android phone is recommended for the final build.',
      },
      {
        q: 'How are sessions delivered?',
        a: 'Live 1-hour sessions three days per week — Monday, Wednesday, Friday. Online via Google Meet or in-person in Dar es Salaam.',
      },
      {
        q: 'What if I miss a session?',
        a: 'Sessions are recorded. You receive the recording and the full session plan document within 24 hours.',
      },
      {
        q: 'Is there support between sessions?',
        a: 'Yes — a dedicated WhatsApp group with Bari. Questions answered within the day.',
      },
      {
        q: 'Which language are sessions taught in?',
        a: 'Your choice at enrolment: English or Kiswahili. All written materials are available in both languages.',
      },
    ],
    ctaTitle: 'Ready to build your first Flutter app?',
    ctaBody: 'Message Bari on WhatsApp to discuss the next cohort, pricing and schedule.',
    ctaBtn: 'Message on WhatsApp',
    footerBack: '← Back to bari.dev',
    footerText: '© 2026 Bari Kaneno · Dar es Salaam, Tanzania',
  },

  sw: {
    navBack: 'Bari Kaneno',
    navCta: 'Jiandikishe',
    badge: 'Flutter · Miezi 3 · 2026',
    headline: 'Unda App ya Flutter kutoka Sifuri Hadi Ukamilifu',
    subheadline:
      'Programu inayozingatia matokeo ya miezi 3. Utaondoka na notebook inayofanya kazi kwenye simu yako — si nadharia tu.',
    instructor: 'Inafundishwa na Bari Kaneno · Dar es Salaam',
    ctaPrimary: 'Tuma ujumbe WhatsApp kujiandikisha',
    ctaSecondary: 'Pakua Muhtasari wa Kozi',
    stats: [
      { value: '12', label: 'Wiki' },
      { value: '36', label: 'Vikao, saa 1 kila kimoja' },
      { value: '1', label: 'Programu ya kweli, kwenye simu yako' },
      { value: 'EN / SW', label: 'Lugha mbili' },
    ],
    whyTitle: 'Kwa nini kozi hii',
    why: [
      {
        title: 'Kujifunza kwa mradi',
        body: 'Kila dhana inaunganishwa na kujenga programu ya Daftari. Kila unachoandika kinaenda kwenye bidhaa ya mwisho.',
      },
      {
        title: 'Lugha mbili',
        body: 'Vipindi, homeworks vinawasilishwa kwa Kiingereza au Kiswahili kulingana na upendeleo wako.',
      },
      {
        title: 'Usimamizi wa moja kwa moja',
        body: 'Si kozi ya video. Vipindi vya moja kwa moja na Bari, mapitio ya code base yako, na msaada wa WhatsApp baada ya vipindi.',
      },
      {
        title: 'App inakuwa tayari siku ya 84',
        body: 'Kozi inaishia na wewe ukiwa na APK yako uliyoitengeneza wewe kwenye simu yako mwenyewe na kuiwasilisha kama bidhaa ya kweli.',
      },
    ],
    phasesTitle: 'Hatua 4',
    phases: [
      {
        num: '01',
        label: 'Msingi',
        weeks: 'Wiki 1 – 3',
        image: IMAGES.phase1,
        imageAlt: 'Kompyuta yenye msimbo',
        topics: [
          'Lugha ya Dart — aina, madarasa, usalama wa null',
          'Mti wa widget, StatefulWidget, upakiaji wa haraka',
          'Mpangilio — Row, Column, vizuizi',
          'Fomu, orodha, hali ya mwingiliano',
        ],
        milestone: 'Programu ya Daftari ya skrini moja — ongeza, bana, chuja',
      },
      {
        num: '02',
        label: 'Kutengeneza',
        weeks: 'Wiki 4 – 6',
        image: IMAGES.phase2,
        imageAlt: 'Kutengeneza App yenye skrini nyingi',
        topics: [
          'Ku-navigate skrini nyingi — sukuma, rudi, pasha data',
          'Bottom navigationsi, multi-state theme (day & night), utafutaji',
          'SharedPreferences kwa mipangilio',
          'Uhifadhi wa faili ya JSON — notes hazipotei hata baada ya kuanzisha upya',
        ],
        milestone: 'Programu ya skrini nyingi na notes zinazodumu',
      },
      {
        num: '03',
        label: 'Muunganisho',
        weeks: 'Wiki 7 – 9',
        image: IMAGES.phase3,
        imageAlt: 'Vikao vya pamoja',
        topics: [
          'Usimamizi wa hali ya Provider',
          'Uhifadhi wa kiotomatiki wa streams zilizochelewa',
          'Mfumo wa hali 4 — kupakia, hitilafu, utupu, data',
          'SnackBars, mazungumzo, toa kufuta',
        ],
        milestone: 'Programu ya majibu kamili — hali ya giza, UI ya lugha mbili, hitilafu za kirafiki',
      },
      {
        num: '04',
        label: 'Kukamilisha na Kutengeneza APK',
        weeks: 'Wiki 10 – 12',
        image: IMAGES.phase4,
        imageAlt: 'Mtu akishikilia simu na programu',
        topics: [
          'Mfumo wa kubuni ThemeData — mwanga na giza',
          'Uhuishaji na mwingiliano mdogo',
          'Majaribio ya states na widget',
          'APK ya kutolewa kwenye kifaa chako cha kweli',
        ],
        milestone: 'Demo ya project, na APK kwenye simu yako',
      },
    ] satisfies Phase[],
    whatTitle: 'Utakachojenga',
    whatItems: [
      'Uundaji na uhariri wa maelezo — kihariri cha skrini nzima',
      'Kategoria: Mawazo, Kazi, Ukumbusho, Binafsi',
      'Bana maelezo muhimu — sehemu zilizopangwa',
      'Utafutaji wa wakati halisi kwenye kichwa na maudhui',
      'Hali ya giza na mwanga yenye upendeleo unaodumu',
      'Kubadilisha UI ya lugha mbili — Kiingereza na Kiswahili',
      'Kuhifadhi kiotomatiki rasimu na streams zilizochelewa',
      'Sogeza kufuta na kutoa',
      'Uhifadhi wa JSON — notes zinaishi baada ya kuanzisha upya',
      'APK tayari kwenye kifaa chako cha Android',
    ],
    stackTitle: 'Teknolojia',
    stack: [
      { label: 'Flutter 3', sub: 'Mfumo wa UI' },
      { label: 'Dart 3', sub: 'Lugha' },
      { label: 'Provider', sub: 'Usimamizi wa hali' },
      { label: 'SharedPreferences', sub: 'Hifadhi ya settings' },
      { label: 'path_provider', sub: 'Uhifadhi wa faili' },
      { label: 'flutter_test', sub: 'Majaribio' },
    ],
    faqTitle: 'Maswali ya kawaida',
    faqs: [
      {
        q: 'Je, ninahitaji uzoefu wa kuandika msimbo?',
        a: 'Unahitaji ujuzi wa msingi wa programu — kuelewa vigeuzi, mizunguko na vitendo katika lugha yoyote. Huhitaji kujua Dart au Flutter.',
      },
      {
        q: 'Ninahitaji kifaa gani?',
        a: 'Kompyuta yenye RAM angalau 8 GB inayoendesha Windows, Mac au Linux. Simu ya Android inapendekezwa kwa ujenzi wa mwisho.',
      },
      {
        q: 'Vikao vinawasilishwaje?',
        a: 'Vikao vya moja kwa moja vya saa 1 siku tatu kwa wiki — Jumatatu, Jumatano, Ijumaa. Mtandaoni au ana kwa ana Dar es Salaam.',
      },
      {
        q: 'Je, nikikosa kikao?',
        a: 'Vikao vinarekodiwa. Utapokea rekodi na hati ya mipango ya kikao kamili ndani ya masaa 24.',
      },
      {
        q: 'Je, kuna msaada kati ya vikao?',
        a: 'Ndiyo — kikundi maalum cha WhatsApp na Bari. Maswali yanajibiwa ndani ya siku.',
      },
      {
        q: 'Lugha gani inatumika kufundisha?',
        a: 'Chaguo lako wakati wa kujiandikisha: Kiingereza au Kiswahili. Nyaraka zote zinapatikana kwa lugha zote mbili.',
      },
    ],
    ctaTitle: 'Uko tayari kujenga programu yako ya kwanza ya Flutter?',
    ctaBody: 'Tuma ujumbe Bari kwenye WhatsApp kujadili kikundi kijacho, bei na ratiba.',
    ctaBtn: 'Tuma ujumbe kwenye WhatsApp',
    footerBack: '← Rudi kwa bari.dev',
    footerText: '© 2026 Bari Kaneno · Dar es Salaam, Tanzania',
  },
} as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function Fade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Hairline({ indent = 0 }: { indent?: number }) {
  return (
    <div
      className="border-t border-gray-200"
      style={indent ? { marginLeft: indent } : undefined}
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
      {children}
    </p>
  );
}

function FaqRow({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Fade delay={index * 0.04}>
      <Hairline />
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-8 py-5 text-left"
      >
        <span className="text-sm font-semibold text-gray-900 leading-snug">{q}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
          : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
        }
      </button>
      {open && (
        <p className="pb-5 text-sm text-gray-600 leading-relaxed -mt-2">{a}</p>
      )}
    </Fade>
  );
}

// ─── Phase block ──────────────────────────────────────────────────────────────
// Fix for line 616: replace `phase: typeof T.en.phases[0]` (which resolves to `any`
// when the array uses `as const`) with the explicit Phase type defined above.
function PhaseBlock({ phase, index }: { phase: Phase; index: number }) {
  return (
    <Fade delay={index * 0.07}>
      <Hairline />
      <div className="py-6">
        <SectionLabel>{phase.weeks}</SectionLabel>

        {/* Fix for line 395/520: <img> → next/image <Image> */}
        <div className="relative w-full h-36 overflow-hidden rounded-lg mb-4 bg-gray-100">
          <Image
            src={phase.image}
            alt={phase.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md">
            <span className="text-xs font-black text-gray-900 tabular-nums tracking-tight">
              {phase.num} — {phase.label}
            </span>
          </div>
        </div>

        <ul className="space-y-2.5 mb-5">
          {phase.topics.map((topic, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-600 leading-snug">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
              {topic}
            </li>
          ))}
        </ul>

        <SectionLabel>Milestone</SectionLabel>
        <p className="text-sm font-medium text-gray-900">{phase.milestone}</p>
      </div>
    </Fade>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FlutterCoursePage() {
  const { language, setLanguage } = useLanguage();
  const lang = (language as Lang) || 'en';
  const t = T[lang];

  const toggleLang = () => setLanguage(lang === 'en' ? 'sw' : 'en');

  const openWhatsApp = () => {
    const msg =
      lang === 'sw'
        ? 'Habari Bari! Ninapenda kujua zaidi kuhusu kozi yako ya Flutter.'
        : "Hi Bari! I'm interested in your Flutter course. Could you share details on the next cohort?";
    window.open(`https://wa.me/255617833806?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <>
      <style jsx global>{`
        .course-root {
          font-family: 'Geist', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .course-nav {
          background: rgba(255, 255, 255, 0.97);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #eeeeee;
        }
        .btn-black {
          background: #111111;
          color: #ffffff;
          transition: background 0.15s ease, transform 0.15s ease;
        }
        .btn-black:hover {
          background: #000000;
          transform: translateY(-1px);
        }
        .btn-outline {
          border: 1.5px solid #d1d5db;
          color: #374151;
          background: transparent;
          transition: border-color 0.15s ease, color 0.15s ease;
        }
        .btn-outline:hover {
          border-color: #6b7280;
          color: #111111;
        }
        .stack-chip {
          border: 1px solid #e5e7eb;
          background: #ffffff;
          transition: border-color 0.15s ease;
        }
        .stack-chip:hover {
          border-color: #9ca3af;
        }
        .lang-btn {
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          font-family: 'DM Mono', monospace;
          transition: border-color 0.15s ease, background 0.15s ease;
        }
        .lang-btn:hover {
          border-color: #9ca3af;
          background: #ffffff;
        }
        .hero-img-mask {
          -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
          mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
        }
      `}</style>

      <div className="course-root min-h-screen bg-white">

        {/* ── NAV ── */}
        <nav className="course-nav fixed top-0 w-full z-50">
          <div className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between">
            {/* Fix for line 502: <a href="/"> → <Link href="/"> */}
            <Link href="/" className="text-sm font-semibold text-gray-900 hover:text-gray-500 transition-colors">
              {t.navBack}
            </Link>
            <div className="flex items-center gap-2">
              <button onClick={toggleLang} className="lang-btn px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 uppercase">
                {lang === 'en' ? 'SW' : 'EN'}
              </button>
              <button onClick={openWhatsApp} className="btn-black hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold">
                {t.navCta}
              </button>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="relative pt-14 overflow-hidden">
          <div className="relative w-full h-[520px] sm:h-[600px]">
            {/* Fix: <img> → next/image <Image> with fill */}
            <Image
              src={IMAGES.hero}
              alt="Developer coding"
              fill
              priority
              className="object-cover hero-img-mask"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
          </div>

          <div className="relative -mt-32 sm:-mt-48 px-5 pb-16">
            <div className="max-w-3xl mx-auto">
              <Fade>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6">
                  {t.badge}
                </p>
              </Fade>
              <Fade delay={0.06}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight mb-6">
                  {t.headline}
                </h1>
              </Fade>
              <Fade delay={0.12}>
                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mb-3">
                  {t.subheadline}
                </p>
              </Fade>
              <Fade delay={0.16}>
                <p className="text-sm text-gray-400 mb-10">{t.instructor}</p>
              </Fade>
              <Fade delay={0.2}>
                <div className="flex flex-wrap gap-3 mb-14">
                  <button
                    onClick={openWhatsApp}
                    className="btn-black flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t.ctaPrimary}
                  </button>
                </div>
              </Fade>

              <Hairline />
              <Fade delay={0.26}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-7 py-8">
                  {t.stats.map((s, i) => (
                    <div key={i}>
                      <p className="text-2xl font-black text-gray-900 mb-1 tabular-nums">{s.value}</p>
                      <p className="text-xs text-gray-500 leading-snug max-w-[100px]">{s.label}</p>
                    </div>
                  ))}
                </div>
              </Fade>
              <Hairline />
            </div>
          </div>
        </section>

        {/* ── WHY ── */}
        <section className="py-16 px-5">
          <div className="max-w-3xl mx-auto">
            <Fade>
              <h2 className="text-2xl font-black text-gray-900 mb-8">{t.whyTitle}</h2>
            </Fade>
            {t.why.map((item, i) => (
              <Fade key={i} delay={i * 0.05}>
                <Hairline />
                <div className="py-5 flex gap-8">
                  <span className="text-xs font-semibold text-gray-300 w-4 flex-shrink-0 pt-0.5 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-1">{item.title}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </Fade>
            ))}
            <Hairline />
          </div>
        </section>

        <Hairline />

        {/* ── PHASES ── */}
        <section className="py-16 px-5">
          <div className="max-w-3xl mx-auto">
            <Fade>
              <h2 className="text-2xl font-black text-gray-900 mb-1">{t.phasesTitle}</h2>
              <p className="text-sm text-gray-500 mb-8">
                {lang === 'sw' ? 'Wiki 12 · Vikao 36' : '12 weeks · 36 sessions'}
              </p>
            </Fade>
            <div className="grid sm:grid-cols-2 gap-x-12">
              {(t.phases as Phase[]).map((phase, i) => (
                <PhaseBlock key={i} phase={phase} index={i} />
              ))}
            </div>
            <Hairline />
          </div>
        </section>

        <Hairline />

        {/* ── WHAT YOU'LL BUILD ── */}
        <section className="py-16 px-5">
          <div className="max-w-3xl mx-auto">
            <Fade>
              <h2 className="text-2xl font-black text-gray-900 mb-1">{t.whatTitle}</h2>
              <p className="text-sm text-gray-500 mb-8">
                {lang === 'sw'
                  ? 'NoteBook — programu ya kuhifadhi maelezo kwenye simu yako'
                  : 'NoteBook — a fully-featured local notes app'}
              </p>
            </Fade>

            {/* Fix: <img> → next/image <Image> with fill */}
            <Fade delay={0.05}>
              <div className="relative w-full h-48 rounded-xl overflow-hidden mb-8 bg-gray-100">
                <Image
                  src={IMAGES.build}
                  alt="Phone and laptop workspace"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-transparent" />
                <div className="absolute inset-0 flex items-center px-8">
                  <p className="text-2xl font-black text-gray-900 leading-tight max-w-[200px]">
                    NoteBook App
                  </p>
                </div>
              </div>
            </Fade>

            <div className="grid sm:grid-cols-2 gap-x-12">
              {t.whatItems.map((item, i) => (
                <Fade key={i} delay={i * 0.03}>
                  <div className="border-t border-gray-200 py-3.5 flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                    <span className="text-sm text-gray-700 leading-snug">{item}</span>
                  </div>
                </Fade>
              ))}
            </div>
            <Hairline />
          </div>
        </section>

        <Hairline />

        {/* ── TECH STACK ── */}
        <section className="py-16 px-5">
          <div className="max-w-3xl mx-auto">
            <Fade>
              <h2 className="text-2xl font-black text-gray-900 mb-8">{t.stackTitle}</h2>
            </Fade>
            <div className="flex flex-wrap gap-2">
              {t.stack.map((item, i) => (
                <Fade key={i} delay={i * 0.04}>
                  <div className="stack-chip px-4 py-2.5 rounded-xl">
                    <p className="text-sm font-bold text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.sub}</p>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </section>

        <Hairline />

        {/* ── FAQ ── */}
        <section className="py-16 px-5">
          <div className="max-w-3xl mx-auto">
            <Fade>
              <h2 className="text-2xl font-black text-gray-900 mb-6">{t.faqTitle}</h2>
            </Fade>
            {t.faqs.map((faq, i) => (
              <FaqRow key={i} q={faq.q} a={faq.a} index={i} />
            ))}
            <Hairline />
          </div>
        </section>

        <Hairline />

        {/* ── FINAL CTA ── */}
        <section className="relative py-20 px-5 overflow-hidden">
          <div className="absolute inset-0">
            {/* Fix: <img> → next/image <Image> with fill */}
            <Image
              src={IMAGES.cta}
              alt="Dark coding workspace"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gray-900/85" />
          </div>

          <div className="relative max-w-3xl mx-auto">
            <Fade>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight max-w-xl">
                {t.ctaTitle}
              </h2>
              <p className="text-gray-400 text-base mb-8 leading-relaxed max-w-lg">
                {t.ctaBody}
              </p>
              <button
                onClick={openWhatsApp}
                className="inline-flex items-center gap-3 bg-white text-gray-900 px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {t.ctaBtn}
                <ArrowRight className="w-4 h-4" />
              </button>
            </Fade>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-gray-200 py-6 px-5 bg-white">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            {/* Fix: <a href="/"> → <Link href="/"> */}
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              {t.footerBack}
            </Link>
            <p className="text-sm text-gray-400">{t.footerText}</p>
          </div>
        </footer>

      </div>
    </>
  );
}