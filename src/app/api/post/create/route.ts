import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";

export async function POST(request: Request) {
  console.log("\n[api/post/create]");

  // Connect to db
  await connectDB();

  // Get data
  const post = await request.json();

  // Create a post
  const newPost = await Post.create(post);
  console.log({ newPost });

  return Response.json({ message: "temp..." }, {});
}
