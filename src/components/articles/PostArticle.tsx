import ArticleOptionButton from "../buttons/ArticleOptionButton";
import CommentCreateForm from "../forms/CommentCreateForm";
import CommentList from "../lists/CommentList";
import { Paper, Typography } from "@mui/material";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default async function PostArticle({ postId }: any) {
  const { post } = await fetcher(`${process.env.ROOT_URL}/api/posts/${postId}`);

  // if (!post || !post.author) {
  //   console.error("서버에서 포스트글 패칭을 실패했습니다.");
  //   if (!post) console.error("게시글이 null입니다.");
  //   if (!post.author) console.error("게시글의 작성자가 null입니다.");
  //   console.log({ post });
  //   return null;
  // }

  const { _id, title, content, author, category, image, createdAt } = post;

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
        <Typography variant="h3">{title}</Typography>
        <Typography variant="subtitle2" style={{ display: "flex", gap: "1rem" }}>
          {/* <p>작성자 : {author.name}</p> */}
          <p>{createdAt.slice(0, 10)}</p>
          <p>카테고리 {category.replaceAll("/", " > ")}</p>
        </Typography>
        <ArticleOptionButton post={post} />
      </div>

      <div className="article-body">
        <div className="thumbnail" style={{ height: "500px" }}>
          <Image src={image} alt="" width={1000} height={1000} />
        </div>
        <pre style={{ whiteSpace: "break-spaces" }}>{content}</pre>
      </div>

      <div
        className="article-footer"
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <CommentCreateForm postId={_id} />
        <CommentList postId={_id} />
      </div>
    </Paper>
  );
}
