"use client";

import Loading from "@/components/ui/Loading";
import Pagination from "@/components/ui/Pagination";
import PostList from "@/components/lists/PostList";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url, { cache: "no-cache" }).then((res) => res.json());

export default function Search() {
  const searchParams = useSearchParams();
  const { isValidating, data } = useSWR(`/api/posts?${searchParams.toString()}`, fetcher);

  if (isValidating) return <Loading />;

  return (
    <article style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <PostList posts={data.posts} />
      <Pagination totalCount={data.totalCount} />
    </article>
  );
}
