import { Box, Grid } from "@mui/material";
import Image from "next/image";
import dynamic from "next/dynamic";
import PopularPostListSkeleton from "@/components/skeletons/PopularPostListSkeleton";
import LatestPostListSkeleton from "@/components/skeletons/LatestPostListSkeleton";
import RecentCommentListSkeleton from "@/components/skeletons/RecentCommentListSkeleton";

const PopularPostList = dynamic(() => import("@/components/lists/PopularPostList"), {
  loading: () => <PopularPostListSkeleton />,
});
const LatestPostList = dynamic(() => import("@/components/lists/LatestPostList"), {
  loading: () => <LatestPostListSkeleton />,
});
const RecentCommentList = dynamic(() => import("@/components/lists/RecentCommentList"), {
  loading: () => <RecentCommentListSkeleton />,
});

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
