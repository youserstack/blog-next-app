// swr을 사용한 데이터 패칭과 서스팬스

"use client";

import PostListArticle from "@/components/articles/PostListArticle";
import { CategoryProps } from "@/types/api";
import useSWR from "swr";
import Loading from "@/components/ui/Loading";
import "./page.scss";

const fetcher = (url: string) => fetch(url, { cache: "no-cache" }).then((res) => res.json());

// console.log(`\n\x1b[34m[categories/${category.map((v: string) => decodeURI(v)).join("/")}]\x1b[0m`);
export default function Category({ params: { category }, searchParams }: CategoryProps) {
  const categorySegments: string[] = category.map((v: any) => decodeURIComponent(v));
  const searchWords = searchParams.searchWords || "";
  const sort = searchParams.sort || "";
  const page: number = parseInt(searchParams.page) || 1;

  // 쿼리 스트링 생성
  const params = new URLSearchParams();
  if (categorySegments) params.append("categoryPath", `/${categorySegments.join("/")}`);
  if (searchWords) params.append("searchWords", searchWords);
  if (sort) params.append("sort", sort);
  if (page) params.append("page", page.toString());

  // 데이터 패칭
  const url = `${process.env.ROOT_URL}/api/posts?${params.toString()}`;
  const { data, isLoading } = useSWR(url, fetcher);

  // 로딩중
  if (isLoading) return <Loading />;

  // 데이터가 로드된 경우에만 렌더링
  const { totalCount, posts } = data;
  return (
    <div className="category">
      <PostListArticle
        categorySegments={categorySegments} // breadcrumb
        totalCount={totalCount} // pagination
        posts={posts} // list
        page={page} // pagination
      />
    </div>
  );
}

// import PostListArticle from "@/components/category/PostListArticle";
// import { CategoryProps } from "@/types/api";
// import Loading from "@/components/ui/Loading";
// import { Suspense } from "react";
// import "./page.scss";

// export default async function Category({ params: { category }, searchParams }: CategoryProps) {
//   console.log(
//     `\n\x1b[34m[categories/${category.map((v: string) => decodeURI(v)).join("/")}]\x1b[0m`
//   );
//   const categorySegments: string[] = category.map((v: any) => decodeURIComponent(v));
//   const categoryPath: string = `/${categorySegments.join("/")}`;
//   const searchWords: string = searchParams.searchWords || "";
//   const sort: string = searchParams.sort || "";
//   const page: number = parseInt(searchParams.page) || 1;

//   // 쿼리 스트링 생성
//   const params = new URLSearchParams();
//   if (categorySegments) params.append("categoryPath", categoryPath);
//   if (searchWords) params.append("searchWords", searchWords);
//   if (sort) params.append("sort", sort);
//   if (page) params.append("page", page.toString());

//   // 데이터 패칭
//   const url = `${process.env.ROOT_URL}/api/posts?${params.toString()}`;
//   const { totalCount, posts } = await fetch(url, { cache: "no-cache" }).then((response: any) =>
//     response.json()
//   );

//   return (
//     <div className="category">
//       <Suspense fallback={<Loading />}>
//         <PostListArticle
//           categorySegments={categorySegments} // breadcrumb
//           totalCount={totalCount} // pagination
//           posts={posts} // list
//           page={page} // pagination
//         />
//       </Suspense>
//     </div>
//   );
// }
