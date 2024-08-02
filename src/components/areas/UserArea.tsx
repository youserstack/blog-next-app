"use client";

import ThemeToggle from "@/components/ui/ThemeToggle";
import SignOutButton from "@/components/buttons/SignOutButton";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function UserArea({ user }: any) {
  const { setUser }: any = useContext(AuthContext);

  useEffect(() => setUser(user), [user, setUser]);

  return (
    <div className="user-area" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      {user ? (
        <>
          <Link href={"/dashboard"}>대시보드</Link>
          <SignOutButton />
        </>
      ) : (
        <>
          <Link href={"/auth/signin"}>로그인</Link>
          <Link href={"/auth/signup"}>회원가입</Link>
        </>
      )}
      <ThemeToggle />
    </div>
  );
}
