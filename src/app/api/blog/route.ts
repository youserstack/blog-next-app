import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";

export async function POST(request: Request) {
  console.log("\n[api/blog]");

  // Connect to db
  await connectDB();

  // Get data
  const slugs = await request.json();
  // console.log({ slugs });
  const category = slugs.join("/");
  console.log({ category });

  // Lookup the post
  const foundPost = await Post.findOne({ category });
  console.log({ foundPost });

  return Response.json({ message: "temp..." }, {});
}
