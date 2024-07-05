import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/config/connectDB";
import { generateAccessToken } from "@/lib/utils/auth";
import User from "@/lib/models/User";

export async function GET(request: Request) {
  console.log("\n\x1b[32m[api/auth/refresh]\x1b[0m");
  await connectDB();

  // extract
  const refreshToken = cookies().get("refreshToken")?.value;
  if (!refreshToken) return Response.json({ error: "refreshToken이 없습니다." }, { status: 400 });

  // query
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    console.log("데이터베이스에서는 요청된 refreshToken을 가진 사용자를 찾을 수 없습니다.");
    try {
      const decoded: any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
      console.log("refreshToken의 유효성 검사를 진행하였고, 이 토큰은 유효합니다.");

      const hackedUser = await User.findOne({ email: decoded.email });
      if (!hackedUser) return;
      hackedUser.refreshToken = "해킹을 대비한 초기화";
      await hackedUser.save();
      console.log({ hackedUser });

      const error = "해킹된 것으로 간주하고 해킹된 사용자의 refreshToken을 초기화합니다.";
      return Response.json({ error }, { status: 401 });
    } catch (error: any) {
      console.error("유효하지 않은 refreshToken입니다.", error.message);
      return Response.json({ error: error.message }, { status: 401 });
    }
  }

  // validation
  try {
    const secretKey = process.env.REFRESH_TOKEN_SECRET as string;
    const user: any = jwt.verify(refreshToken, secretKey);
    console.log("newAccessToken 이 발급되었습니다.");
    const payload = { email: user.email };
    const newAccessToken = generateAccessToken(payload);
    return Response.json({ newAccessToken }, { status: 200 });
  } catch (error: any) {
    console.error("액세스 토큰 갱신을 실패했습니다.", error.message);
    return Response.json({ error: "액세스 토큰 갱신을 실패했습니다." }, { status: 401 });
  }
}
