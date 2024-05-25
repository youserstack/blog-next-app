import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  console.log("\n\x1b[32m[api/posts/create]\x1b[0m");
  await connectDB();

  // Get the token
  const accessToken = request.headers.get("authorization")?.split(" ")[1];
  if (!accessToken) return Response.json({ error: "no accessToken" }, { status: 401 });
  // console.log({ accessToken });

  // Validate it
  let verifiedUser: any;
  try {
    verifiedUser = jwt.verify(accessToken, process.env.JWT_ACCESSTOKEN_SECRET as string);
    // console.log({ verifiedUser });
  } catch (error) {
    return Response.json({ error: "verfication error" }, { status: 403 });
  }

  // Lookup the user
  const foundUser = await User.findOne({ email: verifiedUser.email });
  if (!foundUser) return Response.json({ error: "not found user" }, { status: 404 });
  // console.log({ foundUser });

  // Get data
  const post = await request.json();
  // console.log({ post });

  // Create a post
  const newPost = await Post.create({ ...post, author: foundUser._id });
  console.log({ newPost });

  return Response.json({ newPost }, {});
}
