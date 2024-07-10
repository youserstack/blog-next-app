"use client";

import { Context } from "@/components/context/Provider";
import { useContext, useEffect } from "react";

export default function CategoriesScript({ categories }: { categories: [] }) {
  const { setCategories, setCategoryPaths }: any = useContext(Context);

  useEffect(() => {
    setCategories(categories);
  }, [categories, setCategories]);

  useEffect(() => {
    // 배열을 생성할 때 사용할 변수
    let categoryPaths: string[] = [];

    // 주어진 배열을 순회하며 문자열 생성
    for (let i = 0; i < categories.length; i++) {
      const rootCategory: any = categories[i];
      let root = rootCategory.name;
      categoryPaths.push(`/${root}`);

      // sub1Categories가 존재하면 처리
      const sub1Categories = rootCategory.sub1Categories;
      if (sub1Categories.length > 0) {
        for (let j = 0; j < sub1Categories.length; j++) {
          const sub1Category = sub1Categories[j];
          const sub1 = sub1Category.name;
          categoryPaths.push(`/${root}/${sub1}`);

          // sub2Categories가 존재하면 처리
          const sub2Categories = sub1Category.sub2Categories;
          if (sub2Categories.length > 0) {
            for (let k = 0; k < sub2Categories.length; k++) {
              const sub2Category = sub2Categories[k];
              const sub2 = sub2Category.name;
              categoryPaths.push(`/${root}/${sub1}/${sub2}`);
            }
          }
        }
      }
    }

    setCategoryPaths(categoryPaths);
  }, [categories, setCategoryPaths]);

  return null;
}
