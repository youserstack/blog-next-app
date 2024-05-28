import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// accessToken 으로 데이터 요청하면 토큰을 검증하게 되고
// 토큰이 만료되면 서버에서 쿠키에 저장된 refreshToken 을 가지고
// 유효성 검증을 하게 되고
// 유효하다면 accessToken, refreshToken을 새롭게 발급한다.
// 하지만, 유효하지 않다면 쿠키에 refreshToken을 제거한다.

// 페이지라우트 접근시 refreshToken 을 검사
// 단순히 페이지의 접근이기 때문에 refreshToken 만 검사한다.
// 프로텍티드 페이지인 경우에는 인증된 사용자만 접근을 허용한다. (blog post 생성/수정/삭제)
// '/auth/signin' 페이지로의 접근시 토근이 유효하다면 홈페이지로 리다이렉트를 한다.
const PROTECTED_PAGES = ["/protected", "/dashboard", "/posts/create"];

// 백앤드포인트 접근시 accessToken 을 검사 => 무효하다면 refreshAuth (newAccessToken, newRefreshToken)
// 중요한 데이터이기때문에 반드시 accessToken 이 필요하다.
// 각각의 백엔드포인트에서는 accessToken으로 접근한 경우에만 허용한다.
const PROTECTED_PATHS = ["/api/auth/refresh", "/api/posts/create", "/api/categories/create"];

export default async function middleware(request: NextRequest) {
  console.log("\n\x1b[32m[middleware]");
  const { pathname } = request.nextUrl;
  const refreshToken: any = cookies().get("refreshToken")?.value;

  // page, api를 구분하여 로깅한다.
  if (pathname.startsWith("/api")) console.log({ api: pathname });
  else console.log({ page: pathname });

  const isProtectedPage = PROTECTED_PAGES.some((page: string) => pathname.startsWith(page));
  if (isProtectedPage) {
    if (!refreshToken) {
      console.log("no refreshToken");
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
    try {
      const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET);
      await jwtVerify(refreshToken, secret, {});
      console.log("valid refreshToken");
    } catch (error) {
      console.log("invalid refreshToken");
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  // 인증된 사용자라면 사인인 페이지로의 접근은 필요하지 않으므로 홈페이지로 리다이렉트한다.
  if (pathname.startsWith("/auth/signin") && refreshToken) {
    try {
      const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET);
      await jwtVerify(refreshToken, secret, {});
      console.log("valid refreshToken");
      return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
      console.log("invalid refreshToken");
    }
  }

  // 커스텀 헤더 설정
  // 서버 컴포넌트에서 database query 를 위한 http request url 을 헤더에 커스텀 데이터를 설정한다.
  const headers = new Headers(request.headers);
  headers.set("pathname", pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: [
    "/auth/signin",
    "/categories/:path*",
    // protected pages or paths
    "/posts/:path*", // 포스트 읽기만 공개한다. 포스트 쓰기, 수정, 삭제는 인증된 사용자에게 공개한다. (accessToken으로 접근)
    "/protected/:path*",
    "/dashboard",
  ],
};

// matcher: "/:path*",
