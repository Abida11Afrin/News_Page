"use client";
import Image from "next/image";
import LiveBanglaDateModule from "../components/LiveBanglaDateModule";

export default function Home() {
  // শুধু যে গুলো সত্যিই লাগে
  const pages = ["১", "২", "৩", "৪", "৫", "৬", "৭", "৮"];
  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
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
    <main className="min-h-screen flex items-center justify-center bg-gray-200 px-2">
      <div className="bg-white w-full max-w-[1200px] rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.2)] border border-gray-300 flex flex-col my-4 overflow-hidden">
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
                ⬇ ডাউনলোড
              </button>
            </div>

            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide mx-auto sm:mx-0">
              {pages.map((num, i) => (
                <button
                  key={i}
                  className="w-7 h-7 bg-white bg-blue-600 hover:bg-blue-100 font-bold text-xs rounded flex items-center justify-center shrink-0"
                >
                  {num}
                </button>
              ))}
              <button className="w-7 h-7 bg-white bg-blue-600 hover:bg-blue-100 font-bold text-xs rounded flex items-center justify-center shrink-0">
                »
              </button>
            </div>

            <div className="flex items-center gap-2 text-white text-xs sm:text-sm">
              <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded transition-colors">
                f Share 4.3K
              </button>
              <span className="hidden sm:inline">|</span>
              <button className="hover:text-gray-200 transition-colors">🌐 অনলাইন</button>
              <span className="hidden sm:inline">|</span>
              <button className="hover:text-gray-200 transition-colors">🖨 প্রিন্ট</button>
            </div>
          </div>
        </header>

  {/* ======== MAIN CONTENT ======== */}
        <div className="flex flex-col md:flex-row flex-1 gap-2 p-3 md:p-4">
          {/* Left Sidebar */}
          <div className="md:w-1/6 flex flex-col gap-2 order-2 md:order-1">
            <div className="bg-teal-700 text-white text-center text-sm font-medium py-1.5 rounded-t">
              সকল পাতা
            </div>
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto max-h-[950px] pr-1 scrollbar-thin">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((pg) => (
                <div
                  key={pg}
                  className="flex flex-col w-[100px] md:w-auto shrink-0"
                >
                  <div className="bg-gray-200 border border-gray-300 rounded overflow-hidden cursor-pointer hover:border-teal-500 transition-colors">
                    <Image
                      src={`/pages/page-${pg}.jpg`}
                      alt={`পাতা ${pg}`}
                      width={130}
                      height={180}
                      className="object-cover w-full"
                    />
                  </div>
                  <p className="text-center text-xs text-gray-600 mt-1 font-medium bg-teal-700 text-white rounded py-0.5">
                    page-{pg}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Center View */}
          <div className="flex-1 md:w-4/6 flex flex-col mx-0 md:mx-2 order-1 md:order-2">
            <div className="bg-white border border-gray-300 rounded shadow-lg flex-1 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto p-2 bg-white min-h-[400px]">
                <Image
                  src="/pages/page-1.jpg"
                  alt="আজকের পাতা"
                  width={700}
                  height={900}
                  className="object-contain w-full h-auto"
                />
              </div>

              {/* Bottom inside paper */}
              <div className="border-t border-gray-200 flex flex-wrap items-center justify-between px-4 py-2 bg-gray-50 gap-2">
                {/* সব পাতা */}
                <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-3 py-1.5 rounded transition-colors">
                  📄 সব পাতা
                </button>

                {/* Social */}
                <div className="flex items-center gap-2">
                  <button className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded flex items-center justify-center transition-colors text-xs sm:text-sm">
                    f
                  </button>
                  <button className="w-7 h-7 sm:w-8 sm:h-8 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded flex items-center justify-center transition-colors text-xs sm:text-sm">
                    t
                  </button>
                  <button className="w-7 h-7 sm:w-8 sm:h-8 bg-red-600 hover:bg-red-700 text-white font-bold rounded flex items-center justify-center transition-colors text-xs sm:text-sm">
                    ▶
                  </button>
                </div>

                {/* পরের পাতা */}
                <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-3 py-1.5 rounded transition-colors">
                  পরের পাতা »
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="md:w-1/6 flex flex-col gap-3 order-3">
            {/* পুরোনো সংখ্যা */}
            <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
              <div className="bg-teal-700 text-white text-center text-sm font-medium py-1.5">
                পুরোনো সংখ্যা
              </div>
              <div className="p-2">
                {/* Month & Year Select */}
                <div className="flex gap-1 mb-2">
                  <select className="flex-1 text-xs border border-orange-400 rounded px-1 py-1">
                    {months.map((m, i) => (
                      <option key={i}>{m}</option>
                    ))}
                  </select>
                  <select className="w-16 text-xs border border-orange-400 rounded px-1 py-1">
                    {years.map((y, i) => (
                      <option key={i}>{y}</option>
                    ))}
                  </select>
                </div>

                {/* Calendar */}
                <table className="w-full text-xs border border-orange-300">
                  <thead>
                    <tr className="bg-orange-50">
                      {calendarDays.map((d, i) => (
                        <th
                          key={i}
                          className="py-0.5 text-center text-gray-600 font-medium border border-orange-200 text-[9px]"
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
                            className={`text-center py-0.5 border border-orange-200 text-[10px]
                              ${date === todayDate ? "bg-orange-500 text-white font-bold rounded" : "text-gray-700"}
                              ${di === 0 ? "text-red-500" : ""}
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
              <div className="bg-teal-700 text-white text-center text-sm font-medium py-1.5">
                আজকের পত্রিকা
              </div>
              <div className="p-2 flex flex-col gap-1">
                {pageList.map((pg, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span
                      className={`text-sm ${
                        pg.active ? "text-blue-600" : "text-gray-400"
                      }`}
                    >
                      {pg.active ? "✅" : "☑"}
                    </span>
                    <button
                      className={`text-xs hover:underline transition-colors ${
                        pg.active
                          ? "text-blue-600 hover:text-blue-800"
                          : "text-gray-400"
                      }`}
                    >
                      {pg.name}
                    </button>
                    {i < pageList.length - 1 && (
                      <div className="flex-1 border-b border-dashed border-gray-300"></div>
                    )}
                  </div>
                ))}
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <button className="text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                    For Advertisement
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== FOOTER ===== */}
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