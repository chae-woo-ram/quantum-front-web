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
  output: 'export',
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
