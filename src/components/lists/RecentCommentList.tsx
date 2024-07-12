import { Box, Paper, Typography } from "@mui/material";
import { Context } from "@/components/context/Provider";
import { CSSProperties, useContext, useEffect } from "react";
import Image from "next/image";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url: string) => fetch(url, { cache: "no-cache" }).then((res) => res.json());

export default function RecentCommentList() {
  const url = `${process.env.ROOT_URL}/api/comments/recent`;
  const { data, isValidating } = useSWR(url, fetcher);
  const { setIsLoading }: any = useContext(Context);

  useEffect(() => setIsLoading(isValidating), [isValidating]);

  if (!data) return null;

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
              <Typography>{comment.content}</Typography>
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
  border: "2px solid green",
  borderRadius: "50%",
  overflow: "hidden",
};
