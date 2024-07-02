import CircularProgress from "@mui/material/CircularProgress";
import "./loading.scss";

export default function Loading() {
  return (
    <div className="loading">
      <CircularProgress />
    </div>
  );
}
