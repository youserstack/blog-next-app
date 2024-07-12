"use client";

import { AppBar, Typography } from "@mui/material";

export default function Footer() {
  return (
    <AppBar
      component={"footer"}
      sx={{
        minHeight: "50vh",
        position: "initial",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "1200px",
          border: "1px dashed white",
          margin: "auto",
          padding: "1rem",
        }}
      >
        <Typography>© 2024 youserstack. All rights reserved.</Typography>
      </section>
    </AppBar>
  );
}
