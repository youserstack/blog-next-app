import NextAuth, { NextAuthOptions, User, Account, Profile, Session } from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import { JWT } from "next-auth/jwt";

// Naver의 프로필 타입 정의
interface NaverProfile extends Profile {
  resultcode: string;
  message: string;
  response: {
    id: string;
    nickname: string;
    email: string;
  };
}

const authOptions: NextAuthOptions = {
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_ID as string,
      clientSecret: process.env.NAVER_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({
      user, // 로그인한 사용자 정보
      account, // 사용자가 로그인한 계정 정보 (소셜 제공자 포함)
      profile, // 소셜 제공자로부터 가져온 추가 사용자 정보 (Naver 프로필 포함)
    }: {
      user: User;
      account: Account | null;
      profile?: Profile | NaverProfile;
    }) {
      if (account?.provider === "naver") {
        if (user.name && user.email) return true;
        else {
          if (profile && "response" in profile) {
            user.name = profile.response.nickname;
            user.email = profile.response.email;
            return true;
          } else {
            return false;
          }
        }
      }
      return false;

      // Naver로 로그인한 경우 Naver 프로필에서 이름과 이메일을 사용자 정보에 설정
      // 사용자 정보 덮어쓰기: 인증 제공자마다 user 객체에 담기는 정보의 구조나 정확도가 다를 수 있습니다.
      // 예를 들어, user.name에 들어가는 값이 정확하지 않거나, 특정 제공자는 이메일을 user.email 대신 다른 필드에 넣을 수도 있습니다.
      // 그래서 profile.response를 이용해 Naver에서 제공하는 정확한 이름과 이메일을 명시적으로 덮어쓰는 경우가 많습니다.
      // if (account?.provider === "naver" && profile && "response" in profile) {
      //   console.log({ user, account, profile }); // 디버깅용 로그 출력
      //   user.name = profile.response.nickname; // Naver에서 가져온 이름 설정
      //   user.email = profile.response.email; // Naver에서 가져온 이메일 설정
      //   return true; // 로그인 성공
      // } else {
      //   return false; // 로그인 실패
      // }
    },
    // jwt 콜백: JWT 토큰을 생성하거나 갱신할 때 호출.
    async jwt({ token, user }: { token: JWT; user: User }) {
      console.log("jwt callback");
      // 로그인한 사용자의 정보가 있으면 JWT에 이름과 이메일을 추가
      // token이 항상 존재: jwt 콜백 함수에서 token은 NextAuth가 생성한 JWT를 사용하기 때문에 항상 존재한다고 가정합니다.
      // 따라서 token의 존재 유무를 확인할 필요가 없습니다.
      if (user) {
        token.name = user.name; // JWT에 사용자 이름 추가
        token.email = user.email; // JWT에 사용자 이메일 추가
      }
      return token; // 토큰 반환
    },

    // session 콜백: 세션이 생성되거나 갱신될 때 호출됩니다. 추가적으로 세션 정보를 클라이언트에 제공할 때 호출.
    // 세션 정보를 클라이언트에 제공할 때 호출됩니다.
    // 즉, 클라이언트가 getSession()이나 useSession()을 통해 세션 정보를 요청할 때 호출됩니다.
    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("session callback");
      // 세션에 사용자 정보가 있으면 JWT에서 가져온 이름과 이메일을 세션에 추가
      // session.user는 항상 존재하지 않을 수 있음: session 객체는 세션과 관련된 정보를 포함하지만,
      // 사용자가 로그인되지 않았거나 일부 경우에는 session.user가 정의되지 않을 수 있습니다.
      // 그래서 session.user의 존재 여부를 확인하는 것입니다.
      if (session.user && token) {
        session.user.name = token.name; // 세션에 사용자 이름 설정
        session.user.email = token.email; // 세션에 사용자 이메일 설정
      }
      return session; // 세션 반환
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // 커스텀 로그인 페이지 (credentials를 활용한) 를 만들 경우에 사용한다.
  // pages: { signIn: "/auth/signin" },
  // production 환경에서는 반드시 secret 을 필수로 설정해야한다.
  // secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
