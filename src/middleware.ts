import { verifyAccessToken, verifyToken } from "@/lib/utils/auth";
import { JWTPayload, jwtVerify } from "jose";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PAGES = ["/protected", "/dashboard"];
const PROTECTED_APIS = ["/api/categories", "/api/comments", "/api/posts"];
const PROTECTED_METHODS = ["POST", "DELETE", "PATCH"];

// async function verifyToken(token: string, secret: string): Promise<JWTPayload> {
//   const encodedSecret = new TextEncoder().encode(secret);
//   const { payload } = await jwtVerify(token, encodedSecret);
//   return payload;
// }

export default async function middleware(request: NextRequest) {
  // extract
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/_next")) return;
  const accessToken = request.headers.get("Authorization")?.split(" ")[1] as string;
  const refreshToken: any = cookies().get("refreshToken")?.value;

  // make conditions
  const isProtectedPage = PROTECTED_PAGES.some((page: string) => pathname.startsWith(page));
  const isProtectedApi =
    PROTECTED_APIS.some((api: string) => pathname.startsWith(api)) &&
    PROTECTED_METHODS.includes(request.method);

  // loggings
  // if (pathname.startsWith("/api")) {
  //   if (isProtectedApi) console.log({ protectedApi: pathname });
  //   else console.log({ publicApi: pathname });
  // } else {
  //   if (isProtectedPage) console.log({ protectedPage: pathname });
  //   else console.log({ publicPage: pathname });
  // }

  // authenticate
  const user = await verifyToken(refreshToken).catch((error: any) => null);

  if (isProtectedPage) {
    console.log("\n\x1b[32m[middleware]\x1b[0m");
    console.log({ protectedPage: pathname });

    if (!refreshToken) {
      console.error("요청된 page는 refreshToken이 요구됩니다.");
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    if (user) console.error("refreshToken이 유효합니다.", user);
    else {
      console.error("refreshToken이 유효하지 않습니다.");
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  if (isProtectedApi) {
    console.log("\n\x1b[32m[middleware]\x1b[0m");
    console.log({ protectedApi: pathname, method: request.method });

    if (!accessToken) {
      const message = "요청된 API는 accessToken이 요구됩니다.";
      console.log(message);
      return NextResponse.json({ error: { message } }, { status: 401 });
    }

    try {
      const user = await verifyAccessToken(accessToken);
      console.log("accessToken이 유효합니다.", user);
    } catch (error) {
      console.error("accessToken이 유효하지 않습니다.", error);
      return NextResponse.json({ error }, { status: 403 });
    }
  }

  // 인증된 사용자라면 로그인이 필요하지 않으므로 홈페이지로 리다이렉트한다.
  // if (pathname.startsWith("/auth/signin") && user) {
  //   console.log("user 정보가 있습니다. 로그인을 필요로하지 않으므로 홈페이지로 이동합니다.");
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // configurate the custom header
  // let response;
  // response = NextResponse.next({ headers });
  const headers = new Headers(request.headers);
  headers.set("user", JSON.stringify(user));
  return NextResponse.next({ request: { headers } });
  // return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    "/:path*",
    // all pages
    // "/",
    // "/auth/:path*",
    // "/categories/:path*",
    // "/dashboard/:path*",
    // "/posts/:path*",
    // "/protected/:path*",

    // APIs
    "/api/:path*",
  ],
};

// 미들웨어를 거치지 않고 page, api를 서버에서 핸들링하게되면,
// 커스텀 헤더를 설정하지 않는다.
// 커스텀 헤더에는 토큰을 검증한 결과가 담기게 되는데, 서버에서 프리렌더링되는 서버컴포넌트에서는 커스텀 헤더의 인증정보를 가지고 올수가 없다.

// matcher: ['/:path*'] 를 하게 되면, "/_next/static" 의 요청까지 미들웨어가 동작하게 된다.
