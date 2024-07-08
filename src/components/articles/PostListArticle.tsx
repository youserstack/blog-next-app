"use client";

import React from "react";
import PostList from "@/components/lists/PostList";
import Pagination from "@/components/ui/Pagination";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ControlArea from "@/components/areas/ControlArea";
import "./PostListArticle.scss";

export default function PostListArticle({ posts, totalCount }: any) {
  return (
    <article className="post-card-list-article">
      <div className="article-header">
        <Breadcrumb />
        <ControlArea />
      </div>
      <div className="content">
        <PostList posts={posts} />
        <Pagination totalCount={totalCount} />
      </div>
    </article>
  );
}
