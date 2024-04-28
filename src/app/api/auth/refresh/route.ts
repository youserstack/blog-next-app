import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "@/lib/utils/auth";
import User from "@/lib/models/User";
import connectDB from "@/lib/config/connectDB";

export async function GET(request: Request) {
  console.log("\n[api/auth/refresh]");

  // Connect to db
  await connectDB();

  // Read the token
  const refreshToken = cookies().get("refreshToken")?.value;
  if (!refreshToken) {
    console.log("no refreshToken");
    return Response.json({ error: "no refreshToken" }, { status: 401 });
  }
  // console.log({ refreshToken });

  // Validate it
  try {
    jwt.verify(refreshToken, process.env.JWT_REFRESHTOKEN_SECRET as string);
  } catch (error) {
    console.log({ error });
    cookies().set("refreshToken", "", {
      secure: true,
      httpOnly: true,
      maxAge: 0,
      path: "/",
      sameSite: "strict",
    });
    return Response.json({ error: "invalid refreshToken" }, { status: 401 });
  }

  // Lookup the user
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    console.log("not found");
    cookies().delete("refreshToken");
    console.log({ foundUser });
    foundUser.refreshToken = "";
    await foundUser.save();
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  // console.log({ foundUser });

  // Issue the new tokens
  const payload = { email: foundUser.email, password: foundUser.password };
  const newAccessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken(payload);

  // Set the tokens (database), (client cookie and payload)
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
  // console.log({ refreshToken, newRefreshToken });
  return Response.json({ accessToken: newAccessToken });
}
