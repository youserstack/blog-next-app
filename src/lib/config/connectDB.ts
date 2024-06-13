import mongoose from "mongoose";

export default async function connectDB() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("환경변수 MONGODB_URI가 설정되지 않았습니다.");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    // console.log("몽고디비에 연결되었습니다.");
  } catch (error) {
    console.error("몽고비비에 연결 실패:", error);
    process.exit(1); // 서버 종료
  }
}
