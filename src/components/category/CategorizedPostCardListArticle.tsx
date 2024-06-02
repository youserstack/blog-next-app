import Link from "next/link";
import React from "react";
import CategoryCreateButton from "@/components/category/CategoryCreateButton";
import PostCreateButton from "@/components/post/PostCreateButton";
import PostCardList from "@/components/post/PostCardList";
import Pagination from "@/components/ui/Pagination";
import CategoryOptionButton from "@/components/category/CategoryOptionButton";
import "../../styles/CategorizedPostCardListArticle.scss";
import { cookies } from "next/headers";

export default async function CategorizedPostCardListArticle({
  categorySegments,
  posts,
  totalCount,
  page,
}: any) {
  const refreshToken = cookies().get("refreshToken");

  return (
    <article className="categorized-post-list-article">
      <div className="article-header">
        <div className="breadcrumb">
          {categorySegments?.map((v: string, i: number) => (
            <React.Fragment key={v}>
              <Link href={""}>{v}</Link>
              <span>{">"}</span>
            </React.Fragment>
          ))}
          {categorySegments?.length <= 2 && (
            <CategoryCreateButton parentCategories={categorySegments} />
          )}
        </div>
        {refreshToken && (
          <div className="manager">
            <PostCreateButton />
            <CategoryOptionButton />
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
