import PostItem from "@/components/PostItem";
import { getPosts } from "@/lib/utils/fetcher";

export default async function PostList({ categoryPath, page }: any) {
  const { posts } = await getPosts(categoryPath, page);

  return (
    <ul className="post-list">
      {posts?.map((post: any) => (
        <PostItem post={post} key={post._id} />
      ))}
    </ul>
  );
}
