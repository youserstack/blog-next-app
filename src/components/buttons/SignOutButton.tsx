"use client";

import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Button } from "@mui/material";

export default function SignOutButton() {
  const { signout } = useContext(AuthContext);

  return (
    <Button onClick={signout} color="inherit">
      로그아웃
    </Button>
  );
}
