"use client";

// modules
import { MouseEvent, useContext, useEffect, useState } from "react";
import Link from "next/link";
// my modules
import { ThemeContext } from "@/components/context/ThemeContext";
import ToggleModeLabel from "@/components/ui/ToggleModeLabel";
import Nav from "@/components/ui/Nav";
// mui modules
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
  InputBase,
  Grid,
  Autocomplete,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
  ListItemText,
} from "@mui/material";
import {
  Stars as StarsIcon,
  AccountCircle as AccountCircleIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Logout,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import { CategoryContext } from "../context/CategoryContext";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function MuiAppBar({ categories }: any) {
  const router = useRouter();

  // 컨텍스트
  const { user, signout } = useContext(AuthContext);
  const { setCategories } = useContext(CategoryContext);
  const { mode, toggleMode } = useContext(ThemeContext);

  // 검색
  const [isAutocompleteOpened, setIsAutocompleteOpened] = useState(false);
  const search = (searchWords: string) => router.push(`/search?searchWords=${searchWords}`);
  const handleOpenAutocomplete = () => setIsAutocompleteOpened(true);
  const handleCloseAutocomplete = () => setIsAutocompleteOpened(false);

  // 메뉴
  const [profileMenu, setProfileMenu] = useState<null | HTMLElement>(null);
  const [settingsMenu, setSettingsMenu] = useState<null | HTMLElement>(null);
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const handleOpenProfileMenu = (e: MouseEvent<HTMLElement>) => setProfileMenu(e.currentTarget);
  const handleOpenSettingsMenu = (e: MouseEvent<HTMLElement>) => setSettingsMenu(e.currentTarget);
  const handleOpenDrawer = () => setIsDrawerOpened(true);
  const handleCloseProfileMenu = () => setProfileMenu(null);
  const handleCloseSettingsMenu = () => setSettingsMenu(null);
  const handleCloseDrawer = () => setIsDrawerOpened(false);
  const renderProfileMenu = (
    <Menu
      // 기본설정
      open={Boolean(profileMenu)}
      onClose={handleCloseProfileMenu}
      // 위치설정
      anchorEl={profileMenu} // 앵커(버튼엘리먼트)
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // 앵커 오리진(기준점)
      transformOrigin={{ vertical: "top", horizontal: "right" }} // 메뉴엘리먼트 트랜스폼애니메이션 오리진(기준점)
      // 기타설정
      id="profile-menu"
      keepMounted // 성능 최적화 (엘리먼트를 돔에 유지시킨다)
      disableScrollLock // 스크롤 잠금 비활성화
    >
      <MenuItem>Profile</MenuItem>
      <MenuItem>My account</MenuItem>
      <MenuItem
        onClick={async () => {
          signout();
          await signOut();
          handleCloseProfileMenu();
        }}
      >
        로그아웃
      </MenuItem>
    </Menu>
  );
  const renderSettingsMenu = (
    <Menu
      open={Boolean(settingsMenu)}
      onClose={handleCloseSettingsMenu}
      anchorEl={settingsMenu}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      id="settings-menu"
      keepMounted
      disableScrollLock // 스크롤 잠금 비활성화
    >
      <MenuItem onClick={toggleMode}>
        <ToggleModeLabel mode={mode} />
      </MenuItem>
    </Menu>
  );
  const renderDrawer = (
    <Drawer open={isDrawerOpened} onClose={handleCloseDrawer} anchor="right" disableScrollLock>
      <Box role="presentation" onClick={handleCloseDrawer} sx={{ width: "50vw" }}>
        <List>
          {user && (
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
          )}

          {!user && (
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
          {user && (
            <ListItem
              className="로그아웃"
              disablePadding
              onClick={async () => {
                signout();
                await signOut();
                handleCloseProfileMenu();
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <Logout />
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
  );

  const [previousScrollY, setPreviousScrollY] = useState(0);

  const handleScroll = (e: any) => {
    const header = document.querySelector("header") as HTMLHeadElement;
    if (!header) return console.log("헤더가 없어서 스크롤이벤트가 동작하지 않고 있습니다.");

    const currentScrollY = window.scrollY;

    if (window.scrollY <= 200) {
      // console.log('scroll top area')
      header.style.transform = "translateY(0)";
    } else {
      if (currentScrollY > previousScrollY) {
        // console.log("scroll down");
        header.style.transform = "translateY(-70px)";
      } else {
        // console.log("scroll up");
        header.style.transform = "translateY(0)";
      }
    }

    setPreviousScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    setCategories(categories);
  }, [categories]);

  return (
    <AppBar position="fixed" sx={{ transition: "all 0.5s" }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ padding: "0", whiteSpace: "nowrap" }}>
          <Grid container sx={{ margin: "auto", alignItems: "center" }}>
            <Grid
              className="헤더좌측"
              xs={3}
              md={8}
              sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <Logo />
              <Nav categories={categories} />
            </Grid>

            <Grid
              className="헤더중간"
              xs={0}
              md={0}
              // sx={{ display: { xs: "none", md: "block" } }}
            ></Grid>

            <Grid
              className="헤더우측"
              xs={9}
              md={4}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {/* 검색 */}
              <Search sx={{ width: { xs: "70%", md: "100%" } }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>

                <Autocomplete
                  // 자동완성 리스트
                  options={["Option 1", "Option 2", "Option 3", "Option 4"]}
                  // 자동완성 리스트 활성화 유무에 관련된 속성
                  open={isAutocompleteOpened}
                  onOpen={handleOpenAutocomplete}
                  onClose={handleCloseAutocomplete}
                  // 자동완성 리스트 아이템 선택시 상태변경
                  onChange={(e, v) => v && search(v)}
                  // 입력 엘리먼트
                  renderInput={(params) => (
                    <StyledInputBase
                      {...params.InputProps}
                      placeholder="Search…"
                      inputProps={{ ...params.inputProps, "aria-label": "search" }}
                    />
                  )}
                  freeSolo // 입력 엘리먼트에 의해서 자유롭게 입력가능하도록 설정
                  clearOnEscape // esc 로 입력한 단어 삭제
                />
              </Search>

              {/* 기능버튼 */}
              <Box sx={{ display: { xs: "none", md: "flex" }, whiteSpace: "nowrap" }}>
                {user ? (
                  <IconButton color="inherit" onClick={handleOpenProfileMenu}>
                    <AccountCircleIcon />
                  </IconButton>
                ) : (
                  <>
                    <Link href="/auth/signin" style={{ display: "flex" }}>
                      <Button size="small" color="inherit">
                        Sign in
                      </Button>
                    </Link>
                    <Link href="/auth/signup" style={{ display: "flex" }}>
                      <Button size="small" color="inherit">
                        Sign up
                      </Button>
                    </Link>
                  </>
                )}

                <IconButton color="inherit" onClick={handleOpenSettingsMenu}>
                  <SettingsIcon />
                </IconButton>
              </Box>

              {/* 드로워 오픈너 햄버거버튼 (only 모바일) */}
              <IconButton
                size="large"
                color="inherit"
                onClick={handleOpenDrawer}
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              {renderDrawer}
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
      {renderProfileMenu}
      {renderSettingsMenu}
    </AppBar>
  );
}

const Search = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginLeft: "0 !important",
  // [theme.breakpoints.up("sm")]: {
  //   marginLeft: theme.spacing(1),
  //   width: "auto",
  // },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    // 왼쪽 패딩 설정 (기존 패딩 + 아이콘 크기)
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // width 속성의 변경 시 애니메이션 효과를 주기 위해 트랜지션 설정
    // transition: theme.transitions.create("width"),
    // [theme.breakpoints.up("sm")]: { width: "20ch" },
  },
}));

const Logo = () => {
  return (
    <Link href="/">
      <IconButton color="inherit">
        <StarsIcon />
      </IconButton>
    </Link>
  );
};
