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
} from "@mui/material";
import {
  Stars as StarsIcon,
  AccountCircle as AccountCircleIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import { CategoryContext } from "../context/CategoryContext";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function MuiAppBar() {
  // 컨텍스트
  const { user, signout } = useContext(AuthContext);
  const { categories } = useContext(CategoryContext);
  const { mode, setMode, toggleMode } = useContext(ThemeContext);

  // 검색
  const [isAutocompleteOpened, setIsAutocompleteOpened] = useState(false);
  const router = useRouter();
  const search = (searchWords: string) => router.push(`/search?searchWords=${searchWords}`);
  const handleOpenAutocomplete = () => setIsAutocompleteOpened(true);
  const handleCloseAutocomplete = () => setIsAutocompleteOpened(false);

  // 메뉴
  const [profileMenu, setProfileMenu] = useState<null | HTMLElement>(null);
  const [settingsMenu, setSettingsMenu] = useState<null | HTMLElement>(null);
  const [mobileMenu, setMobileMenu] = useState<null | HTMLElement>(null);
  const handleOpenProfileMenu = (e: MouseEvent<HTMLElement>) => setProfileMenu(e.currentTarget);
  const handleOpenSettingsMenu = (e: MouseEvent<HTMLElement>) => setSettingsMenu(e.currentTarget);
  const handleOpenMobileMenu = (e: MouseEvent<HTMLElement>) => setMobileMenu(e.currentTarget);
  const handleCloseProfileMenu = () => setProfileMenu(null);
  const handleCloseSettingsMenu = () => setSettingsMenu(null);
  const handleCloseMobileMenu = () => setMobileMenu(null);
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
        onClick={() => {
          signout();
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
  const renderMobileMenu = (
    <Menu
      open={Boolean(mobileMenu)}
      onClose={handleCloseMobileMenu}
      anchorEl={mobileMenu}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      id="profile-menu-mobile"
      keepMounted
      disableScrollLock // 스크롤 잠금 비활성화
    >
      <Link href={""}>
        <MenuItem>
          <AccountCircleIcon />
          <p style={{ marginLeft: "0.5rem" }}>Profile</p>
        </MenuItem>
      </Link>

      <MenuItem onClick={toggleMode}>
        <ToggleModeLabel mode={mode} />
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar position="fixed">
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
                      // onKeyDown={(e) => {
                      //   if (e.key === "Enter") {
                      //     e.preventDefault();
                      //     search(e.currentTarget.value);
                      //     // setIsOpen(false);
                      //   }
                      // }}
                    />
                  )}
                  freeSolo // 입력 엘리먼트에 의해서 자유롭게 입력가능하도록 설정
                  clearOnEscape // esc 로 입력한 단어 삭제
                />
              </Search>

              {/* <IconButton color="inherit" size="large" sx={{ display: { xs: "flex", md: "none" } }}>
                <SearchIcon />
              </IconButton> */}

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

              {/* 모바일 메뉴 */}
              <IconButton
                size="large"
                color="inherit"
                onClick={handleOpenMobileMenu}
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
      {renderProfileMenu}
      {renderSettingsMenu}
      {renderMobileMenu}
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
