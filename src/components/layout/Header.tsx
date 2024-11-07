import Link from "next/link";
import MuiSearchBar from "../ui/MuiSearchBar";
import MuiHamburgerButton from "../ui/MuiHamburgerButton";
import Nav from "@/components/ui/Nav";

import { AppBar, Container, Toolbar, IconButton, Grid } from "@mui/material";
import { Stars as StarsIcon } from "@mui/icons-material";
import Loader from "../loaders/Loader";
import FeatureButtons from "../buttons/FeatureButtons";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Logo() {
  return (
    <Link href="/">
      <IconButton color="inherit">
        <StarsIcon />
      </IconButton>
    </Link>
  );
}

export default async function Header() {
  const { categories } = await fetcher(`${process.env.ROOT_URL}/api/categories`);

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
              <Logo />
              <Nav categories={categories} />
            </Grid>

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
              <FeatureButtons />
              <MuiHamburgerButton categories={categories} />
            </Grid>
          </Grid>
        </Toolbar>
      </Container>

      <Loader categories={categories} />
    </AppBar>
  );
}
