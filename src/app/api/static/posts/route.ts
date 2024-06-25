import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";

export async function GET(request: Request) {
  await connectDB();

  // const foundPosts = await Post.find({}).select("category");
  const uniqueCategories = await Post.distinct("category");
  console.log({ uniqueCategories });

  return Response.json({ categories: uniqueCategories }, { status: 200 });
}
