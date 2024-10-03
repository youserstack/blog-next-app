import NextAuth, { NextAuthOptions, User, Account, Profile, Session } from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import { JWT } from "next-auth/jwt";
import connectDB from "@/lib/config/connectDB";
import UserModel from "@/lib/models/User";

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

export const authOptions: NextAuthOptions = {
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
      await connectDB(); // MongoDB에 연결

      if (account?.provider === "naver" && profile && "response" in profile) {
        const name = profile.response.nickname;
        const email = profile.response.email;
        if (!email || !name) return false;

        // 사용자가 존재하는지 확인
        let existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
          existingUser = await UserModel.create({ name, email, provider: "naver" });
          console.log("가입처리완료");
        }

        // NextAuth의 `user` 객체에 사용자의 MongoDB _id를 추가
        user.id = existingUser._id.toString() as string;
        user.name = existingUser.name as string;
        user.email = existingUser.email as string;

        console.log("로그인처리완료", { existingUser });

        return true;

        // if (user.name && user.email) {
        //   return true;
        // } else {
        //   if (profile && "response" in profile) {
        //     user.name = profile.response.nickname;
        //     user.email = profile.response.email;
        //     return true;
        //   } else {
        //     return false;
        //   }
        // }
      }

      return false;
    },
    // jwt 콜백: JWT 토큰을 생성하거나 갱신할 때 호출.
    async jwt({
      token,
      user,
    }: {
      // JWT 확장 불필요: JWT 객체는 서버 내부에서 사용되며, 클라이언트 측에서는 직접 참조되지 않습니다.
      // JWT 토큰에 추가한 id 값은 session 콜백에서 사용할 뿐, 클라이언트 코드에서 직접적으로 JWT 타입을 확인하거나 확장할 필요는 없습니다.
      token: JWT;
      user: User;
    }) {
      console.log("jwt callback");
      // 로그인한 사용자의 정보가 있으면 JWT에 이름과 이메일을 추가
      // token이 항상 존재: jwt 콜백 함수에서 token은 NextAuth가 생성한 JWT를 사용하기 때문에 항상 존재한다고 가정합니다.
      // 따라서 token의 존재 유무를 확인할 필요가 없습니다.
      if (user) {
        token.id = user.id; // MongoDB 사용자 ID 추가
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
      // console.log({ session });
      // 세션에 사용자 정보가 있으면 JWT에서 가져온 이름과 이메일을 세션에 추가
      // session.user는 항상 존재하지 않을 수 있음: session 객체는 세션과 관련된 정보를 포함하지만,
      // 사용자가 로그인되지 않았거나 일부 경우에는 session.user가 정의되지 않을 수 있습니다.
      // 그래서 session.user의 존재 여부를 확인하는 것입니다.
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.name = token.name; // 세션에 사용자 이름 설정
        session.user.email = token.email; // 세션에 사용자 이메일 설정
      }
      return session; // 세션 반환
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // adapter: MongoDBAdapter(clientPromise),
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

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

// try {
//   if (account?.provider === "naver") {
//     if (user.name && user.email) {
//       // 사용자가 이미 존재하는지 확인
//       const existingUser = await UserModel.findOne({ email: user.email });
//       if (existingUser) return true;

//       // 사용자 없으면 새 사용자 생성
//       const newUser = await UserModel.create({
//         name: user.name,
//         email: user.email,
//       });
//       return true;
//     } else {
//       return false;
//     }
//   }
//   return false;
// } catch (error) {
//   console.error("로그인 에러", error);
//   return false;
// }
