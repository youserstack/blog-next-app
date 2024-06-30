"use client";

import Link from "next/link";
import useSWR from "swr";
import "./page.scss";
import React from "react";

const fetcher = (url: string) => fetch(url, { cache: "no-cache" }).then((res) => res.json());

export default function Dashboard() {
  // console.log("\n\x1b[34m[/dashboard]\x1b[0m");

  // 쿼리 스트링 생성
  const params = new URLSearchParams();
  params.append("sort", "popular");
  const url = `/api/posts?${params.toString()}`;
  const { data, isLoading } = useSWR(url, fetcher);
  console.log({ data });

  return (
    <main className="dashboard">
      <section>
        <div className="breadcrumb">{"> dashboard"}</div>
        <h1>작성중인 최신블로그 글</h1>
        <div className="popular">
          <ul>
            {data?.posts.map((post: any) => (
              <li key={post._id}>{post.title}</li>
            ))}
          </ul>
          <Link href="/search?sort=popular">더보기</Link>
        </div>
      </section>
    </main>
  );
}
