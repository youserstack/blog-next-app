import Link from "next/link";
import "../styles/UserArea.scss";
import { cookies } from "next/headers";
import SignOutButton from "@/components/SignOutButton";

export default function UserArea() {
  const refreshToken = cookies().get("refreshToken");

  return (
    <div className="user-area">
      {refreshToken ? (
        <>
          <Link href={"/protected"}>protected</Link>
          <SignOutButton />
        </>
      ) : (
        <>
          <Link href={"/auth/signin"}>sign in</Link>
          <Link href={"/auth/signup"}>sign up</Link>
        </>
      )}
    </div>
  );
}
