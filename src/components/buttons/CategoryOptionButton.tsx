"use client";

import { IoIosMore } from "react-icons/io";
import { MouseEvent, useContext, useState } from "react";
import { Context } from "@/components/context/Provider";
import { useParams } from "next/navigation";
import { Button, Menu, MenuItem, Popper, useTheme } from "@mui/material";
import { MdAdd, MdCreate, MdDelete } from "react-icons/md";

export default function CategoryOptionButton() {
  const theme = useTheme();
  const params = useParams();
  const categorySegments = (params.category as string[]).map((v: any) => decodeURIComponent(v));
  const { setParentCategories, openModal }: any = useContext(Context);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
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
      <Button onClick={handleOpen}>
        <IoIosMore size={20} className="more" />
      </Button>

      <Popper open={isOpen}>
        <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
          <MenuItem
            onClick={handleOpenCreatePostModal}
            sx={{
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <MdCreate />
            포스트 작성하기
          </MenuItem>
          <MenuItem
            onClick={handleOpenCreateCategoryModal}
            sx={{
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <MdAdd />
            하위 카테고리 생성
          </MenuItem>
          <MenuItem
            onClick={handleOpenDeleteCategoryModal}
            sx={{
              color: "#d73a49",
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <MdDelete />
            현재 카테고리 삭제
          </MenuItem>
        </Menu>
      </Popper>
    </div>
  );
}
