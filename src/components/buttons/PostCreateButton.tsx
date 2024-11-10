"use client";

import { useContext } from "react";
import { MdCreate } from "react-icons/md";
import { ModalContext } from "../context/ModalContext";
import { useSession } from "next-auth/react";
import { Button } from "@mui/material";

export default function PostCreateButton() {
  const { openModal } = useContext(ModalContext);
  const { data: session } = useSession();

  const handleClick = () => openModal("post-create-modal");

  return (
    <Button
      sx={{ textTransform: "none", display: { xs: "none", md: "flex" }, gap: "0.5rem" }}
      onClick={handleClick}
      disabled={!session}
    >
      <MdCreate />
      포스트 작성하기
    </Button>
  );
}
