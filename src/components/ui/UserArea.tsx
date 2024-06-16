import Link from "next/link";
import SignOutButton from "@/components/ui/SignOutButton";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { cookies, headers } from "next/headers";
import { JWTPayload, jwtVerify } from "jose";
import "../../styles/UserArea.scss";

async function verifyToken(token: string, secret: string): Promise<JWTPayload> {
  const encodedSecret = new TextEncoder().encode(secret);
  const { payload } = await jwtVerify(token, encodedSecret);
  return payload;
}

export default async function UserArea() {
  // const pathname = headers().get("pathname");
  // const auth = headers().get("auth");
  // const email = headers().get("email");
  // console.log({ auth, email });

  const refreshToken = cookies().get("refreshToken")?.value as string;
  const secret = process.env.REFRESH_TOKEN_SECRET as string;
  const user = await verifyToken(refreshToken, secret);
  const isAuthenticated = user.email ? true : false;
  // console.log({ user });

  return (
    <div className="user-area">
      {isAuthenticated ? (
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
