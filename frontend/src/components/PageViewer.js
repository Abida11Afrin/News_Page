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

const normalizeContentImageUrls = (content) =>
  String(content || '')
    .replace(/src=(["'])\/media\//g, `src=$1${API_URL}/media/`)
    .replace(/(<table\b[^>]*?)\sstyle=(["'])width:\s*0px;?\2/gi, '$1');

const normalizeTitle = (title) =>
  String(title || '')
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\bpage\s+(\d+)\b/g, 'page$1');

export default function PageViewer({ showSidebar = true, lang = "BN", centerTitle = "Home Page" }) {
  const [pages, setPages] = useState([]);
  const [homeImages, setHomeImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();
  const matchedCenterContent = homeImages.filter(
    (img) => normalizeTitle(img?.title) === normalizeTitle(centerTitle)
  );

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/pages/`).then((r) => r.json()),
      fetch(`${API_URL}/api/homepage-images/`).then((r) => r.json()),
    ])
      .then(([pagesData, imagesData]) => {
  setPages(Array.isArray(pagesData) ? pagesData : []);
  setHomeImages(Array.isArray(imagesData) ? imagesData : []);

  const params = new URLSearchParams(window.location.search);
  const imageId = params.get("image");

  if (imageId && Array.isArray(imagesData)) {
    const found = imagesData.find((img) => String(img.id) === String(imageId));
    if (found?.image_url) setSelectedImage(found);
  }

  if (Array.isArray(pagesData) && pagesData.length > 0) {
    window.__activePageImageUrl = pagesData[0].image_url;
    window.__activePageTitle = pagesData[0].title;
  }

  setLoading(false);
})
.catch((error) => {
  console.error("FETCH ERROR:", error);
  setLoading(false);
});
  }, [centerTitle]);

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
      font-family: SolaimanLipi, sans-serif;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      z-index: 99999;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 col-span-full">
        {lang === "BN" ? "লোড হচ্ছে..." : "Loading..."}
      </div>
    );
  }

  return (
    <>
      {/* Left Sidebar + Center — grid 2 column */}
<div className={`grid ${showSidebar ? 'grid-cols-[150px_1fr]' : 'grid-cols-1'} gap-1.5 min-w-0 `}>

        {/* Left Sidebar (Thumbnails) */}
        {showSidebar && (
          <div className="flex flex-col gap-1 h-full">
            <div className="bg-teal-700 text-white text-center py-1 rounded-t" style={{ fontSize: "14px" }}>
{lang === "BN" ? "সকল পাতা" : "All Pages"}            </div>
            <div className="flex flex-col gap-1 overflow-y-auto pr-0.5 max-h-[600px] ">
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
                      className="object-cover w-40 h-[200px]"
                    />
                  </div>
                  <p className="text-center mt-0.5 font-SolaimanLipi rounded py-0.5 truncate px-0.5 bg-cyan-900 text-white" style={{ fontSize: "11px" }}>
                    {pg.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Center View */}
        <div className="flex flex-col min-w-0">
          <div
            className="bg-white rounded-2xl lg:rounded-3xl overflow-hidden flex-1 flex flex-col"
            style={{
              boxShadow: '0 4px 24px rgba(0,0,0,0.13), 0 1.5px 6px rgba(0,0,0,0.08)',
            }}
          >
            <div
              className="flex-1 p-3 flex flex-col gap-3 overflow-y-auto"
              style={{ minHeight: '250px' }}
            >
              {matchedCenterContent.length > 0 ? (
                matchedCenterContent.map((img) => {
                  const size = sizeMap[img.size] || sizeMap.medium;
                  return (
                    <div
                      key={img.id}
                      className={`flex w-full ${positionClass[img.position] || 'justify-center'}`}
                    >
                      {img?.content ? (
                        <div
                          className="ck-content w-full cursor-pointer"
                          onMouseOver={(e) => {
                            const hoveredImg = e.target.closest('img');
                            if (hoveredImg) {
                              hoveredImg.style.filter = 'brightness(0.7)';
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
                            __html: normalizeContentImageUrls(img.content),
                          }}
                        />
                      ) : img?.image_url ? (
                        <div
                          onClick={() => openViewer(img)}
                          className="cursor-pointer overflow-hidden relative w-full"
                          style={{ maxWidth: size.width }}
                        >
                          <Image
                            src={img.image_url}
                            alt="ছবি"
                            width={size.width}
                            height={size.height}
                            className="object-contain w-full h-auto"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
                        </div>
                      ) : null}
                    </div>
                  );
                })
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-gray-400 text-center">{lang === "BN" ? "📄 সব পাতা" : "📄 All Pages"}</p>
                </div>
              )}
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-200 flex items-center justify-between px-2 py-1.5 bg-gray-50 gap-1 rounded-b-2xl lg:rounded-b-3xl">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded transition-colors whitespace-nowrap" style={{ fontSize: "14px" }}>
                  {lang === "BN" ? "📄 সব পাতা" : "📄 All Pages"}

              </button>
              <div className="flex items-center gap-1">
                <button className="w-6 h-6 bg-blue-600 text-white font-bold rounded flex items-center justify-center" style={{ fontSize: "12px" }}>f</button>
                <button className="w-6 h-6 bg-sky-500 text-white font-bold rounded flex items-center justify-center" style={{ fontSize: "12px" }}>t</button>
                <button className="w-6 h-6 bg-red-600 text-white font-bold rounded flex items-center justify-center" style={{ fontSize: "12px" }}>▶</button>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded transition-colors whitespace-nowrap" style={{ fontSize: "14px" }}>
                {lang === "BN" ? "পরের পাতা »" : "Next Page »"}
              </button>
            </div>
          </div>

          {/* Fullscreen Image Viewer */}
          {selectedImage && (
            <div
  className="fixed inset-0 z-[100] bg-black/95 flex items-start justify-center p-2"
              style={{ paddingTop: '30px' }}
              onClick={closeViewer}
            >
              <div
  className="relative bg-white rounded-2xl shadow-2xl overflow-visible flex flex-col w-[96vw] md:w-[95vw] md:max-w-[95vw]"
  style={{ height: "99vh" }}
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
                    className="h-[70px] w-auto"
                  />
                </div>

               <div className="flex-1 overflow-auto bg-black p-3">
                 <div className="min-w-max flex justify-center">
                   <img
  src={selectedImage.image_url}
  alt="ছবি"
  className="max-w-none h-auto rounded-xl"
/>
                 </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-4 border-t bg-gray-50 shrink-0 rounded-b-2xl flex-wrap">
                  <span className="text-gray-500 mr-1" style={{ fontSize: "14px" }}>{lang === "BN" ? "শেয়ার করুন" : "Share"}</span>

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
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-full cursor-pointer"
                    style={{ fontSize: "14px" }}
                  >
                    {lang === "BN" ? "কপি লিংক" : "Copy Link"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
