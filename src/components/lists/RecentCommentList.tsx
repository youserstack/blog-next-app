"use client";

import { Paper, Skeleton, Typography } from "@mui/material";
import { CSSProperties } from "react";
import Image from "next/image";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url, { cache: "no-cache" }).then((res) => res.json());

export default function RecentCommentList() {
  const { data } = useSWR(`${process.env.ROOT_URL}/api/comments/recent`, fetcher);

  if (!data) {
    return <Skeleton variant="rectangular" width={300} height={500} sx={{ flex: "1" }} />;
  }

  return (
    <Paper className="recent-comment-list" variant="outlined" sx={commentListStyle}>
      <Typography>최근댓글</Typography>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {data.comments?.map((comment: any) => (
          <Paper key={comment._id} variant="outlined" sx={commentStyle}>
            <div style={imageStyle}>
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

// const { setIsLoading }: any = useContext(Context);
// useEffect(() => setIsLoading(isValidating), [isValidating]);
// if (!data) return null;
