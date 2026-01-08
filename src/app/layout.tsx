import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/language";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ThemeColorManager from "@/components/features/ThemeColorManager";

// Modern sans-serif for body text - clean and highly readable
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Bold, geometric display font for headings - modern and distinctive
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Professional monospace for code
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bariki Kaneno - Full Stack Developer",
  description: "Professional full-stack developer portfolio showcasing modern web applications and digital solutions",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#06b6d4" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  other: {
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* iOS Safari specific */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Bariki Kaneno" />
        
        {/* Android Chrome specific */}
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Favicon with theme colors */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
   
      <body
        className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable} antialiased bg-slate-900`}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <LanguageProvider>
          {/* Dynamic Theme Color Manager */}
          <ThemeColorManager />
          
          {children}
 
        </LanguageProvider>
      </body>
    </html>
  );
}