'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const normalizeContentImageUrls = (content) =>
  content.replace(/src=(["'])\/media\//g, `src=$1${API_URL}/media/`);

const normalizeTitle = (title) => title?.trim().toLowerCase();

export default function PageDetail() {
  const { pageNum } = useParams();
  const [page, setPage] = useState(null);
  const [pages, setPages] = useState([]);
  const [centerContent, setCenterContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const orderNum = parseInt(pageNum?.replace('page', ''), 10);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/pages/`).then((r) => r.json()),
      fetch(`${API_URL}/api/homepage-images/`).then((r) => r.json()),
    ])
      .then(([pagesData, contentData]) => {
        const foundPage = pagesData.find((p) => p.order === orderNum);
        const targetTitle = normalizeTitle(`Page ${orderNum}`);
        const foundContent = contentData.find((item) => normalizeTitle(item.title) === targetTitle);

        setPages(pagesData);
        setPage(foundPage || null);
        setCenterContent(foundContent || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [orderNum]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-gray-500">Loading...</div>;
  }

  if (!page) {
    return <div className="flex items-center justify-center h-screen text-gray-500">Page not found</div>;
  }

  const currentIdx = pages.findIndex((p) => p.order === orderNum);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-200 px-2">
      <div className="bg-white w-full max-w-[1200px] rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.2)] border border-gray-300 flex flex-col my-4 overflow-hidden">
        <div className="bg-cyan-800 flex items-center justify-between px-4 py-2">
          <button
            onClick={() => window.location.href = '/'}
            className="text-white text-sm hover:text-gray-200 transition-colors"
          >
            Home
          </button>
          <span className="text-white text-sm font-medium">{page.title}</span>
          <div className="flex items-center gap-2">
            {currentIdx > 0 && (
              <button
                onClick={() => window.location.href = `/page${pages[currentIdx - 1].order}`}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded transition-colors"
              >
                Previous Page
              </button>
            )}
            {currentIdx < pages.length - 1 && (
              <button
                onClick={() => window.location.href = `/page${pages[currentIdx + 1].order}`}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded transition-colors"
              >
                Next Page
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-2 p-2">
          <div className="flex flex-col gap-1" style={{ width: '70px', minWidth: '70px' }}>
            <div className="bg-teal-700 text-white text-center text-[10px] font-medium py-1 rounded-t">
              All Pages
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

          <div className="flex-1 min-w-0 flex items-start justify-center">
            <div
              className="bg-white rounded-3xl overflow-hidden p-3"
              style={{
                boxShadow: '0 4px 24px rgba(0,0,0,0.13), 0 1.5px 6px rgba(0,0,0,0.08)',
                maxWidth: '900px',
                width: '100%',
              }}
            >
              {centerContent?.content ? (
                <div
                  className="ck-content w-full"
                  dangerouslySetInnerHTML={{
                    __html: normalizeContentImageUrls(centerContent.content),
                  }}
                />
              ) : (
                <div className="flex min-h-[360px] items-center justify-center text-gray-400">
                  No center content found for Page {orderNum}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
