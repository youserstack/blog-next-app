import User from "@/lib/models/User";
import {
  generateAccessToken,
  generateRefreshToken,
  validateEmail,
  validatePassword,
} from "@/lib/utils/auth";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  // Read data
  const { email, password } = await request.json();
  if (!email || !password) {
    return Response.json({ error: "missing payload" }, { status: 400 });
  }

  // 이메일, 패스워드 데이터의 유효성을 검사한다.
  // Validate data
  if (!validateEmail(email) || !validatePassword(password)) {
    return Response.json({ error: "invalid email or password" }, { status: 400 });
  }

  // 데이터베이스에서 있는지 찾아본다.
  // Lookup the user
  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  // console.log({ foundUser });

  // Compare password
  const isCorrectPassword: any = await bcrypt.compare(password, foundUser.password);
  if (!isCorrectPassword) {
    return Response.json({ error: "incorrect password" }, { status: 401 });
  }

  // 서버는 사용자를 인증한 후, accessToken과 refreshToken을 발급한다. ***
  // Create jwt token
  const payload = { email, password };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  // console.log({ accessToken, refreshToken });

  // 리프레시토큰을 데이터베이스에 저장한다.
  // Set the tokens (database), (client cookie and payload)
  foundUser.refreshToken = refreshToken;
  const savedUser = await foundUser.save();
  // console.log({ savedUser });

  // server action 에서 refreshToken 을 쿠키에 저장하고, accessToken 을 리턴한다.
  return Response.json({ accessToken, refreshToken });
}
