import NextAuth, { NextAuthOptions } from "next-auth";
import NaverProvider from "next-auth/providers/naver";

export const authOptions: NextAuthOptions = {
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_ID as string,
      clientSecret: process.env.NAVER_SECRET as string,
    }),
  ],
  callbacks: {
    session: async ({ session, user, token }) => {
      //   console.log({ session, user, token });
      return session;
    },
    jwt: async ({ token, user, account, profile, trigger }) => {
      //   console.log({ token, user, account, profile });
      return token;
    },
  },
  // 커스텀 로그인 페이지 (credentials를 활용한) 를 만들 경우에 사용한다.
  // pages: { signIn: "/auth/signin" },
  // production 환경에서는 반드시 secret 을 필수로 설정해야한다.
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
