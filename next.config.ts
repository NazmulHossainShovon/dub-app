import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' http://localhost http://127.0.0.1 https://sandbox-buy.paddle.com https://buy.paddle.com;"
          }
        ],
      },
    ];
  },
};

export default nextConfig;
