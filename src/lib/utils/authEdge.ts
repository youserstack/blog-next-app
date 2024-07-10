import { jwtVerify } from "jose";

// middleware에서 사용하는 함수
export async function verifyRefreshToken(token: string) {
  try {
    const secret = process.env.REFRESH_TOKEN_SECRET as string;
    const encodedSecret = new TextEncoder().encode(secret);
    const verified = await jwtVerify(token, encodedSecret);
    return verified.payload;
  } catch (error) {
    throw error;
  }
}

export async function verifyAccessToken(token: string) {
  try {
    const secret = process.env.ACCESS_TOKEN_SECRET as string;
    const encodedSecret = new TextEncoder().encode(secret);
    const verified = await jwtVerify(token, encodedSecret);
    return verified.payload;
  } catch (error) {
    throw error;
  }
}
