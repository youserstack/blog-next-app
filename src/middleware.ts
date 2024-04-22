import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  // console.log("\n[middleware]");
  const headers = new Headers(request.headers);
  headers.set("url", request.url);
  headers.set("pathname", request.nextUrl.pathname);
  // const mayKeys = Array.from(headers.keys());

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/", "/blog/:path*"],
  // matcher: "/:path*",
};
