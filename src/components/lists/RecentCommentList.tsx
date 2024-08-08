"use client";

import { Paper, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, { next: { revalidate: 600 } }).then((res) => res.json());

export default function RecentCommentList() {
  const url = `${process.env.ROOT_URL}/api/comments/recent`;
  const { isLoading, data } = useSWR(url, fetcher);

  if (isLoading || !data) {
    return (
      <Paper className="recent-comment-list" variant="outlined" sx={{ padding: "1rem" }}>
        <Skeleton variant="text" animation="wave" width={100} sx={{ marginBottom: "1rem" }} />

        <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[1, 2, 3, 4, 5].map((v: any) => (
            <Paper
              component={"li"}
              key={v}
              variant="outlined"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem",
              }}
            >
              <Skeleton variant="circular" animation="wave" width={30} height={30} />

              <div>
                <Skeleton variant="text" animation="wave" width={40} height={"1rem"} />
                <Skeleton variant="text" animation="wave" width={150} height={"0.7rem"} />
              </div>
            </Paper>
          ))}
        </ul>
      </Paper>
    );
  }

  return (
    <Paper className="recent-comment-list" variant="outlined" sx={{ padding: "1rem" }}>
      <Typography sx={{ marginBottom: "1rem" }}>최근댓글</Typography>

      <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {data.comments.map((comment: any) => (
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
