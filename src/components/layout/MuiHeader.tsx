"use client";

import { useContext, useEffect } from "react";
import Link from "next/link";
import { CategoryContext } from "../context/CategoryContext";
import { useSession } from "next-auth/react";
import MuiSearchBar from "../ui/MuiSearchBar";
import MuiProfileButton from "../ui/MuiProfileButton";
import MuiSettingsButton from "../ui/MuiSettingsButton";
import MuiHamburgerButton from "../ui/MuiHamburgerButton";
import Nav from "@/components/ui/Nav";

// mui modules
import { AppBar, Container, Toolbar, Box, Button, IconButton, Grid, Skeleton } from "@mui/material";
import { Stars as StarsIcon } from "@mui/icons-material";

export default function MuiHeader({ categories }: any) {
  const { status } = useSession();
  const { setCategories } = useContext(CategoryContext);

  useEffect(() => {
    setCategories(categories);
  }, [categories]);

  return (
    <AppBar position="fixed" sx={{ transition: "all 0.5s", zIndex: "100" }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ padding: "0", whiteSpace: "nowrap", position: "static" }}>
          <Grid container sx={{ margin: "auto", alignItems: "center" }}>
            <Grid
              className="헤더좌측"
              xs={3}
              md={8}
              sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <Link href="/">
                <IconButton color="inherit">
                  <StarsIcon />
                </IconButton>
              </Link>

              <Nav categories={categories} />
            </Grid>

            <Grid
              className="헤더중간"
              xs={0}
              md={0}
              // sx={{ display: { xs: "none", md: "block" } }}
            ></Grid>

            <Grid
              className="헤더우측"
              xs={9}
              md={4}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <MuiSearchBar />

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

              <MuiHamburgerButton categories={categories} />
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
