import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/language";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ThemeColorManager from "@/components/features/ThemeColorManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  manifest: "/manifest.json", // Add this for PWA support
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Enhanced Windows-specific tile colors */}

        
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-900`}
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