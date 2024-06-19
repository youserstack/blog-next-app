import { jwtVerify } from "jose";
import jwt from "jsonwebtoken";

export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string) {
  // 비밀번호는 최소 8자 이상, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  return passwordRegex.test(password);
}

// Access Token의 유효 기간이 짧고, Refresh Token의 유효 기간이 더 길게 설정해야한다.
export function generateAccessToken(payload: { email: string }) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "10s" });
  // return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "2h" });
}

export function generateRefreshToken(payload: { email: string }) {
  // return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "1m" });
  // return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "15s" });
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "1d" });
}

// 클라이언트에서 액세스 토큰 만료로 실패시, 갱신을 위한 함수
export async function refreshAccessToken() {
  try {
    const response = await fetch("/api/auth/refresh");
    const data = await response.json();

    if (!response.ok) throw new Error(data.error.message || "accessToken 갱신을 실패했습니다.");
    localStorage.setItem("accessToken", data.newAccessToken);
    return data.newAccessToken;
  } catch (error) {
    console.error("액세스 토큰 갱신을 실패했습니다.", error);
    return error;
  }
}

// middleware에서 사용하는 함수
export async function verifyToken(token: string) {
  try {
    const secret = process.env.REFRESH_TOKEN_SECRET as string;
    const encodedSecret = new TextEncoder().encode(secret);
    const verified = await jwtVerify(token, encodedSecret);
    return verified.payload;
  } catch (error) {
    throw new Error("decoding 에러가 발생했습니다.");
  }
}

export async function verifyAccessToken(token: string) {
  try {
    const secret = process.env.ACCESS_TOKEN_SECRET as string;
    const encodedSecret = new TextEncoder().encode(secret);
    const verified = await jwtVerify(token, encodedSecret);
    return verified.payload;
  } catch (error) {
    throw new Error("decoding 에러가 발생했습니다.");
  }
}
