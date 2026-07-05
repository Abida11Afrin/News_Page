/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'news-page-ud6d.onrender.com',
        pathname: '/media/**',
      },
    ],
    unoptimized: true,  
  },
};

export default nextConfig;
