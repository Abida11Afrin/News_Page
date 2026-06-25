'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const sizeMap = {
  small:  { width: 150, height: 200 },
  medium: { width: 250, height: 330 },
  large:  { width: 350, height: 460 },
  full:   { width: 500, height: 660 },
};

const positionClass = {
  left:   'justify-start',
  center: 'justify-center',
  right:  'justify-end',
};

export default function PageViewer() {
  const [pages, setPages] = useState([]);
  const [homeImages, setHomeImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/pages/`).then((r) => r.json()),
      fetch(`${API_URL}/api/homepage-images/`).then((r) => r.json()),
    ]).then(([pagesData, imagesData]) => {
      setPages(pagesData);
      setHomeImages(imagesData);
      setLoading(false);
    }).catch(() => setLoading(false));
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
      {/* Left Sidebar */}
      <div className="flex flex-col gap-1" style={{ width: '110px', minWidth: '110px' }}>
        <div className="bg-teal-700 text-white text-center text-[10px] font-medium py-1 rounded-t">
          সকল পাতা
        </div>
        <div className="flex flex-col gap-1 overflow-y-auto pr-0.5" style={{ maxHeight: '600px' }}>
          {pages.map((pg) => (
            <div
              key={pg.id}
              className="flex flex-col shrink-0 cursor-pointer"
              onClick={() => router.push(`/page${pg.order}`)}
            >
              <div className="border border-gray-300 hover:border-teal-500 rounded overflow-hidden transition-all">
                <Image
                  src={pg.image_url}
                  alt={pg.title}
                  width={100}
                  height={130}
                  className="object-cover w-full"
                  style={{ height: '120px' }}
                />
              </div>
              <p className="text-center text-[8px] mt-0.5 font-medium rounded py-0.5 truncate px-0.5 bg-teal-700 text-white">
                {pg.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Center View */}
      <div className="flex-1 flex flex-col min-w-0">
        <div
          className="bg-white rounded-3xl overflow-hidden flex-1 flex flex-col"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.13), 0 1.5px 6px rgba(0,0,0,0.08)' }}
        >
          {/* Images area */}
          <div className="flex-1 p-3 flex flex-col gap-3" style={{ minHeight: '300px' }}>
            {homeImages.length > 0 ? (
              homeImages.map((img) => {
                const size = sizeMap[img.size] || sizeMap.medium;
                return (
                  <div key={img.id} className={`flex w-full ${positionClass[img.position] || 'justify-center'}`}>
                    <Image
                      src={img.image_url}
                      alt="ছবি"
                      width={size.width}
                      height={size.height}
                      className="object-contain rounded-xl"
                      style={{ width: size.width, height: 'auto' }}
                    />
                  </div>
                );
              })
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-400 text-center text-sm">
                  বাম পাশ থেকে পাতা নির্বাচন করুন
                </p>
              </div>
            )}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-200 flex items-center justify-between px-2 py-1.5 bg-gray-50 gap-1 rounded-b-3xl">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] px-2 py-1 rounded transition-colors whitespace-nowrap">
              📄 সব পাতা
            </button>
            <div className="flex items-center gap-1">
              <button className="w-6 h-6 bg-blue-600 text-white font-bold rounded flex items-center justify-center text-[10px]">f</button>
              <button className="w-6 h-6 bg-sky-500 text-white font-bold rounded flex items-center justify-center text-[10px]">t</button>
              <button className="w-6 h-6 bg-red-600 text-white font-bold rounded flex items-center justify-center text-[10px]">▶</button>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] px-2 py-1 rounded transition-colors whitespace-nowrap">
              পরের পাতা »
            </button>
          </div>
        </div>
      </div>
    </>
  );
}