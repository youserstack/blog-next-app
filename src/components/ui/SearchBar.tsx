"use client";

import { IoIosSearch } from "react-icons/io";
import "../../styles/SearchBar.scss";
import { useState } from "react";

export default function SearchBar() {
  const [searchWords, setSearchWords] = useState("");

  return (
    <div className="search-bar">
      <input type="search" value={searchWords} onChange={(e) => setSearchWords(e.target.value)} />
      <button
        onClick={(e) => {
          // e.preventDefault()
          console.log({ searchWords });
        }}
      >
        <IoIosSearch />
      </button>
    </div>
  );
}
