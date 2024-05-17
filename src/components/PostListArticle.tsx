import Link from "next/link";
import React from "react";
import Image from "next/image";
import CategoryCreateButton from "@/components/CategoryCreateButton";
import PostCreateButton from "@/components/PostCreateButton";
import "../styles/PostListArticle.scss";
import { headers } from "next/headers";
import PostList from "@/components/PostList";

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

export default async function PostListArticle({ params }: any) {
  // console.log("\n[PostListArticle]");

  // article-header
  // breadcrumb
  // const pathname: any = headers().get("pathname")?.replace("/categories", "");
  // const categorySegments: any = pathname?.split("/").slice(1);
  const categorySegments = params.category;
  const categoryPath = params.category.join("/");

  // content
  // const { posts } = await getData(pathname);
  // console.log({ posts });
  const { posts } = await getData(categoryPath);

  return (
    <article className="post-list-article">
      <div className="article-header">
        <div className="breadcrumb">
          {categorySegments?.map((v: string, i: number) => (
            <React.Fragment key={v}>
              <Link href={""}>{v}</Link>
              {i !== categorySegments.length - 1 && <span>{">"}</span>}
            </React.Fragment>
          ))}

          {categorySegments?.length < 3 && (
            <div className="category-create">
              <span>{">"}</span>
              <CategoryCreateButton parentCategories={categorySegments} />
            </div>
          )}
        </div>
        <div className="manager">
          <PostCreateButton />
        </div>
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
        {/* <PostList page={} /> */}
      </div>
    </article>
  );
}
