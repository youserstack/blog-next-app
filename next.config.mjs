/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // origin
    ROOT_URL: process.env.ROOT_URL,
    // database
    MONGODB_URI: process.env.MONGODB_URI,
    // cloudinary
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    // nextauth
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NAVER_ID: process.env.NAVER_ID,
    NAVER_SECRET: process.env.NAVER_SECRET,
  },
  images: {
    remotePatterns: [{ hostname: "res.cloudinary.com" }, { hostname: "res.cloudinary.com" }],
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
