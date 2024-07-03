"use client";

import { Context } from "@/components/context/Provider";
import { useContext } from "react";
import PostCreateModal from "@/components/modals/PostCreateModal";
import CategoryCreateModal from "@/components/modals/CategoryCreateModal";
import CategoryDeleteModal from "@/components/modals/CategoryDeleteModal";
import { Modal } from "@mui/material";

export default function GlobalModal() {
  const { open, handleClose, currentModal }: any = useContext(Context);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      disableScrollLock
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "999999",
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        },
      }}
    >
      <>
        {currentModal === "post-create-modal" && <PostCreateModal />}
        {currentModal === "category-create-modal" && <CategoryCreateModal />}
        {currentModal === "category-delete-modal" && <CategoryDeleteModal />}
      </>
    </Modal>
    // <div className="modal-layer" onClick={() => setCurrentModal("")}>
    // </div>
  );
}
