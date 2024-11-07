"use client";

import { Box, Button, Skeleton } from "@mui/material";
import MuiProfileButton from "../ui/MuiProfileButton";
import MuiSettingsButton from "../ui/MuiSettingsButton";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function FeatureButtons() {
  const { status } = useSession();

  return (
    <Box
      className="기능버튼"
      component={"div"}
      sx={{ display: { xs: "none", md: "flex" }, whiteSpace: "nowrap" }}
    >
      {status === "loading" ? (
        <Skeleton variant="circular" width={40} height={40} />
      ) : status === "authenticated" ? (
        <MuiProfileButton />
      ) : status === "unauthenticated" ? (
        <>
          <Link href="/auth/signin" style={{ display: "flex" }}>
            <Button size="small" color="inherit">
              Sign in
            </Button>
          </Link>
          <Link href="/auth/signup" style={{ display: "flex" }}>
            <Button size="small" color="inherit">
              Sign up
            </Button>
          </Link>
        </>
      ) : null}

      <MuiSettingsButton />
    </Box>
  );
}
