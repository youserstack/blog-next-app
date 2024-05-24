import { getCategorizedPosts } from "@/lib/utils/fetcher";
import Image from "next/image";
import Link from "next/link";

export default async function PostList({ categoryPath, page }: any) {
  const { posts } = await getCategorizedPosts(categoryPath, page);

  return (
    <ul className="post-list">
      {posts?.map((post: any) => (
        <li className="post-item" key={post._id}>
          <Link href={`/posts/${post._id}`}>
            <div className="details">
              <div>
                <p className="author">작성자({post.author})</p>
                <p>{post.createdAt.slice(0, 10)}</p>
              </div>
              <div>
                <h3 className="title">{post.title}</h3>
                <pre>{post.content}</pre>
              </div>
            </div>
            <div className="thumbnail">
              {post.image ? <Image src={""} alt="sdf" /> : <h1>No Image</h1>}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
