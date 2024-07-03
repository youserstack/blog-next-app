"use client";

import CategoryOptionButton from "@/components/buttons/CategoryOptionButton";
import { Context } from "@/components/context/Provider";
import { useContext } from "react";
import { Button } from "@mui/material";
import "./ControlArea.scss";

export default function ControlArea({ categorySegments }: { categorySegments: string[] }) {
  const { openModal }: any = useContext(Context);

  return (
    <div className="control-area">
      <Button sx={{ textTransform: "none" }} onClick={() => openModal("post-create-modal")}>
        create a post
      </Button>
      <CategoryOptionButton categorySegments={categorySegments} />
    </div>
  );
}
