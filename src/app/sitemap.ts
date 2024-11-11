import { MetadataRoute } from "next";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts } = await fetcher(`${process.env.ROOT_URL}/api/static/all-posts`);
  console.log("sitemap", { posts });

  const sitemap = [
    {
      url: process.env.ROOT_URL,
      lastModified: new Date(),
      priority: 1,
    },
    ...posts.map((post: IPost) => ({
      url: `${process.env.ROOT_URL}/product/${post._id}`,
      lastModified: new Date(),
    })),
  ];
  console.log({ sitemap });

  return sitemap;
}
