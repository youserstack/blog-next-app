"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import useSWR, { mutate } from "swr";
import PlusButton from "@/components/buttons/PlusButton";
import Loading from "@/components/ui/Loading";
import { useEffect } from "react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PostCreateButton from "@/components/buttons/PostCreateButton";
import CategoryOptionButton from "@/components/buttons/CategoryOptionButton";

const PostList = dynamic(() => import("@/components/lists/PostList"));
const Pagination = dynamic(() => import("@/components/ui/Pagination"));
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Category() {
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Breadcrumbs />
          <PlusButton />
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <PostCreateButton />
          <CategoryOptionButton />
        </div>
      </div>

      <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <PostList posts={data.posts} />
        <Pagination totalCount={data.totalCount} />
      </div>
    </Box>
  );
}
