import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";

export async function POST(request: Request) {
  console.log("\n\x1b[32m[api/posts]\x1b[0m");

  // Connect to db
  await connectDB();

  // Get data
  const { categoryPath, page } = await request.json();
  const POST_PER_PAGE = 5;
  const skip = ((parseInt(page) || 1) - 1) * POST_PER_PAGE;
  console.log({ categoryPath, page });

  // Lookup the posts
  const foundPosts: any = await Post.find({ category: { $regex: categoryPath } })
    .populate("author")
    .skip(skip)
    .limit(POST_PER_PAGE);
  // $options: "i", // 대소문자 구분하지 않음
  // console.log({ "foundPosts.length": foundPosts.length });
  const postTitles = foundPosts.map((post: any) => post.title);
  console.log({ postTitles });

  return Response.json({ posts: foundPosts }, {});
}
