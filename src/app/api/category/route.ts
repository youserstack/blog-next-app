import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";
import User from "@/lib/models/User";

export async function POST(request: Request) {
  console.log("\n[api/category]");

  // Connect to db
  await connectDB();

  // Get data
  const slugs = await request.json();
  const category = slugs.join("/");
  // console.log({ category });
  // const decodedCategory = decodeURIComponent(category);
  // console.log({ decodedCategory });

  // Lookup the posts
  const foundPosts: any = await Post.find({ category }).populate("author").exec();
  // console.log({ foundPosts });
  // if (!foundPosts) return Response.json({ error: "not found posts" }, { status: 404 });

  // Modify the posts
  let modifiedPosts: any = [];
  let temp = [];
  for (let i = 0; i < foundPosts.length; i++) {
    const post = foundPosts[i];
    modifiedPosts.push({ ...post._doc, author: post.author ? post.author.name : "unknown" });
    temp.push(post.title);
  }
  console.log({ postTitles: temp });

  return Response.json({ posts: modifiedPosts }, {});
}
