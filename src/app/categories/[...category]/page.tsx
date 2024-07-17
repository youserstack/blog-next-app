"use client";

import { useContext, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Context } from "@/components/context/Provider";
import { CategoryProps } from "@/types/api";
import PostListArticle from "@/components/articles/PostListArticle";
import useSWR from "swr";

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
  const { posts, totalCount } = data;
  return (
    <div className="category" style={{ flex: "1" }}>
      <PostListArticle
        posts={posts} // list
        totalCount={totalCount} // pagination
      />
    </div>
  );
}
