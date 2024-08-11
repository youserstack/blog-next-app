import { Paper, Skeleton } from "@mui/material";

export default function RecentCommentListSkeleton() {
  return (
    <Paper className="recent-comment-list" variant="outlined" sx={{ padding: "1rem" }}>
      <Skeleton variant="text" animation="wave" width={100} sx={{ marginBottom: "1rem" }} />

      <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {[1, 2, 3, 4, 5].map((v: any) => (
          <Paper
            component="li"
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
