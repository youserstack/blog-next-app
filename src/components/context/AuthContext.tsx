import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";

interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
  signout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  setUser: () => {},
  signout: async () => {},
  refreshAccessToken: async () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
export const AuthProvider = ({
  children,
  user: session,
}: {
  children: React.ReactNode;
  user: any;
}) => {
  const [user, setUser] = useState(session); // 서버세션으로 초기화
  const router = useRouter();

  const signout = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.ROOT_URL}/api/v2/auth/signout`);
      const data = await response.json();

      if (!response.ok) throw new Error("로그아웃을 실패했습니다.");
      console.log({ data });
      localStorage.removeItem("accessToken");
      setUser(null);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }, [router]);

  const refreshAccessToken = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;
      const response = await fetch(`${process.env.ROOT_URL}/api/v2/auth/refresh`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "accessToken 갱신을 실패했습니다.");
      else localStorage.setItem("accessToken", data.newAccessToken);
    } catch (error) {
      console.error(error);
      signout();
    }
  }, [signout]);

  // 인터벌 액세스 토큰 갱신
  useEffect(() => {
    refreshAccessToken();
    const intervalId = setInterval(refreshAccessToken, 1000 * 60 * 15); // 15분마다 토큰 갱신 (1초*60*15=15분)
    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 클리어
  }, [refreshAccessToken]);

  // useEffect(() => console.log({ user }), [user]);
  useEffect(() => setUser(session), [session]);

  return (
    <AuthContext.Provider value={{ user, setUser, signout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
