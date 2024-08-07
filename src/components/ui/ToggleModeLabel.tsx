import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import ModeNightRoundedIcon from "@mui/icons-material/ModeNightRounded";

export default function ToggleModeLabel({ mode }: { mode: string }) {
  return (
    <>
      {mode === "dark" ? <WbSunnyRoundedIcon /> : <ModeNightRoundedIcon />}
      <p style={{ marginLeft: "0.5rem" }}>{mode === "dark" ? "light" : "dark"}</p>
    </>
  );
}
