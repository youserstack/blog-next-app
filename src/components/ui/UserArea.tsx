"use client";

import Link from "next/link";
import SignOutButton from "@/components/ui/SignOutButton";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useContext } from "react";
import { Context } from "@/components/context/Provider";
import "../../styles/UserArea.scss";

export default function UserArea() {
  const { isSignedIn }: any = useContext(Context); // 로그인 상태

  return (
    <div className="user-area">
      {isSignedIn ? (
        <>
          <Link href={"/protected"}>protected</Link>
          <Link href={"/dashboard"}>dashboard</Link>
          <SignOutButton />
        </>
      ) : (
        <>
          <Link href={"/auth/signin"}>sign in</Link>
          <Link href={"/auth/signup"}>sign up</Link>
        </>
      )}
      <ThemeToggle />
    </div>
  );
}
