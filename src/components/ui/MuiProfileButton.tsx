"use client";

import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function MuiProfileButton() {
  const { data: session } = useSession();
  const [open, setOpen] = useState<null | HTMLElement>(null);

  return (
    <>
      <IconButton color="inherit" onClick={(e) => setOpen(e.currentTarget)}>
        {session?.user?.image ? <Avatar src={session.user.image} alt="" /> : <AccountCircleIcon />}
      </IconButton>

      <Menu
        // 기본설정
        open={Boolean(open)}
        onClose={() => setOpen(null)}
        // 위치설정
        anchorEl={open} // 앵커(버튼엘리먼트)
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // 앵커 오리진(기준점)
        transformOrigin={{ vertical: "top", horizontal: "right" }} // 메뉴엘리먼트 트랜스폼애니메이션 오리진(기준점)
        // 기타설정
        id="profile-menu"
        keepMounted // 성능 최적화 (엘리먼트를 돔에 유지시킨다)
        disableScrollLock // 스크롤 잠금 비활성화
      >
        <MenuItem>계정</MenuItem>
        <MenuItem onClick={async () => await signOut({ callbackUrl: "/" })}>로그아웃</MenuItem>
      </Menu>
    </>
  );
}
