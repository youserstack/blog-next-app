import PostList from "@/components/lists/PostList";
import Pagination from "@/components/ui/Pagination";
import SearchFilter from "@/components/features/SearchFilter";

export default function SearchArticle({ posts, categories, totalCount }: any) {
  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <SearchFilter categories={categories} />
      <PostList posts={posts} />
      <Pagination totalCount={totalCount} />
    </article>
  );
}
