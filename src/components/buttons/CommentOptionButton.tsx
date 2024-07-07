"use client";

import { MouseEvent, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { mutate } from "swr";
import { refreshAccessToken } from "@/lib/utils/auth";
import { deleteComment } from "@/lib/utils/fetchers/deleters";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Popper from "@mui/material/Popper";

export default function CommentOptionButton({ commentId, postId }: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleDeleteComment = async (e: MouseEvent<HTMLLIElement>) => {
    // console.log({ comment });
    e.preventDefault();
    try {
      const url = `${process.env.ROOT_URL}/api/comments?postId=${postId}`;
      const accessToken = localStorage.getItem("accessToken") as string;
      const result = await deleteComment(commentId, accessToken);

      // 토큰만료시 > 토큰갱신 > 재요청
      if (result.error?.code === "ERR_JWT_EXPIRED") {
        const newAccessToken = await refreshAccessToken();
        const result = await deleteComment(commentId, newAccessToken);

        // branch
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
    <div className="comment-option-button">
      <Button onClick={handleOpen}>
        <IoIosMore className="more" />
      </Button>

      <Popper open={isOpen}>
        <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
          <MenuItem onClick={handleDeleteComment}>삭제</MenuItem>
        </Menu>
      </Popper>
    </div>
  );
}
