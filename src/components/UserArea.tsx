import Link from "next/link";
import "../styles/UserArea.scss";
import { cookies } from "next/headers";

export default function UserArea() {
  const refreshToken = cookies().get("refreshToken");

  return (
    <div className="user-area">
      {refreshToken ? (
        <Link href={"dashboard"}>dashboard</Link>
      ) : (
        <>
          <Link href={"/auth/signin"}>sign in</Link>
          <Link href={"/auth/signup"}>sign up</Link>
        </>
      )}
    </div>
  );
}
