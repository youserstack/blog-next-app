import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  console.log("\n\x1b[32m[api/posts/[id]/GET]\x1b[0m");
  await connectDB();

  // query
  const postId = params.id;
  const foundPost = await Post.findById(postId).populate("author");
  console.log({ foundPost });

  return Response.json({ post: foundPost });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  console.log("\n\x1b[32m[api/posts/[id]/PATCH]\x1b[0m");
  await connectDB();

  // query
  const postId = params.id;
  const payload = await request.json();
  const updatedPost = await Post.findByIdAndUpdate(postId, payload, { new: true });
  console.log({ updatedPost });

  return Response.json({ updatedPost });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  console.log("\n\x1b[32m[api/posts/[id]/DELETE]\x1b[0m");
  await connectDB();

  // query
  const postId = params.id;
  const deletedPost = await Post.findByIdAndDelete(postId);
  console.log({ deletedPost });

  return Response.json({ deletedPost });
}
