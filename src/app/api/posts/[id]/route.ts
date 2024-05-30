import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  console.log("\n\x1b[32m[api/posts/[id]]\x1b[0m");
  await connectDB();

  // query
  const postId = params.id;
  const foundPost = await Post.findById(postId).populate("author");
  console.log({ foundPost });

  return Response.json({ post: foundPost });
}
