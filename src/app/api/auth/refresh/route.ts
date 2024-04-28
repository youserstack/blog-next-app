import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "@/lib/utils/auth";
import User from "@/lib/models/User";
import connectDB from "@/lib/config/connectDB";

export async function GET(request: Request) {
  console.log("\n[api/auth/refresh]");

  // Connect to db (데이터베이스 연결)
  await connectDB();

  // Read the token (토큰 추출)
  const refreshToken = cookies().get("refreshToken")?.value;
  if (!refreshToken) {
    console.log("no refreshToken");
    return Response.json({ error: "no refreshToken" }, { status: 401 });
  }
  // console.log({ refreshToken });

  // Lookup the user (유저 조회)
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    console.log("no foundUser");

    // 해킹된 토큰인지 검사
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESHTOKEN_SECRET as string,
      async (error: any, decoded: any) => {
        if (error) {
          console.log("verification error : ", { error });
          return Response.json({ error: "forbidden" }, { status: 403 });
        }

        // if the refreshToken is not expired,
        console.log("attempted refreshToken reuse");

        // find the user in database
        const hackedUser = await User.findOne({ email: decoded.email }).exec();
        console.log({ hackedUser });

        // save an empty refreshTokenArray in database
        console.log("saving empty refreshTokenArray in database...");
      }
    );

    return Response.json({ error: "forbidden" }, { status: 403 });
  }
  // console.log({ foundUser });

  // Validate the token (토큰 검증)
  try {
    jwt.verify(refreshToken, process.env.JWT_REFRESHTOKEN_SECRET as string);
  } catch (error) {
    console.log("verification error : ", { error });
    cookies().delete("refreshToken");
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  // Issue the new tokens (새로운 토큰 발급)
  const payload = { email: foundUser.email, password: foundUser.password };
  const newAccessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken(payload);

  // Set the tokens
  // 데이터베이스에 리프레시 토큰 저장
  // 쿠키에 리프레시 토큰 저장하고 페이로드에 액세스 토큰 저장
  foundUser.refreshToken = newRefreshToken;
  const savedUser = await foundUser.save();
  // console.log({ savedUser });
  cookies().set("refreshToken", newRefreshToken, {
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1초 * 60초 * 60분 * 24시 = 1일
    path: "/",
    sameSite: "strict",
  });
  console.log({ refreshToken, newRefreshToken });
  return Response.json({ accessToken: newAccessToken });
}
