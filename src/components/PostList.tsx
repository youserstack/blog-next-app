import { getCategorizedPosts } from "@/lib/utils/fetcher";
import Image from "next/image";
import Link from "next/link";

export default async function PostList({ categoryPath, page }: any) {
  const { posts } = await getCategorizedPosts(categoryPath);

  return (
    <ul className="post-list">
      {posts?.map((post: any) => (
        <li className="post-item" key={post._id}>
          <div className="post-text">
            <p>{post.createdAt.slice(0, 10)}</p>
            <p>Title : {post.title}</p>
            <p>Author : {post.author}</p>
            <pre>{post.content}</pre>
            <Link href={`/posts/${post._id}`}>read more</Link>
          </div>
          <div className="post-image">
            {post.image ? <Image src={""} alt="sdf" /> : <h1>No Image</h1>}
          </div>
        </li>
      ))}
    </ul>
  );
}
