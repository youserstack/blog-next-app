import { Skeleton } from "@mui/material";

export default async function ImageSkeleton() {
  return <Skeleton variant="rectangular" width={"100%"} height={"100%"} animation="wave" />;
}
