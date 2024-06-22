"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function SearchFilter({ categories }: any) {
  const [showSub1Category, setShowSub1Category] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  // console.log({ categories });
  const some = searchParams.get("categoryPath");
  console.log({ some });

  const handleCategoryChange = (e: any) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("categoryPath", `/${e.target.value}`);
    router.push(`?${params.toString()}`);
    setShowSub1Category(true); // 다음 하위 카테고리 표시
  };

  const handleSub1CategoryChange = (e: any) => {
    const params = new URLSearchParams(searchParams.toString());
    const categoryPath = params.get("categoryPath");
    params.set("categoryPath", `${categoryPath}/${e.target.value}`);
    router.push(`?${params.toString()}`);
    // console.log({ categoryPath });
    // const all = params.getAll("categoryPath");
    // console.log({ all });
  };

  return (
    <div className="search-filter">
      <div className="filter-item">
        <label htmlFor="category">카테고리</label>
        <select id="category" name="categoryPath" onChange={handleCategoryChange}>
          <option value="">전체</option>
          {categories.map((category: any) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-item sub1-category">
        <label htmlFor="sub1-category">하위 카테고리</label>
        <select id="sub1-category" name="sub1-category" onChange={handleSub1CategoryChange}>
          <option value="">전체</option>
          {categories
            .find((v: any) => v.name === searchParams.get("categoryPath")?.slice(1))
            ?.sub1Categories.map((sub1Category: any) => (
              <option key={sub1Category._id} value={sub1Category.name}>
                {sub1Category.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}
