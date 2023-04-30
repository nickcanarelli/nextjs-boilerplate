/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
  reactStrictMode: true,
  images: {
    domains: ["robohash.org"],
  },
};

module.exports = nextConfig;
