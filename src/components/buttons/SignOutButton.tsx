"use client";

import { useContext } from "react";
import { Context } from "@/components/context/Provider";
import { Button } from "@mui/material";
// import Button from "@mui/material/Button";

export default function SignOutButton() {
  const { signout }: any = useContext(Context);

  return (
    <Button onClick={signout} sx={{ color: "white", whiteSpace: "nowrap" }}>
      로그아웃
    </Button>
  );
}
