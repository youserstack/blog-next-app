import Image from "next/image";
import Link from "next/link";

async function getData(categoryPath: any) {
  const response = await fetch(`${process.env.ROOT_URL}/api/posts/categorizedPosts`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ categoryPath }),
    // 이하는 모두 동일
    // cache: "no-store",
    // cache: "no-cache",
    // next: { revalidate: 0 },
  });
  if (!response.ok) throw new Error("failed to fetch data");
  return response.json();
}

export default async function PostList({ categoryPath, page }: any) {
  const { posts } = await getData(categoryPath);

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
