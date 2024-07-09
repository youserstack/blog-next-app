"use client";

import { useContext } from "react";
import { Context } from "@/components/context/Provider";
import { Button } from "@mui/material";
// import Button from "@mui/material/Button";

export default function SignOutButton() {
  const { signout }: any = useContext(Context);

  return (
    <Button
      className="sign-out-button"
      onClick={signout}
      sx={{ color: "white", whiteSpace: "nowrap" }}
    >
      sign out
    </Button>
  );
}
