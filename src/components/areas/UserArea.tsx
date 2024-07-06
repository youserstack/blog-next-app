import ThemeToggle from "@/components/ui/ThemeToggle";
import SignOutButton from "@/components/buttons/SignOutButton";
import Link from "next/link";
import "./UserArea.scss";

export default function UserArea({ user }: any) {
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
    </div>
  );
}
