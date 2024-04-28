import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  // console.log("\n[middleware]");

  const { pathname } = request.nextUrl;
  // console.log({ pathname });

  if (pathname === "/" || pathname.startsWith("/blog")) {
    const headers = new Headers(request.headers);
    headers.set("pathname", pathname);
    // const mayKeys = Array.from(headers.keys());

    return NextResponse.next({ request: { headers } });
  }

  if (pathname.startsWith("/protected")) {
    // Check for cookie
    const refreshToken: any = cookies().get("refreshToken");
    if (!refreshToken) {
      console.log("\n[middleware]");
      console.log("no refreshToken");
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    // Validate it
    const secret = new TextEncoder().encode(process.env.JWT_REFRESHTOKEN_SECRET);
    try {
      const { payload } = await jwtVerify(refreshToken.value, secret, {});
      // console.log({ payload });
    } catch (error) {
      console.log("\n[middleware]");
      console.log("invalid jwt refreshToken");
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }
}

export const config = {
  matcher: ["/", "/blog/:path*", "/protected/:path*"],
  // matcher: "/:path*",
};
