'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function PageDetail() {
  const { pageNum } = useParams();
  const [page, setPage] = useState(null);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  // pageNum থেকে number বের করুন — "page1" → 1
  const orderNum = parseInt(pageNum?.replace('page', ''));

  useEffect(() => {
    fetch(`${API_URL}/api/pages/`)
      .then((r) => r.json())
      .then((data) => {
        setPages(data);
        const found = data.find((p) => p.order === orderNum);
        setPage(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [orderNum]);

  if (loading) return <div className="flex items-center justify-center h-screen text-gray-500">লোড হচ্ছে...</div>;
  if (!page) return <div className="flex items-center justify-center h-screen text-gray-500">পাতা পাওয়া যায়নি</div>;

  const currentIdx = pages.findIndex((p) => p.order === orderNum);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-200 px-2">
      <div className="bg-white w-full max-w-[1200px] rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.2)] border border-gray-300 flex flex-col my-4 overflow-hidden">

        {/* Top bar */}
        <div className="bg-cyan-800 flex items-center justify-between px-4 py-2">
          <button
            onClick={() => window.location.href = '/'}
            className="text-white text-sm hover:text-gray-200 transition-colors"
          >
            🏠 হোম
          </button>
          <span className="text-white text-sm font-medium">{page.title}</span>
          <div className="flex items-center gap-2">
            {currentIdx > 0 && (
              <button
                onClick={() => window.location.href = `/page${pages[currentIdx - 1].order}`}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded transition-colors"
              >
                « আগের পাতা
              </button>
            )}
            {currentIdx < pages.length - 1 && (
              <button
                onClick={() => window.location.href = `/page${pages[currentIdx + 1].order}`}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded transition-colors"
              >
                পরের পাতা »
              </button>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-row gap-2 p-2">

          {/* Left Sidebar */}
          <div className="flex flex-col gap-1" style={{ width: '70px', minWidth: '70px' }}>
            <div className="bg-teal-700 text-white text-center text-[10px] font-medium py-1 rounded-t">
              সকল পাতা
            </div>
            <div className="flex flex-col gap-1 overflow-y-auto" style={{ maxHeight: '600px' }}>
              {pages.map((pg) => (
                <div
                  key={pg.id}
                  className="flex flex-col shrink-0 cursor-pointer"
                  onClick={() => window.location.href = `/page${pg.order}`}
                >
                  <div className={`border rounded overflow-hidden transition-all ${
                    pg.order === orderNum
                      ? 'border-teal-500 ring-1 ring-teal-400'
                      : 'border-gray-300 hover:border-teal-500'
                  }`}>
                    <Image
                      src={pg.image_url}
                      alt={pg.title}
                      width={65}
                      height={80}
                      className="object-cover w-full"
                      style={{ height: '80px' }}
                    />
                  </div>
                  <p className={`text-center text-[8px] mt-0.5 font-medium rounded py-0.5 truncate px-0.5 ${
                    pg.order === orderNum ? 'bg-teal-600 text-white' : 'bg-teal-700 text-white'
                  }`}>
                    {pg.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

{/* Center — full page image */}
<div className="flex-1 min-w-0 flex items-start justify-center">
  <div
    className="bg-white rounded-3xl overflow-hidden"
    style={{
      boxShadow: '0 4px 24px rgba(0,0,0,0.13), 0 1.5px 6px rgba(0,0,0,0.08)',
      maxWidth: '420px',
      width: '100%',
    }}
  >
    <Image
      src={page.image_url}
      alt={page.title}
      width={420}
      height={560}
      className="object-contain w-full h-auto"
      style={{ maxHeight: '65vh', display: 'block' }}
      priority
    />
  </div>
</div>

        </div>
      </div>
    </main>
  );
}