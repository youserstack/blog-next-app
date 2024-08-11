"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@mui/material";
import { useState } from "react";

export default function MuiPagination({ count }: { count: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);

    const currentParams = new URLSearchParams(searchParams);
    currentParams.set("page", value.toString());
    router.push(`?${currentParams.toString()}`);
  };

  return (
    <Pagination
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
