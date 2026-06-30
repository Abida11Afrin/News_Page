"use client";
import Image from "next/image";
import LiveBanglaDateModule from "../components/LiveBanglaDateModule";
import PageViewer from "../components/PageViewer";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const pages = ["১", "২", "৩", "৪", "৫", "৬", "৭", "৮"];

  const months = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
  ];
  const years = ["২০২৪", "২০২৫", "২০২৬"];

  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const calendarDays = ["র", "স", "ম", "ব", "বৃ", "শু", "শ"];

  const getCalendarDates = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const weeks = [];
    let day = 1;

    for (let w = 0; w < 6; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        if (w === 0 && d < firstDay) {
          week.push("");
        } else if (day > daysInMonth) {
          week.push("");
        } else {
          week.push(day.toLocaleString("bn-BD"));
          day++;
        }
      }
      weeks.push(week);
      if (day > daysInMonth) break;
    }
    return weeks;
  };

  const calendarDates = getCalendarDates(selectedMonth, selectedYear);
  const todayDate = today.getDate().toLocaleString("bn-BD");
  const isCurrentMonthYear =
    selectedMonth === today.getMonth() && selectedYear === today.getFullYear();

  const pageList = [
    { name: "page-1", active: true },
    { name: "page-2", active: true },
    { name: "page-3", active: true },
    { name: "page-4", active: true },
    { name: "page-5", active: false },
    { name: "page-6", active: false },
    { name: "page-7", active: false },
    { name: "page-8", active: false },
  ];

  const downloadPage = () => {
    const imageUrl = window.__activePageImageUrl;
    const title = window.__activePageTitle || "pratidiner-kagoj";

    if (!imageUrl) {
      alert("কোনো পাতা নির্বাচিত নেই");
      return;
    }

    fetch(imageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${title}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .catch(() => alert("ডাউনলোড হয়নি"));
  };

  // ===== width-based sidebar control =====
  const containerRef = useRef(null);
  const [showSidebars, setShowSidebars] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      setShowSidebars(width >= 274);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-white-200 px-1 sm:px-2">
      <div className="bg-white w-full max-w-[1000px] rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.2)] border border-gray-300 flex flex-col my-2 sm:my-4 overflow-hidden">
        {/* HEADER */}
        <header className="bg-white">
          <div className="flex flex-col items-center justify-center py-2 sm:py-3 border-b border-gray-300">
            <Image
              src="/logo.png"
              alt="প্রতিদিনের কাগজ"
              width={350}
              height={90}
              className="object-contain w-[180px] sm:w-[250px] md:w-[350px]"
              priority
            />
            <LiveBanglaDateModule />
          </div>

          {/* Nav Bar */}
          <div className="bg-cyan-900 flex items-center justify-between px-1.5 sm:px-3 md:px-4 py-1.5 sm:py-2 gap-1 sm:gap-2 flex-wrap">
            <div className="flex items-center gap-1 sm:gap-2">
              <button className="text-white text-sm sm:text-lg px-0.5 sm:px-1">🏠</button>
              <span className="hidden sm:inline text-white">|</span>
              <button
                onClick={downloadPage}
                className="flex items-center gap-1 bg-cyan-800 hover:bg-blue-500 text-white text-[10px] sm:text-xs md:text-sm px-1.5 sm:px-3 py-1 sm:py-1.5 rounded font-solaiman transition-colors"
              >
                ⬇ ডাউনলোড
              </button>
            </div>

            <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto scrollbar-hide order-last sm:order-none w-full sm:w-auto justify-center">
              {pages.map((num, i) => (
                <button
                  key={i}
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-white hover:bg-blue-100 font-bold text-[9px] sm:text-[10px] md:text-xs rounded flex items-center justify-center shrink-0 text-blue-600"
                >
                  {num}
                </button>
              ))}
              <button className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-white hover:bg-blue-100 font-bold text-[9px] sm:text-[10px] md:text-xs rounded flex items-center justify-center shrink-0 text-blue-600">
                »
              </button>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 text-white text-[10px] sm:text-xs md:text-sm">
              <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 px-1.5 sm:px-3 py-1 sm:py-1.5 rounded font-solaiman transition-colors text-[9px] sm:text-xs">
                f Share 4.3K
              </button>
              <span className="hidden md:inline">|</span>
              <button className="hidden sm:inline hover:text-gray-200 font-solaiman transition-colors text-[10px] sm:text-xs">
                🌐 অনলাইন
              </button>
              <span className="hidden md:inline">|</span>
              <button className="hidden sm:inline hover:text-gray-200 font-solaiman transition-colors text-[10px] sm:text-xs">
                🖨 প্রিন্ট
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button className="w-6 h-5 sm:w-7 sm:h-6 md:w-8 md:h-7 bg-white text-cyan-900 font-bold text-[9px] sm:text-[10px] md:text-xs rounded flex items-center justify-center hover:bg-blue-300 transition-colors cursor-pointer">
                BN
              </button>
              <button className="w-6 h-5 sm:w-7 sm:h-6 md:w-8 md:h-7 bg-white text-cyan-900 font-bold text-[9px] sm:text-[10px] md:text-xs rounded flex items-center justify-center hover:bg-blue-300 transition-colors cursor-pointer">
                EN
              </button>
            </div>
          </div>
        </header>

        {/* ======== MAIN CONTENT ======== */}
        <div
          id="main-content"
          ref={containerRef}
          className="flex flex-row flex-1 gap-1 sm:gap-1.5 p-1 sm:p-2 items-stretch w-full overflow-x-hidden"
        >
          <PageViewer showSidebar={showSidebars} />

          {/* Right Sidebar */}
          {showSidebars && (
            <div className="flex flex-col gap-1 sm:gap-2 w-[85px] sm:w-[115px] lg:w-[150px] min-w-[85px] sm:min-w-[115px] lg:min-w-[150px] shrink-0">
              {/* পুরোনো সংখ্যা */}
              <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
                <div className="bg-teal-700 text-white text-center text-[9px] sm:text-[11px] lg:text-[14px] font-solaiman py-1">
                  পুরোনো সংখ্যা
                </div>
                <div className="p-1">
                  <div className="flex gap-0.5 mb-1">
                    <select
                      className="flex-1 text-[7px] sm:text-[9px] lg:text-[10px] border border-orange-400 rounded px-0.5 py-0.5 min-w-0"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    >
                      {months.map((m, i) => (
                        <option key={i} value={i}>{m}</option>
                      ))}
                    </select>
                    <select
                      className="w-9 sm:w-11 lg:w-14 text-[7px] sm:text-[9px] lg:text-[10px] border border-orange-400 rounded px-0.5 py-0.5"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    >
                      {years.map((y, i) => (
                        <option key={i} value={2024 + i}>{y}</option>
                      ))}
                    </select>
                  </div>

                  <table className="w-full border border-orange-300">
                    <thead>
                      <tr className="bg-orange-50">
                        {calendarDays.map((d, i) => (
                          <th
                            key={i}
                            className="py-0.5 text-center text-gray-600 font-medium border border-orange-200 text-[6px] sm:text-[8px] lg:text-[9px]"
                          >
                            {d}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {calendarDates.map((week, wi) => (
                        <tr key={wi}>
                          {week.map((date, di) => (
                            <td
                              key={di}
                              className={`text-center py-0.5 border border-orange-200 cursor-pointer hover:bg-orange-100 text-[6px] sm:text-[8px] lg:text-[10px]
                                ${
                                  isCurrentMonthYear && date === todayDate
                                    ? "bg-orange-500 text-white font-bold"
                                    : "text-gray-700"
                                }
                                ${di === 0 && date ? "text-red-500" : ""}
                              `}
                            >
                              {date}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* আজকের পত্রিকা */}
              <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
                <div className="bg-cyan-900 text-white text-center text-[9px] sm:text-[11px] lg:text-[14px] font-solaiman py-1 sm:py-1.5">
                  আজকের পত্রিকা
                </div>
                <div className="p-1 sm:p-2 flex flex-col font-solaiman">
                  {pageList.map((pg, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-1 sm:gap-2 py-0.5 sm:py-1">
                        <span className="text-[8px] sm:text-xs">✅</span>
                        <button className={`text-[8px] sm:text-[10px] lg:text-[11px] hover:underline ${
                          pg.active ? "text-gray-800 font-medium" : "text-gray-400"
                        }`}>
                          {pg.name}
                        </button>
                      </div>
                      {i < pageList.length - 1 && (
                        <div className="border-b border-dashed border-cyan-900" />
                      )}
                    </div>
                  ))}
                  <div className="mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-gray-200">
                    <button className="text-[8px] sm:text-[10px] lg:text-[11px] text-gray-700 hover:underline font-solaiman">
                      For Advertisement
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <footer className="bg-white border-t-4 border-blue-600 mt-2">
          <div className="px-6 py-3 sm:py-4 text-center">
            <Image
              src="/logo.png"
              alt="প্রতিদিনের কাগজ"
              width={180}
              height={50}
              className="object-contain mx-auto w-[120px] sm:w-[180px]"
            />
            <p className="text-gray-500 text-[10px] sm:text-xs mt-1 font-solaiman">
              © ২০২৬ সর্বস্বত্ব স্বত্বাধিকার সংরক্ষিত
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}