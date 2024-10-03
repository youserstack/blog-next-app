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
      required: true,
      unique: true,
    },

    password: {
      type: String,
      select: false, // 보안을 위해서...
      // required: true, // oauth에서는 필요하지 않아서...
    },
    role: {
      type: String,
      default: "user",
      // enum: ['admin','seller','user'],
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dzktdrw7o/image/upload/v1713961579/blog-next-app/user2_zrx6nk.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
