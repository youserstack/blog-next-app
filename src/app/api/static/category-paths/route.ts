import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";

export async function GET(request: Request) {
  await connectDB();

  // const foundPosts = await Post.find({}).select("category");
  const uniqueCategoryPaths = await Post.distinct("category");
  console.log({ uniqueCategoryPaths });

  return Response.json({ categoryPaths: uniqueCategoryPaths }, { status: 200 });
}
