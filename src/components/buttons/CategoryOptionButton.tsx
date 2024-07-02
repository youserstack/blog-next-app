"use client";

import { Modal } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoIosMore } from "react-icons/io";
import { MouseEvent, useContext, useState } from "react";
import { Context } from "@/components/context/Provider";
import "./CategoryOptionButton.scss";

export default function CategoryOptionButton({
  categorySegments,
}: {
  categorySegments: string[] | null;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const { setParentCategories, setCurrentModal }: any = useContext(Context);
  const handleClickCreate = () => {
    setParentCategories(categorySegments);
    setCurrentModal("category-create-modal");
    handleClose();
  };
  const handleClickCreatePost = () => {
    setCurrentModal("post-create-modal");
    handleClose();
  };
  const handleClickDelete = () => {
    setCurrentModal("category-delete-modal");
    handleClose();
  };

  return (
    <div className="category-option-button">
      <Button id="basic-button" onClick={handleClick}>
        <IoIosMore className="more" />
      </Button>

      <Modal open={open} onClose={handleClose} disableScrollLock hideBackdrop>
        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClickCreate}>create a new category</MenuItem>
          <MenuItem onClick={handleClickCreatePost}>create a post</MenuItem>
          <MenuItem onClick={handleClickDelete} disabled>
            delete this category
          </MenuItem>
        </Menu>
      </Modal>
    </div>
  );
}
