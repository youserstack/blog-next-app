import React, { createContext, useState, ReactNode } from "react";

interface CategoryContextType {
  categories: any[];
  setCategories: React.Dispatch<React.SetStateAction<any[]>>;
  parentCategories: string[];
  setParentCategories: React.Dispatch<React.SetStateAction<string[]>>;
  categoryPaths: string[];
  setCategoryPaths: React.Dispatch<React.SetStateAction<string[]>>;
}

const defaultCategoryContext: CategoryContextType = {
  categories: [],
  setCategories: () => {},
  parentCategories: [],
  setParentCategories: () => {},
  categoryPaths: [],
  setCategoryPaths: () => {},
};

export const CategoryContext = createContext<CategoryContextType>(defaultCategoryContext);
export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [parentCategories, setParentCategories] = useState<string[]>([]);
  const [categoryPaths, setCategoryPaths] = useState<string[]>([]);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        parentCategories,
        setParentCategories,
        categoryPaths,
        setCategoryPaths,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
