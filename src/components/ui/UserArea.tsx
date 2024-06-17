import Link from "next/link";
import SignOutButton from "@/components/ui/SignOutButton";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { headers } from "next/headers";
import AuthScript from "@/components/script/AuthScript";
import "../../styles/UserArea.scss";

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

// async function verifyToken(token: string, secret: string): Promise<JWTPayload> {
//   const encodedSecret = new TextEncoder().encode(secret);
//   const { payload } = await jwtVerify(token, encodedSecret);
//   return payload;
// }
// const refreshToken = cookies().get("refreshToken")?.value as string;
// const secret = process.env.REFRESH_TOKEN_SECRET as string;
// const user = await verifyToken(refreshToken, secret);
