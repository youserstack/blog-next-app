"use client";

import CategoryOptionButton from "@/components/buttons/CategoryOptionButton";
import "./ControlArea.scss";
import { Button, Modal } from "@mui/material";
import { useContext, useState } from "react";
import { Context } from "@/components/context/Provider";
import PostCreateModal from "@/components/modals/PostCreateModal";

export default function ControlArea({ categorySegments }: { categorySegments: string[] }) {
  const { handleOpen, setCurrentModal }: any = useContext(Context);

  const handleClick = () => {
    setCurrentModal("post-create-modal");
    handleOpen();
  };

  return (
    <div className="control-area">
      <Button sx={{ textTransform: "none" }} onClick={handleClick}>
        create a post
      </Button>

      {/* <Modal
        open={open}
        onClose={handleClose}
        disableScrollLock
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(0,0,0,0.2)",
            },
          },
        }}
      >
        <PostCreateModal />
      </Modal> */}

      <CategoryOptionButton categorySegments={categorySegments} />
    </div>
  );
}
