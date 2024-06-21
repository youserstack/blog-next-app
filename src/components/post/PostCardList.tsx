import PostCard from "@/components/post/PostCard";

export default async function PostCardList({ posts }: any) {
  return (
    <ul className="post-card-list">
      {posts?.map((post: any) => (
        <PostCard post={post} key={post._id} />
      ))}
    </ul>
  );
}
