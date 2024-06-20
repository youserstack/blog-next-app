/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // JWT_SECRET: process.env.JWT_SECRET,
    ROOT_URL: process.env.ROOT_URL,
  },
  reactStrictMode: false,
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
};

export default nextConfig;
