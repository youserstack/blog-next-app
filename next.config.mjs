/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // JWT_SECRET: process.env.JWT_SECRET,

    // 클라이언트에서 환경변수를 참조하기 위한 설정
    ROOT_URL: process.env.ROOT_URL,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dzktdrw7o/image/**",
      },
    ],
  },
};

export default nextConfig;
