// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "আজকের পত্রিকা",
  description: "Bangla Newspaper",
};

async function getTrackingSettings() {
  try {
    const response = await fetch(
      "https://news-page-ud6d.onrender.com/api/marketing/tracking-settings/",
      { cache: "no-store" }
    );

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch {
    return null;
  }
}

export default async function RootLayout({ children }) {
  const trackingSettings = await getTrackingSettings();
  const gtmId =
    trackingSettings?.is_active && trackingSettings?.gtm_id
      ? trackingSettings.gtm_id
      : null;

  return (
    <html lang="bn">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3771774287901809"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>

      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
