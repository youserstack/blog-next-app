import connectDB from "@/lib/config/connectDB";
import User from "@/lib/models/User";
import {
  generateAccessToken,
  generateRefreshToken,
  validateEmail,
  validatePassword,
} from "@/lib/utils/auth";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

connectDB();

export async function POST(request: Request) {
  console.log("\n\x1b[32m[api/auth/signin]:::[POST]\x1b[0m");

  // extract
  const { email, password } = await request.json();
  const isPayloadMissing = !email || !password;
  if (isPayloadMissing) return Response.json({ error: "missing payload" }, { status: 400 });

  // validate the email and password
  const isValidated = !validateEmail(email) || !validatePassword(password);
  if (isValidated) return Response.json({ error: "invalid email or password" }, { status: 400 });

  // query
  const foundUser = await User.findOne({ email });
  if (!foundUser) return Response.json({ error: "unauthorized" }, { status: 401 });
  // console.log({ foundUser });

  // authenticate
  const isCorrectPassword: any = await bcrypt.compare(password, foundUser.password);
  if (!isCorrectPassword) return Response.json({ error: "incorrect password" }, { status: 401 });

  // authorize
  const payload = { email, password };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  // console.log({ accessToken, refreshToken });

  // 리프레시토큰을 데이터베이스에 저장한다.
  // Set the tokens (database), (client cookie and payload)
  foundUser.refreshToken = refreshToken;
  const savedUser = await foundUser.save();
  // console.log({ savedUser });

  revalidatePath("/", "layout");

  // server action 에서 refreshToken 을 쿠키에 저장하고, accessToken 을 리턴한다.
  return Response.json({ accessToken, refreshToken });
}
