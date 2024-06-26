import Post from "@/components/lists/Post";
import "./PostList.scss";

export default function PostList({ posts }: any) {
  return (
    <ul className="post-list">
      {posts?.map((post: any) => (
        <Post post={post} key={post._id} />
      ))}
    </ul>
  );
}
