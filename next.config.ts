import type { NextConfig } from "next";
const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ufs.sh',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/, // matches .js, .ts, .jsx, .tsx
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
export default nextConfig;