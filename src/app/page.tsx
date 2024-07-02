import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import "./page.scss";

import type { Metadata } from "next";
import BasicMenu from "@/components/ui/BasicMenu";

export const metadata: Metadata = {
  description: "...",
};

export default function Home() {
  return (
    <main className="home">
      <section>
        <Container maxWidth="lg">
          <Box className="test">
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              Material UI - Next.js App Router example in TypeScript
            </Typography>
            {/* <Link href="/about" color="secondary" component={NextLink}>
              Go to the about page
            </Link>
            <ProTip />
            <Copyright /> */}
            <BasicMenu list={[{ name: "sdfsdfsfd" }, { name: "345345" }]} />
          </Box>
        </Container>
      </section>
      <section></section>
    </main>
  );
}
