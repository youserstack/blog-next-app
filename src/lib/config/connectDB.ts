// import mongoose from "mongoose";

// export default async function connectDB() {
//   try {
//     if (!process.env.MONGODB_URI) {
//       throw new Error("환경변수 MONGODB_URI가 설정되지 않았습니다.");
//     }
//     await mongoose.connect(process.env.MONGODB_URI);
//     // console.log("몽고디비에 연결되었습니다.");
//   } catch (error) {
//     console.error("몽고비비에 연결 실패:", error);
//     process.exit(1); // 서버 종료
//   }
// }

// src/lib/config/connectDB.ts
import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  // 이미 연결되어 있다면 함수 종료
  // if (mongoose.connection.readyState >= 1) return;

  try {
    // MongoDB URI가 환경변수에 있는지 확인
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error("환경변수 MONGODB_URI가 설정되지 않았습니다.");

    // MongoDB에 연결
    await mongoose.connect(mongoUri);

    console.log("몽고디비에 연결되었습니다.");
  } catch (error) {
    console.error("몽고비비에 연결 실패 : ", error);
    throw error; // 에러를 던져서 호출한 곳에서 처리할 수 있도록 함
  }
};

export default connectDB;
