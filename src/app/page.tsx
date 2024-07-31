import RecentCommentList from "@/components/lists/RecentCommentList";
import PopularPostList from "@/components/lists/PopularPostList";
import LatestPostList from "@/components/lists/LatestPostList";
import HomeSkeleton from "@/components/skeletons/HomeSkeleton";
import { Suspense } from "react";
import Image from "next/image";
import { Box, Container, Grid } from "@mui/material";

const fetcher = (url: string) => fetch(url, { next: { revalidate: 60 } }).then((res) => res.json());

export default async function Home() {
  const [data1, data2, data3] = await Promise.all([
    fetcher(`${process.env.ROOT_URL}/api/posts?sort=popular`),
    fetcher(`${process.env.ROOT_URL}/api/posts?sort=latest`),
    fetcher(`${process.env.ROOT_URL}/api/comments/recent`),
  ]);
  console.log({ data1, data2, data3 });

  return (
    <Suspense fallback={<HomeSkeleton />}>
      <main className="home">
        <Container
          id="hero"
          component={"section"}
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <Box sx={{ width: "100%", height: { xs: "auto", md: "300px" } }}>
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
              <PopularPostList posts={data1.posts} />
            </Grid>

            <Grid item xs={12} md={6} sx={{ width: "100%" }}>
              <LatestPostList posts={data2.posts} />
            </Grid>
          </Grid>

          <RecentCommentList comments={data3.comments} />
        </Container>
      </main>
    </Suspense>
  );
}
