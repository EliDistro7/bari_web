"use client";

import { useState } from "react";

const APK_URL =
  "https://drive.google.com/uc?export=download&id=1ZlOyzmSg3RmQLNUCDqyllf4WGKPwVzzF";
const LOGO_URL =
  "https://res.cloudinary.com/dh3bzuzyb/image/upload/v1772730584/manereja_hvqr57.png";
const VERSION = "v1.0.0";
const APK_SIZE = "39.8 MB";
const RELEASE_DATE = "March 2026";

const features = [
  { icon: "💰", label: "Financial Accounting" },
  { icon: "📦", label: "Inventory & Stock" },
  { icon: "👥", label: "Staff Management" },
  { icon: "✅", label: "Task Management" },
  { icon: "🔄", label: "Offline Sync" },
  { icon: "📊", label: "Cash Flow Reports" },
];

const steps = [
  { num: "01", title: "Download APK", desc: 'Tap the button above and save the file to your device.' },
  { num: "02", title: "Allow Installation", desc: 'Go to Settings → Security → enable "Install from unknown sources".' },
  { num: "03", title: "Install & Open", desc: "Locate the APK in your Downloads folder and tap to install." },
];

export default function DownloadPage() {
  const [downloading, setDownloading] = useState(false);
  const [done, setDone] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDone(true);
    }, 1800);
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#212529] font-sans overflow-x-hidden">

      {/* ── subtle dot grid ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle, #84CC16 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          opacity: 0.06,
        }}
      />

      {/* ── lime glow blob ── */}
      <div
        className="pointer-events-none fixed top-[-180px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full z-0 blur-[100px]"
        style={{ background: "radial-gradient(circle, #84CC1640, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-20 flex flex-col items-center gap-14">

        {/* ── HEADER ── */}
        <header className="flex flex-col items-center gap-5 text-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-[#84CC16] blur-xl opacity-25 scale-110" />
            <img
              src={LOGO_URL}
              alt="Manereja logo"
              className="relative w-20 h-20 rounded-2xl object-contain shadow-lg"
            />
          </div>

          <div>
            <h1
              className="text-3xl font-black tracking-tighter text-[#212529] leading-none"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              MANEREJA
            </h1>
            <p className="mt-2 text-[#6C757D] text-sm tracking-widest uppercase">
              Business Management Platform
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="px-3 py-1 rounded-full border border-[#84CC16] bg-[#84CC16]/10 text-[#65A30D] text-xs font-bold tracking-wider">
              {VERSION}
            </span>
            <span className="text-[#6C757D] text-xs">{RELEASE_DATE}</span>
            <span className="text-[#6C757D] text-xs">·</span>
            <span className="text-[#6C757D] text-xs">{APK_SIZE}</span>
          </div>
        </header>

        {/* ── DOWNLOAD BUTTON ── */}
        <section className="w-full flex flex-col items-center gap-4">
          <a
            href={APK_URL}
            onClick={handleDownload}
            className="group relative w-full max-w-sm overflow-hidden rounded-2xl"
            style={{ textDecoration: "none" }}
          >
            <div className="absolute -inset-1 rounded-3xl bg-[#84CC16] opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-300" />
            <div className="relative flex items-center justify-center gap-3 bg-[#84CC16] hover:bg-[#78b814] active:bg-[#65A30D] transition-colors duration-150 rounded-2xl px-8 py-5 shadow-lg shadow-[#84CC16]/30">
              {downloading ? (
                <>
                  <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span className="text-white font-black text-lg tracking-tight">Preparing…</span>
                </>
              ) : done ? (
                <>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white font-black text-lg tracking-tight">Download Started!</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 text-white group-hover:translate-y-0.5 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  <span className="text-white font-black text-lg tracking-tight">Download APK</span>
                </>
              )}
            </div>
          </a>

          <p className="text-[#6C757D] text-xs text-center">
            Android 6.0+ required &nbsp;·&nbsp; {APK_SIZE} &nbsp;·&nbsp; Free to download
          </p>
        </section>

        {/* ── FEATURES GRID ── */}
        <section className="w-full">
          <p className="text-[#6C757D] text-xs tracking-widest uppercase mb-5 text-center">
            What&apos;s inside
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {features.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-3 rounded-xl border border-[#E0E0E0] bg-white px-4 py-3 hover:border-[#84CC16]/50 hover:bg-[#F7FEE7] hover:shadow-sm transition-all duration-200"
              >
                <span className="text-xl">{f.icon}</span>
                <span className="text-sm font-medium text-[#212529]">{f.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── INSTALL STEPS ── */}
        <section className="w-full">
          <p className="text-[#6C757D] text-xs tracking-widest uppercase mb-6 text-center">
            How to install
          </p>
          <div className="flex flex-col gap-3">
            {steps.map((s) => (
              <div
                key={s.num}
                className="flex gap-5 items-start bg-white rounded-xl border border-[#E0E0E0] px-5 py-4 hover:border-[#84CC16]/30 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#84CC16]/10 border border-[#84CC16]/30 flex items-center justify-center">
                  <span className="text-[#65A30D] text-xs font-black">{s.num}</span>
                </div>
                <div className="pt-1">
                  <p className="text-[#212529] font-bold text-sm">{s.title}</p>
                  <p className="text-[#6C757D] text-sm mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className="w-full h-px bg-[#EEEEEE]" />

        {/* ── FOOTER ── */}
        <footer className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2">
            <img src={LOGO_URL} alt="Manereja" className="w-5 h-5 rounded object-contain" />
            <span className="text-[#212529] font-bold text-sm tracking-tight">Manereja</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-[#6C757D]">
            <a href="mailto:manereja07@gmail.com" className="hover:text-[#65A30D] transition-colors">
              manereja07@gmail.com
            </a>
            <span>·</span>
            <a href="https://wa.me/255617833806" className="hover:text-[#65A30D] transition-colors">
              WhatsApp: 0617 833 806
            </a>
            <span>·</span>
            <span>Yombo, Dar es Salaam</span>
          </div>
          <p className="text-[#6C757D] text-xs mt-1">© 2026 Manereja. All rights reserved.</p>
        </footer>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
      `}</style>
    </main>
  );
}