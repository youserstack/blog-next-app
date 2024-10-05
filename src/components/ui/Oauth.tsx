import { Button } from "@mui/material";
import { signIn } from "next-auth/react";
import { SiNaver } from "react-icons/si";

export default function Oauth() {
  return (
    <Button
      variant="contained"
      onClick={async () => {
        await signIn("naver", { redirect: true, callbackUrl: "/" });
      }}
      sx={{ display: "flex", gap: "0.5rem" }}
    >
      <SiNaver />
      네이버로 로그인
    </Button>
  );
}
