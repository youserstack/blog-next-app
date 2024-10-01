import { Paper, Typography } from "@mui/material";
import Image from "next/image";

const fetcher = (url: string) => fetch(url, { next: { revalidate: 60 } }).then((res) => res.json());

export default async function RecentCommentList() {
  const { comments } = await fetcher(`${process.env.ROOT_URL}/api/home/recent-comments`);

  return (
    <Paper className="recent-comment-list" variant="outlined" sx={{ padding: "1rem" }}>
      <Typography sx={{ marginBottom: "1rem" }}>최근댓글</Typography>

      <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {comments.map((comment: any) => (
          <Paper
            key={comment._id}
            variant="outlined"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem",
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                minWidth: "30px",
                border: "2px solid green",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <Image src={comment.author.image} alt="" width={30} height={30} />
            </div>

            <div>
              <Typography>{comment.author.name}</Typography>
              <Typography>
                {comment.content.length > 20
                  ? comment.content.slice(0, 20) + "..."
                  : comment.content}
              </Typography>
            </div>
          </Paper>
        ))}
      </ul>
    </Paper>
  );
}
