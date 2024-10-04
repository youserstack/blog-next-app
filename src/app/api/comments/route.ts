import connectDB from "@/lib/config/connectDB";
import Comment from "@/lib/models/Comment";
import Post from "@/lib/models/Post";
import User from "@/lib/models/User";

// 전체 댓글 읽기
export async function GET(request: Request) {
  // console.log(`\n\x1b[32m[api/comments]:::[GET]\x1b[0m`);
  await connectDB();

  // extract
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");
  if (!postId) return Response.json({ error: "포스트 아이디가 없습니다." }, { status: 400 });

  // query
  const comments = await Comment.find({ post: postId }).populate("author").populate("post");

  return Response.json({ comments }, { status: 200 });
}

// 댓글 생성
export async function POST(request: Request) {
  console.log(`\n\x1b[34m[api/comments]:::[POST]\x1b[0m`);
  await connectDB();

  // extract
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");
  const formData = await request.formData();
  const userId = formData.get("userId");
  const content = formData.get("content");
  if (!content) return Response.json({ error: "댓글내용을 누락하였습니다." }, { status: 404 });
  if (!postId) return Response.json({ error: "포스트아이디를 누락하였습니다." }, { status: 404 });

  // create
  const newComment = await Comment.create({ post: postId, author: userId, content });
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
