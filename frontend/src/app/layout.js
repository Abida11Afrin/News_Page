// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'bn',
                  includedLanguages: 'en,bn',
                  autoDisplay: false,
                }, 'google_translate_element');
              }

              function translateTo(lang) {
                var checkInterval = setInterval(function() {
                  var select = document.querySelector('.goog-te-combo');
                  if (select) {
                    clearInterval(checkInterval);
                    select.value = lang;
                    select.dispatchEvent(new Event('change'));
                  }
                }, 300);

                setTimeout(function() {
                  clearInterval(checkInterval);
                }, 10000);
              }
            `,
          }}
        />
        <script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          async
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        {/* Google Translate hidden element */}
        <div id="google_translate_element" style={{ display: "none" }} />
        {children}
      </body>
    </html>
  );
}
