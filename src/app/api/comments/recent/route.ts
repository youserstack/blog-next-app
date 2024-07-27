import connectDB from "@/lib/config/connectDB";
import Comment from "@/lib/models/Comment";
import User from "@/lib/models/User";

export async function GET(request: Request) {
  console.log(`\n\x1b[32m[api/comments/recent]:::[GET]\x1b[0m`);
  await connectDB();

  const comments = await Comment.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    // .populate("author");
    .populate({
      path: "author",
      model: User,
    });

  console.log({ comments });

  return Response.json({ comments }, { status: 200 });
}
