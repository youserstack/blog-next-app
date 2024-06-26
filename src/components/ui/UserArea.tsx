import { headers } from "next/headers";
import ThemeToggle from "@/components/ui/ThemeToggle";
import AuthScript from "@/components/script/AuthScript";
import Link from "next/link";
import "../../styles/UserArea.scss";
import SignOutButton from "@/components/buttons/SignOutButton";

export default async function UserArea() {
  const user = JSON.parse(headers().get("user") as string);

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
