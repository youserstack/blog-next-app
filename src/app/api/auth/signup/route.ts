import User from "@/lib/models/User";
import { validateEmail, validatePassword } from "@/lib/utils/auth";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  // Read data
  const { name, email, password } = await request.json();
  // console.log({ name, email, password });
  if (!name || !email || !password) {
    return Response.json({ error: "missing payload" }, { status: 400 });
  }

  // Validate data
  if (!validateEmail(email) || !validatePassword(password)) {
    return Response.json({ error: "invalid email or password" }, { status: 400 });
  }

  // Hash the password
  const hash = bcrypt.hashSync(password, 8);
  // console.log({ hash });

  // Create a user in db
  const newUser = await User.create({ name, email, password: hash });
  // console.log({ newUser });

  return Response.json({ newUser });
}
