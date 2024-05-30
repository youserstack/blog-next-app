import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// 페이지라우트 접근시 refreshToken 을 검사
// 프로텍티드 페이지인 경우에는 인증된 사용자만 접근을 허용한다. (blog post 생성/수정/삭제)
// '/auth/signin' 페이지로의 접근시 토근이 유효하다면 홈페이지로 리다이렉트를 한다.
const PROTECTED_PAGES = ["/protected", "/dashboard", "/posts/create"];

// 백앤드포인트 접근시 accessToken 을 검사 => 무효하다면 refreshAuth (newAccessToken, newRefreshToken)
// 중요한 데이터이기때문에 반드시 accessToken 이 필요하다.
// 각각의 백엔드포인트에서는 accessToken으로 접근한 경우에만 허용한다.
const PROTECTED_APIs = [
  "/api/auth/refresh",
  "/api/posts/create",
  "/api/categories/create",
  "/api/test",
];

export default async function middleware(request: NextRequest) {
  console.log("\n\x1b[32m[middleware]\x1b[0m");
  const accessToken = request.headers.get("Authorization")?.split(" ")[1];
  const refreshToken: any = cookies().get("refreshToken")?.value;
  const { pathname } = request.nextUrl;
  const isProtectedPage = PROTECTED_PAGES.some((page: string) => pathname.startsWith(page));
  const isProtectedApi = PROTECTED_APIs.some((api: string) => pathname.startsWith(api));

  // page, api를 구분하여 로깅한다.
  if (pathname.startsWith("/api")) {
    if (isProtectedApi) console.log({ protectedApi: pathname });
    else console.log({ api: pathname });
  } else {
    if (isProtectedPage) console.log({ protectedPage: pathname });
    else console.log({ page: pathname });
  }

  if (isProtectedPage) {
    if (!refreshToken) {
      console.log("리프레시 토큰이 없습니다. 로그인 페이지로 이동합니다.");
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
    try {
      const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET);
      await jwtVerify(refreshToken, secret, {});
      console.log("리프레시 토큰이 유효합니다.");
    } catch (error) {
      console.log("리프레시 토큰이 유효하지 않습니다. 로그인 페이지로 이동합니다.");
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  if (isProtectedApi) {
    if (!accessToken) {
      const message = "엑세스 토큰이 없습니다. (protected api > no accessToken)";
      console.log(message);
      return Response.json({ message }, { status: 401 });
    }
    try {
      const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
      await jwtVerify(accessToken, secret, {});
      console.log("엑세스 토큰이 유효합니다.");
    } catch (error) {
      const message = "엑세스 토큰이 유효하지 않습니다. (protected api > jwtVerify error)";
      console.log(message);
      return Response.json({ message }, { status: 403 });
    }
  }

  // 인증된 사용자라면 로그인이 필요하지 않으므로 홈페이지로 리다이렉트한다.
  if (pathname.startsWith("/auth/signin") && refreshToken) {
    try {
      const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET);
      await jwtVerify(refreshToken, secret, {});
      console.log("리프레시 토큰이 유효합니다. 로그인이 필요없으므로 홈페이지로 이동합니다.");
      return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
      console.log("리프레시 토큰이 유효하지 않습니다.");
    }
  }

  // 커스텀 헤더 설정
  const headers = new Headers(request.headers);
  headers.set("pathname", pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: [
    "/auth/signin",

    // protected pages
    "/protected/:path*",
    "/dashboard",
    "/categories/create",
    "/posts/create",
    // "/categories/:path*",
    // "/posts/:path*", // 포스트 읽기만 공개한다. 포스트 쓰기, 수정, 삭제는 인증된 사용자에게 공개한다. (accessToken으로 접근)

    // protected api
    // "/api/auth/refresh",
    "/api/test",
  ],
};

// matcher: "/:path*",
