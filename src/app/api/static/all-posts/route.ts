import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";

export async function GET(request: Request) {
  await connectDB();

  const posts = await Post.find({}).select("_id");
  // console.log({ posts });

  return Response.json({ posts }, { status: 200 });
}
