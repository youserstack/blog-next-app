"use client";

import { useContext } from "react";
import { Modal } from "@mui/material";
import PostCreateModal from "@/components/modals/PostCreateModal";
import CategoryCreateModal from "@/components/modals/CategoryCreateModal";
import CategoryDeleteModal from "@/components/modals/CategoryDeleteModal";
import { ModalContext } from "../context/ModalContext";

export default function GlobalModal() {
  const { modal, closeModal } = useContext(ModalContext);

  return (
    <Modal
      open={Boolean(modal)}
      onClose={closeModal}
      disableScrollLock
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      slotProps={{ backdrop: { sx: { backgroundColor: "rgba(0,0,0,0.2)" } } }}
    >
      <>
        {modal === "post-create-modal" && <PostCreateModal />}
        {modal === "category-create-modal" && <CategoryCreateModal />}
        {modal === "category-delete-modal" && <CategoryDeleteModal />}
      </>
    </Modal>
  );
}
