import User from "@/lib/models/User";
import { validateEmail, validatePassword } from "@/lib/utils/auth";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  console.log("\n\x1b[34m[api/auth/signup]:::[POST]\x1b[0m");

  // Read data
  const { name, email, password } = await request.json();
  if (!name || !email || !password) {
    return Response.json({ error: "missing payload" }, { status: 400 });
  }

  // Validate data
  if (!validateEmail(email) || !validatePassword(password)) {
    return Response.json({ error: "invalid email or password" }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a user in db
  const newUser = await User.create({ name, email, password: hashedPassword });
  console.log({ newUser });

  return Response.json({ newUser });
}
