/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // JWT_SECRET: process.env.JWT_SECRET,
    ROOT_URL: process.env.ROOT_URL,
    MONGODB_URI: process.env.MONGODB_URI,
    // auth (general)
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    // cloudinary api
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    // naver login api
    NAVER_ID: process.env.NAVER_ID,
    NAVER_SECRET: process.env.NAVER_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [{ hostname: "res.cloudinary.com" }, { hostname: "res.cloudinary.com" }],
  },
  // crossOrigin: "use-credentials",
  // async headers() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       headers: [
  //         {
  //           key: "Access-Control-Allow-Origin",
  //           value: "*", // Set your origin
  //         },
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET, POST, PUT, DELETE, OPTIONS",
  //         },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value: "Content-Type, Authorization",
  //         },
  //       ],
  //     },
  //   ];
  // },
  async headers() {
    return [
      {
        // CORS 설정을 적용할 경로
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://blog-next-app-git-new-branch-youserstacks-projects.vercel.app", // 허용할 출처
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS", // 허용할 HTTP 메서드
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type", // 허용할 요청 헤더
          },
        ],
      },
    ];
  },
};

export default nextConfig;

// crossOrigin: "use-credentials",
// async headers() {
//   return [
//     {
//       source: "/api/:path*",
//       headers: [
//         {
//           key: "Access-Control-Allow-Origin",
//           value: "*", // Set your origin
//         },
//         {
//           key: "Access-Control-Allow-Methods",
//           value: "GET, POST, PUT, DELETE, OPTIONS",
//         },
//         {
//           key: "Access-Control-Allow-Headers",
//           value: "Content-Type, Authorization",
//         },
//       ],
//     },
//   ];
// },
