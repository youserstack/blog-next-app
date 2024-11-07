"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Box, Breadcrumbs } from "@mui/material";
import dynamic from "next/dynamic";
import useSWR, { mutate } from "swr";
import Link from "next/link";
import CategoryCreateButton from "@/components/buttons/CategoryCreateButton";
import Loading from "@/components/ui/Loading";
import { useEffect } from "react";

const ControlArea = dynamic(() => import("@/components/areas/ControlArea"));
const PostList = dynamic(() => import("@/components/lists/PostList"));
const MuiPagination = dynamic(() => import("@/components/ui/MuiPagination"));
const ITEMS_PER_PAGE = 5;

export default function Category() {
  const params = useParams();
  const searchParams = useSearchParams();
  const categoryPath = "/" + (params.category as string[]).join("/");
  const page = searchParams?.get("page") || "1";
  const { isLoading, data } = useSWR("categorized-posts", () =>
    fetch(`/api/posts?categoryPath=${categoryPath}&page=${page}`).then((res) => res.json())
  );

  // breadcrumbs
  const categorySegments = (params.category as string[]).map((v: any) => decodeURIComponent(v));
  let categoryPaths: string[] = [];
  categorySegments?.reduce((a: any, v: string) => {
    a += `/${v}`;
    categoryPaths.push(a);
    return a;
  }, "/categories");

  useEffect(() => {
    // console.log("카테고리 파라미터 배열", { params });
    mutate("categorized-posts");
  }, [params]);

  if (isLoading || !data) return <Loading />;
  const { posts, totalCount }: any = data;
  return (
    <Box
      component="article"
      className="category-page"
      sx={{ width: "100%", minHeight: "100vh", padding: { xs: "0", md: "1rem" } }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Breadcrumbs separator=">">
          {categoryPaths?.map((path: string) => {
            const paths = path.split("/");
            const label = paths[paths.length - 1];
            return (
              <Link key={path} href={path}>
                {label}
              </Link>
            );
          }, "/categories")}
        </Breadcrumbs>

        <CategoryCreateButton parentCategories={categorySegments} />

        <ControlArea />
      </div>

      <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <PostList posts={posts} />
        <MuiPagination count={Number(Math.ceil(totalCount / ITEMS_PER_PAGE))} />
      </div>
    </Box>
  );
}
