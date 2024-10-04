import PopularPostList from "@/components/lists/PopularPostList";
import LatestPostList from "@/components/lists/LatestPostList";
import RecentCommentList from "@/components/lists/RecentCommentList";

export default function Home() {
  return (
    <main className="home">
      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <PopularPostList />
        <LatestPostList />
        {/* <RecentCommentList /> */}
      </section>
    </main>
  );
}
