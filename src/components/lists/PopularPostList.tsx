import { Paper, Typography } from "@mui/material";
import { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

const fetcher = (url: string) => fetch(url, { next: { revalidate: 60 } }).then((res) => res.json());

export default async function PopularPostList() {
  const { posts } = await fetcher(`${process.env.ROOT_URL}/api/posts?sort=popular`);

  return (
    <Paper className="popular-post-list" variant="outlined" sx={{ padding: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Typography>인기글</Typography>
        <Link href="/search?sort=popular">더보기</Link>
      </div>

      <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {posts.map((post: any) => (
          <Paper key={post._id} variant="outlined" sx={{ height: "100px", overflow: "hidden" }}>
            <Link href={`/posts/${post._id}`} style={{ height: "100%", display: "flex" }}>
              <div className="thumbnail" style={{ width: "100px" }}>
                {post.image && <Image src={post.image} alt="alt" width={200} height={200} />}
              </div>

              <div
                className="content"
                style={{
                  flex: "1",
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5">{post.title}</Typography>
                <Typography>
                  {post.content.length > 40 ? post.content.slice(0, 40) + "..." : post.content}
                </Typography>

                {/* <div style={{ display: "flex", gap: "1rem" }}>
                  <p>조회수 {post.views}</p>
                  <p>카테고리 {post.category.replaceAll("/", " > ")}</p>
                </div> */}
              </div>
            </Link>
          </Paper>
        ))}
      </ul>
    </Paper>
  );
}
