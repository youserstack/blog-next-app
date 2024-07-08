// import SearchFilter from "@/components/features/SearchFilter";
import PostList from "@/components/lists/PostList";
import dynamic from "next/dynamic";
import Pagination from "@/components/ui/Pagination";
import "./SearchArticle.scss";

const SearchFilter = dynamic(() => import("@/components/features/SearchFilter"), {
  ssr: false,
});

export default function SearchArticle({ posts, categories, page, totalCount }: any) {
  return (
    <article className="posts-article">
      <SearchFilter categories={categories} />
      <PostList posts={posts} />
      <Pagination totalCount={totalCount} />
    </article>
  );
}
