import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) throw new Error("환경변수 MONGODB_URI가 설정되지 않았습니다.");

let cached = (global as any).mongoose;
if (!cached) cached = (global as any).mongoose = { conn: null, promise: null };

export default async function connectDB() {
  // 이미 연결된 경우 연결을 반환합니다.
  if (cached.conn) return cached.conn;

  // 새로운 연결을 생성합니다.
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false }).then((mongoose) => {
      console.log("MongoDB에 성공적으로 연결되었습니다.");
      return mongoose;
    });
  }

  // 연결이 준비될 때까지 대기합니다.
  cached.conn = await cached.promise;
  return cached.conn;
}
