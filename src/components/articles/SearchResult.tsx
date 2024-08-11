"use client";

import { LoadingContext } from "../context/LoadingContext";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import PostList from "@/components/lists/PostList";
import MuiPagination from "../ui/MuiPagination";
import useSWR from "swr";

const ITEMS_PER_PAGE = 5;
const fetcher = (url: string) => fetch(url, { cache: "no-cache" }).then((res) => res.json());

export default function SearchResult() {
  const searchParams = useSearchParams();
  const url = `/api/posts?${searchParams.toString()}`;
  const { isLoading, isValidating, data } = useSWR(url, fetcher);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => setIsLoading(isValidating), [isValidating, setIsLoading]);

  if (isLoading || !data) return null;
  const { posts, totalCount } = data;
  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <PostList posts={posts} />
      <MuiPagination count={Number(Math.ceil(totalCount / ITEMS_PER_PAGE))} />
    </article>
  );
}
