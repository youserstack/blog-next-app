"use client";

import { Box, Typography, useTheme } from "@mui/material";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component={"footer"}
      sx={{
        height: "500px",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        padding: "3rem",
      }}
    >
      <section
        style={{
          maxWidth: "1200px",
          border: "1px dashed white",
          margin: "auto",
          padding: "1rem",
        }}
      >
        <Typography>footer</Typography>
      </section>
    </Box>
  );
}
