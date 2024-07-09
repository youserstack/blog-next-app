"use client";

// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Popper from "@mui/material/Popper";
import { IoIosMore } from "react-icons/io";
import { MouseEvent, useContext, useState } from "react";
import { Context } from "@/components/context/Provider";
import { useParams } from "next/navigation";
import { Button, Menu, MenuItem, Popper } from "@mui/material";

export default function CategoryOptionButton() {
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
          <MenuItem onClick={handleOpenCreateCategoryModal}>create a new category</MenuItem>
          <MenuItem onClick={handleOpenCreatePostModal}>create a post</MenuItem>
          <MenuItem onClick={handleOpenDeleteCategoryModal}>delete this category</MenuItem>
        </Menu>
      </Popper>
    </div>
  );
}
