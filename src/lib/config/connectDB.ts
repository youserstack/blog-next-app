// mongoose 라이브러리를 가져옵니다. MongoDB와 연결하기 위한 ODM(Object Data Modeling) 라이브러리입니다.
import mongoose from "mongoose";

// 환경변수에서 MONGODB_URI 값을 가져옵니다.
// 타입스크립트에 이 값이 항상 문자열임을 보장하기 위해 'as string'을 사용합니다.
const MONGODB_URI = process.env.MONGODB_URI as string;

// MONGODB_URI가 설정되어 있지 않으면 오류를 발생시킵니다.
// 이는 데이터베이스에 연결하기 위해 반드시 필요한 값입니다.
if (!MONGODB_URI) {
  throw new Error("환경변수 MONGODB_URI가 설정되지 않았습니다.");
}

// 전역 객체에 mongoose 캐시를 저장하기 위한 변수입니다.
// global 객체에 mongoose가 이미 존재하는지 확인합니다.
let cached: any = (global as any).mongoose;

// mongoose가 캐시되어 있지 않다면 초기화합니다.
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

// 데이터베이스에 연결하는 비동기 함수입니다.
export default async function connectDB() {
  // 이미 연결된 상태라면 연결된 conn을 반환합니다.
  if (cached.conn) return cached.conn;

  // 현재 연결된 상태가 아니라면, 새로운 연결을 생성합니다.
  // promise가 없는 경우에만 새로운 연결을 시도합니다.
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  // promise가 해결될 때까지 대기하고, 그 결과로 conn을 설정합니다.
  cached.conn = await cached.promise;

  // 최종적으로 연결된 mongoose 인스턴스를 반환합니다.
  return cached.conn;
}

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

// // src/lib/config/connectDB.ts
// import mongoose from "mongoose";

// const connectDB = async (): Promise<void> => {
//   // 이미 연결되어 있다면 함수 종료
//   if (mongoose.connection.readyState >= 1) return;

//   try {
//     // MongoDB URI가 환경변수에 있는지 확인
//     const mongoUri = process.env.MONGODB_URI;
//     if (!mongoUri) throw new Error("환경변수 MONGODB_URI가 설정되지 않았습니다.");

//     // MongoDB에 연결
//     await mongoose.connect(mongoUri);

//     console.log("몽고디비에 연결되었습니다.");
//   } catch (error) {
//     console.error("몽고비비에 연결 실패 : ", error);
//     throw error; // 에러를 던져서 호출한 곳에서 처리할 수 있도록 함
//   }
// };

// export default connectDB;
