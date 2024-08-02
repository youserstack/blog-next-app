import React, { createContext, useState, ReactNode } from "react";

interface SwrContextType {
  dynamicUrl: string;
  setDynamicUrl: React.Dispatch<React.SetStateAction<string>>;
}

const defaultSwrContext: SwrContextType = {
  dynamicUrl: "",
  setDynamicUrl: () => {},
};

export const SwrContext = createContext<SwrContextType>(defaultSwrContext);
export const SwrProvider = ({ children }: { children: ReactNode }) => {
  const [dynamicUrl, setDynamicUrl] = useState("");

  return (
    <SwrContext.Provider value={{ dynamicUrl, setDynamicUrl }}>{children}</SwrContext.Provider>
  );
};
