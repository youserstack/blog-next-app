import PostList from "@/components/post/PostList";

export default function SearchArticle({ posts }: any) {
  return (
    <article className="posts-article">
      <PostList posts={posts} />
    </article>
  );
}
