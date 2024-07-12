import { useContext, useEffect } from "react";
import { Context } from "@/components/context/Provider";
import Link from "next/link";
import useSWR from "swr";
import Image from "next/image";
import { Paper, Typography } from "@mui/material";

const fetcher = (url: string) => fetch(url, { cache: "no-cache" }).then((res) => res.json());

export default function LatestPostList() {
  const { setIsLoading }: any = useContext(Context);

  const latestUrl = `${process.env.ROOT_URL}/api/posts?sort=latest`;
  const { data, isValidating } = useSWR(latestUrl, fetcher);

  useEffect(() => setIsLoading(isValidating), [setIsLoading, isValidating]);

  if (!data) return null;

  return (
    <Paper
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
      {data.posts?.map((post: any) => (
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
  );
}
