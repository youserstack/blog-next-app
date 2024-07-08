import Post from "@/components/lists/Post";

export default function PostList({ posts }: any) {
  return (
    <ul className="post-list" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {posts?.map((post: any) => (
        <Post post={post} key={post._id} />
      ))}
    </ul>
  );
}
