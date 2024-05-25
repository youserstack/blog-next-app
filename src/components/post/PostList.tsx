import PostItem from "@/components/post/PostItem";

export default async function PostList({ posts }: any) {
  return (
    <ul className="post-list">
      {posts?.map((post: any) => (
        <PostItem post={post} key={post._id} />
      ))}
    </ul>
  );
}
