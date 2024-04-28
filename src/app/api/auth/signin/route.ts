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

  // Validate data
  if (!validateEmail(email) || !validatePassword(password)) {
    return Response.json({ error: "invalid email or password" }, { status: 400 });
  }

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

  // Create jwt token
  const payload = { email, password };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  // console.log({ accessToken, refreshToken });

  // Set the tokens (database), (client cookie and payload)
  foundUser.refreshToken = refreshToken;
  const savedUser = await foundUser.save();
  // console.log({ savedUser });

  return Response.json({ accessToken, refreshToken });
}
