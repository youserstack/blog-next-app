import { Paper, Typography } from "@mui/material";
import { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

const fetcher = (url: string) =>
  fetch(url, { cache: "no-cache" })
    // .then((res) => res.json())
    .then((res) => {
      console.log("zivi status", res.status);
      console.log("zivi text()", res.text());
      return res.json();
    })

    .catch((err) => console.log("zivi err", { err }));

export default async function PopularPostList() {
  const url = `${process.env.ROOT_URL}/api/posts?sort=popular`;
  console.log("zivi url", { url });
  const { posts } = await fetcher(`${process.env.ROOT_URL}/api/posts?sort=popular`);

  return (
    <Paper className="popular-post-list" variant="outlined" sx={popularPostListStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography>인기글</Typography>
        <Link href="/search?sort=popular">더보기</Link>
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

const popularPostListStyle: CSSProperties = {
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
