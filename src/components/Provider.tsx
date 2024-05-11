"use client";

import { createContext, useState } from "react";

export const Context = createContext({});

export default function Provider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState();

  const handleSomething = () => {
    console.log("handling...");
  };

  return <Context.Provider value={{ data, setData, handleSomething }}>{children}</Context.Provider>;
}
