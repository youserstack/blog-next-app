import { Box, Grid } from "@mui/material";
import Image from "next/image";
import PopularPostListSkeleton from "@/components/skeletons/PopularPostListSkeleton";
import LatestPostListSkeleton from "@/components/skeletons/LatestPostListSkeleton";
import RecentCommentListSkeleton from "@/components/skeletons/RecentCommentListSkeleton";
import PopularPostList from "@/components/lists/PopularPostList";
import LatestPostList from "@/components/lists/LatestPostList";
import RecentCommentList from "@/components/lists/RecentCommentList";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="home">
      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Box sx={{ width: "100%", height: "300px" }}>
          <Image
            src="https://res.cloudinary.com/dzktdrw7o/image/upload/v1721977672/blog-next-app/ant-rozetsky-HXOllTSwrpM-unsplash_kqwe46.jpg"
            width={1000}
            height={1000}
            alt=""
          />
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ width: "100%" }}>
            <Suspense fallback={<PopularPostListSkeleton />}>
              <PopularPostList />
            </Suspense>
          </Grid>

          <Grid item xs={12} md={6} sx={{ width: "100%" }}>
            <Suspense fallback={<LatestPostListSkeleton />}>
              <LatestPostList />
            </Suspense>
          </Grid>
        </Grid>

        <Suspense fallback={<RecentCommentListSkeleton />}>
          <RecentCommentList />
        </Suspense>
      </section>
    </main>
  );
}
