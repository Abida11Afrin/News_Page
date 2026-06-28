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

  const openViewer = (img) => setSelectedImage(img);
  const closeViewer = () => setSelectedImage(null);

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
                  className="object-cover w-full"
                  style={{ height: '120px' }}
                />
              </div>
              <p className="text-center text-[8px] mt-0.5 font-medium rounded py-0.5 truncate px-0.5 bg-cyan-900 text-white">
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
          <div className="flex-1 p-3 flex flex-col gap-3 overflow-y-auto" style={{ minHeight: '300px' }}>
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
                        onMouseOver={(e) => {
                          const hoveredImg = e.target.closest('img');
                          if (hoveredImg) {
                            hoveredImg.style.filter = 'brightness(0.5)';
                            hoveredImg.style.transition = 'filter 0.3s ease';
                          }
                        }}
                        onMouseOut={(e) => {
                          const hoveredImg = e.target.closest('img');
                          if (hoveredImg) {
                            hoveredImg.style.filter = 'brightness(1)';
                            hoveredImg.style.transition = 'filter 0.3s ease';
                          }
                        }}
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
                          )
                        }}
                      />
                    ) : (
                      <div
                        onClick={() => openViewer(img)}
                        className="cursor-pointer overflow-hidden rounded-xl transition-all duration-300 group relative"
                      >
                        <Image
                          src={img.image_url}
                          alt="ছবি"
                          width={size.width}
                          height={size.height}
                          className="object-contain rounded-xl transition-all duration-300 group-hover:brightness-50"
                          style={{ width: size.width, height: 'auto' }}
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

      {/* Fullscreen Image Viewer */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={closeViewer}
        >
          <div
            className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: '95vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex items-center justify-center px-6 py-4 border-b shrink-0">
              <img src="/logo.png" alt="প্রতিদিনের কাগজ" className="h-[50px] w-auto" />
              <button
                onClick={closeViewer}
                className="absolute right-6 bg-gray-100 text-black w-11 h-11 rounded-full flex items-center justify-center text-3xl shadow hover:bg-red-500 hover:text-white transition-all"
              >
                ×
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-4">
              <Image
                src={selectedImage.image_url}
                alt="ছবি"
                width={1200}
                height={1600}
                className="w-full h-auto rounded-xl object-contain"
                priority
              />
              {selectedImage.title && (
                <p className="text-center text-gray-700 mt-4 text-sm">{selectedImage.title}</p>
              )}
            </div>

            <div className="flex items-center gap-2 px-4 py-3 border-t bg-gray-50 shrink-0">
              <span className="text-xs text-gray-500 mr-1">শেয়ার করুন</span>
              <button
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(selectedImage.image_url)}`, '_blank')}
                className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </button>
              <button
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(selectedImage.image_url)}`, '_blank')}
                className="w-8 h-8 bg-sky-500 hover:bg-sky-600 text-white rounded-full flex items-center justify-center transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </button>
              <button
                onClick={() => window.open(selectedImage.image_url, '_blank')}
                className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                </svg>
              </button>
              <button
                onClick={() => window.print()}
                className="w-8 h-8 bg-gray-600 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <polyline points="6 9 6 2 18 2 18 9"/>
                  <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
                  <rect x="6" y="14" width="12" height="8"/>
                </svg>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedImage.image_url);
                  alert('লিংক কপি হয়েছে!');
                }}
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-full transition-all"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
                </svg>
                কপি লিংক
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}