import { useContext, useEffect } from "react";
import { Context } from "@/components/context/Provider";
import Link from "next/link";
import useSWR from "swr";
import Image from "next/image";
import { Paper, Typography } from "@mui/material";

const fetcher = (url: string) => fetch(url, { cache: "no-cache" }).then((res) => res.json());

export default function PopularPostList() {
  const { setIsLoading }: any = useContext(Context);

  const popularUrl = `${process.env.ROOT_URL}/api/posts?sort=popular`;
  const { data, isValidating } = useSWR(popularUrl, fetcher);

  useEffect(() => setIsLoading(isValidating), [isValidating]);

  if (!data) return null;

  return (
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

      {data.posts?.map((post: any) => (
        <Paper
          key={post._id}
          variant="outlined"
          sx={{
            height: "100px",
            overflow: "hidden",
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
  );
}
