import Link from "next/link";
import React from "react";
import CategoryCreateButton from "@/components/CategoryCreateButton";
import PostCreateButton from "@/components/PostCreateButton";
import PostList from "@/components/PostList";
import "../styles/PostListArticle.scss";

export default async function PostListArticle({ categorySegments, categoryPath, page }: any) {
  // console.log("\n[PostListArticle]");
  // header로부터 데이터를 가져올 수도 있다.
  // const pathname: any = headers().get("pathname")?.replace("/categories", "");
  // const categorySegments: any = pathname?.split("/").slice(1);
  // const { posts } = await getData(pathname);

  console.log({ categorySegments });

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
        <PostList categoryPath={categoryPath} page={page} />
      </div>
    </article>
  );
}
