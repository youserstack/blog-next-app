import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  console.log("\n\x1b[32m[api/auth/signout]\x1b[0m");
  cookies().delete("refreshToken");
  // revalidatePath(request.url); // 서버컴포넌트의 캐시를 제거하게 된다.
  revalidatePath("/", "layout");
  return Response.json({ message: "로그아웃되었습니다." });
}
