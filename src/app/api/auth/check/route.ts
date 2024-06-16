import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(requeset: Request) {
  console.log("\n\x1b[32m[api/auth/check]\x1b[0m");

  // extract
  const refreshToken = cookies().get("refreshToken")?.value;
  if (!refreshToken) {
    return Response.json({ error: { code: "NO_REFRESH_TOKEN" } }, { status: 401 });
  }

  // validate
  try {
    const secretKey = process.env.REFRESH_TOKEN_SECRET as string;
    const user: any = jwt.verify(refreshToken, secretKey);
    // authenticated
    console.log("refreshToken이 유효합니다.", { user });
    return Response.json({ auth: "authenticated", user }, { status: 200 });
  } catch (error: any) {
    // unauthenticated
    console.log("refreshToken이 유효하지 않습니다.");
    return Response.json({ auth: "unauthenticated" }, { status: 403 });
  }
}
