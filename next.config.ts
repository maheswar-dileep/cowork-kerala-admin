import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-42db8ecb21ee4032993b252440411d20.r2.dev',
      },
    ],
  },
};

export default nextConfig;
