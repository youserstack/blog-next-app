"use client";

import { useContext, useEffect } from "react";
import { Context } from "@/components/context/Provider";
import Link from "next/link";
import useSWR from "swr";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import Typography from "@mui/material/Typography";

const fetcher = (url: string) => fetch(url, { cache: "no-cache" }).then((res) => res.json());

export default function Dashboard() {
  const { setIsLoading }: any = useContext(Context);

  const popularUrl = `/api/posts?sort=popular`;
  const {
    data: popularData,
    isLoading: isLoadingPopular,
    isValidating: isValidatingPopular,
  } = useSWR(popularUrl, fetcher);

  const latestUrl = `/api/posts?sort=latest`;
  const {
    data: latestData,
    isLoading: isLoadingLatest,
    isValidating: isValidatingLatest,
  } = useSWR(latestUrl, fetcher);

  useEffect(() => {
    if (isValidatingPopular || isValidatingLatest) setIsLoading(true);
    else setIsLoading(false);
  }, [isValidatingPopular, isValidatingLatest]);

  if (isLoadingPopular || isLoadingLatest) {
    return (
      <main>
        <section></section>
      </main>
    );
  }

  return (
    <main className="dashboard">
      <section style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
        {/* <div className="breadcrumb">{"> dashboard"}</div> */}

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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography>인기글</Typography>
            <Link href="/search?sort=popular">더보기</Link>
          </div>

          {popularData?.posts?.map((post: any) => (
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
                  <div style={{ display: "flex" }}>
                    <Typography>조회수 {post.views}</Typography>
                    <Typography>{post.category}</Typography>
                  </div>
                </div>
              </Link>
            </Paper>
          ))}
        </Paper>

        <Paper
          className="latest"
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography>최신글</Typography>
            <Link href="/search?sort=latest">더보기</Link>
          </div>
          {latestData?.posts?.map((post: any) => (
            <Paper
              key={post._id}
              variant="outlined"
              sx={{
                //
                height: "100px",
                overflow: "hidden",
                "&:hover .title": {
                  color: "blue",
                },
              }}
            >
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
                    alignContent: "space-between",
                  }}
                >
                  <Typography className="title" variant="h4" sx={{ flex: "1" }}>
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
      </section>
    </main>
  );
}
