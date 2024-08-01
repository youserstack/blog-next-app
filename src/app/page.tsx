import RecentCommentList from "@/components/lists/RecentCommentList";
import PopularPostList from "@/components/lists/PopularPostList";
import LatestPostList from "@/components/lists/LatestPostList";
import HomeSkeleton from "@/components/skeletons/HomeSkeleton";
import { Suspense } from "react";
import Image from "next/image";
import { Box, Container, Grid } from "@mui/material";

export default function Home() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <main className="home">
        <Container
          id="hero"
          component={"section"}
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <Box sx={{ width: "100%", height: "300px" }}>
            <Image
              src={
                "https://res.cloudinary.com/dzktdrw7o/image/upload/v1721977672/blog-next-app/ant-rozetsky-HXOllTSwrpM-unsplash_kqwe46.jpg"
              }
              width={1000}
              height={1000}
              alt=""
            />
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
        </Container>
      </main>
    </Suspense>
  );
}
