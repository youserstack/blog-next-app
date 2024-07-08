"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import "./SearchFilter.scss";
import { MenuItem, Select } from "@mui/material";

export default function SearchFilter({ categories }: any) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSub1Category, setSelectedSub1Category] = useState("");
  const [selectedSub2Category, setSelectedSub2Category] = useState("");
  const [showSub1Category, setShowSub1Category] = useState(false);
  const [showSub2Category, setShowSub2Category] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleCategoryChange = (e: any) => {
    const selectedCategory = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    setSelectedCategory(selectedCategory);
    setShowSub1Category(true); // 다음 하위 카테고리 표시

    params.set("categoryPath", `/${selectedCategory}`);
    router.push(`?${params.toString()}`);
  };

  const handleSub1CategoryChange = (e: any) => {
    const selectedSub1Category = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    setSelectedSub1Category(selectedSub1Category);

    if (selectedSub1Category === "") {
      setShowSub1Category(false);
      setShowSub2Category(false);
      params.set("categoryPath", `/${selectedCategory}`);
    } else {
      setShowSub2Category(true);
      params.set("categoryPath", `/${selectedCategory}/${selectedSub1Category}`);
    }

    router.push(`?${params.toString()}`);
  };

  const handleSub2CategoryChange = (e: any) => {
    const selectedSub2Category = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    setSelectedSub2Category(selectedSub2Category);

    if (selectedSub2Category === "") {
      setShowSub2Category(false);
      params.set("categoryPath", `/${selectedCategory}/${selectedSub1Category}`);
    } else {
      setShowSub2Category(true);
      params.set(
        "categoryPath",
        `/${selectedCategory}/${selectedSub1Category}/${selectedSub2Category}`
      );
    }

    router.push(`?${params.toString()}`);
  };

  const handleSortChange = (e: any) => {
    const selectedSortOption = e.target.value;
    // const params = new URLSearchParams(searchParams.toString());

    // setSelectedSort(selectedSortOption);
    // params.set("sort", selectedSortOption);

    // router.push(`?${params.toString()}`);
    router.push(`?sort=${selectedSortOption}`);
  };

  // useEffect(() => {
  //   // console.log(searchParams.get("categoryPath"));
  //   // console.log({ selectedCategory, selectedSub1Category, selectedSub2Category });
  // }, [searchParams]);

  const foundSelectedCategory = categories.find((v: any) => v.name === selectedCategory);
  const foundSelectedSub1Category = foundSelectedCategory?.sub1Categories.find(
    (v: any) => v.name === selectedSub1Category
  );

  return (
    <div className="search-filter">
      <div className="filter-group filter-category">
        <div className="filter-item">
          <select name="categoryPath" onChange={handleCategoryChange}>
            <option value="">카테고리 선택</option>
            {categories.map((category: any) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {showSub1Category && <span>{">"}</span>}
        {showSub1Category && (
          <div className="filter-item">
            <select name="sub1-category" onChange={handleSub1CategoryChange}>
              <option value="">하위 카테고리 선택</option>
              {foundSelectedCategory?.sub1Categories.map((v: any) => (
                <option key={v._id} value={v.name}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {showSub2Category && <span>{">"}</span>}
        {showSub2Category && (
          <div className="filter-item">
            <select name="sub1-category" onChange={handleSub2CategoryChange}>
              <option value="">하위 카테고리 선택</option>
              {foundSelectedSub1Category?.sub2Categories.map((v: any) => (
                <option key={v._id} value={v.name}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="filter-item filter-sort">
        <Select name="sort" onChange={handleSortChange} label="정렬">
          <MenuItem value="">정렬 옵션 선택</MenuItem>
          <MenuItem value="asc">오름차순</MenuItem>
          <MenuItem value="desc">내림차순</MenuItem>
          <MenuItem value="popular">인기순</MenuItem>
          <MenuItem value="newest">최신순</MenuItem>
        </Select>
      </div>
    </div>
  );
}
