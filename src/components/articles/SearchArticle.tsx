// import SearchFilter from "@/components/features/SearchFilter";
import PostList from "@/components/lists/PostList";
import "./SearchArticle.scss";
import dynamic from "next/dynamic";

const SearchFilter = dynamic(() => import("@/components/features/SearchFilter"), {
  ssr: false,
});

export default function SearchArticle({ posts, categories }: any) {
  return (
    <article className="posts-article">
      <SearchFilter categories={categories} />
      <PostList posts={posts} />
    </article>
  );
}
