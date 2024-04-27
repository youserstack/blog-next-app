"use server";

import connectDB from "@/lib/config/connectDB";
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
  console.log({ result });

  if (response.ok) {
    redirect("/");
  } else {
    return result.error;
  }
}
