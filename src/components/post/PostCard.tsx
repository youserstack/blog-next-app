import Image from "next/image";
import Link from "next/link";

export default function PostCard({ post }: any) {
  return (
    <li className="post-item">
      <Link href={`/posts/${post._id}`}>
        <div className="details">
          <div>
            <p className="author">작성자({post.author?.name})</p>
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
  );
}
