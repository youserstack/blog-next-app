import { validateEmail, validatePassword } from "@/lib/utils/auth";
import User from "@/lib/models/User";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  console.log("\n\x1b[34m[api/auth/signup]:::[POST]\x1b[0m");

  // 추출
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  console.log({ name, email, password });
  if (!name || !email || !password) {
    return Response.json({ error: "missing payload" }, { status: 400 });
  }

  // 유효성 체크
  if (!validateEmail(email) || !validatePassword(password)) {
    return Response.json({ error: "invalid email or password" }, { status: 400 });
  }

  // 비밀번호 해쉬암호화
  const hashedPassword = await bcrypt.hash(password, 10);

  // 사용자 생성
  const newUser = await User.create({
    provider: "credentials",
    name,
    email,
    password: hashedPassword,
  });
  console.log({ newUser });

  return Response.json({ newUser });
}
