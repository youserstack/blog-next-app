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
export function generateAccessToken(payload: { email: string; password: string }) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "30s" });
  // return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "2h" });
}

export function generateRefreshToken(payload: { email: string; password: string }) {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "1m" });
  // return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "1d" });
}
