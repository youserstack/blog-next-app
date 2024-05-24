import PostItem from "@/components/PostItem";
import { getCategorizedPosts } from "@/lib/utils/fetcher";

export default async function PostList({ categoryPath, page }: any) {
  const { posts } = await getCategorizedPosts(categoryPath, page);

  return (
    <ul className="post-list">
      {posts?.map((post: any) => (
        <PostItem post={post} />
      ))}
    </ul>
  );
}
