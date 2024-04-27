import User from "@/lib/models/User";
import { validateEmail, validatePassword } from "@/lib/utils/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  const foundUser: any = await User.findOne({ email }).exec();
  if (!foundUser) {
    return Response.json({ error: "not found" }, { status: 401 });
  }
  console.log({ foundUser });

  // Compare password
  const isCorrectPassword: any = await bcrypt.compare(password, foundUser.password);
  if (!isCorrectPassword) {
    return Response.json({ error: "incorrect password" }, { status: 401 });
  }

  // Create jwt token
  const jwtSecret: any = process.env.JWT_SECRET;
  const accessToken = jwt.sign({ email, password }, jwtSecret, { expiresIn: "2h" });
  console.log({ accessToken });

  //

  return Response.json({ message: "..." });
}
