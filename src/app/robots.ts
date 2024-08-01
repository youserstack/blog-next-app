import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https://blog-next-app-three.vercel.app/sitemap.xml",
  };
}

// import { MetadataRoute } from "next";

// export default function robots(): MetadataRoute.Robots {
//   return {
//     rules: [
//       {
//         userAgent: "*",
//         allow: "/",
//         disallow: "/private/",
//       },
//     ],
//     sitemap: "https://blog-next-app-three.vercel.app/sitemap.xml",
//   };
// }
