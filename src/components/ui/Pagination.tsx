"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Pagination as MuiPagination } from "@mui/material";
import { useState } from "react";

const ITEMS_PER_PAGE = 5;

interface Props {
  totalCount: number;
}

export default function Pagination({ totalCount }: Props) {
  // page count
  const count = Number(Math.ceil(totalCount / ITEMS_PER_PAGE)) || 0;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);

    const currentParams = new URLSearchParams(searchParams);
    currentParams.set("page", value.toString());
    router.push(`?${currentParams.toString()}`);
  };

  if (!totalCount) return null;

  return (
    <MuiPagination
      count={count}
      page={page}
      onChange={handleChange}
      sx={{
        "& ul.MuiPagination-ul": {
          width: "100%",
          display: "flex",
          justifyContent: "center",
          "& li:first-of-type": { flex: 1 },
          "& li:last-of-type": { flex: 1, textAlign: "end" },
        },
      }}
    />
  );
}
