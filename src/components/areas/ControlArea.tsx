"use client";

import CategoryOptionButton from "@/components/buttons/CategoryOptionButton";
import { Context } from "@/components/context/Provider";
import { useContext } from "react";
import { Box, Button } from "@mui/material";
import { MdCreate } from "react-icons/md";

export default function ControlArea() {
  const { openModal }: any = useContext(Context);

  return (
    <Box className="control-area" sx={{ display: "flex", gap: "1rem" }}>
      <Button
        sx={{
          textTransform: "none",
          display: "flex",
          gap: "0.5rem",
        }}
        onClick={() => openModal("post-create-modal")}
      >
        <MdCreate />
        포스트 작성하기
      </Button>
      <CategoryOptionButton />
    </Box>
  );
}
