/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    domains: ["basepaws.com", "firebasestorage.googleapis.com"],
  },
};

export default nextConfig;
