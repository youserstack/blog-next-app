"use server";

import connectDB from "@/lib/config/connectDB";
import { redirect } from "next/navigation";

export async function signup(prevState: any, formData: FormData) {
  console.log("\nsignup-page > server-action");
  await connectDB();

  // extract
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const response = await fetch(`${process.env.ROOT_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const result = await response.json();

  if (!response.ok) return result.error;
  redirect("/auth/signin");
}
