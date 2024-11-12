"use client";

import { createContext, useState } from "react";

interface ICategoryContext {
  categories: ICategory[];
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
  parentCategories: string[];
  setParentCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CategoryContext = createContext<ICategoryContext>({
  categories: [],
  setCategories: () => {},
  parentCategories: [],
  setParentCategories: () => {},
});
export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
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
