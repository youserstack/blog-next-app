import { createContext, useState } from "react";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultLoadingContext: LoadingContextType = {
  isLoading: false,
  setIsLoading: () => {},
};

export const LoadingContext = createContext<LoadingContextType>(defaultLoadingContext);
export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
