import { headers } from "next/headers";
import { getPost } from "@/lib/utils/fetcher";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import "../styles/PostItemArticle.scss";

export default async function PostItemArticle() {
  // breadcrumb
  const pathname = headers().get("pathname");
  const segments: any = pathname?.split("/").slice(1);
  console.log({ segments });

  // content
  const postId = segments[segments.length - 1];
  const { post } = await getPost(postId);

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
        <div className="content-header">
          <small>
            <p>작성자 : {post.author.name}</p>
            <p>{post.createdAt.slice(0, 10)}</p>
          </small>
          <h1>Title : {post.title}</h1>
        </div>
        <div className="content-body">
          <pre>{post.content}</pre>
        </div>
      </div>
    </article>
  );
}
