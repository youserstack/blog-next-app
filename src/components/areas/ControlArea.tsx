"use client";

import CategoryOptionButton from "@/components/buttons/CategoryOptionButton";
import { Context } from "@/components/context/Provider";
import { useContext } from "react";
import { Box, Button } from "@mui/material";

export default function ControlArea() {
  const { openModal }: any = useContext(Context);

  return (
    <Box className="control-area" sx={{ display: "flex", gap: "1rem" }}>
      <Button sx={{ textTransform: "none" }} onClick={() => openModal("post-create-modal")}>
        create a post
      </Button>
      <CategoryOptionButton />
    </Box>
  );
}
