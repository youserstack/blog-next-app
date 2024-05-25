"use client";

import CategoryCreateModal from "@/components/CategoryCreateModal";
import PostCreateModal from "@/components/post/PostCreateModal";
import { Context } from "@/components/Provider";
import { useContext } from "react";
import "../../styles/ModalLayer.scss";

export default function ModalLayer() {
  const { currentModal, setCurrentModal }: any = useContext(Context);

  if (!currentModal) return null;

  return (
    <div className="modal-layer" onClick={() => setCurrentModal("")}>
      {currentModal === "post-create-modal" && <PostCreateModal />}
      {currentModal === "category-create-modal" && <CategoryCreateModal />}
    </div>
  );
}
