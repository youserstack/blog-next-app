import { headers } from "next/headers";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import "../styles/PostItemArticle.scss";

async function getData(postId: any) {
  const response = await fetch(`${process.env.ROOT_URL}/api/post/${postId}`);
  if (!response.ok) throw new Error("failed to fetch data");
  return response.json();
}

export default async function PostItemArticle() {
  // breadcrumb
  const pathname = headers().get("pathname");
  const segments: any = pathname?.split("/").slice(1);
  console.log({ segments });

  // content
  const postId = segments[segments.length - 1];
  const { post } = await getData(postId);

  return (
    <article className="post-item-article">
      <div className="breadcrumb">
        {segments?.map((v: string, i: number) => {
          return (
            <React.Fragment key={v}>
              <Link href={""}>{v}</Link>
              {i !== segments.length - 1 && <span>{">"}</span>}
            </React.Fragment>
          );
        })}
      </div>
      <div className="content">
        <p>{post.createdAt.slice(0, 10)}</p>
        <p>Title : {post.title}</p>
        <p>Author : {post.author}</p>
        <pre>{post.content}</pre>
        <Link href={`/post/${post._id}`}>read more</Link>

        <div className="post-image">
          {post.image ? <Image src={""} alt="sdf" /> : <h1>No Image</h1>}
        </div>
      </div>
    </article>
  );
}
