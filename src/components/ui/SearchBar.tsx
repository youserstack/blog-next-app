"use client";

import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/SearchBar.scss";

export default function SearchBar() {
  const [searchWords, setSearchWords] = useState("");
  const router = useRouter();

  return (
    <div className="search-bar">
      <input
        type="search"
        value={searchWords}
        onChange={(e) => setSearchWords(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            router.push(`/search?searchWords=${searchWords}`);
          }
        }}
      />
      <button
        onClick={(e) => {
          router.push(`/search?searchWords=${searchWords}`);
        }}
      >
        <IoIosSearch />
      </button>
    </div>
  );
}
