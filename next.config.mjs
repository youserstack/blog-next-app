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
};

export default nextConfig;
