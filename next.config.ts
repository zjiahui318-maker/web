import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    if (process.env.NODE_ENV !== "development") {
      return [];
    }

    return [
      {
        source: "/api/analyze",
        destination: "http://127.0.0.1:5328/api/analyze",
      },
    ];
  },
};

export default nextConfig;
