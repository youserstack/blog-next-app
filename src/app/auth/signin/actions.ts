"use server";

import connectDB from "@/lib/config/connectDB";
import { cookies } from "next/headers";

export async function signin(prevState: any, formData: FormData) {
  console.log("\n\x1b[35m<signin>\x1b[0m");
  await connectDB();

  const email = formData.get("email");
  const password = formData.get("password");

  const response = await fetch(`${process.env.ROOT_URL}/api/auth/signin`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const result = await response.json();

  if (response.ok) {
    cookies().set("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: Date.now() + 1000 * 60 * 60 * 24, // maxAge: 1000 * 60 * 60 * 24, // 1초 * 60초 * 60분 * 24시 = 1일
      path: "/",
    });
    return { status: "ok", accessToken: result.accessToken };
  } else {
    return { status: "error", error: result.error };
  }
}
