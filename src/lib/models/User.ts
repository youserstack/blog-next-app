import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    provider: {
      type: String, // credentials, naver, google, kakao,...
      required: true, // 모든 로그인 방식에서 필수
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false, // 보안을 위해서... // 쿼리조회시 .select('+password') 을 통해서 가져올수있다
    },
    role: {
      type: String,
      default: "user",
      // enum: ['admin','seller','user'],
    },
    image: {
      type: String,
    },

    // oauth account ids
    kakaoId: {
      type: String,
      unique: true, // 카카오 고유 ID (이메일 없는 경우에도 고유 식별)
      sparse: true, // kakaoId가 없는 경우도 있기 때문에 sparse 설정
    },
    naverId: {
      type: String,
      unique: true,
      sparse: true,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
