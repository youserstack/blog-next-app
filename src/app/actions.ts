"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createCategoryAction(formData: FormData, accessToken: string) {
  const response = await fetch(`${process.env.ROOT_URL}/api/categories`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });
  return response.json();
}

export async function createPostAction(formData: FormData, accessToken: string) {
  const response = await fetch(`${process.env.ROOT_URL}/api/posts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });
  return response.json();
}

export async function createCommentAction(formData: FormData, postId: string, accessToken: string) {
  const content = formData.get("content");
  const response = await fetch(`${process.env.ROOT_URL}/api/comments?postId=${postId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ content }),
  });
  return response.json();
}

export async function updatePostAction(formData: FormData, postId: string, accessToken: string) {
  const response = await fetch(`${process.env.ROOT_URL}/api/posts/${postId}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });
  return response.json();
}

export async function signinAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const response = await fetch(`${process.env.ROOT_URL}/api/auth/signin`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  const { error, accessToken, refreshToken } = await response.json();

  // client browser localStorage에 accessToken을 저장시키기 위해서 새로운 객체를 리턴한다.
  if (!response.ok) return { error };
  else {
    cookies().set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: Date.now() + 1000 * 60 * 60 * 24, // maxAge: 1000 * 60 * 60 * 24, // 1초 * 60초 * 60분 * 24시 = 1일
      path: "/",
    });
    return { accessToken };
  }
}

export async function signupAction(previousState: any, formData: FormData) {
  const response = await fetch(`${process.env.ROOT_URL}/api/auth/signup`, {
    method: "POST",
    body: formData,
  });
  const { error, newUser } = await response.json();

  if (!response.ok) return { error };
  else return { newUser };
  // redirect("/auth/signin");
}
