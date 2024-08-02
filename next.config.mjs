/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['nrs.harvard.edu'], // 외부 이미지 호스트를 추가
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
