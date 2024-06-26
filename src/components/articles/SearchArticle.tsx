import SearchFilter from "@/components/features/SearchFilter";
import PostList from "@/components/post/PostList";
import "./SearchArticle.scss";

export default function SearchArticle({ posts, categories }: any) {
  return (
    <article className="posts-article">
      <SearchFilter categories={categories} />
      <PostList posts={posts} />
    </article>
  );
}
