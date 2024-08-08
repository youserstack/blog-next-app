"use client";

import { useContext, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/ui/Pagination";
import PostList from "@/components/lists/PostList";
import useSWR from "swr";
import { LoadingContext } from "../context/LoadingContext";

const fetcher = (url: string) => fetch(url, { cache: "no-cache" }).then((res) => res.json());

export default function SearchResult() {
  const searchParams = useSearchParams();
  const url = `${process.env.ROOT_URL}/api/posts?${searchParams.toString()}`;
  const { isLoading, isValidating, data } = useSWR(url, fetcher);
  const { setIsLoading }: any = useContext(LoadingContext);

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
      <Pagination totalCount={totalCount} />
    </article>
  );
}
