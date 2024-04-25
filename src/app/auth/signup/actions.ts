"use server";

import connectDB from "@/lib/config/connectDB";
import User from "@/lib/models/User";
import { redirect } from "next/navigation";

export async function signup(prevState: any, formData: FormData) {
  console.log("\nsignup-page > server-action");

  // Connect to db
  await connectDB();

  // Get data
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  // Send to api route
  const response = await fetch(`${process.env.ROOT_URL}/api/auth/signup`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const result = await response.json();
  console.log({ result });

  // Redirect to signin-page
  if (response.ok) {
    redirect("/auth/signin");
  } else {
    return result.error;
  }
}
