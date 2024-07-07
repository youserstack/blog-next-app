"use client";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Popper from "@mui/material/Popper";
import { IoIosMore } from "react-icons/io";
import { MouseEvent, useContext, useState } from "react";
import { Context } from "@/components/context/Provider";

export default function CategoryOptionButton({
  categorySegments,
}: {
  categorySegments: string[] | null;
}) {
  const { setParentCategories, openModal }: any = useContext(Context);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isModalOpen = Boolean(anchorEl);

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div
      className="category-option-button"
      style={{ position: "relative", display: "flex", alignItems: "center" }}
    >
      <Button onClick={handleOpen}>
        <IoIosMore className="more" />
      </Button>

      <Popper open={isModalOpen}>
        <Menu anchorEl={anchorEl} open={isModalOpen} onClose={handleClose}>
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
      </Popper>
    </div>
  );
}
