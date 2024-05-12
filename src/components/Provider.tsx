"use client";

import { createContext, useEffect, useState } from "react";

export const Context = createContext({});

export default function Provider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState();
  const [category, setCategory] = useState<string>("");

  const handleSomething = () => {
    console.log("handling...");
  };

  useEffect(() => {
    console.log({ category });
  }, [category]);

  return (
    <Context.Provider value={{ data, setData, handleSomething, setCategory }}>
      {children}
    </Context.Provider>
  );
}
