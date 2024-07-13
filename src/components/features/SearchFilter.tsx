"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function SearchFilter({ categories }: any) {
  const [rootCategory, setRootCategory] = useState("");
  const [sub1Category, setSub1Category] = useState("");
  const [sub2Category, setSub2Category] = useState("");
  const [showSub1Category, setShowSub1Category] = useState(false);
  const [showSub2Category, setShowSub2Category] = useState(false);
  const [sort, setSort] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateURLParams = (key: any, value: any) => {
    const urlSearchParams = new URLSearchParams(searchParams.toString());
    urlSearchParams.set(key, value);
    router.push(`?${urlSearchParams.toString()}`);
  };

  const handleRootCategoryChange = (e: any) => {
    const rootCategory = e.target.value;
    const selectedRootCategory = categories.find((v: any) => v.name === rootCategory);

    setRootCategory(rootCategory);
    setSub1Category("");
    setSub2Category("");
    setShowSub1Category(selectedRootCategory?.sub1Categories.length > 0);
    setShowSub2Category(false);

    if (rootCategory === "all") {
      updateURLParams("categoryPath", `/`);
      return;
    }

    updateURLParams("categoryPath", `/${rootCategory}`);
  };

  const handleSub1CategoryChange = (e: any) => {
    const sub1Category = e.target.value;
    const selectedSub1Category = categories
      .find((v: any) => v.name === rootCategory)
      .sub1Categories.find((v: any) => v.name === sub1Category);

    setSub1Category(sub1Category);
    setSub2Category("");
    setShowSub2Category(selectedSub1Category?.sub2Categories.length > 0);

    updateURLParams("categoryPath", `/${rootCategory}/${sub1Category}`);
  };

  const handleSub2CategoryChange = (e: any) => {
    const sub2Category = e.target.value;

    setSub2Category(sub2Category);

    updateURLParams("categoryPath", `/${rootCategory}/${sub1Category}/${sub2Category}`);
  };

  const handleSortChange = (e: any) => {
    const sort = e.target.value;

    setSort(sort);

    const urlSearchParams = new URLSearchParams(searchParams.toString());
    urlSearchParams.set("sort", sort);
    router.push(`?${urlSearchParams.toString()}`);
  };

  if (!categories) return null;

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <FormControl sx={{ minWidth: "120px" }} size="small">
          <InputLabel id="rootCategory">카테고리</InputLabel>
          <Select
            labelId="rootCategory"
            value={rootCategory}
            onChange={handleRootCategoryChange}
            label="카테고리"
            autoWidth
          >
            <MenuItem value="all">전체</MenuItem>
            {categories.map((rootCategory: any) => (
              <MenuItem key={rootCategory._id} value={rootCategory.name}>
                {rootCategory.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {showSub1Category && <span>{">"}</span>}
        {showSub1Category && (
          <FormControl sx={{ minWidth: "150px" }} size="small">
            <InputLabel id="sub1Category">하위 카테고리</InputLabel>
            <Select
              labelId="sub1Category"
              value={sub1Category}
              onChange={handleSub1CategoryChange}
              label="하위 카테고리"
              autoWidth
            >
              {categories
                .find((v: any) => v.name === rootCategory)
                ?.sub1Categories.map((sub1Category: any) => (
                  <MenuItem key={sub1Category._id} value={sub1Category.name}>
                    {sub1Category.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}

        {showSub2Category && <span>{">"}</span>}
        {showSub2Category && (
          <FormControl sx={{ minWidth: "150px" }} size="small">
            <InputLabel id="sub2Category">하위 카테고리</InputLabel>
            <Select
              labelId="sub2Category"
              value={sub2Category}
              onChange={handleSub2CategoryChange}
              label="하위 카테고리"
              autoWidth
            >
              {categories
                .find((v: any) => v.name === rootCategory)
                ?.sub1Categories.find((v: any) => v.name === sub1Category)
                ?.sub2Categories.map((sub2Category: any) => (
                  <MenuItem key={sub2Category._id} value={sub2Category.name}>
                    {sub2Category.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
      </div>

      <FormControl sx={{ minWidth: "120px" }} size="small">
        <InputLabel id="sort">정렬</InputLabel>
        <Select labelId="sort" name="sort" value={sort} onChange={handleSortChange} label="정렬">
          <MenuItem value="asc">오름차순</MenuItem>
          <MenuItem value="desc">내림차순</MenuItem>
          <MenuItem value="popular">인기순</MenuItem>
          <MenuItem value="newest">최신순</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
