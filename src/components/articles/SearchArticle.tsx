import SearchFilter from "@/components/articles/SearchFilter";
import PostList from "@/components/post/PostList";

export default function SearchArticle({ posts, categories }: any) {
  return (
    <article className="posts-article">
      <SearchFilter categories={categories} />
      <PostList posts={posts} />
    </article>
  );
}
