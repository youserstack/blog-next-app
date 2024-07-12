import ThemeToggle from "@/components/ui/ThemeToggle";
import SignOutButton from "@/components/buttons/SignOutButton";
import Link from "next/link";
import "./UserArea.scss";

export default function UserArea({ user }: any) {
  return (
    <div className="user-area">
      {user ? (
        <>
          <Link href={"/dashboard"}>dashboard</Link>
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
