/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
        // port: '',
        // pathname: '',
      },
    ],
  },
};

export default nextConfig;
