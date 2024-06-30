// swr을 사용한 데이터 패칭과 서스팬스

"use client";

import PostListArticle from "@/components/articles/PostListArticle";
import { CategoryProps } from "@/types/api";
import useSWR from "swr";
import { useContext, useEffect } from "react";
import { Context } from "@/components/context/Provider";
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
  const { isLoading, data } = useSWR(url, fetcher);
  const { setIsLoading }: any = useContext(Context);

  useEffect(() => {
    // isLoading은 처음 로드시에만 값이 true에서 false로 변경된다.
    // 하지만, isValidating은 데이터를 패칭할때마다 true에서 false로 변경된다.
    setIsLoading(isLoading);
  }, [isLoading]);

  if (isLoading) return null;

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
