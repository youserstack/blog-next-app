"use client";

import { AccountCircle as AccountCircleIcon, Logout as LogoutIcon } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuList,
  Slide,
  useTheme,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import ToggleModeLabel from "./ToggleModeLabel";
import { ThemeContext } from "../context/ThemeContext";
import { Squeeze as Hamburger } from "hamburger-react";
import { Context } from "../context/Context";

export default function MuiHamburgerButton({ categories }: any) {
  const { data: session } = useSession();
  const { mode, toggleMode } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const { headerHidden }: any = useContext(Context); // 헤더 숨김 상태 가져오기

  // 헤더가 숨겨지면 메뉴도 자동으로 닫기
  useEffect(() => {
    if (headerHidden) {
      setOpen(false);
    }
  }, [headerHidden]);

  return (
    <Box sx={{ display: { sx: "block", md: "none" } }}>
      <IconButton
        className="햄버거버튼"
        size="large"
        color="inherit"
        onClick={() => setOpen(!open)}
      >
        <Hamburger toggled={open} size={20} rounded />
      </IconButton>

      <Box
        component={"div"}
        onClick={() => setOpen(false)}
        sx={{
          position: "absolute",
          // inset: "0",
          // top: "100%",
          left: "0",
          right: "0",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.7)",
          // backgroundColor: "green",
          // opacity: open ? "100%" : "0",
          display: open ? "block" : "none",
        }}
      ></Box>

      <Box
        sx={{
          position: "absolute",
          left: "0",
          right: "0",
          overflow: "hidden",
        }}
      >
        <MenuList
          sx={{
            transform: open ? "translateY(0)" : "translateY(-100%)",
            transition: "all 0.5s",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}
        >
          <List>
            {session ? (
              <ListItem className="계정" disablePadding>
                <Link href={"/auth/account"} style={{ width: "100%" }}>
                  <ListItemButton>
                    <ListItemIcon>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={"계정"} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ) : (
              <ListItem className="로그인" disablePadding>
                <Link href={"/auth/signin"} style={{ width: "100%" }}>
                  <ListItemButton>
                    <ListItemIcon>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={"로그인"} />
                  </ListItemButton>
                </Link>
              </ListItem>
            )}
          </List>
          <Divider />
          <List>
            {categories.map((category: any) => (
              <ListItem key={`/categories/${category.name}`} disablePadding>
                <Link href={`/categories/${category.name}`} style={{ width: "100%" }}>
                  <ListItemButton>
                    <ListItemText>{category.name}</ListItemText>
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>

          <Divider />
          <List>
            {session && (
              <ListItem
                className="로그아웃"
                disablePadding
                onClick={async () => await signOut({ callbackUrl: "/" })}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary={"로그아웃"} />
                </ListItemButton>
              </ListItem>
            )}

            <ListItem className="토글모드" disablePadding>
              <ListItemButton
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMode();
                }}
              >
                <ToggleModeLabel mode={mode} />
              </ListItemButton>
            </ListItem>
          </List>
        </MenuList>
      </Box>
    </Box>
  );
}
