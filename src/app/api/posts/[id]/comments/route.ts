import connectDB from "@/lib/config/connectDB";
import Comment from "@/lib/models/Comment";
import Post from "@/lib/models/Post";
import User from "@/lib/models/User";

export async function POST(request: Request, { params }: any) {
  console.log("\n\x1b[32m[api/posts/[id]/comments]\x1b[0m");
  await connectDB();

  // extraction
  const { content } = await request.json();
  if (!content) throw new Error("댓글내용이나 포스트아이디를 누락하였습니다.");
  console.log({ content });

  // query
  const email = request.headers.get("email");
  console.log({ email });
  const foundUser = await User.findOne({ email });
  if (!foundUser) return Response.json({ error: "not found user" }, { status: 404 });
  console.log({ foundUser });

  // creation
  const { id: postId } = params;
  const newComment = await Comment.create({ post: postId, author: foundUser._id, content });
  console.log({ newComment });

  // update
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { $push: { comments: newComment._id } },
    { new: true }
  );
  console.log({ updatedPost });

  return Response.json({ newComment }, { status: 200 });
}
