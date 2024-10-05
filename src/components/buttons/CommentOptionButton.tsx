"use client";

import { Button, Menu, MenuItem, Popper } from "@mui/material";
import { IoIosMore } from "react-icons/io";
import { useState } from "react";
import { mutate } from "swr";

export default function CommentOptionButton({ commentId }: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  return (
    <div>
      <Button onClick={(e) => setAnchorEl(e.currentTarget)}>
        <IoIosMore />
      </Button>

      <Popper open={isOpen}>
        <Menu anchorEl={anchorEl} open={isOpen} onClose={() => setAnchorEl(null)}>
          <MenuItem
            onClick={async (e) => {
              e.preventDefault();

              const response = await fetch(`${process.env.ROOT_URL}/api/comments/${commentId}`, {
                method: "delete",
              });
              const data = await response.json();

              console.log("삭제된 댓글", data);
              mutate("post-comments");
            }}
          >
            삭제
          </MenuItem>
        </Menu>
      </Popper>
    </div>
  );
}
