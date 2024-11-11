import Post from "@/components/lists/Post";

interface Props {
  posts: IPost[];
}

export default function PostList({ posts }: Props) {
  return (
    <ul className="post-list" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {posts?.map((post: IPost) => (
        <Post post={post} key={post._id} />
      ))}
    </ul>
  );
}
