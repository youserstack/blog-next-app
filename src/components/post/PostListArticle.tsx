import Link from "next/link";
import React from "react";
import CategoryCreateButton from "@/components/category/CategoryCreateButton";
import PostCreateButton from "@/components/post/PostCreateButton";
import PostList from "@/components/post/PostList";
import Pagination from "@/components/ui/Pagination";
import "../../styles/PostListArticle.scss";

export default async function PostListArticle({ categorySegments, posts, totalCount, page }: any) {
  return (
    <article className="post-list-article">
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
        <PostList posts={posts} />
        <Pagination page={page} totalCount={totalCount} />
      </div>
    </article>
  );
}
