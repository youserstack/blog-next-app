"use client";

import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./SearchBar.scss";
import { Autocomplete, Button, TextField } from "@mui/material";

// 제안할 검색어 목록
const suggestions = [
  { label: "Apple" },
  { label: "Banana" },
  { label: "Cherry" },
  { label: "Date" },
  { label: "Elderberry" },
  { label: "Fig" },
  { label: "Grape" },
];

export default function SearchBar() {
  const [searchWords, setSearchWords] = useState("");
  const router = useRouter();
  const search = () => router.push(`/search?searchWords=${searchWords}`);

  return (
    <div className="search-bar">
      <Autocomplete
        options={suggestions}
        fullWidth
        freeSolo
        sx={{
          "& .MuiAutocomplete-endAdornment": { padding: 0 }, // Autocomplete의 endAdornment padding 조정
          "& .MuiAutocomplete-popupIndicator": { padding: 0 }, // Autocomplete의 popupIndicator padding 조정
        }}
        clearIcon={false}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            variant="filled"
            sx={{ "& .MuiInputBase-root": { padding: "2px 4px" } }}
            onChange={(e) => setSearchWords(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                search();
              }
            }}
          />
        )}
      />

      <Button onClick={search}>
        <IoIosSearch />
      </Button>
    </div>
  );

  // return (
  //   <div className="search-bar">
  //     <input
  //       type="search"
  //       value={searchWords}
  //       onChange={(e) => setSearchWords(e.target.value)}
  //       onKeyDown={(e) => {
  //         if (e.key === "Enter") {
  //           router.push(`/search?searchWords=${searchWords}`);
  //         }
  //       }}
  //     />
  //     <button
  //       onClick={(e) => {
  //         router.push(`/search?searchWords=${searchWords}`);
  //       }}
  //     >
  //       <IoIosSearch />
  //     </button>
  //   </div>
  // );
}
