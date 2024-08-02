"use client";

import { useContext, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Context } from "@/components/context/Context";
import { CategoryProps } from "@/types/api";
import useSWR from "swr";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ControlArea from "@/components/areas/ControlArea";
import PostList from "@/components/lists/PostList";
import Pagination from "@/components/ui/Pagination";
import { Box } from "@mui/material";

const fetcher = (url: string) => fetch(url, { cache: "no-cache" }).then((res) => res.json());

export default function Category({ params: { category } }: CategoryProps) {
  const searchParams = useSearchParams();
  const categoryPath = "/" + category.join("/");
  const page = searchParams.get("page") || "1";
  const url = `${process.env.ROOT_URL}/api/posts?categoryPath=${categoryPath}&page=${page}`;
  const { isValidating, data } = useSWR(url, fetcher);
  const { setIsLoading, setDynamicUrl }: any = useContext(Context);

  // isLoading은 처음 로드시에만 값이 true에서 false로 변경된다.
  // 하지만, isValidating은 데이터를 패칭할때마다 true에서 false로 변경된다.
  useEffect(() => setIsLoading(isValidating), [isValidating, setIsLoading]);
  useEffect(() => setDynamicUrl(url), [url, setDynamicUrl]); // 포스트 게시글 생성후 데이터 패칭시 사용

  if (!data) return null;

  const { posts, totalCount }: any = data;
  return (
    <Box
      component={"article"}
      className="category-page"
      sx={{ width: "100%", minHeight: "100vh", padding: { xs: "0", md: "1rem" } }}
    >
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
    </Box>
  );
}
