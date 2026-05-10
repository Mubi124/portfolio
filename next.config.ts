import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  serverExternalPackages: ['sanity'],
};

export default nextConfig;
