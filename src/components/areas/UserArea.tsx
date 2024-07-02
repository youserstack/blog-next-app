import ThemeToggle from "@/components/ui/ThemeToggle";
import SignOutButton from "@/components/buttons/SignOutButton";
import Link from "next/link";
import dynamic from "next/dynamic";
import "./UserArea.scss";
// import AuthScript from "@/components/script/AuthScript";

const AuthScript = dynamic(() => import("@/components/script/AuthScript"), {
  ssr: false,
});

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
      <AuthScript user={user} />
    </div>
  );
}
