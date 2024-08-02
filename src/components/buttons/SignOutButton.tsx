"use client";

import { useContext } from "react";
import { Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

export default function SignOutButton() {
  const { signout } = useContext(AuthContext);

  return (
    <Button onClick={signout} sx={{ color: "white", whiteSpace: "nowrap" }}>
      로그아웃
    </Button>
  );
}
