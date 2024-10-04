"use client";

import { Button, Menu, MenuItem, Popper } from "@mui/material";
import { deleteComment } from "@/lib/utils/deleters";
import { refreshAccessToken } from "@/lib/utils/auth";
import { IoIosMore } from "react-icons/io";
import { useState } from "react";
import { mutate } from "swr";

export default function CommentOptionButton({ commentId, postId }: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleDeleteComment = async (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    const url = `${process.env.ROOT_URL}/api/comments?postId=${postId}`;
    mutate(url);
  };

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
            }}
          >
            삭제
          </MenuItem>
        </Menu>
      </Popper>
    </div>
  );
}
