"use client";

import ArticleOptionButton from "@/components/buttons/ArticleOptionButton";
import CommentCreateForm from "@/components/forms/CommentCreateForm";
import CommentList from "@/components/lists/CommentList";
import Image from "next/image";
import "./PostArticle.scss";
import { Paper } from "@mui/material";
// import Paper from "@mui/material/Paper";

export default function PostArticle({ post }: any) {
  if (!post) return null;

  return (
    <Paper component={"article"} className="post-article" variant="outlined">
      <div className="article-header">
        <h1 className="title">{post.title}</h1>
        <div className="info">
          <p>작성자 : {post.author?.name}</p>
          <p>{post.createdAt?.slice(0, 10)}</p>
          <p>카테고리 {post.category?.replaceAll("/", " > ")}</p>
        </div>
        <ArticleOptionButton post={post} />
      </div>
      <div className="article-body">
        <div className="thumbnail">
          <Image src={post.image} alt="" width={1000} height={1000} />
        </div>
        <p className="content">{post.content}</p>
      </div>
      <div className="article-footer">
        <CommentCreateForm authorImage={post.author?.image} postId={post._id} />
        <CommentList postId={post._id} />
      </div>
    </Paper>
  );
}
