"use client";

import { Card, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface Props {
  post: IPost;
}

export default function Post({ post }: Props) {
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  return (
    <Card
      component="li"
      className="post"
      variant="outlined"
      sx={{ overflow: "hidden", "&:hover": { borderColor: primary, color: primary } }}
    >
      <Link href={`/posts/${post._id}`} style={{ height: "100%", display: "flex" }}>
        <div className="thumbnail" style={{ flex: "1", minWidth: "100px" }}>
          {post.image ? (
            <Image src={post.image} alt="sdf" width={200} height={200} />
          ) : (
            <h1>No Image</h1>
          )}
        </div>

        <div className="details" style={{ flex: "3", padding: "1rem" }}>
          <small>{post.category.slice(1).replaceAll("/", " > ")}</small>
          <Typography variant="h3" className="title">
            {post.title}
          </Typography>
          <small className="info" style={{ display: "flex", gap: "1rem" }}>
            <p className="author">{post.author?.name}</p>
            <p>{post.createdAt.slice(0, 10)}</p>
            <p>조회수 {post.views}</p>
            <div style={{ display: "flex", gap: "1rem" }}></div>
          </small>
          <div className="content">
            <p>{post.content}</p>
          </div>
        </div>
      </Link>
    </Card>
  );
}
