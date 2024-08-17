import { Paper, Skeleton } from "@mui/material";

export default function PopularPostListSkeleton() {
  return (
    <Paper className="latest-post-list" variant="outlined" sx={{ padding: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Skeleton variant="text" animation="wave" width={100} />
        <Skeleton variant="text" animation="wave" width={40} />
      </div>

      <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {[1, 2, 3, 4, 5].map((v: any) => (
          <Paper
            key={v}
            component={"li"}
            variant="outlined"
            sx={{ height: "100px", display: "flex", overflow: "hidden" }}
          >
            <Skeleton variant="rectangular" animation="wave" width={100} height={100} />

            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "1rem",
              }}
            >
              <Skeleton variant="text" animation="wave" sx={{ width: { xs: "30%", lg: "40%" } }} />
              <Skeleton variant="text" animation="wave" sx={{ width: { xs: "70%", lg: "80%" } }} />
            </div>
          </Paper>
        ))}
      </ul>
    </Paper>
  );
}
