import { cookies } from "next/headers";

export async function POST(request: Request) {
  cookies().delete("refreshToken");
  return Response.json({ message: "signout success" });
}
