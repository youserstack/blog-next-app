"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createCategoryAction(formData: FormData, accessToken: string) {
  // console.log("\x1b[35m\n<createCategoryAction>\x1b[0m");

  const response = await fetch(`${process.env.ROOT_URL}/api/categories`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });

  return response.json();
}

export async function createPostAction(formData: FormData, accessToken: string) {
  // console.log("\x1b[35m\n<createPostAction>\x1b[0m");

  const response = await fetch(`${process.env.ROOT_URL}/api/posts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });

  return response.json();
}

export async function createCommentAction(formData: FormData, postId: string, accessToken: string) {
  // console.log("\n\x1b[35m<createCommentAction>\x1b[0m");

  const content = formData.get("content");

  const response = await fetch(`${process.env.ROOT_URL}/api/comments?postId=${postId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ content }),
    // body: formData,
  });

  return response.json();
}

export async function updatePostAction(formData: FormData, postId: string, accessToken: string) {
  // console.log("\n\x1b[35m\n<updatePostAction>\x1b[0m");

  const response = await fetch(`${process.env.ROOT_URL}/api/posts/${postId}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });

  return response.json();
}

export async function signinAction(formData: FormData) {
  // console.log("\n\x1b[35m<signinAction>\x1b[0m");

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const response = await fetch(`${process.env.ROOT_URL}/api/auth/signin`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    // body: formData,
  });
  const { error, accessToken, refreshToken } = await response.json();

  if (!response.ok) {
    return { error };
  } else {
    cookies().set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: Date.now() + 1000 * 60 * 60 * 24, // maxAge: 1000 * 60 * 60 * 24, // 1초 * 60초 * 60분 * 24시 = 1일
      path: "/",
    });
    return { accessToken };
  }
}

export async function signupAction(prevState: any, formData: FormData) {
  // console.log("\n\x1b[35m<signupAction>\x1b[0m");

  const response = await fetch(`${process.env.ROOT_URL}/api/auth/signup`, {
    method: "POST",
    body: formData,
  });
  const { error, newUser } = await response.json();

  if (!response.ok) {
    return { error };
  } else {
    redirect("/auth/signin");
  }
}
