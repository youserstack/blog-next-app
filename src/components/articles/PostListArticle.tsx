"use client";

import React from "react";
import PostList from "@/components/lists/PostList";
import Pagination from "@/components/ui/Pagination";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ControlArea from "@/components/areas/ControlArea";
import { useTheme } from "@mui/material";

export default function PostListArticle({ posts, totalCount }: any) {
  const theme = useTheme();

  return (
    <article className="post-card-list-article" style={{ minHeight: "100vh", padding: "1rem" }}>
      <div className="article-header" style={{ display: "flex", justifyContent: "space-between" }}>
        <Breadcrumb />
        <ControlArea />
      </div>
      <div
        className="content"
        style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <PostList posts={posts} />
        <Pagination totalCount={totalCount} />
      </div>
    </article>
  );
}
