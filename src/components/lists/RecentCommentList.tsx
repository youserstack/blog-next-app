import { Paper, Typography } from "@mui/material";
import { CSSProperties } from "react";
import Image from "next/image";

const fetcher = async (url: string) => {
  try {
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    // return null;  // 또는 빈 객체를 반환: return { comments: [] };
    return { comments: [] };
  }
};

export default async function RecentCommentList() {
  const { comments } = await fetcher(`${process.env.ROOT_URL}/api/comments/recent`);

  return (
    <Paper className="recent-comment-list" variant="outlined" sx={commentListStyle}>
      <Typography>최근댓글</Typography>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {comments.map((comment: any) => (
          <Paper key={comment._id} variant="outlined" sx={commentStyle}>
            <div style={imageStyle}>
              {/* <Image src={comment.author.image} alt="" width={30} height={30} /> */}
            </div>

            <div>
              {/* <Typography>{comment.author.name}</Typography> */}
              <Typography>
                {comment.content.length > 20
                  ? comment.content.slice(0, 20) + "..."
                  : comment.content}
              </Typography>
            </div>
          </Paper>
        ))}
      </div>
    </Paper>
  );
}

const commentListStyle: CSSProperties = {
  flex: "1",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const commentStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  padding: "1rem",
};

const imageStyle: CSSProperties = {
  width: "30px",
  height: "30px",
  minWidth: "30px",
  border: "2px solid green",
  borderRadius: "50%",
  overflow: "hidden",
};
