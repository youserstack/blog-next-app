"use server";

import connectDB from "@/lib/config/connectDB";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signin(prevState: any, formData: FormData) {
  console.log("\nsignin-page > server-action");

  // Connect to db
  await connectDB();

  // Get data
  const email = formData.get("email");
  const password = formData.get("password");

  // Send to api route
  const response = await fetch(`${process.env.ROOT_URL}/api/auth/signin`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const result = await response.json();
  console.log({ "로그인 결과": result });

  // Redirect to protected page
  if (response.ok) {
    cookies().set("refreshToken", result.refreshToken, {
      secure: true,
      httpOnly: true,
      // maxAge: 1000 * 60 * 60 * 24, // 1초 * 60초 * 60분 * 24시 = 1일
      expires: Date.now() + 1000 * 60 * 60 * 24,
      path: "/",
      sameSite: "strict",
    });
    redirect("/protected");
  } else {
    return result.error;
  }
}
