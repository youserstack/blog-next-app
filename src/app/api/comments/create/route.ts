import connectDB from "@/lib/config/connectDB";
import Comment from "@/lib/models/Comment";
import Post from "@/lib/models/Post";
import User from "@/lib/models/User";

// 댓글 생성
export async function POST(request: Request, { params }: any) {
  console.log("\n\x1b[32m[api/comments/create]:::[POST]\x1b[0m");
  await connectDB();

  // authenticate
  const user = JSON.parse(request.headers.get("user") as string);
  const { email } = user;
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    return Response.json(
      {
        error: {
          message: "유저 이메일(토큰에 저장된)을 조회하였지만 해당 사용자가 존재하지 않습니다.",
        },
      },
      { status: 404 }
    );
  }

  // extract
  const { content, postId } = await request.json();
  if (!content) {
    return Response.json({ error: { message: "댓글내용이나 포스트아이디를 누락하였습니다." } });
  }

  // create
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
