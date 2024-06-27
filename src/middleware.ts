import { verifyAccessToken, verifyRefreshToken } from "@/lib/utils/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PAGES = ["/protected", "/dashboard"];
const PROTECTED_APIS = ["/api/categories", "/api/comments", "/api/posts"];
const PROTECTED_METHODS = ["POST", "DELETE", "PATCH"];

export default async function middleware(request: NextRequest) {
  // extract (pathname, tokens)
  // if (pathname.startsWith("/_next")) return;
  const { pathname } = request.nextUrl;
  const accessToken = request.headers.get("Authorization")?.split(" ")[1] as string;
  const refreshToken: any = cookies().get("refreshToken")?.value;

  // authenticate
  // const user = await verifyRefreshToken(refreshToken).catch((error: any) => null);
  let user = null;
  try {
    user = await verifyRefreshToken(refreshToken);
  } catch (error) {
    user = null;
  }

  // make conditions (for branches)
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
      const message = "요청된 API는 accessToken이 요구됩니다.";
      console.log(message);
      return NextResponse.json({ error: { message } }, { status: 401 });
    }

    // const user = await verifyAccessToken(accessToken).catch((error: any) => error);
    // if (user instanceof Error) {
    //   console.error("accessToken 이 유효하지 않습니다.");
    //   return NextResponse.json({ error: user }, { status: 403 });
    // }
    // console.log("accessToken.user", user);

    try {
      user = await verifyAccessToken(accessToken);
      console.log({ user });
    } catch (error) {
      console.error({ error });
      user = null;
      return NextResponse.json({ error }, { status: 403 });
    }
  }

  // 인증된 사용자라면 로그인이 필요하지 않으므로 홈페이지로 리다이렉트한다.
  if (pathname.startsWith("/auth/signin") && user) {
    console.log("user 정보가 있습니다. 로그인을 필요로하지 않으므로 홈페이지로 이동합니다.");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // configurate the custom header
  let response = NextResponse.next();
  response.headers.set(
    "user",
    JSON.stringify(
      user
        ? {
            ...user,
            refreshToken: refreshToken?.slice(-5),
            accessToken: accessToken?.slice(-5),
          }
        : null
    )
  );

  return response;

  // const headers = new Headers(request.headers);
  // headers.set(
  //   "user",
  //   JSON.stringify(
  //     user
  //       ? {
  //           ...user,
  //           refreshToken: refreshToken?.slice(-5),
  //           accessToken: accessToken?.slice(-5),
  //         }
  //       : null
  //   )
  // );
  // return NextResponse.next({ request: { headers } });
}

export const config = { matcher: ["/:path*"] };

// 미들웨어를 거치지 않고 page, api를 서버에서 핸들링하게되면,
// 커스텀 헤더를 설정하지 않는다.
// 커스텀 헤더에는 토큰을 검증한 결과가 담기게 되는데, 서버에서 프리렌더링되는 서버컴포넌트에서는 커스텀 헤더의 인증정보를 가지고 올수가 없다.

// matcher: ['/:path*'] 를 하게 되면, "/_next/static" 의 요청까지 미들웨어가 동작하게 된다.
