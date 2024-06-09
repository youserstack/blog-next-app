import connectDB from "@/lib/config/connectDB";

// 특정 댓글 삭제
export async function DELETE(request: Request, { params }: any) {
  // console.log("\n\x1b[32m[api/comments]:::[DELETE]\x1b[0m");
  await connectDB();

  // extraction
  const commentId = params.id;
  console.log({ commentId });
}
