import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/profile", "/admin"];
const protectedApiRoutes = [{ path: "/api/categories", methods: ["POST", "PATCH", "DELETE"] }];

export default async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  console.log("미들웨어", request.nextUrl.pathname, token);

  if (request.nextUrl.pathname === "/auth/signin" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // route
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // api
  const isProtectedApiRoute = protectedApiRoutes.some(
    (route) =>
      request.nextUrl.pathname.startsWith(route.path) && route.methods.includes(request.method)
  );
  if (isProtectedApiRoute) {
    // 인증되지 않은 사용자는 401 Unauthorized 응답 반환
    if (!token) {
      console.log("\n\n\n인증되지 않은 사용자입니다.\n\n\n");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 추가 권한 검사를 추가할 수 있음 (예: 관리자 권한 확인)
    // const userRole = token?.role; // 예시: 토큰에서 사용자 역할 확인
    // if (userRole !== "admin") {
    //   return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/admin/:path*", "/auth/signin"],
  // "/api/categories/:path*",
};
