import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";

export async function GET(req: Request) {
  // console.log("\n\x1b[32m[api/home/popular-posts]:::[GET]\x1b[0m");

  await connectDB();

  // popular sorting : 조회수 기준 내림차순
  const posts = await Post.find().sort({ views: -1 }).limit(5);
  // console.log({ popularPosts: posts.map((v: any) => v.title) });

  return Response.json({ posts }, { status: 200 });
}
