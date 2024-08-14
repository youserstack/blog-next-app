import connectDB from "@/lib/config/connectDB";
import Comment from "@/lib/models/Comment";
import User from "@/lib/models/User";

export async function GET(req: Request) {
  console.log("\n\x1b[32m[api/home/recent-comment]:::[GET]\x1b[0m");

  await connectDB();

  // sort : 최신순
  const comments = await Comment.find().sort({ createdAt: -1 }).limit(5).populate({
    path: "author",
    model: User,
  });
  console.log({ recentComments: comments.map((v: any) => v.content) });

  return Response.json({ comments }, { status: 200 });
}
