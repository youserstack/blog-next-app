import Link from "next/link";
import React from "react";
import CategoryCreateButton from "@/components/category/CategoryCreateButton";
import PostCreateButton from "@/components/post/PostCreateButton";
import PostCardList from "@/components/post/PostCardList";
import Pagination from "@/components/ui/Pagination";
import CategoryOptionButton from "@/components/category/CategoryOptionButton";
import { headers } from "next/headers";
import "../../styles/CategorizedPostCardListArticle.scss";

export default async function CategorizedPostCardListArticle({
  categorySegments,
  posts,
  totalCount,
  page,
}: any) {
  const user = JSON.parse(headers().get("user") as string);

  return (
    <article className="categorized-post-list-article">
      <div className="article-header">
        <div className="breadcrumb">
          {categorySegments?.map((v: string, i: number) => {
            // 요소의 인덱스까지의 모든 요소를 결합하여 경로 생성
            const key = "/" + categorySegments.slice(0, i + 1).join("/");
            return (
              <React.Fragment key={key}>
                <Link href={""}>{v}</Link>
                <span>{">"}</span>
              </React.Fragment>
            );
          })}
          {user && categorySegments?.length <= 2 && (
            <CategoryCreateButton parentCategories={categorySegments} label="+" />
          )}
        </div>
        {user && (
          <div className="manager">
            <PostCreateButton />
            <CategoryOptionButton categorySegments={categorySegments} />
          </div>
        )}
      </div>
      <div className="content">
        <PostCardList posts={posts} />
        <Pagination page={page} totalCount={totalCount} />
      </div>
    </article>
  );
}
