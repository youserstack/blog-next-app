import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // 사용자 정의 속성 추가
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
