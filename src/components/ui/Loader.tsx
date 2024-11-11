"use client";

import { useContext, useEffect } from "react";
import { CategoryContext } from "../context/CategoryContext";

interface Props {
  categories: [];
}

export default function Loader({ categories }: Props) {
  const { setCategories } = useContext(CategoryContext);

  useEffect(() => {
    setCategories(categories);
  }, [categories]);

  return null;
}
