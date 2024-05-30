import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";

export async function POST(request: Request) {
  console.log("\n\x1b[32m[api/posts]\x1b[0m");
  await connectDB();

  // extraction
  const { categoryPath, page } = await request.json();
  const POST_PER_PAGE = 5;
  const skip = ((parseInt(page) || 1) - 1) * POST_PER_PAGE;
  console.log({ categoryPath, page });

  // query
  const totalCount = await Post.countDocuments({ category: { $regex: categoryPath } });
  const posts: any = await Post.find({ category: { $regex: categoryPath } })
    .populate("author")
    .skip(skip)
    .limit(POST_PER_PAGE);
  // $options: "i", // 대소문자 구분하지 않음

  return Response.json({ totalCount, posts }, { status: 200 });
}
