import Image from "next/image";
import Link from "next/link";
import "./Post.scss";

export default function Post({ post }: any) {
  return (
    <li className="post">
      <Link href={`/posts/${post._id}`}>
        <div className="details">
          <div>
            <p className="author">작성자({post.author?.name})</p>
            <p>{post.createdAt.slice(0, 10)}</p>
            <p>조회수 : {post.views}</p>
          </div>
          <div className="content">
            <h3 className="title">{post.title}</h3>
            <p>{post.content}</p>
          </div>
        </div>
        <div className="thumbnail">
          {post.image ? (
            <Image src={post.image} alt="sdf" width={200} height={200} />
          ) : (
            <h1>No Image</h1>
          )}
        </div>
      </Link>
    </li>
  );
}
