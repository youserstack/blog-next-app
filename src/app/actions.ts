"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createCategoryAction(formData: FormData, accessToken: string) {
  const parentCategories = JSON.parse(formData.get("parentCategories") as string).map((v: string) =>
    decodeURI(v)
  );
  const childCategory = decodeURI(formData.get("childCategory") as string).replace(/\s+/g, "-");
  console.log({ parentCategories, childCategory });
  const response = await fetch(`${process.env.ROOT_URL}/api/categories`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ parentCategories, childCategory }),
  });
  return response.json();
}

export async function createPostAction(formData: FormData, accessToken: string) {
  const category = formData.get("category") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const author = formData.get("author") as string;
  const tags = (formData.get("tags") as string).split(",").map((tag) => tag.trim());
  const image = formData.get("image") as File;
  const response = await fetch(`${process.env.ROOT_URL}/api/posts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ category, title, content, author, tags, image }),
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
  const category = formData.get("category");
  const title = formData.get("title");
  const content = formData.get("content");
  const tags = formData.get("tags");
  const image = formData.get("image");
  const response = await fetch(`${process.env.ROOT_URL}/api/posts/${postId}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ category, title, content, tags, image }),
  });
  return response.json();
}

export async function signinAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const response = await fetch(`${process.env.ROOT_URL}/api/auth/signin`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  const { error, accessToken, refreshToken } = await response.json();

  if (!response.ok) {
    return { error };
  } else {
    cookies().set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: Date.now() + 1000 * 60 * 60 * 24, // maxAge: 1000 * 60 * 60 * 24, // 1초 * 60초 * 60분 * 24시 = 1일
      path: "/",
    });
    // cookies().set("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "strict",
    //   expires: Date.now() + 1000 * 60 * 60 * 24, // maxAge: 1000 * 60 * 60 * 24, // 1초 * 60초 * 60분 * 24시 = 1일
    //   path: "/",
    // });
    return { accessToken };
  }
}

export async function signupAction(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const response = await fetch(`${process.env.ROOT_URL}/api/auth/signup`, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  const { error, newUser } = await response.json();

  if (!response.ok) {
    return { error };
  } else {
    redirect("/auth/signin");
  }
}
