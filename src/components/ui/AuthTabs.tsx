"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { Box, Paper } from "@mui/material";
import StandardAuth from "./StandardAuth";
import Oauth from "./Oauth";

export default function AuthTabs() {
  const [value, setValue] = useState(0);

  return (
    <Paper
      sx={{ width: { xs: "100%", sm: "70%", md: "60%", lg: "50%" } }}
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
        sx={{
          display: { xs: "none", md: "flex" },
          position: "relative",
          "& > *": {
            flex: "1",
            padding: "1rem",
            zIndex: "1",
            display: "flex",
          },
        }}
      >
        <div onClick={() => setValue(0)}>
          <Oauth />
        </div>

        <div onClick={() => setValue(1)}>
          <StandardAuth />
        </div>
      </Box>

      <Box
        className="모바일-탭-컨텐트"
        sx={{
          minHeight: "300px",
          display: { xs: "flex", md: "none" },
          "& > *": {
            flex: "1",
            padding: "1rem",
            zIndex: "1",
            display: "flex",
          },
        }}
      >
        {value === 0 && (
          <div onClick={() => setValue(0)}>
            <Oauth />
          </div>
        )}

        {value === 1 && (
          <div onClick={() => setValue(1)}>
            <StandardAuth />
          </div>
        )}
      </Box>
    </Paper>
  );
}
