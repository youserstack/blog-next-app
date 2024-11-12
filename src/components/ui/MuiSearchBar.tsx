"use client";

import { Search as SearchIcon } from "@mui/icons-material";
import { Autocomplete, Box, InputBase } from "@mui/material";
import { useContext, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { Context } from "../context/Context";

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

export default function MuiSearchBar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const search = (searchWords: string) => router.push(`/search?searchWords=${searchWords}`);
  const { setHeaderHidden } = useContext(Context); // 헤더 숨김 상태 가져오기

  return (
    <Search className="검색" sx={{ width: { xs: "70%", md: "100%" } }}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>

      <Autocomplete
        // 자동완성 리스트
        options={["Option 1", "Option 2", "Option 3", "Option 4"]}
        // 자동완성 리스트 활성화 유무에 관련된 속성
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        // 자동완성 리스트 아이템 선택시 상태변경
        onChange={(e, v) => {
          if (v) {
            search(v);
            setHeaderHidden(true);
          }
        }}
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
  );
}
