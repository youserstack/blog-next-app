"use client";

import { AppBar, Typography } from "@mui/material";
import { SiGithub, SiSlack } from "react-icons/si";
import Link from "next/link";

export default function Footer() {
  return (
    <AppBar component="footer" sx={{ height: "300px", minHeight: "300px", position: "static" }}>
      <section
        style={{
          width: "100%",
          height: "90%",
          maxWidth: "1200px",
          margin: "auto",
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography>youserstack © 2024 all right reserved.</Typography>

        <ul style={{ display: "flex", gap: "1rem" }}>
          <li>
            <Link href={"https://github.com/youserstack"} target="_blank">
              <SiGithub />
            </Link>
          </li>
          <li>
            <SiSlack />
          </li>
        </ul>
      </section>
    </AppBar>
  );
}
