"use client";

import { Paper, Typography } from "@mui/material";
import { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

const fetcher = (url: string) =>
  fetch(url, { cache: "no-cache", next: { revalidate: 60 } }).then((res) => res.json());

export default async function LatestPostList() {
  const { posts } = await fetcher(`${process.env.ROOT_URL}/api/posts?sort=latest`);

  return (
    <Paper className="latest-post-list" variant="outlined" sx={latestPostList}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography>최신글</Typography>
        <Link href="/search?sort=latest">더보기</Link>
      </div>

      {posts.map((post: any) => (
        <Paper key={post._id} variant="outlined" sx={{ height: "100px", overflow: "hidden" }}>
          <Link href={`/posts/${post._id}`} style={{ height: "100%", display: "flex" }}>
            <div className="thumbnail" style={{ width: "100px" }}>
              {post.image && <Image src={post.image} alt="alt" width={200} height={200} />}
            </div>

            <div className="content" style={contentStyle}>
              <Typography variant="h5" sx={{ flex: "1" }}>
                {post.title}
              </Typography>

              <div style={{ display: "flex", gap: "1rem" }}>
                <p>조회수 {post.views}</p>
                <p>카테고리 {post.category.replaceAll("/", " > ")}</p>
              </div>
            </div>
          </Link>
        </Paper>
      ))}
    </Paper>
  );
}

const latestPostList: CSSProperties = {
  flex: "1",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  fontSize: "12px",
};

const contentStyle: CSSProperties = {
  flex: "1",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};
