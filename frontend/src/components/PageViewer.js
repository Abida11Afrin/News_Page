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
  const [selectedImage, setSelectedImage] = useState(null); // Image Viewer State
  const router = useRouter();

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/pages/`).then((r) => r.json()),
      fetch(`${API_URL}/api/homepage-images/`).then((r) => r.json()),
    ])
      .then(([pagesData, imagesData]) => {
        setPages(pagesData);
        setHomeImages(imagesData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Image Viewer Functions
  const openViewer = (img) => {
    setSelectedImage(img);
  };

  const closeViewer = () => {
    setSelectedImage(null);
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
          {/* Images area with Image Viewer */}
          <div className="flex-1 p-3 flex flex-col gap-3" style={{ minHeight: '300px' }}>
            {homeImages.length > 0 ? (
              homeImages.map((img) => {
                const size = sizeMap[img.size] || sizeMap.medium;
                return (
                  <div
                    key={img.id}
                    className={`flex w-full ${positionClass[img.position] || 'justify-center'}`}
                  >
                    <div
                      onClick={() => openViewer(img)}
                      className="cursor-pointer overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group relative"
                    >
                      <Image
                        src={img.image_url}
                        alt="ছবি"
                        width={size.width}
                        height={size.height}
                        className="object-contain rounded-xl transition-transform duration-300 group-hover:scale-110"
                        style={{ width: size.width, height: 'auto' }}
                      />
                      {/* Hover Indicator */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                       
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-400 text-center text-sm">কোনো ছবি পাওয়া যায়নি</p>
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

      {/* ==================== FULLSCREEN IMAGE VIEWER ==================== */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={closeViewer}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeViewer}
              className="absolute -top-5 -right-5 bg-white text-black w-11 h-11 rounded-full flex items-center justify-center text-3xl shadow-xl hover:bg-red-500 hover:text-white transition-all z-10"
            >
              ×
            </button>

            {/* Main Image */}
            <Image
              src={selectedImage.image_url}
              alt="ছবি"
              width={900}
              height={700}
              className="w-full h-auto rounded-2xl shadow-2xl"
              style={{ maxHeight: '88vh', objectFit: 'contain' }}
              priority
            />

            {/* Optional Title/Caption */}
            {selectedImage.title && (
              <p className="text-center text-white mt-4 text-sm bg-black/50 py-2 px-4 rounded-lg">
                {selectedImage.title}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}