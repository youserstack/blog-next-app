import { Card } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
// import Card from "@mui/material/Card";

export default function Post({ post }: any) {
  return (
    <Card
      component={"li"}
      className="post"
      sx={{
        overflow: "hidden",
        "&:hover .title": {
          color: "var(--hoverColor-blue)",
        },
      }}
      variant="outlined"
    >
      <Link href={`/posts/${post._id}`} style={{ height: "100%", display: "flex" }}>
        <div className="details" style={{ flex: "3", padding: "1rem" }}>
          <div className="details-header" style={{ display: "flex", gap: "1rem" }}>
            <p className="author">작성자({post.author?.name})</p>
            <p>{post.createdAt.slice(0, 10)}</p>
            <p>조회수 : {post.views}</p>
            <p>카테고리 {post.category.replaceAll("/", " > ")}</p>
          </div>
          <div className="content">
            <h3 className="title">{post.title}</h3>
            <p>{post.content}</p>
          </div>
        </div>
        <div className="thumbnail" style={{ flex: "1" }}>
          {post.image ? (
            <Image src={post.image} alt="sdf" width={200} height={200} />
          ) : (
            <h1>No Image</h1>
          )}
        </div>
      </Link>
    </Card>
  );
}
