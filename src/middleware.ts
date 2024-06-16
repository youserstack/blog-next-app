import { JWTPayload, jwtVerify } from "jose";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PAGES = ["/protected", "/dashboard"];

async function verifyToken(token: string, secret: string): Promise<JWTPayload> {
  const encodedSecret = new TextEncoder().encode(secret);
  const { payload } = await jwtVerify(token, encodedSecret);
  return payload;
}

export default async function middleware(request: NextRequest) {
  let response: NextResponse;

  // extract headers
  const headers = new Headers(request.headers);
  const { pathname } = request.nextUrl;
  const isProtectedPage = PROTECTED_PAGES.some((page: string) => pathname.startsWith(page));
  const isProtectedApi =
    pathname.startsWith("/api") && ["POST", "DELETE", "PATCH"].includes(request.method);
  headers.set("pathname", pathname);

  // extract tokens
  const accessToken = request.headers.get("Authorization")?.split(" ")[1] as string;
  const refreshToken: any = cookies().get("refreshToken")?.value;

  // 모든 페이지에서 쿠키에 저장된 refreshToken으로부터 사용자 인증을 하고,
  // 인증상태를 클라이언트에 넘겨주기위해서 헤더설정을 한다.
  let isRefreshTokenValid = false;
  let user = null;
  try {
    const secret = process.env.REFRESH_TOKEN_SECRET as string;
    user = await verifyToken(refreshToken, secret);
    if (!user.email) throw new Error("사용자 이메일을 찾을 수 없습니다.");
    isRefreshTokenValid = true;
    headers.set("auth", "authenticated");
    headers.set("email", user.email as string);
  } catch (error: any) {
    isRefreshTokenValid = false;
    headers.set("auth", "unauthenticated");
  }

  // page, api를 구분하여 로깅한다. protected api, protected page 만 로깅한다.
  const message = isRefreshTokenValid
    ? "refreshToken이 유효합니다."
    : "refreshToken이 유효하지 않습니다.";
  if (pathname.startsWith("/api")) {
    console.log("\n\x1b[32m[middleware]\x1b[0m");
    console.log({ api: pathname });
    isRefreshTokenValid && console.log(message, user);
    // console.log({ accessToken });
  } else {
    console.log("\n\x1b[32m[middleware]\x1b[0m");
    console.log({ page: pathname });
    isRefreshTokenValid && console.log(message, user);

    // console.log({ refreshToken });
  }

  if (isProtectedPage) {
    if (!refreshToken) {
      console.error("요청된 page는 refreshToken이 요구됩니다.");
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    if (!isRefreshTokenValid) {
      console.error("refreshToken이 유효하지 않습니다.");
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  if (isProtectedApi) {
    if (!accessToken) {
      const message = "요청된 API는 accessToken이 요구됩니다.";
      console.log(message);
      return NextResponse.json({ error: { message } }, { status: 401 });
    }

    try {
      const secret = process.env.ACCESS_TOKEN_SECRET as string;
      const payload: any = await verifyToken(accessToken, secret);
      console.log("accessToken이 유효합니다.", payload);
      headers.set("auth", "authenticated");
      headers.set("email", payload.email);
    } catch (error: any) {
      console.error("accessToken이 유효하지 않습니다.", { error });
      headers.set("auth", "unauthenticated");
      return NextResponse.json({ error }, { status: 403 });
    }
  }

  // 인증된 사용자라면 로그인이 필요하지 않으므로 홈페이지로 리다이렉트한다.
  if (pathname.startsWith("/auth/signin") && refreshToken) {
    console.log(
      "현재 page에서 인증된 토큰정보 refreshToken이 인증되었습니다. 로그인을 필요로하지 않으므로 홈페이지로 이동합니다."
    );
    return NextResponse.redirect(new URL("/", request.url));
  }

  // configurate the custom header
  response = NextResponse.next({ headers });
  return response;
}

export const config = {
  matcher: [
    // all pages
    "/",
    "/auth/:path*",
    "/categories/:path*",
    "/dashboard/:path*",
    "/posts/:path*",
    "/protected/:path*",
    // APIs
    "/api/:path*",
  ],
};

// 미들웨어를 거치지 않고 page, api를 서버에서 핸들링하게되면,
// 커스텀 헤더를 설정하지 않는다.
// 커스텀 헤더에는 토큰을 검증한 결과가 담기게 되는데, 서버에서 프리렌더링되는 서버컴포넌트에서는 커스텀 헤더의 인증정보를 가지고 올수가 없다.

// matcher: ['/:path*'] 를 하게 되면, "/_next/static" 의 요청까지 미들웨어가 동작하게 된다.
