import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/config/connectDB";
import { generateAccessToken, generateRefreshToken } from "@/lib/utils/auth";
import { revalidatePath } from "next/cache";
import User from "@/lib/models/User";

export async function GET(request: Request) {
  console.log("\n\x1b[32m[api/auth/refresh]\x1b[0m");
  await connectDB();

  // extraction
  const refreshToken = cookies().get("refreshToken")?.value;
  if (!refreshToken) {
    return Response.json(
      { error: "no refreshToken" },
      { status: 401, statusText: "리프레시 토큰이 없습니다." }
    );
  }

  // query
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    console.log("데이터베이스에서는 요청된 refreshToken을 가진 사용자를 찾을 수 없습니다.");
    try {
      const decoded: any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
      console.log("refreshToken의 유효성 검사를 진행하였고, 이 토큰은 유효합니다.");

      const hackedUser = await User.findOne({ email: decoded.email });
      if (!hackedUser) return;
      console.log(
        "이 토큰으로부터 이메일을 추출하여 다시 데이터베이스에서 조회를 하였고, 그 사용자는 다음과 같습니다.",
        { hackedUser },
        "해킹된 것으로 간주하고 보안을 위해서 해킹된 사용자의 refreshToken을 초기화합니다."
      );
      hackedUser.refreshToken = "해킹을 대비한 초기화";
      await hackedUser.save();
      console.log({ hackedUser });

      return Response.json({ error: "Unauthorized" }, { status: 401 });
    } catch (error: any) {
      console.error("유효하지 않은 refreshToken입니다.", error.message);
      return Response.json(
        { error: "유효하지 않은 refreshToken입니다." },
        {
          status: 401,
          statusText:
            "데이터베이스에서 조회는 되지만, 현재의 요청된 refreshToken은 유효하지 않습니다.",
        }
      );
    }
  }

  // validation
  try {
    const user: any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
    console.log("valid refreshToken.");
    console.log("newAccessToken issued.");
    const payload = { email: user.email };
    const newAccessToken = generateAccessToken(payload);
    return Response.json({ newAccessToken }, { status: 200 });
  } catch (error: any) {
    console.error("액세스 토큰 갱신을 실패했습니다.", error.message);
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
}

//   cookies().delete("refreshToken");
//   revalidatePath(request.url);
//   return Response.json({ error: "forbidden" }, { status: 403 });
// }
