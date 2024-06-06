import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";
import User from "@/lib/models/User";

export async function POST(request: Request) {
  console.log("\n\x1b[32m[api/posts/create]\x1b[0m");
  await connectDB();

  // extraction
  const email = request.headers.get("email");
  const post = await request.json();
  const { category, title, content, author, tags } = post;
  if (!category || !title || !content || !author || !tags)
    throw new Error("포스트 게시물의 내용물을 누락하였습니다.");
  // console.log({ post });

  // query
  const foundUser = await User.findOne({ email });
  if (!foundUser) return Response.json({ error: "not found user" }, { status: 404 });
  // console.log({ foundUser });

  // creation
  const newPost = await Post.create({ ...post, author: foundUser._id });
  console.log({ newPost });

  return Response.json({ newPost }, {});
}
