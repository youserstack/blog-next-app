import { Paper, Skeleton } from "@mui/material";
import { CSSProperties } from "react";

export default function LatestPostListSkeleton() {
  return (
    <Paper className="latest-post-list" variant="outlined" sx={latestPostList}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Skeleton variant="text" animation="wave" width={100} height={32} />
        <Skeleton variant="text" animation="wave" width={40} height={32} />
      </div>

      {[1, 2, 3, 4, 5].map((v: any) => (
        <Paper
          key={v}
          variant="outlined"
          sx={{ height: "100px", display: "flex", overflow: "hidden" }}
        >
          <Skeleton variant="rectangular" animation="wave" width={100} height={100} />

          <div className="content" style={contentStyle}>
            <Skeleton variant="text" animation="wave" width={300} height={32} />
            <Skeleton variant="text" animation="wave" width={250} height={16} />
          </div>
        </Paper>
      ))}
    </Paper>
  );
}

const latestPostList: CSSProperties = {
  flex: "1",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  fontSize: "12px",
};

const contentStyle: CSSProperties = {
  flex: "1",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};
