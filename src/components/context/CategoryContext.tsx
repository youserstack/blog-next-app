"use client";

import { createContext, useState } from "react";

interface CategoryContextType {
  categories: any[];
  setCategories: React.Dispatch<React.SetStateAction<any[]>>;
  parentCategories: string[];
  setParentCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const defaultCategoryContext: CategoryContextType = {
  categories: [],
  setCategories: () => {},
  parentCategories: [],
  setParentCategories: () => {},
};

export const CategoryContext = createContext<CategoryContextType>(defaultCategoryContext);
export const CategoryProvider = ({
  children,
}: // categories: storedCategories,
{
  children: React.ReactNode;
  // categories: any[];
}) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [parentCategories, setParentCategories] = useState<string[]>([]);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        parentCategories,
        setParentCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
