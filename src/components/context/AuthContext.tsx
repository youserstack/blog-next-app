import { useSession } from "next-auth/react";
import { createContext, useEffect } from "react";
import Loading from "../ui/Loading";

export const AuthContext = createContext({});
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { status, data: session } = useSession();

  useEffect(() => {
    // console.log("세션", session?.user);
  }, [session?.user]);

  return (
    <AuthContext.Provider value={{}}>
      {status === "loading" && <Loading />}
      {children}
    </AuthContext.Provider>
  );
};
