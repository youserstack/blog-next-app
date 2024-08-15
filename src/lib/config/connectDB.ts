import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
  throw new Error("환경변수 MONGODB_URI가 설정되지 않았습니다.");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

// 함수 외부에서 데이터베이스 연결을 설정
if (!cached.promise) {
  cached.promise = mongoose
    .connect(MONGODB_URI, {
      bufferCommands: false,
    })
    .then((mongoose) => {
      return mongoose;
    });
}

export default async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI as string;
// if (!MONGODB_URI) throw new Error("환경변수 MONGODB_URI가 설정되지 않았습니다.");

// let cached: any = (global as any).mongoose;
// if (!cached) {
//   cached = (global as any).mongoose = { conn: null, promise: null };
// }

// export default async function connectDB() {
//   // 이미 연결된 상태라면 연결된 conn을 반환합니다.
//   if (cached.conn) return cached.conn;

//   // 현재 연결된 상태가 아니라면, 새로운 연결을 생성합니다.
//   // promise가 없는 경우에만 새로운 연결을 시도합니다.
//   if (!cached.promise) {
//     cached.promise = mongoose
//       .connect(MONGODB_URI, {
//         bufferCommands: false,
//       })
//       .then((mongoose) => {
//         return mongoose;
//       });
//   }

//   // promise가 해결될 때까지 대기하고, 그 결과로 conn을 설정합니다.
//   cached.conn = await cached.promise;

//   // 최종적으로 연결된 mongoose 인스턴스를 반환합니다.
//   return cached.conn;
// }

//
//
//
//
//
//

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
