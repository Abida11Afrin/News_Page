"use client";
import Image from "next/image";
import LiveBanglaDateModule from "../components/LiveBanglaDateModule";
import PageViewer from "../components/PageViewer";
import { useState, useEffect } from "react";

export default function Home() {
  // 🚀 INCREASED BASE SIZES HERE
  const BASE_WIDTH = 2200; // 1600 থেকে 2200 এ বাড়ানো হয়েছে (অধিক প্রস্থ)
  const BASE_HEIGHT = 1500; // 1100 থেকে 1500 এ বাড়ানো হয়েছে (অধিক উচ্চতা)
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      
      const scaleX = screenWidth / BASE_WIDTH;
      const scaleY = screenHeight / BASE_HEIGHT;
      
      let newScale = Math.min(scaleX, scaleY);
      
      if (newScale > 1) newScale = 1; // Desktop এ scale 1 এর বেশি হবে না
      if (newScale < 0.3) newScale = 0.3; // খুব ছোট হবে না
      
      setScale(newScale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const pages = ["১", "২", "৩", "৪", "৫", "৬", "৭", "৮"];
  const months = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
  const years = ["২০৪", "২২৫", "২০৬"];

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
        if (w === 0 && d < firstDay) week.push("");
        else if (day > daysInMonth) week.push("");
        else {
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
  const isCurrentMonthYear = selectedMonth === today.getMonth() && selectedYear === today.getFullYear();

  const pageList = [
    { name: "page-1", active: true }, { name: "page-2", active: true }, { name: "page-3", active: true },
    { name: "page-4", active: true }, { name: "page-5", active: true }, { name: "page-6", active: true },
    { name: "page-7", active: true }, { name: "page-8", active: true }
  ];

  const downloadPage = () => {
    const imageUrl = window.__activePageImageUrl;
    const title = window.__activePageTitle || "pratidiner-kagoj";
    if (!imageUrl) { alert("কোনো পাতা নির্বাচিত নেই"); return; }
    
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

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center">
      {/* 🚀 UPDATED CONTAINER WITH LARGER SIZE */}
      <div
        style={{
          width: `${BASE_WIDTH}px`,
          height: `${BASE_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          transition: "transform 0.3s ease",
          padding: "40px", // Padding বৃদ্ধি করেছেন (আগে ছিল 30px)
        }}
        className="bg-white rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.2)] border border-gray-300 flex flex-col"
      >
        {/* HEADER */}
        <header className="bg-white shrink-0 mb-4">
          <div className="flex flex-col items-center justify-center py-3 border-b border-gray-300">
            <Image
              src="/logo.png"
              alt="প্রতিদিনের কাগজ"
              width={400}
              height={100}
              className="object-contain w-[400px]"
              priority
            />
            <LiveBanglaDateModule />
          </div>

          <div className="bg-cyan-900 flex items-center justify-between px-6 py-3 gap-3 mt-2">
            <div className="flex items-center gap-2">
              <button className="text-white text-xl">🏠</button>
              <span className="text-white">|</span>
              <button
                onClick={downloadPage}
                className="flex items-center gap-2 bg-cyan-800 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded font-solaiman transition-colors"
              >
                ⬇ ডাউনলোড
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              {pages.map((num, i) => (
                <button
                  key={i}
                  className="w-9 h-9 bg-white hover:bg-blue-100 font-bold text-sm rounded flex items-center justify-center text-blue-600"
                >
                  {num}
                </button>
              ))}
              <button className="w-9 h-9 bg-white hover:bg-blue-100 font-bold text-sm rounded flex items-center justify-center text-blue-600">
                »
              </button>
            </div>

            <div className="flex items-center gap-3 text-white text-sm">
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded font-solaiman transition-colors text-sm">
                f Share
              </button>
              <button className="hover:text-gray-200 font-solaiman transition-colors text-sm">
                🌐 অনলাইন
              </button>
              <button className="hover:text-gray-200 font-solaiman transition-colors text-sm">
                🖨 প্রিন্ট
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button className="w-10 h-8 bg-white text-cyan-900 font-bold text-sm rounded flex items-center justify-center hover:bg-blue-300 transition-colors cursor-pointer">
                BN
              </button>
              <button className="w-10 h-8 bg-white text-cyan-900 font-bold text-sm rounded flex items-center justify-center hover:bg-blue-300 transition-colors cursor-pointer">
                EN
              </button>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT - 3 column (Increased widths here too) */}
        <div className="flex flex-row flex-1 gap-4 p-2 min-h-0 overflow-y-auto">
          
          {/* LEFT SIDBAR (Width increased to 180px) */}
          <div className="flex flex-col gap-2 w-[180px] min-w-[180px] shrink-0">
             {/* Left sidebar content handled in PageViewer.js, but wrapper size updated here implicitly via props or internal logic if needed. 
                 Note: The actual width control for the thumbnail list inside PageViewer might need adjustment there too if it uses fixed pixels. 
                 However, since we are scaling the whole div, the visual size increases. 
                 If you want the internal structure larger relative to others, update PageViewer.js as well. */}
            <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden flex-1">
               <div className="bg-teal-700 text-white text-center text-[16px] font-solaiman py-2">
                সকল পাতা
              </div>
              {/* This part is actually rendered in PageViewer.js, so ensure PageViewer's left sidebar width is also increased there. 
                  For now, we assume the scaling handles the visual growth. */}
            </div>
          </div>

          {/* CENTER VIEW (Grows automatically) */}
          <PageViewer />

          {/* RIGHT SIDEBAR (Width increased to 220px) */}
          <div className="flex flex-col gap-3 w-[220px] min-w-[220px] shrink-0">
            <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
              <div className="bg-teal-700 text-white text-center text-[16px] font-solaiman py-2">
                পুরোনো সংখ্যা
              </div>
              <div className="p-2">
                <div className="flex gap-1 mb-2">
                  <select
                    className="flex-1 text-[12px] border border-orange-400 rounded px-1 py-1"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  >
                    {months.map((m, i) => (
                      <option key={i} value={i}>{m}</option>
                    ))}
                  </select>
                  <select
                    className="w-16 text-[12px] border border-orange-400 rounded px-1 py-1"
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
                        <th key={i} className="py-1 text-center text-gray-600 font-medium border border-orange-200 text-[11px]">
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
                            className={`text-center py-1 border border-orange-200 cursor-pointer hover:bg-orange-100 text-[12px]
                              ${isCurrentMonthYear && date === todayDate ? "bg-orange-500 text-white font-bold" : "text-gray-700"}
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

            <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden flex-1">
              <div className="bg-cyan-900 text-white text-center text-[16px] font-solaiman py-2">
                আজকের পত্রিকা
              </div>
              <div className="p-3 flex flex-col font-solaiman">
                {pageList.map((pg, i) => (
                  <div key={i} className="mb-2">
                    <div className="flex items-center gap-2 py-1">
                      <span className="text-base">✅</span>
                      <button className={`text-[13px] hover:underline ${pg.active ? "text-gray-800 font-medium" : "text-gray-400"}`}>
                        {pg.name}
                      </button>
                    </div>
                    {i < pageList.length - 1 && <div className="border-b border-dashed border-cyan-900 my-1" />}
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="text-[13px] text-gray-700 hover:underline font-solaiman">
                    বিজ্ঞাপনের জন্য যোগাযোগ করুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="bg-white border-t-4 border-blue-600 mt-4 shrink-0 pt-4 pb-2">
          <div className="px-6 py-4 text-center">
            <Image
              src="/logo.png"
              alt="প্রতিদিনের কাগজ"
              width={200}
              height={60}
              className="object-contain mx-auto w-[200px]"
            />
            <p className="text-gray-500 text-sm mt-2 font-solaiman">
              © ২২৬ সর্বস্বত্ব স্বত্বাধিকার সংরক্ষিত
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}