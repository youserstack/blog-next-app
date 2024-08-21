import { verifyAccessToken, verifyRefreshToken } from "@/lib/utils/authEdge";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PAGES = ["/protected"];
const PROTECTED_APIS = ["/api/categories", "/api/comments", "/api/posts"];
const PROTECTED_METHODS = ["POST", "DELETE", "PATCH"];

export default async function middleware(request: NextRequest) {
  // extract
  // 인증방식 1) nextauth 를 통해서 토큰을 추출한다.
  const token = await getToken({ req: request });
  // 인증박식 2) 일반적인 jwt 방식을 이용해서 토큰을 추출한다.
  const accessToken = request.headers.get("Authorization")?.split(" ")[1] as string;
  const refreshToken: any = cookies().get("refreshToken")?.value;
  const { pathname } = request.nextUrl;
  let user = null;
  try {
    user = await verifyRefreshToken(refreshToken);
  } catch (error) {
    user = null;
  }

  const isProtectedPage = PROTECTED_PAGES.some((page: string) => pathname.startsWith(page));
  const isProtectedApi =
    PROTECTED_APIS.some((api: string) => pathname.startsWith(api)) &&
    PROTECTED_METHODS.includes(request.method);

  if (isProtectedPage) {
    console.log("\n\x1b[32m[middleware]\x1b[0m");
    console.log({ protectedPage: pathname });

    if (!refreshToken) {
      console.error("요청된 page는 refreshToken이 요구됩니다.");
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    } else if (!user) {
      console.error("refreshToken이 유효하지 않습니다.");
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    console.log("refreshToken.user", user);
  }

  if (isProtectedApi) {
    console.log("\n\n\n\x1b[32m[middleware]\x1b[0m");
    console.log({ protectedApi: pathname, method: request.method });

    if (!accessToken) {
      console.log("accessToken이 요구됩니다.");
      return NextResponse.json({ error: "accessToken이 요구됩니다." }, { status: 401 });
    }

    try {
      user = await verifyAccessToken(accessToken);
      console.log({ user });
    } catch (error) {
      console.error({ error });
      user = null;
      return NextResponse.json({ error }, { status: 403 });
    }
  }

  // 헤더에 nextauth token, general jwt token 중에서 어느 하나를 추가해준다.
  let headers = new Headers(request.headers);
  const payload = JSON.stringify(token || user);
  headers.set("user", payload);
  return NextResponse.next({ request: { headers } });
}

export const config = { matcher: ["/:path*"] };
