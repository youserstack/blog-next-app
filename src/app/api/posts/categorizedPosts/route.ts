import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";

export async function POST(request: Request) {
  console.log("\n\x1b[32m[api/posts/categorizedPosts]\x1b[0m");

  // Connect to db
  await connectDB();

  // Get data
  const { categoryPath } = await request.json();
  const { searchParams } = new URL(request.url);
  const POST_PER_PAGE = 5;
  const page = parseInt(searchParams.get("page") as string) || 1;
  const skip = (page - 1) * POST_PER_PAGE;

  // console.log({ categoryPath });

  // Lookup the posts
  const foundPosts: any = await Post.find({ category: { $regex: categoryPath } })
    .populate("author")
    .skip(skip)
    .limit(POST_PER_PAGE);
  // $options: "i", // 대소문자 구분하지 않음
  console.log({ "foundPosts.length": foundPosts.length });

  return Response.json({ posts: foundPosts }, {});
}
