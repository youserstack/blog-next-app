// import CircularProgress from "@mui/material/CircularProgress";
import { CircularProgress } from "@mui/material";
import "./loading.scss";

export default function Loading() {
  return (
    <div className="loading">
      <CircularProgress />
    </div>
  );
}
