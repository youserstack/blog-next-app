import { getPost } from "@/lib/utils/fetcher";
import Link from "next/link";
import React from "react";
import "../../styles/PostItemArticle.scss";

export default async function PostItemArticle({ postId }: any) {
  const { post } = await getPost(postId);

  return (
    <article className="post-item-article">
      <div className="content">
        <div className="content-header">
          <small>
            <p>작성자 : {post.author?.name}</p>
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
