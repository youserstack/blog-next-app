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
    try {
      const url = `${process.env.ROOT_URL}/api/comments?postId=${postId}`;
      const accessToken = localStorage.getItem("accessToken") as string;
      const result = await deleteComment(commentId, accessToken);

      if (result.error?.code === "ERR_JWT_EXPIRED") {
        const newAccessToken = await refreshAccessToken();
        const result = await deleteComment(commentId, newAccessToken);

        if (result.error) throw new Error("토큰갱신 후 댓글삭제요청 실패");
        console.log("토큰갱신 > 재요청 > 댓글을 삭제하였습니다.");
        const { deletedComment } = result;
        console.log({ deletedComment });
        mutate(url);
        return;
      }

      console.log("댓글을 삭제하였습니다.");
      const { deletedComment } = result;
      console.log({ deletedComment });
      mutate(url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button onClick={(e) => setAnchorEl(e.currentTarget)}>
        <IoIosMore />
      </Button>

      <Popper open={isOpen}>
        <Menu anchorEl={anchorEl} open={isOpen} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={handleDeleteComment}>삭제</MenuItem>
        </Menu>
      </Popper>
    </div>
  );
}
