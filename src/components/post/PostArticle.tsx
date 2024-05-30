import React from "react";
import "../../styles/PostArticle.scss";

export default async function PostArticle({ post }: any) {
  return (
    <article className="post-article">
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
