"use client";
import Image from "next/image";
import LiveBanglaDateModule from "../components/LiveBanglaDateModule";
import PageViewer from "../components/PageViewer";

export default function Home() {
  const pages = ["১", "২", "৩", "৪", "৫", "৬", "৭", "৮"];
  const months = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
  ];
  const years = ["২০২৪", "২০২৫", "২০২৬"];
  const calendarDays = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহ", "শুক্র", "শনি"];
  const calendarDates = [
    ["", "", "", "", "", "", "১"],
    ["২", "৩", "৪", "৫", "৬", "৭", "৮"],
    ["৯", "১০", "১১", "১২", "১৩", "১৪", "১৫"],
    ["১৬", "১৭", "১৮", "১৯", "২০", "২১", "২২"],
    ["২৩", "২৪", "২৫", "২৬", "২৭", "২৮", "২৯"],
    ["৩০", "", "", "", "", "", ""],
  ];
  const todayDate = new Date().getDate().toLocaleString("bn-BD");

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

  return (
    <main className="min-h-screen flex items-center justify-center bg-White-200 px-2">
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
          <div className="bg-cyan-800 flex items-center justify-between px-3 sm:px-4 py-2 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <button className="text-white text-lg px-1">🏠</button>
              <span className="hidden sm:inline text-white">|</span>
              <button className="flex items-center gap-1 bg-cyan-800 hover:bg-blue-500 text-white text-xs sm:text-sm px-3 py-1.5 rounded transition-colors">
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
              <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded transition-colors">
                f Share 4.3K
              </button>
              <span className="hidden sm:inline">|</span>
              <button className="hover:text-gray-200 transition-colors">🌐 অনলাইন</button>
              <span className="hidden sm:inline">|</span>
              <button className="hover:text-gray-200 transition-colors">🖨 প্রিন্ট</button>
            </div>
          </div>
        </header>

{/* ======== MAIN CONTENT ======== */}
<div className="flex flex-row flex-1 gap-1 p-1 md:gap-1 md:p-1">
  <PageViewer />

  {/* Right Sidebar */}
  <div className="flex flex-col gap-2 order-3" style={{ width: '150px', minWidth: '150px' }}>
    
    {/* পুরোনো সংখ্যা */}
    <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
      <div className="bg-teal-700 text-white text-center text-[10px] font-medium py-1">
        পুরোনো সংখ্যা
      </div>
      <div className="p-1">
        <div className="flex gap-0.5 mb-1">
          <select className="flex-1 text-[8px] border border-orange-400 rounded px-0.5 py-0.5">
            {months.map((m, i) => <option key={i}>{m}</option>)}
          </select>
          <select className="w-10 text-[8px] border border-orange-400 rounded px-0.5 py-0.5">
            {years.map((y, i) => <option key={i}>{y}</option>)}
          </select>
        </div>
        <table className="w-full text-[7px] border border-orange-300">
          <thead>
            <tr className="bg-orange-50">
              {calendarDays.map((d, i) => (
                <th key={i} className="py-0.5 text-center text-gray-600 font-medium border border-orange-200" style={{ fontSize: '6px' }}>
                  {d.charAt(0)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {calendarDates.map((week, wi) => (
              <tr key={wi}>
                {week.map((date, di) => (
                  <td key={di} className={`text-center py-0.5 border border-orange-200
                    ${date === todayDate ? "bg-orange-500 text-white font-bold" : "text-gray-700"}
                    ${di === 0 ? "text-red-500" : ""}
                  `} style={{ fontSize: '7px' }}>
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
      <div className="bg-teal-700 text-white text-center text-[10px] font-medium py-1">
        আজকের পত্রিকা
      </div>
      <div className="p-1 flex flex-col gap-0.5">
        {pageList.map((pg, i) => (
          <div key={i} className="flex items-center gap-1">
            <span className={`text-[8px] ${pg.active ? "text-blue-600" : "text-gray-400"}`}>
              {pg.active ? "✅" : "☑"}
            </span>
            <button className={`text-[8px] hover:underline truncate ${
              pg.active ? "text-blue-600" : "text-gray-400"
            }`}>
              {pg.name}
            </button>
          </div>
        ))}
        <div className="mt-1 pt-1 border-t border-gray-200">
          <button className="text-[8px] text-blue-600 hover:underline">
            For Ad
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
            <p className="text-gray-500 text-xs mt-1">
              © ২০২৬ সর্বস্বত্ব স্বত্বাধিকার সংরক্ষিত
            </p>
          </div>
        </footer>

      </div>
    </main>
  );
}