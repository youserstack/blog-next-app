import { headers } from "next/headers";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import "../styles/PostListArticle.scss";
import CategoryCreateButton from "@/components/CategoryCreateButton";

async function getData(category: any) {
  const response = await fetch(`${process.env.ROOT_URL}/api/posts/categorizedPosts`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category }),
    // 이하는 모두 동일
    // cache: "no-store",
    // cache: "no-cache",
    // next: { revalidate: 0 },
  });
  if (!response.ok) throw new Error("failed to fetch data");
  return response.json();
}

export default async function PostListArticle() {
  // console.log("\n[PostListArticle]");

  // breadcrumb
  const pathname: any = headers().get("pathname")?.replace("/categories", "");
  const segments: any = pathname?.split("/").slice(1);
  console.log({ segments });

  // content
  const { posts } = await getData(pathname);
  console.log({ posts });

  return (
    <article className="post-list-article">
      <div className="breadcrumb">
        {segments?.map((v: string, i: number) => (
          <React.Fragment key={v}>
            <Link href={""}>{v}</Link>
            {i !== segments.length - 1 && <span>{">"}</span>}
          </React.Fragment>
        ))}

        {segments?.length < 3 && (
          <div className="category-create">
            <span>{">"}</span>
            <CategoryCreateButton parentCategories={segments} />
          </div>
        )}
      </div>
      <div className="content">
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
      </div>
    </article>
  );
}
