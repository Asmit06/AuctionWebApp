/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.pixabay.com',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'pixabay.com',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'lp2.hm.com',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'images.samsung.com',
          pathname: '**',
        },
      ],
    },
    output: 'standalone'
  };

export default nextConfig;
