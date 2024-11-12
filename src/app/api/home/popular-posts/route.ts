import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";

export async function GET(req: Request) {
  await connectDB();

  // popular sorting : 조회수 기준 내림차순
  const posts = await Post.find().sort({ views: -1 }).limit(5);

  return Response.json({ posts }, { status: 200 });
}
