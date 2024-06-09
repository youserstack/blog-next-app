import connectDB from "@/lib/config/connectDB";
import Comment from "@/lib/models/Comment";

// 전체 댓글 읽기
export async function GET(request: Request) {
  // console.log("\n\x1b[32m[api/comments]\x1b[0m");
  await connectDB();

  // extraction
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");
  // console.log({ postId });

  // query
  const comments = await Comment.find({ post: postId }).populate("author");
  // const transformedComments = comments.map((comment: any) => ({
  //   ...comment.toObject(),
  //   author: comment.author.name,
  // }));

  return Response.json({ comments }, { status: 200 });
}
