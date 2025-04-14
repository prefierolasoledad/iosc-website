/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
      appDir: true,
      // disable the floating Next.js watermark
      showAppDirIndicator: false,
    },
};

export default nextConfig;
