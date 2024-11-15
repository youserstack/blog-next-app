import connectDB from "@/lib/config/connectDB";
import Comment from "@/lib/models/Comment";
import Post from "@/lib/models/Post";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  console.log("\n\x1b[31m[api/comments]:::[DELETE]\x1b[0m");
  await connectDB();

  // extract
  const commentId = (await params).id;
  if (!commentId)
    return Response.json({ error: "댓글 ID가 제공되지 않았습니다." }, { status: 400 });
  // console.log({ commentId });

  // delete
  const deletedComment = await Comment.findByIdAndDelete(commentId).populate("post");
  if (!deletedComment) {
    return Response.json({ error: "삭제할 댓글이 존재하지 않습니다." }, { status: 404 });
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
