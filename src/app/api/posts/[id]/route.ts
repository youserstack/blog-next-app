import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";

// 특정 포스트글 읽기
export async function GET(request: Request, { params }: { params: { id: string } }) {
  console.log("\n\x1b[32m[api/posts/[id]/GET]\x1b[0m");
  await connectDB();

  // query
  const postId = params.id;
  const foundPost = await Post.findById(postId).populate("author");
  console.log({ foundPost });

  return Response.json({ post: foundPost });
}

// 특정 포스트글 수정
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  console.log("\n\x1b[32m[api/posts/[id]/PATCH]\x1b[0m");
  await connectDB();

  // query
  const postId = params.id;
  const payload = await request.json();
  const updatedPost = await Post.findByIdAndUpdate(postId, payload, { new: true });
  console.log({ updatedPost });

  return Response.json({ updatedPost }, { status: 200 });
}

// 특정 포스트글 삭제
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  console.log("\n\x1b[32m[api/posts/[id]/DELETE]\x1b[0m");
  await connectDB();

  // query
  const postId = params.id;
  const deletedPost = await Post.findByIdAndDelete(postId);
  console.log({ deletedPost });

  return Response.json({ deletedPost });
}
