"use client";

import { Paper, Skeleton, Typography } from "@mui/material";
import { CSSProperties } from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";

const fetcher = (url: string) => fetch(url, { cache: "no-cache" }).then((res) => res.json());

export default function PopularPostList() {
  const { data } = useSWR(`${process.env.ROOT_URL}/api/posts?sort=popular`, fetcher);

  if (!data) {
    return <Skeleton variant="rectangular" width={600} height={600} sx={{ flex: "1" }} />;
  }

  return (
    <Paper className="popular-post-list" variant="outlined" sx={popularPostListStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography>인기글</Typography>
        <Link href="/search?sort=popular">더보기</Link>
      </div>

      {data.posts?.map((post: any) => (
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
};

// const { setIsLoading }: any = useContext(Context);
// useEffect(() => setIsLoading(isValidating), [isValidating]);
