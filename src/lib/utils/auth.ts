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

export function generateAccessToken(payload: { email: string; password: string }) {
  return jwt.sign(payload, process.env.JWT_ACCESSTOKEN_SECRET as string, { expiresIn: "2h" });
}

export function generateRefreshToken(payload: { email: string; password: string }) {
  return jwt.sign(payload, process.env.JWT_REFRESHTOKEN_SECRET as string, { expiresIn: "1d" });
}
