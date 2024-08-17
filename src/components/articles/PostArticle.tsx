import { Paper, Typography } from "@mui/material";
import Image from "next/image";
import ArticleOptionButton from "../buttons/ArticleOptionButton";
import CommentCreateForm from "../forms/CommentCreateForm";
import CommentList from "../lists/CommentList";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default async function PostArticle({ postId }: any) {
  const { post } = await fetcher(`${process.env.ROOT_URL}/api/posts/${postId}`);

  if (!post) return null;

  return (
    <Paper
      component="article"
      variant="outlined"
      sx={{
        minHeight: "100vh",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <div className="article-header" style={{ position: "relative" }}>
        <Typography variant="h3">{post.title}</Typography>
        <Typography variant="subtitle2" style={{ display: "flex", gap: "1rem" }}>
          <p>작성자 : {post.author?.name}</p>
          <p>{post.createdAt?.slice(0, 10)}</p>
          <p>카테고리 {post.category?.replaceAll("/", " > ")}</p>
        </Typography>
        <ArticleOptionButton post={post} />
      </div>

      <div className="article-body">
        <div className="thumbnail" style={{ height: "500px" }}>
          <Image src={post.image} alt="" width={1000} height={1000} />
        </div>
        <pre style={{ whiteSpace: "break-spaces" }}>{post.content}</pre>
      </div>

      <div
        className="article-footer"
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <CommentCreateForm authorImage={post.author?.image} postId={post._id} />
        <CommentList postId={post._id} />
      </div>
    </Paper>
  );
}
