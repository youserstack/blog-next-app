import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  console.log("\n\x1b[32m[api/posts/[id]]\x1b[0m");

  // Connect to db
  await connectDB();

  // Lookup the post
  const foundPost = await Post.findById(params).populate("author");
  console.log({ foundPost });

  return Response.json({ post: foundPost });
}
