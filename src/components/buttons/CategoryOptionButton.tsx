"use client";

import { Button, Menu, MenuItem, Popper } from "@mui/material";
import { MdAdd, MdCreate, MdDelete } from "react-icons/md";
import { useContext, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { useParams } from "next/navigation";
import { CategoryContext } from "../context/CategoryContext";
import { ModalContext } from "../context/ModalContext";
import { useSession } from "next-auth/react";

export default function CategoryOptionButton() {
  const params = useParams();
  const categorySegments = (params.category as string[]).map((v) => decodeURIComponent(v));
  const rootCategory = categorySegments[0];
  const { setParentCategories } = useContext(CategoryContext);
  const { openModal } = useContext(ModalContext);
  const { data: session } = useSession();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleOpenCreateCategoryModal = () => {
    setParentCategories(categorySegments);
    openModal("category-create-modal");
    handleClose();
  };
  const handleOpenCreatePostModal = () => {
    openModal("post-create-modal");
    handleClose();
  };
  const handleOpenDeleteCategoryModal = () => {
    openModal("category-delete-modal");
    handleClose();
  };

  return (
    <div
      className="category-option-button"
      style={{ position: "relative", display: "flex", alignItems: "center" }}
    >
      <Button onClick={handleOpen} disabled={!session}>
        <IoIosMore size={20} className="more" />
      </Button>

      <Popper open={Boolean(anchorEl)}>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          disableScrollLock // 스크롤 잠금 비활성화
        >
          <MenuItem onClick={handleOpenCreatePostModal} sx={{ display: "flex", gap: "0.5rem" }}>
            <MdCreate />
            포스트 작성하기
          </MenuItem>

          <MenuItem onClick={handleOpenCreateCategoryModal} sx={{ display: "flex", gap: "0.5rem" }}>
            <MdAdd />
            하위 카테고리 생성
          </MenuItem>

          <MenuItem
            onClick={handleOpenDeleteCategoryModal}
            sx={{ color: "#d73a49", display: "flex", gap: "0.5rem" }}
            disabled={rootCategory === "development" || rootCategory === "computer-science"}
          >
            <MdDelete />
            현재 카테고리 삭제
          </MenuItem>
        </Menu>
      </Popper>
    </div>
  );
}
