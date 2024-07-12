"use client";

import { IoIosSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Autocomplete, Box, Button, TextField } from "@mui/material";

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
  const search = (searchWords: string) => router.push(`/search?searchWords=${searchWords}`);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      className="search-bar"
      sx={{
        width: "100%",
        height: "70%",
        maxWidth: "500px",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        borderRadius: "5px",
      }}
    >
      <Autocomplete
        options={suggestions}
        fullWidth
        freeSolo
        sx={{
          "& .MuiAutocomplete-endAdornment": { padding: 0 }, // Autocomplete의 endAdornment padding 조정
          "& .MuiAutocomplete-popupIndicator": { padding: 0 }, // Autocomplete의 popupIndicator padding 조정
        }}
        clearIcon={false}
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onChange={(e, v: any) => {
          if (v?.label) {
            setSearchWords(v.label);
            search(v.label);
            setIsOpen(false);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            variant="filled"
            sx={{ "& .MuiInputBase-root": { padding: "2px 4px" }, backgroundColor: "white" }}
            onChange={(e) => setSearchWords(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                search(searchWords);
                setIsOpen(false);
              }
            }}
          />
        )}
      />

      <Button
        onClick={() => search(searchWords)}
        sx={{
          position: "absolute",
          top: "4px",
          right: "4px",
          bottom: "4px",
        }}
      >
        <IoIosSearch />
      </Button>
    </Box>
  );
}
