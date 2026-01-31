import type { NextConfig } from "next";

const repo = "library-catalog-spa";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",

  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",

  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
