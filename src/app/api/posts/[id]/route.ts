import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";

export async function GET(request: Request) {
  console.log("\n\x1b[32m[api/posts/[id]]\x1b[0m");

  // Connect to db
  await connectDB();

  // Get post id
  const id = request.url.split("/").pop();
  // console.log({ id });

  // Lookup the post
  const foundPost = await Post.findById(id).exec();
  console.log({ foundPost });

  return Response.json({ post: foundPost });
}
