// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
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

export default function RootLayout({ children }) {
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

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}