import ImageSkeleton from "@/components/skeletons/ImageSkeleton";
import RecentCommentList from "@/components/lists/RecentCommentList";
import PopularPostList from "@/components/lists/PopularPostList";
import LatestPostList from "@/components/lists/LatestPostList";
import { Box, Grid } from "@mui/material";
import { Suspense } from "react";
import Image from "next/image";

const imageUrl =
  "https://res.cloudinary.com/dzktdrw7o/image/upload/v1721977672/blog-next-app/ant-rozetsky-HXOllTSwrpM-unsplash_kqwe46.jpg";

export default function Home() {
  return (
    <main className="home">
      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Box sx={{ width: "100%", height: "300px" }}>
          <Suspense fallback={<ImageSkeleton />}>
            <Image src={imageUrl} width={1000} height={1000} alt="" />
          </Suspense>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ width: "100%" }}>
            <PopularPostList />
          </Grid>

          <Grid item xs={12} md={6} sx={{ width: "100%" }}>
            <LatestPostList />
          </Grid>
        </Grid>

        <RecentCommentList />
      </section>
    </main>
  );
}
