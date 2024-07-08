"use client";

import { useContext, useEffect } from "react";
import { Context } from "@/components/context/Provider";
import Link from "next/link";
import useSWR from "swr";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { Typography } from "@mui/material";

const fetcher = (url: string) => fetch(url, { cache: "no-cache" }).then((res) => res.json());

export default function Dashboard() {
  // 쿼리 스트링 생성
  const params = new URLSearchParams();
  params.append("sort", "popular");
  const url = `/api/posts?${params.toString()}`;
  const { data, isLoading, isValidating } = useSWR(url, fetcher);
  const { setIsLoading }: any = useContext(Context);
  console.log({ data });

  useEffect(() => {
    if (isValidating) setIsLoading(true);
    else setIsLoading(false);
  }, [isValidating]);

  if (isLoading) return null;

  return (
    <main className="dashboard">
      <section style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
        {/* <div className="breadcrumb">{"> dashboard"}</div> */}
        {/* <h1>작성중인 최신블로그 글</h1> */}

        <Paper
          className="popular"
          variant="outlined"
          sx={{
            flex: "1",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            fontSize: "12px",
          }}
        >
          <Typography>인기글</Typography>
          {data.posts?.map((post: any) => (
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
                    gap: "1rem",
                  }}
                >
                  <Typography variant="subtitle1">{post.title}</Typography>
                  <Typography variant="caption" sx={{ display: "flex" }}>
                    <p>조회수 {post.views}</p>
                    <p>{post.category}</p>
                  </Typography>
                </div>
              </Link>
            </Paper>
          ))}

          <Link href="/search?sort=popular">더보기</Link>
        </Paper>

        <Paper
          className="popular"
          variant="outlined"
          sx={{
            flex: "1",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            fontSize: "12px",
          }}
        >
          <Typography>인기글</Typography>
          {data.posts?.map((post: any) => (
            <Paper key={post._id} variant="outlined" sx={{ height: "100px", overflow: "hidden" }}>
              <Link href={`/posts/${post._id}`} style={{ height: "100%", display: "flex" }}>
                <div className="thumbnail" style={{ width: "100px" }}>
                  {post.image && <Image src={post.image} alt="alt" width={200} height={200} />}
                </div>
                <div
                  className="content"
                  style={{ padding: "1rem", flex: "1", display: "flex", gap: "1rem" }}
                >
                  <h3>{post.title}</h3>
                  <p>조회수 {post.views}</p>
                  <p>{post.category}</p>
                </div>
              </Link>
            </Paper>
          ))}

          <Link href="/search?sort=popular">더보기</Link>
        </Paper>
      </section>
    </main>
  );
}
