import ArticleOptionButton from "../buttons/ArticleOptionButton";
import CommentCreateForm from "../forms/CommentCreateForm";
import CommentList from "../lists/CommentList";
import { Paper, Typography } from "@mui/material";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Props {
  postId: string;
}

export default async function PostArticle({ postId }: Props) {
  const { post } = await fetcher(`${process.env.ROOT_URL}/api/posts/${postId}`);

  if (!post) {
    console.error("게시글이 null입니다.");
    return null;
  }

  return (
    <Paper
      className="포스트_게시글"
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
      <div
        className="상단"
        style={{ position: "relative", display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <Typography variant="h3">{post.title}</Typography>
          <Typography variant="subtitle2" style={{ display: "flex", gap: "1rem" }}>
            <p>작성자 : {post.author?.name}</p>
            <p>{post.createdAt?.slice(0, 10)}</p>
            <p>카테고리 {post.category?.replaceAll("/", " > ")}</p>
          </Typography>
        </div>

        <ArticleOptionButton post={post} />
      </div>

      <div className="중간" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div className="thumbnail" style={{ height: "500px" }}>
          <Image src={post.image || ""} alt="" width={1000} height={1000} />
        </div>

        <pre style={{ whiteSpace: "break-spaces" }}>{post.content}</pre>
      </div>

      <div className="하단" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <CommentCreateForm postId={post._id} />
        <CommentList postId={post._id} />
      </div>
    </Paper>
  );
}
