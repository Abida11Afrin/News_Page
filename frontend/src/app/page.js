"use client";
import Image from "next/image";
import LiveBanglaDateModule from "../components/LiveBanglaDateModule";
import PageViewer from "../components/PageViewer";
import { useState } from "react";

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

  // Dynamic calendar dates
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

//download function
const downloadPage = () => {
  const imageUrl = window.__activePageImageUrl;
  const title = window.__activePageTitle || 'pratidiner-kagoj';

  if (!imageUrl) {
    alert('কোনো পাতা নির্বাচিত নেই');
    return;
  }

  fetch(imageUrl)
    .then((res) => res.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    })
    .catch(() => alert('ডাউনলোড হয়নি'));
};
  return (
    <main className="min-h-screen flex items-center justify-center bg-white-200 px-2">
      <div className="bg-white w-full max-w-[1000px] rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.2)] border border-gray-300 flex flex-col my-4 overflow-hidden">

        {/* HEADER */}
        <header className="bg-white">
          <div className="flex flex-col items-center justify-center py-3 border-b border-gray-300">
            <Image
              src="/logo.png"
              alt="প্রতিদিনের কাগজ"
              width={350}
              height={90}
              className="object-contain w-[250px] md:w-[350px]"
              priority
            />
            <LiveBanglaDateModule />
          </div>

          {/* Nav Bar */}
          <div className="bg-cyan-900 flex items-center justify-between px-3 sm:px-4 py-2 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <button className="text-white text-lg px-1">🏠</button>
              <span className="hidden sm:inline text-white">|</span>
              <button
                onClick={downloadPage}
                className="flex items-center gap-1 bg-cyan-800 hover:bg-blue-500 text-white text-xs sm:text-sm px-3 py-1.5 rounded text-[14px] font-solaiman transition-colors"
                                                          >
                            ⬇ ডাউনলোড
</button>
            </div>
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide mx-auto sm:mx-0">
              {pages.map((num, i) => (
                <button key={i} className="w-7 h-7 bg-white hover:bg-blue-100 font-bold text-xs rounded flex items-center justify-center shrink-0 text-blue-600">
                  {num}
                </button>
              ))}
              <button className="w-7 h-7 bg-white hover:bg-blue-100 font-bold text-xs rounded flex items-center justify-center shrink-0 text-blue-600">
                »
              </button>
            </div>
            <div className="flex items-center gap-2 text-white text-xs sm:text-sm">
              <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded text-[14px] font-solaiman transition-colors">
                f Share 4.3K
              </button>
              <span className="hidden sm:inline">|</span>
              <button className="hover:text-gray-200 text-[14px] font-solaiman transition-colors">🌐 অনলাইন</button>
              <span className="hidden sm:inline">|</span>
              <button className="hover:text-gray-200 text-[14px] font-solaiman transition-colors">🖨 প্রিন্ট</button>
            </div>
          </div>
        </header>

        {/* ======== MAIN CONTENT ======== */}
        <div id="main-content" className="flex flex-row flex-1 gap-1 p-1">
          <PageViewer />

          {/* Right Sidebar */}
          <div className="flex flex-col gap-2 order-3" style={{ width: '150px', minWidth: '150px' }}>

            {/* পুরোনো সংখ্যা */}
            <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
              <div className="bg-teal-700 text-white text-center text-[14px] font-solaiman py-1">
                পুরোনো সংখ্যা
              </div>
              <div className="p-1">
                <div className="flex gap-0.5 mb-1">
                  <select
                    className="flex-1 text-[8px] border border-orange-400 rounded px-0.5 py-0.5"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  >
                    {months.map((m, i) => <option key={i} value={i}>{m}</option>)}
                  </select>
                  <select
                    className="w-12 text-[8px] border border-orange-400 rounded px-0.5 py-0.5"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  >
                    {years.map((y, i) => (
                      <option key={i} value={2024 + i}>{y}</option>
                    ))}
                  </select>
                </div>

                <table className="w-full text-[7px] border border-orange-300">
                  <thead>
                    <tr className="bg-orange-50">
                      {calendarDays.map((d, i) => (
                        <th key={i} className="py-0.5 text-center text-gray-600 font-medium border border-orange-200" style={{ fontSize: '6px' }}>
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
                            className={`text-center py-0.5 border border-orange-200 cursor-pointer hover:bg-orange-100
                              ${isCurrentMonthYear && date === todayDate ? "bg-orange-500 text-white font-bold" : "text-gray-700"}
                              ${di === 0 && date ? "text-red-500" : ""}
                            `}
                            style={{ fontSize: '7px' }}
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
  <div className="bg-cyan-900 text-white text-center text-[14px] font-solaiman py-1.5">
    আজকের পত্রিকা
  </div>
  <div className="p-2 flex flex-col text-[14px] font-solaiman">
    {pageList.map((pg, i) => (
      <div key={i}>
        <div className="flex items-center gap-2 py-1">
          <span className={`text-sm ${pg.active ? "text-black-800" : "text-black-400"}`}>
            {pg.active ? "✅" : "✅"}
          </span>
          <button className={`text-[11px] hover:underline ${
            pg.active ? "text-gray-800 font-medium" : "text-black-400"
          }`}>
            {pg.name}
          </button>
        </div>
        {i < pageList.length - 1 && (
          <div className="border-b border-dashed border-cyan-900" />
        )}
      </div>
    ))}
    <div className="mt-2 pt-2 border-t border-gray-200">
      <button className="text-[11px] text-gray-700 hover:underline text-[14px] font-solaiman">
        For Advertisement
      </button>
    </div>
  </div>
</div>

          </div>
        </div>

        {/* FOOTER */}
        <footer className="bg-white border-t-4 border-blue-600 mt-2">
          <div className="px-6 py-4 text-center">
            <Image
              src="/logo.png"
              alt="প্রতিদিনের কাগজ"
              width={180}
              height={50}
              className="object-contain mx-auto"
            />
            <p className="text-gray-500 text-xs mt-1 text-[14px] font-solaiman">
              © ২০২৬ সর্বস্বত্ব স্বত্বাধিকার সংরক্ষিত
            </p>
          </div>
        </footer>

      </div>
    </main>
  );
}