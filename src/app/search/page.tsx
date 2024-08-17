"use client";

import { LoadingContext } from "@/components/context/LoadingContext";
import MuiPagination from "@/components/ui/MuiPagination";
import PostList from "@/components/lists/PostList";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import useSWR from "swr";

const ITEMS_PER_PAGE = 5;
const fetcher = (url: string) => fetch(url, { cache: "no-cache" }).then((res) => res.json());

export default function Search() {
  const searchParams = useSearchParams();
  const url = `/api/posts?${searchParams.toString()}`;
  const { isLoading, isValidating, data } = useSWR(url, fetcher);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => setIsLoading(isValidating), [isValidating, setIsLoading]);

  if (isLoading || !data) return null;
  const { posts, totalCount } = data;
  return (
    <article style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <PostList posts={posts} />
      <MuiPagination count={Number(Math.ceil(totalCount / ITEMS_PER_PAGE))} />
    </article>
  );
}
