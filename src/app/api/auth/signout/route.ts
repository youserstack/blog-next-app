import { cookies } from "next/headers";

export async function GET(request: Request) {
  console.log("\n\x1b[32m[api/auth/signout]\x1b[0m");
  cookies().delete("refreshToken");
  return Response.json({ message: "로그아웃되었습니다." });
}
