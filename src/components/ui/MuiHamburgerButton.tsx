"use client";

import { AccountCircle as AccountCircleIcon, Logout as LogoutIcon } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuList,
  useTheme,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import ToggleModeLabel from "./ToggleModeLabel";
import { ThemeContext } from "../context/ThemeContext";
import { Squeeze as Hamburger } from "hamburger-react";
import ExpandableNav from "./ExpandableNav";
import { usePathname } from "next/navigation";

export default function MuiHamburgerButton({ categories }: any) {
  const { data: session } = useSession();
  const { mode, toggleMode } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Box sx={{ display: { md: "none" } }}>
      <IconButton
        className="햄버거버튼"
        size="large"
        color="inherit"
        onClick={() => setOpen(!open)}
      >
        <Hamburger toggled={open} size={20} rounded />
      </IconButton>

      <Box
        className="백드랍"
        onClick={() => setOpen(false)}
        sx={{
          position: "absolute",
          top: "100%",
          left: "0",
          right: "0",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.7)",
          transition: "all 0.7s",
          display: open ? "block" : "none",
          // opacity: open ? "100%" : "0",
        }}
      ></Box>

      <Box
        className="레이어"
        sx={{
          position: "absolute",
          top: "100%",
          left: "0",
          right: "0",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <MenuList
          sx={{
            transform: open ? "translateY(0)" : "translateY(-100%)",
            transition: "all 0.5s",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            maxHeight: "80vh",
            overflowY: "auto", // 스크롤 가능 설정
            pointerEvents: "initial",
            scrollbarWidth: "none",
            // "&::-webkit-scrollbar": { display: "none" },
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
          <ExpandableNav categories={categories} />
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
