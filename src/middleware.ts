import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  // console.log("\n\x1b[32m[middleware]");

  const { pathname } = request.nextUrl;
  // console.log({ pathname });

  // 프로텍티드 페이지인 경우에는 인증된 사용자만 접근을 허용한다. (blog post 생성/수정/삭제)
  // 각각의 백엔드포인트에서는 accessToken으로 접근한 경우에만 허용한다.
  const isProtectedPage = pathname.startsWith("/protected") || pathname.startsWith("/post/create");
  if (isProtectedPage) {
    // Check for cookie
    const refreshToken: any = cookies().get("refreshToken");
    if (!refreshToken) {
      console.log("\n\x1b[31m[middleware]");
      console.log("no refreshToken (리프레시 토큰 부재)");
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    // Validate it
    const secret = new TextEncoder().encode(process.env.JWT_REFRESHTOKEN_SECRET);
    try {
      const { payload } = await jwtVerify(refreshToken.value, secret, {});
      // console.log({ payload });
      console.log("\n\x1b[32m[middleware]");
      console.log("validated user (인증된 사용자)");
    } catch (error) {
      console.log("\n\x1b[31m[middleware]");
      console.log("invalid jwt refreshToken (유효성 검사 에러)");
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  // 인증된 사용자라면 사인인 페이지로의 접근은 필요하지 않으므로 홈페이지로 리다이렉트한다.
  if (pathname.startsWith("/auth/signin")) {
    // Check for cookie
    const refreshToken: any = cookies().get("refreshToken");

    // Validate it
    const secret = new TextEncoder().encode(process.env.JWT_REFRESHTOKEN_SECRET);
    try {
      const { payload } = await jwtVerify(refreshToken.value, secret, {});
      // console.log({ payload });
      console.log("\n\x1b[32m[middleware]");
      console.log("validated user (인증된 사용자)");
      return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
      console.log("\n\x1b[32m[middleware]");
      console.log("invalid jwt refreshToken (유효성 검사 에러)");
    }
  }

  // 서버 컴포넌트에서 database query 를 위한 http request url 을 헤더에 커스텀 데이터를 설정한다.
  const headers = new Headers(request.headers);
  headers.set("pathname", pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: [
    "/auth/signin", // 공개
    "/categories/:path*", // 공개
    "/post/:path*", // 포스트 읽기만 공개한다. 포스트 쓰기, 수정, 삭제는 인증된 사용자에게 공개한다. (accessToken으로 접근)
    "/protected/:path*", // 인증된 사용자에게 공개
  ],
  // matcher: "/:path*",
};
