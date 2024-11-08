"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import useSWR, { mutate } from "swr";
import Link from "next/link";
import CategoryCreateButton from "@/components/buttons/CategoryCreateButton";
import Loading from "@/components/ui/Loading";
import { useEffect } from "react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const ControlArea = dynamic(() => import("@/components/areas/ControlArea"));
const PostList = dynamic(() => import("@/components/lists/PostList"));
const MuiPagination = dynamic(() => import("@/components/ui/MuiPagination"));
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Category() {
  const ITEMS_PER_PAGE = 5;
  const params = useParams();
  const searchParams = useSearchParams();
  const categoryPath = "/" + (params.category as string[]).join("/");
  const page = searchParams?.get("page") || "1";
  const { isValidating, data } = useSWR("categorized-posts", () =>
    fetcher(`/api/posts?categoryPath=${categoryPath}&page=${page}`)
  );

  useEffect(() => {
    mutate("categorized-posts");
  }, [params]);

  if (isValidating) return <Loading />;

  return (
    <Box
      component="article"
      className="category-page"
      sx={{ width: "100%", minHeight: "100vh", padding: { xs: "0", md: "1rem" } }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Breadcrumbs />
        {/* <CategoryCreateButton parentCategories={categorySegments} /> */}
        <ControlArea />
      </div>

      <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <PostList posts={data.posts} />
        <MuiPagination count={Number(Math.ceil(data.totalCount / ITEMS_PER_PAGE))} />
      </div>
    </Box>
  );
}
