"use client";

import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import { CategoryContext } from "../context/CategoryContext";

function CategoryFilter() {
  const [sub2Category, setSub2Category] = useState("");
  const [showSub1Category, setShowSub1Category] = useState(false);
  const [showSub2Category, setShowSub2Category] = useState(false);
  const [rootCategory, setRootCategory] = useState("");
  const [sub1Category, setSub1Category] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const { categories } = useContext(CategoryContext);

  const updateURLParams = (key: string, value: string) => {
    const urlSearchParams = new URLSearchParams(searchParams.toString());
    urlSearchParams.set(key, value);
    router.push(`?${urlSearchParams.toString()}`);
  };

  const handleRootCategoryChange = (e: SelectChangeEvent<string>) => {
    const rootCategory = e.target.value;
    const selectedRootCategory = categories.find((v) => v.name === rootCategory);
    if (!selectedRootCategory) return;

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

  const handleSub1CategoryChange = (e: SelectChangeEvent<string>) => {
    const sub1Category = e.target.value;
    const selectedSub1Category = categories
      .find((v) => v.name === rootCategory)
      ?.sub1Categories.find((v) => v.name === sub1Category);
    if (!selectedSub1Category) return;

    setSub1Category(sub1Category);
    setSub2Category("");
    setShowSub2Category(selectedSub1Category?.sub2Categories.length > 0);

    updateURLParams("categoryPath", `/${rootCategory}/${sub1Category}`);
  };

  const handleSub2CategoryChange = (e: SelectChangeEvent<string>) => {
    const sub2Category = e.target.value;

    setSub2Category(sub2Category);

    updateURLParams("categoryPath", `/${rootCategory}/${sub1Category}/${sub2Category}`);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <FormControl sx={{ minWidth: "120px" }} size="small">
        <InputLabel id="rootCategory">카테고리</InputLabel>
        <Select
          labelId="rootCategory"
          value={rootCategory}
          onChange={handleRootCategoryChange}
          label="카테고리"
          autoWidth
          MenuProps={{ disableScrollLock: true }}
        >
          <MenuItem value="all">전체</MenuItem>
          {categories.map((rootCategory) => (
            <MenuItem key={rootCategory._id} value={rootCategory.name}>
              {rootCategory.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {showSub1Category && (
        <>
          <span>{">"}</span>
          <FormControl sx={{ minWidth: "150px" }} size="small">
            <InputLabel id="sub1Category">하위 카테고리</InputLabel>
            <Select
              labelId="sub1Category"
              value={sub1Category}
              onChange={handleSub1CategoryChange}
              label="하위 카테고리"
              autoWidth
              MenuProps={{ disableScrollLock: true }}
            >
              {categories
                .find((v) => v.name === rootCategory)
                ?.sub1Categories.map((sub1Category) => (
                  <MenuItem key={sub1Category._id} value={sub1Category.name}>
                    {sub1Category.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </>
      )}

      {showSub2Category && (
        <>
          <span>{">"}</span>
          <FormControl sx={{ minWidth: "150px" }} size="small">
            <InputLabel id="sub2Category">하위 카테고리</InputLabel>
            <Select
              labelId="sub2Category"
              value={sub2Category}
              onChange={handleSub2CategoryChange}
              label="하위 카테고리"
              autoWidth
              MenuProps={{ disableScrollLock: true }}
            >
              {categories
                .find((v) => v.name === rootCategory)
                ?.sub1Categories.find((v) => v.name === sub1Category)
                ?.sub2Categories.map((sub2Category) => (
                  <MenuItem key={sub2Category._id} value={sub2Category.name}>
                    {sub2Category.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </>
      )}
    </div>
  );
}

function SortFilter() {
  const [sort, setSort] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSortChange = (e: SelectChangeEvent<string>) => {
    const sort = e.target.value;

    setSort(sort);

    const urlSearchParams = new URLSearchParams(searchParams.toString());
    urlSearchParams.set("sort", sort);
    router.push(`?${urlSearchParams.toString()}`);
  };

  return (
    <FormControl sx={{ minWidth: "120px" }} size="small">
      <InputLabel id="sort">정렬</InputLabel>
      <Select
        labelId="sort"
        name="sort"
        value={sort}
        onChange={handleSortChange}
        label="정렬"
        MenuProps={{ disableScrollLock: true }}
      >
        <MenuItem value="asc">오름차순</MenuItem>
        <MenuItem value="desc">내림차순</MenuItem>
        <MenuItem value="popular">인기순</MenuItem>
        <MenuItem value="newest">최신순</MenuItem>
      </Select>
    </FormControl>
  );
}

export default function SearchFilters() {
  return (
    <Box className="검색필터" component={"div"} display={"flex"} justifyContent={"space-between"}>
      <CategoryFilter />
      <SortFilter />
    </Box>
  );
}
