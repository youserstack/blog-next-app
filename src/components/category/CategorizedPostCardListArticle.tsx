import Link from "next/link";
import React from "react";
import CategoryCreateButton from "@/components/category/CategoryCreateButton";
import PostCreateButton from "@/components/post/PostCreateButton";
import PostCardList from "@/components/post/PostCardList";
import Pagination from "@/components/ui/Pagination";
import "../../styles/CategorizedPostCardListArticle.scss";

export default async function CategorizedPostCardListArticle({
  categorySegments,
  posts,
  totalCount,
  page,
}: any) {
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
            <div className="category-create">
              <CategoryCreateButton parentCategories={categorySegments} />
            </div>
          )}
        </div>
        <div className="manager">
          <PostCreateButton />
        </div>
      </div>
      <div className="content">
        <PostCardList posts={posts} />
        <Pagination page={page} totalCount={totalCount} />
      </div>
    </article>
  );
}