"use client";

import { Context } from "@/components/context/Provider";
import { useContext } from "react";
import { Modal } from "@mui/material";
import PostCreateModal from "@/components/modals/PostCreateModal";
import CategoryCreateModal from "@/components/modals/CategoryCreateModal";
import CategoryDeleteModal from "@/components/modals/CategoryDeleteModal";

export default function GlobalModal() {
  const { modal, closeModal }: any = useContext(Context);

  return (
    <Modal
      open={modal}
      onClose={closeModal}
      disableScrollLock
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "999999",
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
