"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { Box, Paper, useTheme } from "@mui/material";
import SigninForm from "./SigninForm";
import Oauth from "./Oauth";

export default function SigninTabForm() {
  const [value, setValue] = useState(0);
  const theme = useTheme();

  return (
    <Paper
      sx={{ width: { xs: "100%", md: "60%" } }}
      variant="elevation"
      className="로그인-탭-컴포넌트"
      elevation={7}
    >
      <Box className="탭메뉴" sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={(e, index: number) => setValue(index)} className="탭스">
          <Tab label="소셜 로그인" sx={{ flex: "1", maxWidth: "none" }} className="탭" />
          <Tab label="일반 로그인" sx={{ flex: "1", maxWidth: "none" }} />
        </Tabs>
      </Box>

      <Box
        className="데스크탑-탭-컨텐트"
        sx={{ display: { xs: "none", md: "flex" }, position: "relative" }}
      >
        <div
          style={{
            flex: "1",
            padding: "1rem",
            zIndex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setValue(0)}
        >
          <Oauth />
        </div>

        <div style={{ flex: "1", padding: "1rem", zIndex: "1" }} onClick={() => setValue(1)}>
          <SigninForm />
        </div>

        <div
          style={{
            position: "absolute",
            top: "0",
            bottom: "0",
            width: "50%",
            transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            backgroundColor: theme.palette.mode === "dark" ? "rgba(0,0,0,0.1)" : "#3f50b512",
            transform: value === 0 ? "translateX(0)" : "translateX(100%)",
            pointerEvents: "none",
            zIndex: "0",
          }}
        />
      </Box>

      <Box
        className="모바일-탭-컨텐트"
        sx={{ minHeight: "300px", display: { xs: "flex", md: "none" } }}
      >
        {value === 0 && (
          <div
            style={{
              flex: "1",
              padding: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => setValue(0)}
          >
            <Oauth />
          </div>
        )}

        {value === 1 && (
          <div style={{ flex: "1", padding: "1rem" }} onClick={() => setValue(1)}>
            <SigninForm />
          </div>
        )}
      </Box>
    </Paper>
  );
}
