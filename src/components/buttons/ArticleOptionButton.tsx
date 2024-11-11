"use client";

import { Button, Menu, MenuItem, Popper } from "@mui/material";
import { useState } from "react";
import { IoIosMore } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ArticleOptionButton({ post }: any) {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Button className="게시글_옵션버튼" onClick={handleOpen} disabled={!session}>
        <IoIosMore size={30} className="more-button" />
      </Button>

      <Popper open={isOpen}>
        <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
          <MenuItem>
            <Link
              href={`/posts/${post._id}/edit`}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <MdEdit />
              수정
            </Link>
          </MenuItem>
        </Menu>
      </Popper>
    </>
  );
}
