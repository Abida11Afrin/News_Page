'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const sizeMap = {
  small: { width: 150, height: 200 },
  medium: { width: 250, height: 330 },
  large: { width: 350, height: 460 },
  full: { width: 500, height: 660 },
};

const positionClass = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

export default function PageViewer({ showSidebar = true }) {
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

  const openViewer = (img) => {
    setSelectedImage(img);
    if (img.id) {
      router.push(`?image=${img.id}`, { scroll: false });
    }
  };

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
      {/* ===== Left Sidebar (Thumbnails) ===== */}
      {showSidebar && (
        <div className="flex flex-col gap-1 w-[60px] sm:w-[85px] lg:w-[110px] min-w-[60px] sm:min-w-[85px] lg:min-w-[200px] shrink-0">
          <div className="bg-teal-700 text-white text-center text-[8px] sm:text-[9px] lg:text-[10px] font-medium py-1 rounded-t">
            সকল পাতা
          </div>
          <div className="flex flex-col gap-1 overflow-y-auto pr-0.5 max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] scrollbar-hide">
            {pages.map((pg) => (
              <div
                key={pg.id}
                className="flex flex-col shrink-0 cursor-pointer"
                onClick={() => {
                  window.__activePageImageUrl = pg.image_url;
                  window.__activePageTitle = pg.title;
                  router.push(`/page${pg.order}`);
                }}
              >
                <div className="border border-gray-300 hover:border-teal-500 rounded overflow-hidden transition-all">
                  <Image
                    src={pg.image_url}
                    alt={pg.title}
                    width={100}
                    height={130}
                    className="object-cover w-full h-[70px] sm:h-[95px] lg:h-[120px]"
                  />
                </div>
                <p className="text-center text-[6px] sm:text-[7px] lg:text-[8px] mt-0.5 font-medium rounded py-0.5 truncate px-0.5 bg-cyan-900 text-white">
                  {pg.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== Center View ===== */}
      <div className="flex-1 flex flex-col min-w-0">
        <div
          className="bg-white rounded-2xl lg:rounded-3xl overflow-hidden flex-1 flex flex-col"
          style={{
            boxShadow: '0 4px 24px rgba(0,0,0,0.13), 0 1.5px 6px rgba(0,0,0,0.08)',
          }}
        >
          <div
            className="flex-1 p-1.5 sm:p-2 lg:p-3 flex flex-col gap-2 lg:gap-3 overflow-y-auto"
            style={{ minHeight: '250px' }}
          >
            {homeImages.length > 0 ? (
              homeImages.map((img) => {
                const size = sizeMap[img.size] || sizeMap.medium;
                return (
                  <div
                    key={img.id}
                    className={`flex w-full ${positionClass[img.position] || 'justify-center'}`}
                  >
                    {img.content ? (
                      <div
                        className="ck-content w-full cursor-pointer"
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
                    ) : (
                      <div
                        onClick={() => openViewer(img)}
                        className="cursor-pointer overflow-hidden rounded-xl transition-all duration-300 group relative w-full"
                        style={{ maxWidth: size.width }}
                      >
                        <Image
                          src={img.image_url}
                          alt="ছবি"
                          width={size.width}
                          height={size.height}
                          className="object-contain rounded-xl transition-all duration-300 group-hover:brightness-50 w-full h-auto"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-400 text-center text-sm">কোনো ছবি পাওয়া যায়নি</p>
              </div>
            )}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-200 flex items-center justify-between px-1.5 sm:px-2 py-1 sm:py-1.5 bg-gray-50 gap-1 rounded-b-2xl lg:rounded-b-3xl">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-1 rounded transition-colors whitespace-nowrap">
              📄 সব পাতা
            </button>
            <div className="flex items-center gap-0.5 sm:gap-1">
              <button className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 text-white font-bold rounded flex items-center justify-center text-[8px] sm:text-[10px]">f</button>
              <button className="w-5 h-5 sm:w-6 sm:h-6 bg-sky-500 text-white font-bold rounded flex items-center justify-center text-[8px] sm:text-[10px]">t</button>
              <button className="w-5 h-5 sm:w-6 sm:h-6 bg-red-600 text-white font-bold rounded flex items-center justify-center text-[8px] sm:text-[10px]">▶</button>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-1 rounded transition-colors whitespace-nowrap">
              পরের পাতা »
            </button>
          </div>
        </div>

        {/* Fullscreen Image Viewer */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-2 sm:p-4"
            onClick={closeViewer}
          >
            <div
              className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-visible flex flex-col"
              style={{ maxHeight: '95vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeViewer}
                className="absolute -top-4 -right-4 z-[200] bg-red-600 hover:bg-red-700 text-white w-9 h-9 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg transition-transform hover:scale-110"
                aria-label="বন্ধ করুন"
              >
                ×
              </button>

              <div className="flex items-center justify-center px-6 py-3 border-b shrink-0 rounded-t-2xl">
                <img
                  src="/logo.png"
                  alt="প্রতিদিনের কাগজ"
                  className="h-[40px] sm:h-[50px] w-auto"
                />
              </div>

              <div className="overflow-y-auto flex-1 p-3 sm:p-4">
                <Image
                  src={selectedImage.image_url}
                  alt="ছবি"
                  width={1200}
                  height={1600}
                  className="w-full h-auto rounded-xl object-contain"
                  priority
                />
              </div>

              <div className="flex items-center gap-2 px-3 sm:px-4 py-3 border-t bg-gray-50 shrink-0 rounded-b-2xl flex-wrap">
                <span className="text-xs text-gray-500 mr-1">শেয়ার করুন</span>

                <button
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                      '_blank'
                    )
                  }
                  className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center font-bold"
                >
                  f
                </button>

                <button
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`,
                      '_blank'
                    )
                  }
                  className="w-8 h-8 bg-sky-500 hover:bg-sky-600 text-white rounded-full flex items-center justify-center font-bold"
                >
                  t
                </button>

                <button
                  onClick={() => window.print()}
                  className="w-8 h-8 bg-gray-600 hover:bg-gray-700 text-white rounded-full flex items-center justify-center"
                >
                  🖨
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href).then(() => {
                      showToast('লিংক কপি হয়েছে!');
                    });
                  }}
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-full cursor-pointer"
                >
                  কপি লিংক
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}