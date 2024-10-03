"use client";

import CategoryOptionButton from "@/components/buttons/CategoryOptionButton";
import { useContext } from "react";
import { Box, Button } from "@mui/material";
import { MdCreate } from "react-icons/md";
import { ModalContext } from "../context/ModalContext";
import { useSession } from "next-auth/react";

export default function ControlArea() {
  const { openModal } = useContext(ModalContext);
  const { data: session } = useSession();

  return (
    <Box
      className="control-area"
      sx={{ flex: "1", display: "flex", gap: "1rem", justifyContent: "flex-end" }}
    >
      {session && (
        <Button
          sx={{ textTransform: "none", display: "flex", gap: "0.5rem" }}
          onClick={() => openModal("post-create-modal")}
        >
          <MdCreate />
          포스트 작성하기
        </Button>
      )}

      <CategoryOptionButton />
    </Box>
  );
}
