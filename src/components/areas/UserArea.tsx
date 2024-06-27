import { cookies, headers } from "next/headers";
import ThemeToggle from "@/components/ui/ThemeToggle";
import AuthScript from "@/components/script/AuthScript";
import Link from "next/link";
import SignOutButton from "@/components/buttons/SignOutButton";
import "./UserArea.scss";

export default async function UserArea() {
  const user = JSON.parse(headers().get("user") as string);
  const allCookies = cookies().getAll();
  console.log("zivi", { headerUser: user, allCookies });

  return (
    <div className="user-area">
      {user ? (
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
      <AuthScript user={user} />
    </div>
  );
}
