import { validateEmail, validatePassword } from "@/lib/utils/auth";
import User from "@/lib/models/User";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  console.log("\n\x1b[34m[api/auth/signup]:::[POST]\x1b[0m");

  // Read data
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
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
