"use client";

import { Button, Menu, MenuItem, Modal } from "@mui/material";
import { IoIosMore } from "react-icons/io";
import { MouseEvent, useContext, useState } from "react";
import { Context } from "@/components/context/Provider";
import "./CategoryOptionButton.scss";

export default function CategoryOptionButton({
  categorySegments,
}: {
  categorySegments: string[] | null;
}) {
  const { setParentCategories, openModal }: any = useContext(Context);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isModalOpen = Boolean(anchorEl);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div className="category-option-button">
      <Button id="basic-button" onClick={handleClick}>
        <IoIosMore className="more" />
      </Button>

      <Modal open={isModalOpen} onClose={handleClose} disableScrollLock hideBackdrop>
        <Menu id="basic-menu" anchorEl={anchorEl} open={isModalOpen} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              setParentCategories(categorySegments);
              openModal("category-create-modal");
              handleClose();
            }}
          >
            create a new category
          </MenuItem>
          <MenuItem
            onClick={() => {
              openModal("post-create-modal");
              handleClose();
            }}
          >
            create a post
          </MenuItem>
          <MenuItem
            onClick={() => {
              openModal("category-delete-modal");
              handleClose();
            }}
          >
            delete this category
          </MenuItem>
        </Menu>
      </Modal>
    </div>
  );
}
