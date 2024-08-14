/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nrs.harvard.edu',
        port: '',
        pathname: '/**',
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
