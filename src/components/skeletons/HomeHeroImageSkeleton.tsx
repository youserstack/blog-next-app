import { Skeleton } from "@mui/material";

export default function HomeHeroImageSkeleton() {
  return (
    <div style={{ flex: "3" }}>
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={"100%"}
        animation="wave"
        sx={{ minWidth: "500px", minHeight: "500px", flex: "3" }}
      />
    </div>
  );
}
