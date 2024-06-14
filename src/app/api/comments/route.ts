import connectDB from "@/lib/config/connectDB";
import Comment from "@/lib/models/Comment";
import Post from "@/lib/models/Post";
import User from "@/lib/models/User";

// 전체 댓글 읽기
export async function GET(request: Request) {
  console.log(`\n\x1b[32m[${request.url}]:::[GET]\x1b[0m`);

  // extract
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");
  await connectDB();

  // query
  const comments = await Comment.find({ post: postId }).populate("author").populate("post");
  // console.log({ comments });
  // const transformedComments = comments.map((comment: any) => ({
  //   ...comment.toObject(),
  //   author: comment.author.name,
  // }));

  return Response.json({ comments }, { status: 200 });
}

// 댓글 생성
export async function POST(request: Request) {
  console.log(`\n\x1b[32m[${request.url}]:::[POST]\x1b[0m`);

  // authenticate
  const email = request.headers.get("email");
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    const error = { error: { message: "해당 사용자가 존재하지 않습니다." } };
    return Response.json(error, { status: 404 });
  }

  // extract
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");
  const formData = await request.formData();
  const content = formData.get("content");
  if (!content) {
    const error = { error: { message: "댓글내용을 누락하였습니다." } };
    return Response.json(error, { status: 404 });
  }
  if (!postId) {
    const error = { error: { message: "포스트아이디를 누락하였습니다." } };
    return Response.json(error, { status: 404 });
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
