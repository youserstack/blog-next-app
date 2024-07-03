"use client";

import { Modal } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MouseEvent, useState } from "react";

export default function BasicMenu({ label, list }: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isModalOpen = Boolean(anchorEl);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Button id="basic-button" onClick={handleClick}>
        {label}
      </Button>
      <Modal open={isModalOpen} onClose={handleClose} disableScrollLock hideBackdrop>
        <Menu id="basic-menu" anchorEl={anchorEl} open={isModalOpen} onClose={handleClose}>
          {list.map((item: any) => (
            <MenuItem onClick={handleClose}>{item.name}</MenuItem>
          ))}
        </Menu>
      </Modal>
    </>
  );
}
