/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    qualities: [75, 85],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
