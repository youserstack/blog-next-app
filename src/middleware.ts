import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/profile", "/admin"]; // 예시 경로
const protectedApiRoutes = [{ path: "/api/categories", methods: ["POST", "PATCH", "DELETE"] }];

export default async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  console.log("middleware...", request.nextUrl.pathname, token);

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  // 인증된 사용자만 보호된 경로에 접근할 수 있도록 합니다.
  if (isProtectedRoute && !token) {
    // 인증되지 않은 사용자는 로그인 페이지로 리디렉션합니다.
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // 요청 경로와 메서드가 보호된 API 경로인지 확인
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
  matcher: ["/dashboard/:path*", "/profile/:path*", "/admin/:path*", "/api/categories/:path*"], // matcher를 통해 특정 경로에 대해 middleware 적용
};

// const PROTECTED_PAGES = ["/protected"];
// const PROTECTED_APIS = ["/api/categories", "/api/comments", "/api/posts"];
// const PROTECTED_METHODS = ["POST", "DELETE", "PATCH"];
// async function some(request: NextRequest) {
//   // 인증박식 2) 일반적인 jwt 방식을 이용해서 토큰을 추출한다.
//   const accessToken = request.headers.get("Authorization")?.split(" ")[1] as string;
//   const refreshToken: any = cookies().get("refreshToken")?.value;
//   const { pathname } = request.nextUrl;
//   let user = null;
//   try {
//     user = await verifyRefreshToken(refreshToken);
//   } catch (error) {
//     user = null;
//   }

//   const isProtectedPage = PROTECTED_PAGES.some((page: string) => pathname.startsWith(page));
//   const isProtectedApi =
//     PROTECTED_APIS.some((api: string) => pathname.startsWith(api)) &&
//     PROTECTED_METHODS.includes(request.method);

//   if (isProtectedPage) {
//     console.log("\n\x1b[32m[middleware]\x1b[0m");
//     console.log({ protectedPage: pathname });

//     if (!refreshToken) {
//       console.error("요청된 page는 refreshToken이 요구됩니다.");
//       return NextResponse.redirect(new URL("/auth/signin", request.url));
//     } else if (!user) {
//       console.error("refreshToken이 유효하지 않습니다.");
//       return NextResponse.redirect(new URL("/auth/signin", request.url));
//     }

//     console.log("refreshToken.user", user);
//   }

//   if (isProtectedApi) {
//     console.log("\n\n\n\x1b[32m[middleware]\x1b[0m");
//     console.log({ protectedApi: pathname, method: request.method });

//     if (!accessToken) {
//       console.log("accessToken이 요구됩니다.");
//       return NextResponse.json({ error: "accessToken이 요구됩니다." }, { status: 401 });
//     }

//     try {
//       user = await verifyAccessToken(accessToken);
//       console.log({ user });
//     } catch (error) {
//       console.error({ error });
//       user = null;
//       return NextResponse.json({ error }, { status: 403 });
//     }
//   }
// }
// 헤더에 nextauth token, general jwt token 중에서 어느 하나를 추가해준다.
// let headers = new Headers(request.headers);
// const payload = JSON.stringify(token || user);
// headers.set("user", payload);
// return NextResponse.next({ request: { headers } });
