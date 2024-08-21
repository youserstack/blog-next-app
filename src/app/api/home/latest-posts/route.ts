import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";

export async function GET(req: Request) {
  // console.log("\n\x1b[32m[api/home/latest-posts]:::[GET]\x1b[0m");

  await connectDB();

  // latest sorting : 최신순(기본값)
  const posts = await Post.find().sort({ createdAt: -1 }).limit(5);
  // console.log({ latestPosts: posts.map((v: any) => v.title) });

  return Response.json({ posts }, { status: 200 });
}
