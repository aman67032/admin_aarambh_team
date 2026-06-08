import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development' 
          ? 'http://localhost:5000/api/:path*'
          : 'https://aarambh-backend.vercel.app/api/:path*', // Fallback production URL placeholder
      },
    ];
  },
};

export default nextConfig;
