import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "@/lib/utils/auth";
import User from "@/lib/models/User";
import connectDB from "@/lib/config/connectDB";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  console.log("\n\x1b[32m[api/auth/refresh]\x1b[0m");
  await connectDB();

  // Read the token (토큰 추출)
  const refreshToken = cookies().get("refreshToken")?.value;
  if (!refreshToken) {
    return Response.json(
      { error: "no refreshToken" },
      { status: 401, statusText: "no refreshToken" }
    );
  }

  // Validate the token (토큰 검증)
  // try {
  //   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
  // } catch (error) {
  //   console.log('유효하지 않은 refreshToken 입니다.')
  //   cookies().delete("refreshToken");
  //   return Response.json({ error: "forbiden" }, { status: 403 });
  // }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err, user) => {
    if (err) return Response.json({ error: "forbiden" }, { status: 403 });
    console.log("refreshToken이 유효합니다.");
    console.log({ user });
    // const newAccessToken = generateAccessToken({ name: user.name });
    // Response.json({ accessToken: newAccessToken });
  });

  // Issue the new tokens (새로운 토큰 발급)
  // const payload = { email: foundUser.email, password: foundUser.password };
  // const newAccessToken = generateAccessToken(payload);
  // const newRefreshToken = generateRefreshToken(payload);

  // Set the tokens
  // 데이터베이스에 리프레시 토큰 저장
  // 쿠키에 리프레시 토큰 저장하고 페이로드에 액세스 토큰 저장
  // foundUser.refreshToken = newRefreshToken;
  // const savedUser = await foundUser.save();
  // // console.log({ savedUser });
  // cookies().set("refreshToken", newRefreshToken, {
  //   secure: true,
  //   httpOnly: true,
  //   // maxAge: 1000 * 60 * 60 * 24, // 1초 * 60초 * 60분 * 24시 = 1일
  //   expires: Date.now() + 1000 * 60 * 60 * 24,
  //   path: "/",
  //   sameSite: "strict",
  // });
  // console.log({ refreshToken, newRefreshToken });
  // return Response.json({ accessToken: newAccessToken });
}

// Lookup the user (유저 조회)
// const foundUser = await User.findOne({ refreshToken }).exec();
// if (!foundUser) {
//   console.log("no foundUser");
//   console.log("refreshToken 유효성 검사를 통해 재사용된 토큰인지 검사!");
//   jwt.verify(
//     refreshToken,
//     process.env.REFRESH_TOKEN_SECRET as string,
//     async (error: any, decoded: any) => {
//       if (error) {
//         console.log("verification error : ", { error });
//         return Response.json({ error: "forbidden" }, { status: 403 });
//       }

//       // 리프레시 토큰이 만료되지 않은 경우 로그 남기기
//       console.log("attempted refreshToken reuse (유효기간이 만료되지 않음)");

//       // 데이터베이스에서 사용자를 찾기
//       const hackedUser = await User.findOne({ email: decoded.email });
//       if (!hackedUser) return;
//       console.log({ hackedUser });

//       // 혹시 모를 해킹을 대비해서, 해킹사용자가 접근했다면, 데이터베이스의 원래 사용자의 refreshToken을 초기화해준다.
//       hackedUser.refreshToken = "해킹을 대비한 초기화";
//       await hackedUser.save();
//     }
//   );

//   cookies().delete("refreshToken");
//   revalidatePath(request.url);
//   return Response.json({ error: "forbidden" }, { status: 403 });
// }
