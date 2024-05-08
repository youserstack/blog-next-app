import { headers } from "next/headers";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import "../styles/Article.scss";

async function getData(slugs: string[] | undefined) {
  const response = await fetch(`${process.env.ROOT_URL}/api/category`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(slugs),
  });
  if (!response.ok) throw new Error("failed to fetch data");
  return response.json();
}

export default async function Article() {
  // console.log("\n[Article]");
  const header = headers();
  const pathname = header.get("pathname")?.replace("/category", "");
  const slugs: string[] | undefined = pathname?.split("/");
  // console.log({ pathname });
  // console.log({ slugs });

  // 클라이언트에서 요청하기 전에 서버에서 미리 호출하여 데이터를 가져온다.
  const { posts } = await getData(slugs);
  // console.log({ posts });

  return (
    <article>
      <div className="breadcrumb">
        {slugs?.map((v: string, i: number) => {
          return (
            <React.Fragment key={v}>
              <Link href={""}>{v}</Link>
              {i !== slugs.length - 1 && <span>{">"}</span>}
            </React.Fragment>
          );
        })}
      </div>
      <div className="content">
        <ul className="post-list">
          {posts?.map((post: any) => (
            <li className="post-item" key={post._id}>
              <div className="post-text">
                <p>{post.createdAt.slice(0, 10)}</p>
                <p>Title : {post.title}</p>
                <p>Author : {post.author}</p>
                <pre>{post.content}</pre>
                <Link href={`/post/${post._id}`}>read more</Link>
              </div>
              <div className="post-image">
                {post.image ? <Image src={""} alt="sdf" /> : <h1>No Image</h1>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
