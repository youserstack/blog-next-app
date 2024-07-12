"use client";

import LatestPostList from "@/components/lists/LatestPostList";
import PopularPostList from "@/components/lists/PopularPostList";
import RecentCommentList from "@/components/lists/RecentCommentList";

export default function Home() {
  return (
    <main className="home">
      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <PopularPostList />
          <LatestPostList />
        </div>
        <div>
          <RecentCommentList />
        </div>
      </section>
    </main>
  );
}
