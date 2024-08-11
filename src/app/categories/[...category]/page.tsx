"use client";

import { LoadingContext } from "@/components/context/LoadingContext";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import useSWR from "swr";

const Breadcrumb = dynamic(() => import("@/components/ui/Breadcrumb"));
const ControlArea = dynamic(() => import("@/components/areas/ControlArea"));
const PostList = dynamic(() => import("@/components/lists/PostList"));
const MuiPagination = dynamic(() => import("@/components/ui/MuiPagination"));

const ITEMS_PER_PAGE = 5;
const fetcher = (url: string) => fetch(url, { cache: "no-cache" }).then((res) => res.json());

export default function Category() {
  const params = useParams();
  const searchParams = useSearchParams();
  const categoryPath = "/" + (params.category as string[]).join("/");
  const page = searchParams?.get("page") || "1";
  const url = `/api/posts?categoryPath=${categoryPath}&page=${page}`;
  const { isLoading, data } = useSWR(url, fetcher);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => setIsLoading(isLoading), [isLoading, setIsLoading]);

  if (isLoading || !data) return null;
  const { posts, totalCount }: any = data;
  return (
    <Box
      component="article"
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
        <MuiPagination count={Number(Math.ceil(totalCount / ITEMS_PER_PAGE))} />
      </div>
    </Box>
  );
}
