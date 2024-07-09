import PostList from "@/components/lists/PostList";
import Pagination from "@/components/ui/Pagination";
import SearchFilter from "@/components/features/SearchFilter";
import "./SearchArticle.scss";
// import dynamic from "next/dynamic";

// const SearchFilter = dynamic(() => import("@/components/features/SearchFilter"), {
//   ssr: false,
// });

export default function SearchArticle({ posts, categories, totalCount }: any) {
  return (
    <article className="posts-article">
      <SearchFilter categories={categories} />
      <PostList posts={posts} />
      <Pagination totalCount={totalCount} />
    </article>
  );
}
