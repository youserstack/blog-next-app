import { verifyAccessToken, verifyRefreshToken } from "@/lib/utils/authEdge";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PAGES = ["/protected"];
const PROTECTED_APIS = ["/api/categories", "/api/comments", "/api/posts"];
const PROTECTED_METHODS = ["POST", "DELETE", "PATCH"];

export default async function middleware(request: NextRequest) {
  // Oauth
  if (request.nextUrl.pathname === "/auth/signin") {
    const token = await getToken({ req: request });
    if (token) {
      NextResponse.redirect(new URL("/", request.url));
    }
  }

  // extract
  const { pathname } = request.nextUrl;
  const accessToken = request.headers.get("Authorization")?.split(" ")[1] as string;
  const refreshToken: any = cookies().get("refreshToken")?.value;

  // authenticate
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

  let headers = new Headers(request.headers);
  const payload = JSON.stringify(
    user
      ? {
          ...user,
          refreshToken: refreshToken?.slice(-5),
          accessToken: accessToken?.slice(-5),
        }
      : null
  );
  headers.set("user", payload);
  return NextResponse.next({ request: { headers } });
}

export const config = { matcher: ["/:path*"] };

// configurate the custom header
// let response = NextResponse.next();
// const payload = JSON.stringify(
//   user
//     ? {
//         ...user,
//         refreshToken: refreshToken?.slice(-5),
//         accessToken: accessToken?.slice(-5),
//       }
//     : null
// );
// response.headers.set("user", payload);
// return response;
