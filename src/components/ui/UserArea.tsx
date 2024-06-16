import Link from "next/link";
import SignOutButton from "@/components/ui/SignOutButton";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { headers } from "next/headers";
import "../../styles/UserArea.scss";

export default async function UserArea() {
  const pathname = headers().get("pathname");
  const auth = headers().get("auth");
  const email = headers().get("email");
  console.log({ auth, email });

  return (
    <div className="user-area">
      {auth === "authenticated" ? (
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
