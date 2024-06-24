import Post from "@/components/post/Post";
import "./PostList.scss";

export default async function PostList({ posts }: any) {
  return (
    <ul className="post-list">
      {posts?.map((post: any) => (
        <Post post={post} key={post._id} />
      ))}
    </ul>
  );
}
