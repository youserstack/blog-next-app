import { MetadataRoute } from "next";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts } = await fetcher(`${process.env.ROOT_URL}/api/static/all-posts`);

  return posts.map((post: any) => ({
    url: `${process.env.ROOT_URL}/product/${post._id}`,
    lastModified: post.updatedAt,
  }));

  //   return [
  //     {
  //       url: "https://blog-next-app-three.vercel.app",
  //       lastModified: new Date(),
  //       changeFrequency: "yearly",
  //       priority: 1,
  //     },
  //     {
  //       url: "https://blog-next-app-three.vercel.app/posts",
  //       lastModified: new Date(),
  //       changeFrequency: "monthly",
  //       priority: 0.8,
  //     },
  //   ];
}
