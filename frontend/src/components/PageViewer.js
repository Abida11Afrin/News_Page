'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function PageViewer() {
  const [pages, setPages] = useState([]);
  const [homeImages, setHomeImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/pages/`).then((r) => r.json()),
      fetch(`${API_URL}/api/homepage-images/`).then((r) => r.json()),
    ])
      .then(([pagesData, imagesData]) => {
        setPages(pagesData);
        setHomeImages(imagesData);
        if (pagesData.length > 0) {
          window.__activePageImageUrl = pagesData[0].image_url;
          window.__activePageTitle = pagesData[0].title;
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (homeImages.length === 0) return;
    const params = new URLSearchParams(window.location.search);
    const imageId = params.get('image');
    if (imageId) {
      const found = homeImages.find((img) => String(img.id) === String(imageId));
      if (found) setSelectedImage(found);
    }
  }, [homeImages]);

  const closeViewer = () => {
    setSelectedImage(null);
    router.push('/', { scroll: false });
  };

  const showToast = (message) => {
    const existing = document.getElementById('copy-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.id = 'copy-toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed; bottom: 32px; left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #059669, #10b981);
      color: white; padding: 12px 24px; border-radius: 50px;
      font-size: 14px; font-weight: 600;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      z-index: 99999;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center h-64 text-gray-500 text-sm">
        লোড হচ্ছে...
      </div>
    );
  }

  return (
    <>
      {/* ===== LEFT SIDEBAR (Width Increased to 160px) ===== */}
      <div className="flex flex-col gap-2 w-[160px] min-w-[160px] shrink-0">
        <div className="bg-teal-700 text-white text-center text-[12px] font-bold py-2 rounded-t shadow-sm">
          সকল পাতা
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto pr-1 scrollbar-hide flex-1 min-h-0">
          {pages.map((pg) => (
            <div
              key={pg.id}
              className="flex flex-col shrink-0 cursor-pointer group"
              onClick={() => {
                window.__activePageImageUrl = pg.image_url;
                window.__activePageTitle = pg.title;
                router.push(`/page${pg.order}`);
              }}
            >
              <div className="border border-gray-300 group-hover:border-teal-500 rounded-lg overflow-hidden transition-all shadow-sm">
                <Image
                  src={pg.image_url}
                  alt={pg.title}
                  width={120}
                  height={150}
                  className="object-cover w-full h-[140px]"
                />
              </div>
              <p className="text-center text-[10px] mt-1 font-medium rounded-md py-1 truncate px-1 bg-cyan-900 text-white shadow-sm">
                {pg.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== CENTER VIEW (Wider with better spacing) ===== */}
      <div className="flex-1 flex flex-col min-w-0 px-2">
        <div
          className="bg-white rounded-2xl overflow-hidden flex-1 flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.13)] border border-gray-200"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.13), 0 1.5px 6px rgba(0,0,0,0.08)' }}
        >
          {/* Content Container */}
          <div className="flex-1 p-5 min-h-0">
            {homeImages.length > 0 ? (
              homeImages.map((img) => (
                <div
                  key={img.id}
                  className="ck-content cursor-pointer mb-4"
                  onClick={(e) => {
                    const clickedImg = e.target.closest('img');
                    if (clickedImg) {
                      setSelectedImage({ image_url: clickedImg.src });
                    }
                  }}
                  dangerouslySetInnerHTML={{
                    __html: img.content.replace(
                      /src="\/media\//g,
                      `src="${API_URL}/media/`
                    ),
                  }}
                />
              ))
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-400 text-center text-base">
                  কোনো ছবি পাওয়া যায়নি
                </p>
              </div>
            )}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-200 flex items-center justify-between px-4 py-3 bg-gray-50 gap-2 shrink-0 rounded-b-2xl">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-[12px] px-4 py-2 rounded transition-colors whitespace-nowrap font-medium">
              📄 সব পাতা
            </button>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center text-[12px] shadow-sm">f</button>
              <button className="w-8 h-8 bg-sky-500 text-white font-bold rounded-full flex items-center justify-center text-[12px] shadow-sm">t</button>
              <button className="w-8 h-8 bg-red-600 text-white font-bold rounded-full flex items-center justify-center text-[12px] shadow-sm">▶</button>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-[12px] px-4 py-2 rounded transition-colors whitespace-nowrap font-medium">
              পরের পাতা »
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Viewer (Kept same) */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={closeViewer}>
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col" style={{ maxHeight: '95vh' }} onClick={(e) => e.stopPropagation()}>
            <button onClick={closeViewer} className="absolute -top-4 -right-4 bg-red-600 hover:bg-red-700 text-white w-9 h-9 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">×</button>
            <div className="overflow-y-auto flex-1 p-4">
              <Image src={selectedImage.image_url} alt="ছবি" width={1200} height={1600} className="w-full h-auto rounded-xl object-contain" priority />
            </div>
          </div>
        </div>
      )}
    </>
  );
}