import { Paper, Skeleton } from "@mui/material";
import { CSSProperties } from "react";

export default function RecentCommentListSkeleton() {
  return (
    <Paper className="recent-comment-list" variant="outlined" sx={commentListStyle}>
      <Skeleton variant="text" animation="wave" width={100} height={32} />

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {[1, 2, 3, 4, 5].map((v: any) => (
          <Paper key={v} variant="outlined" sx={commentStyle}>
            <Skeleton variant="circular" animation="wave" width={30} height={30} />

            <div>
              <Skeleton variant="text" animation="wave" width={40} height={24} />
              <Skeleton variant="text" animation="wave" width={150} height={24} />
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
