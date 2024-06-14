import connectDB from "@/lib/config/connectDB";
import Comment from "@/lib/models/Comment";
import Post from "@/lib/models/Post";
import User from "@/lib/models/User";

// 댓글 삭제
export async function DELETE(request: Request, { params }: any) {
  console.log("\n\x1b[32m[api/comments]:::[DELETE]\x1b[0m");
  await connectDB();

  // authenticate
  const email = request.headers.get("email");
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
  // console.log({ foundUser });

  // extract
  const commentId = params.id;
  if (!commentId) {
    return Response.json({ error: { message: "댓글 ID가 제공되지 않았습니다." } }, { status: 400 });
  }
  console.log({ commentId });

  // delete
  const deletedComment = await Comment.findByIdAndDelete(commentId).populate("post");
  if (!deletedComment) {
    return Response.json(
      { error: { message: "삭제할 댓글이 존재하지 않습니다." } },
      { status: 404 }
    );
  }
  console.log({ deletedComment });

  // update
  const postId = deletedComment.post._id;
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { $pull: { comments: commentId } },
    { new: true }
  );
  console.log({ updatedPost });

  return Response.json({ deletedComment }, { status: 200 });
}
