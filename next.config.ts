import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/library-catalog-spa",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
      },
    ],
  },
};

export default nextConfig;
