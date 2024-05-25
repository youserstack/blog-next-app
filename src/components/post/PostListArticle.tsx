import Link from "next/link";
import React from "react";
import CategoryCreateButton from "@/components/CategoryCreateButton";
import PostCreateButton from "@/components/post/PostCreateButton";
import PostList from "@/components/post/PostList";
import "../../styles/PostListArticle.scss";

export default async function PostListArticle({ categorySegments, posts }: any) {
  return (
    <article className="post-list-article">
      <div className="article-header">
        <div className="breadcrumb">
          {categorySegments?.map((v: string, i: number) => (
            <React.Fragment key={v}>
              <Link href={""}>{v}</Link>
              {i !== categorySegments.length - 1 && <span>{">"}</span>}
            </React.Fragment>
          ))}

          {categorySegments?.length < 3 && (
            <div className="category-create">
              <span>{">"}</span>
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
      </div>
    </article>
  );
}
