import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";

export async function GET(req: Request) {
  await connectDB();

  // latest sorting : 최신순(기본값)
  const posts = await Post.find().sort({ createdAt: -1 }).limit(5);

  return Response.json({ posts }, { status: 200 });
}
