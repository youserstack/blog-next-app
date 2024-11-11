import PopularPostList from "@/components/lists/PopularPostList";
import LatestPostList from "@/components/lists/LatestPostList";
import { Suspense } from "react";
import { Skeleton } from "@mui/material";

export default function Home() {
  return (
    <main className="home">
      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Suspense
          fallback={
            <Skeleton
              className="인기글_리스트_스켈레톤"
              component={"div"}
              height={"35vh"}
              variant="rectangular"
            />
          }
        >
          <PopularPostList />
        </Suspense>

        <Suspense
          fallback={
            <Skeleton
              className="최신글_리스트_스켈레톤"
              component={"div"}
              height={"35vh"}
              variant="rectangular"
            />
          }
        >
          <LatestPostList />
        </Suspense>
      </section>
    </main>
  );
}
