"use client";

import { MouseEvent, useContext, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { Context } from "@/components/context/Provider";
import Link from "next/link";
// import { Button, Menu, MenuItem, Popper } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Popper from "@mui/material/Popper";

export default function ArticleOptionButton({ post }: any) {
  const { user }: any = useContext(Context);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  if (!user) return null;

  return (
    <div
      className="article-option-button"
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
      }}
    >
      <Button onClick={handleOpen}>
        <IoIosMore size={30} className="more-button" />
      </Button>

      <Popper open={isOpen}>
        <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
          <MenuItem>
            <Link href={`/posts/${post._id}/edit`}>수정</Link>
          </MenuItem>
        </Menu>
      </Popper>
    </div>
  );
}
