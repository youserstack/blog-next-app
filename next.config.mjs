/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // JWT_SECRET: process.env.JWT_SECRET,
    ROOT_URL: process.env.ROOT_URL,
    MONGODB_URI: process.env.MONGODB_URI,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        // pathname: "/dzktdrw7o/image/**",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        port: "",
        // pathname: "/dzktdrw7o/image/**",
      },
    ],
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
