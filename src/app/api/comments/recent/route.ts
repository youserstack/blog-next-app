import connectDB from "@/lib/config/connectDB";
import Comment from "@/lib/models/Comment";

export async function GET(request: Request) {
  // console.log(`\n\x1b[32m[api/comments/recent]:::[GET]\x1b[0m`);
  // await connectDB();

  // const comments = await Comment.find({}).sort({ createdAt: -1 }).limit(5).populate("author");
  // console.log({ comments });

  // return Response.json({ comments }, { status: 200 });

  try {
    console.log(`\n\x1b[32m[api/comments/recent]:::[GET]\x1b[0m`);
    await connectDB(); // DB 연결

    const comments = await Comment.find({}).sort({ createdAt: -1 }).limit(5).populate("author");
    // .populate({
    //   path: "author", // 'author' 필드를 사용하여 User 정보 가져오기
    //   select: "name image", // User에서 가져올 필드(이름) 선택
    // });

    console.log({ comments });

    return Response.json({ comments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return Response.json({ error: "데이터베이스 조회 에러" }, { status: 500 });
  }
}
