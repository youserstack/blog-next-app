"use client";

import { Settings as SettingsIcon } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import ToggleModeLabel from "./ToggleModeLabel";

export default function MuiSettingsButton() {
  const { mode, toggleMode } = useContext(ThemeContext);
  const [open, setOpen] = useState<null | HTMLElement>(null);

  return (
    <>
      <IconButton color="inherit" onClick={(e) => setOpen(e.currentTarget)}>
        <SettingsIcon />
      </IconButton>

      <Menu
        open={Boolean(open)}
        onClose={() => setOpen(null)}
        anchorEl={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        id="settings-menu"
        keepMounted
        disableScrollLock // 스크롤 잠금 비활성화
      >
        <MenuItem onClick={toggleMode}>
          <ToggleModeLabel mode={mode} />
        </MenuItem>
      </Menu>
    </>
  );
}
