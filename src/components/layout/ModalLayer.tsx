"use client";

import { Context } from "@/components/context/Provider";
import { useContext } from "react";
import CategoryCreateModal from "@/components/category/CategoryCreateModal";
import PostCreateModal from "@/components/post/PostCreateModal";
import CategoryDeleteModal from "@/components/category/CategoryDeleteModal";
import "../../styles/ModalLayer.scss";

export default function ModalLayer() {
  const { currentModal, setCurrentModal }: any = useContext(Context);

  if (!currentModal) return null;

  return (
    <div className="modal-layer" onClick={() => setCurrentModal("")}>
      {currentModal === "post-create-modal" && <PostCreateModal />}
      {currentModal === "category-create-modal" && <CategoryCreateModal />}
      {currentModal === "category-delete-modal" && <CategoryDeleteModal />}
    </div>
  );
}
