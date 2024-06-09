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
  "/api/comments/create",
  "/api/categories/create",
  "/api/test",
];

// 토큰 검증 함수
async function verifyToken(token: string, secret: string) {
  const encodedSecret = new TextEncoder().encode(secret);
  return jwtVerify(token, encodedSecret, {});
}

export default async function middleware(request: NextRequest) {
  // extraction
  const accessToken = request.headers.get("Authorization")?.split(" ")[1];
  const refreshToken: any = cookies().get("refreshToken")?.value;
  const { pathname } = request.nextUrl;
  const isProtectedPage = PROTECTED_PAGES.some((page: string) => pathname.startsWith(page));
  const isProtectedApi = PROTECTED_APIs.some((api: string) => pathname.startsWith(api));

  // 커스텀 헤더 설정
  const headers = new Headers(request.headers);
  headers.set("pathname", pathname);

  // page, api를 구분하여 로깅한다. protected api, protected page 만 로깅한다.
  if (pathname.startsWith("/api")) {
    if (isProtectedApi) {
      console.log("\n\x1b[32m[middleware]\x1b[0m");
      console.log({ protectedApi: pathname });
    }
    // else console.log({ api: pathname });
  } else {
    if (isProtectedPage) {
      console.log("\n\x1b[32m[middleware]\x1b[0m");
      console.log({ protectedPage: pathname });
    }
    // else console.log({ page: pathname });
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
      return Response.json({ error: { message } }, { status: 401 });
    } else {
      // console.log({ accessToken });
      try {
        const decoded = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET as string);
        const email = decoded.payload.email as string;
        headers.set("email", email);
        console.log("엑세스 토큰이 유효합니다.", { email });
      } catch (error: any) {
        console.log("엑세스 토큰이 유효하지 않습니다.");
        return Response.json({ error }, { status: 403 });
      }
    }
  }

  // 인증된 사용자라면 로그인이 필요하지 않으므로 홈페이지로 리다이렉트한다.
  if (pathname.startsWith("/auth/signin") && refreshToken) {
    try {
      await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
      console.log("리프레시 토큰이 유효합니다. 로그인이 필요없으므로 홈페이지로 이동합니다.");
      return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
      console.log("리프레시 토큰이 유효하지 않습니다.");
    }
  }

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: [
    // public pages
    "/auth/signin",

    // protected pages
    "/posts/:path*",
    "/dashboard",
    "/protected/:path*",

    // protected api
    "/api/posts/:path*",
    "/api/comments/:path*",
    "/api/categories/:path*",
    "/api/test",
  ],
};
