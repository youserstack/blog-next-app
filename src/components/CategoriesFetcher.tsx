"use client";

import { Context } from "@/components/Provider";
import { useContext, useEffect } from "react";

export default function CategoriesFetcher({ test }: any) {
  const { setCategories }: any = useContext(Context);

  useEffect(() => {
    setCategories(test);
  }, []);

  return null;
}
