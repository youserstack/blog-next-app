"use server";

import connectDB from "@/lib/config/connectDB";
import { cookies } from "next/headers";

export async function signinAction(prevState: any, formData: FormData) {
  console.log("\n\x1b[35m<signinAction>\x1b[0m");
  await connectDB();

  // extract
  const email = formData.get("email");
  const password = formData.get("password");

  // request
  const response = await fetch(`${process.env.ROOT_URL}/api/auth/signin`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const result = await response.json();

  // branch
  if (!response.ok) return { error: result.error };
  cookies().set("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: Date.now() + 1000 * 60 * 60 * 24, // maxAge: 1000 * 60 * 60 * 24, // 1초 * 60초 * 60분 * 24시 = 1일
    path: "/",
  });
  return { accessToken: result.accessToken };
  // if (response.ok) {
  //   cookies().set("refreshToken", result.refreshToken, {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: "strict",
  //     expires: Date.now() + 1000 * 60 * 60 * 24, // maxAge: 1000 * 60 * 60 * 24, // 1초 * 60초 * 60분 * 24시 = 1일
  //     path: "/",
  //   });
  //   return { status: "ok", accessToken: result.accessToken };
  // } else {
  //   return { status: "error", error: result.error };
  // }
}
