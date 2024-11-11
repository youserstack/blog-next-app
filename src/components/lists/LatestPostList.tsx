import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import HorizontalScrollButton from "../ui/HorizontalScrollButton";

const fetcher = async (url: string): Promise<LatestPostsResponse> => {
  const response = await fetch(url, { next: { revalidate: 60 } });
  if (!response.ok) throw new Error("최신글 데이터 요청 실패");
  return response.json();
};

function Carousel({ posts }: { posts: IPost[] }) {
  return (
    <ul
      style={{
        height: "250px",
        display: "flex",
        gap: "1rem",
        position: "relative",
        overflowX: "auto", // 좌우 스크롤 가능하도록 설정
        scrollBehavior: "smooth", // 스크롤을 부드럽게
        scrollbarWidth: "none", // Firefox에서 스크롤바 숨기기
      }}
    >
      {posts.map((post: IPost) => (
        <Paper
          key={post._id}
          variant="outlined"
          sx={{
            minWidth: { xs: "200px", md: "300px" }, // 최소 너비 설정하여 각 아이템이 일정 크기를 가짐
            overflow: "hidden",
            "&:hover .content": { backgroundColor: "rgba(0,0,0,0.7)" },
          }}
        >
          <Link
            href={`/posts/${post._id}`}
            style={{ height: "100%", display: "flex", position: "relative" }}
          >
            <div className="thumbnail" style={{ position: "absolute", inset: "0" }}>
              {post.image && <Image src={post.image} alt="alt" width={200} height={200} priority />}
            </div>

            <Box
              className="content"
              sx={{
                flex: "1",
                padding: "1rem",
                position: "absolute",
                inset: "0",
                color: "white",
                backgroundColor: "rgba(0,0,0,0.3)",
                transition: "all 0.3s",
              }}
            >
              <Typography variant="h5" sx={{ marginBottom: "10px" }}>
                {post.title}
              </Typography>
              <Typography>
                {post.content.length > 40 ? post.content.slice(0, 40) + "..." : post.content}
              </Typography>
            </Box>
          </Link>
        </Paper>
      ))}
    </ul>
  );
}

export default async function LatestPostList() {
  const { posts } = await fetcher(`${process.env.ROOT_URL}/api/home/latest-posts`);

  return (
    <Paper className="latest-post-list" variant="outlined" sx={{ padding: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Typography>최신글</Typography>
        <Link href="/search?sort=latest">더보기</Link>
      </div>

      <div style={{ display: "flex" }}>
        <HorizontalScrollButton targetElement=".latest-post-list ul" isLeftButton />
        <Carousel posts={posts} />
        <HorizontalScrollButton targetElement=".latest-post-list ul" isRightButton />
      </div>
    </Paper>
  );
}
