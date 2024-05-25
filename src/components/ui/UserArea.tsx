import Link from "next/link";
import { cookies } from "next/headers";
import SignOutButton from "@/components/ui/SignOutButton";
import ThemeToggle from "@/components/ui/ThemeToggle";
import "../../styles/UserArea.scss";

export default function UserArea() {
  const refreshToken = cookies().get("refreshToken");

  return (
    <div className="user-area">
      {refreshToken ? (
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
