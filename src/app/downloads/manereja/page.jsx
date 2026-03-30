"use client";

import { useState } from "react";

const APK_URL = "https://drive.google.com/uc?export=download&id=11wMQ7ewzmkiSY566-LCUuRQlbnTYFtB0";
const WINDOWS_URL = "https://drive.google.com/uc?export=download&id=1HqikwZyZVu1OD96RuQbHJ4f8bk9hIS59";

const LOGO_URL =
  "https://res.cloudinary.com/dh3bzuzyb/image/upload/v1772730584/manereja_hvqr57.png";
const VERSION = "v1.0.0";
const RELEASE_DATE = "March 2026";

const features = [
  { icon: "💰", label: "Financial Accounting" },
  { icon: "📦", label: "Inventory & Stock" },
  { icon: "👥", label: "Staff Management" },
  { icon: "✅", label: "Task Management" },
  { icon: "🔄", label: "Offline Sync" },
  { icon: "📊", label: "Cash Flow Reports" },
];

const androidSteps = [
  { num: "01", title: "Download APK", desc: "Tap the button above and save the file to your device." },
  { num: "02", title: "Allow Installation", desc: 'Go to Settings → Security → enable "Install from unknown sources".' },
  { num: "03", title: "Install & Open", desc: "Locate the APK in your Downloads folder and tap to install." },
];

const windowsSteps = [
  { num: "01", title: "Download ZIP", desc: "Click the button above and save the ZIP file to your PC." },
  { num: "02", title: "Extract the ZIP", desc: "Right-click the ZIP file and choose Extract All to a folder of your choice." },
  { num: "03", title: "Run the App", desc: "Open the extracted folder and double-click the .exe file to launch." },
];

// SVG icons (no emojis)
const FeatureIcons = {
  "Financial Accounting": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  "Inventory & Stock": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    </svg>
  ),
  "Staff Management": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  "Task Management": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
  ),
  "Offline Sync": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
    </svg>
  ),
  "Cash Flow Reports": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
};

function DownloadButton({ href, onClick, downloading, done, label, sublabel, icon }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group relative w-full max-w-sm overflow-hidden rounded-2xl"
      style={{ textDecoration: "none" }}
    >
      <div className="absolute -inset-1 rounded-3xl bg-[#84CC16] opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-300" />
      <div className="relative flex items-center justify-between gap-3 bg-[#84CC16] hover:bg-[#78b814] active:bg-[#65A30D] transition-colors duration-150 rounded-2xl px-6 py-4 shadow-lg shadow-[#84CC16]/30">
        <div className="flex items-center gap-3">
          {downloading ? (
            <svg className="animate-spin w-5 h-5 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          ) : done ? (
            <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <div className="text-white flex-shrink-0">{icon}</div>
          )}
          <div>
            <p className="text-white font-black text-base tracking-tight leading-tight">
              {downloading ? "Preparing…" : done ? "Download Started!" : label}
            </p>
            {!downloading && !done && (
              <p className="text-white/70 text-xs mt-0.5">{sublabel}</p>
            )}
          </div>
        </div>
        {!downloading && !done && (
          <svg className="w-5 h-5 text-white/80 group-hover:translate-y-0.5 transition-transform duration-200 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
          </svg>
        )}
      </div>
    </a>
  );
}

export default function DownloadPage() {
  const [dlAndroid, setDlAndroid] = useState(false);
  const [doneAndroid, setDoneAndroid] = useState(false);
  const [dlWindows, setDlWindows] = useState(false);
  const [doneWindows, setDoneWindows] = useState(false);
  const [activeTab, setActiveTab] = useState("android"); // "android" | "windows"

  const handleAndroid = () => {
    setDlAndroid(true);
    setTimeout(() => { setDlAndroid(false); setDoneAndroid(true); }, 1800);
  };

  const handleWindows = () => {
    setDlWindows(true);
    setTimeout(() => { setDlWindows(false); setDoneWindows(true); }, 1800);
  };

  const steps = activeTab === "android" ? androidSteps : windowsSteps;

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#212529] font-sans overflow-x-hidden">

      {/* dot grid */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle, #84CC16 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          opacity: 0.06,
        }}
      />

      {/* lime glow blob */}
      <div
        className="pointer-events-none fixed top-[-180px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full z-0 blur-[100px]"
        style={{ background: "radial-gradient(circle, #84CC1640, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-20 flex flex-col items-center gap-14">

        {/* HEADER */}
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
            <span className="text-[#6C757D] text-xs">Free to download</span>
          </div>
        </header>

        {/* DOWNLOAD SECTION */}
        <section className="w-full flex flex-col items-center gap-5">

          {/* Platform tabs */}
          <div className="flex rounded-xl border border-[#E0E0E0] bg-white overflow-hidden w-full max-w-sm">
            <button
              onClick={() => setActiveTab("android")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-colors duration-150 ${
                activeTab === "android"
                  ? "bg-[#84CC16] text-white"
                  : "text-[#6C757D] hover:text-[#212529]"
              }`}
            >
              {/* Android icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.523 15.341a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-9.046 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM2.89 7.204l1.574-2.73a.5.5 0 0 1 .866.5L3.756 7.704A9.978 9.978 0 0 1 7 6.05V4h10v2.05a9.978 9.978 0 0 1 3.244 1.654l-1.574-2.73a.5.5 0 0 1 .866-.5l1.574 2.73A10 10 0 1 1 2 12a9.956 9.956 0 0 1 .89-4.796zM12 8a8 8 0 1 0 0 16A8 8 0 0 0 12 8z"/>
              </svg>
              Android
            </button>
            <button
              onClick={() => setActiveTab("windows")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-colors duration-150 ${
                activeTab === "windows"
                  ? "bg-[#84CC16] text-white"
                  : "text-[#6C757D] hover:text-[#212529]"
              }`}
            >
              {/* Windows icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
              </svg>
              Windows
            </button>
          </div>

          {/* Download button */}
          {activeTab === "android" ? (
            <DownloadButton
              href={APK_URL}
              onClick={handleAndroid}
              downloading={dlAndroid}
              done={doneAndroid}
              label="Download for Android"
              sublabel="Android 6.0+ · APK · 40 MB"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.523 15.341a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-9.046 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM12 8a8 8 0 1 0 0 16A8 8 0 0 0 12 8z"/>
                </svg>
              }
            />
          ) : (
            <DownloadButton
              href={WINDOWS_URL}
              onClick={handleWindows}
              downloading={dlWindows}
              done={doneWindows}
              label="Download for Windows"
              sublabel="Windows 10+ · ZIP · ~70 MB"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
                </svg>
              }
            />
          )}

          <p className="text-[#6C757D] text-xs text-center">
            {activeTab === "android"
              ? "Android 6.0+ required · 40 MB · Free to download"
              : "Windows 10 or later · Extract ZIP and run .exe · Free to download"}
          </p>
        </section>

        {/* FEATURES GRID */}
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
                <span className="text-[#65A30D]">{FeatureIcons[f.label]}</span>
                <span className="text-sm font-medium text-[#212529]">{f.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* INSTALL STEPS */}
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

        {/* DIVIDER */}
        <div className="w-full h-px bg-[#EEEEEE]" />

        {/* FOOTER */}
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