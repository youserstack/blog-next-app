"use client";

import {
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
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
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import ToggleModeLabel from "./ToggleModeLabel";
import { ThemeContext } from "../context/ThemeContext";

export default function MuiHamburgerButton({ categories }: any) {
  const { data: session, status } = useSession();
  const { mode, toggleMode } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        className="햄버거버튼(모바일)"
        size="large"
        color="inherit"
        onClick={() => setOpen(true)}
        sx={{ display: { xs: "flex", md: "none" } }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer open={open} onClose={() => setOpen(false)} anchor="right" disableScrollLock>
        <Box role="presentation" onClick={() => setOpen(false)} sx={{ width: "50vw" }}>
          <List>
            {status === "authenticated" ? (
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
            {session?.user && (
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
        </Box>
      </Drawer>
    </>
  );
}
