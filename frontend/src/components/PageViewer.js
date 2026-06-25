'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function PageViewer() {
  const [pages, setPages] = useState([]);
  const [activePage, setActivePage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/pages/`)
      .then((r) => r.json())
      .then((data) => {
        setPages(data);
        if (data.length > 0) setActivePage(data[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center h-64 text-gray-500 text-sm">
        লোড হচ্ছে...
      </div>
    );
  }

  return (
    <>
      {/* Left Sidebar — সব screen এ দেখাবে */}
      <div className="flex flex-col gap-1" style={{ width: '70px', minWidth: '70px' }}>
        <div className="bg-teal-700 text-white text-center text-[10px] font-medium py-1 rounded-t">
          সকল পাতা
        </div>
        <div
          className="flex flex-col gap-1 overflow-y-auto pr-0.5"
          style={{ maxHeight: '600px' }}
        >
          {pages.map((pg) => (
            <div
              key={pg.id}
              className="flex flex-col shrink-0 cursor-pointer"
              onClick={() => setActivePage(pg)}
            >
              <div
                className={`border rounded overflow-hidden transition-all ${
                  activePage?.id === pg.id
                    ? 'border-teal-500 ring-1 ring-teal-400'
                    : 'border-gray-300 hover:border-teal-500'
                }`}
              >
                <Image
                  src={pg.image_url}
                  alt={pg.title}
                  width={65}
                  height={90}
                  className="object-cover w-full"
                  style={{ height: '80px' }}
                />
              </div>
              <p className={`text-center text-[8px] mt-0.5 font-medium rounded py-0.5 truncate px-0.5 ${
                activePage?.id === pg.id ? 'bg-teal-600 text-white' : 'bg-teal-700 text-white'
              }`}>
                {pg.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Center View */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="bg-white border border-gray-300 rounded shadow-lg flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-1 bg-white" style={{ minHeight: '300px' }}>
            {activePage ? (
              <Image
                src={activePage.image_url}
                alt={activePage.title}
                width={700}
                height={900}
                className="object-contain w-full h-auto"
                priority
              />
            ) : (
              <p className="text-gray-400 text-center mt-20 text-sm">কোনো পাতা নির্বাচিত হয়নি</p>
            )}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-200 flex items-center justify-between px-2 py-1.5 bg-gray-50 gap-1">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] px-2 py-1 rounded transition-colors whitespace-nowrap">
              📄 সব পাতা
            </button>
            <div className="flex items-center gap-1">
              <button className="w-6 h-6 bg-blue-600 text-white font-bold rounded flex items-center justify-center text-[10px]">f</button>
              <button className="w-6 h-6 bg-sky-500 text-white font-bold rounded flex items-center justify-center text-[10px]">t</button>
              <button className="w-6 h-6 bg-red-600 text-white font-bold rounded flex items-center justify-center text-[10px]">▶</button>
            </div>
            <button
              onClick={() => {
                const idx = pages.findIndex((p) => p.id === activePage?.id);
                if (idx < pages.length - 1) setActivePage(pages[idx + 1]);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] px-2 py-1 rounded transition-colors whitespace-nowrap"
            >
              পরের পাতা »
            </button>
          </div>
        </div>
      </div>
    </>
  );
}