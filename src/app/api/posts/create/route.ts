import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";
import User from "@/lib/models/User";

// 새로운 포스트글 생성
export async function POST(request: Request) {
  console.log("\n\x1b[32m[api/posts/create]:[POST]\x1b[0m");
  await connectDB();

  // extract
  const email = request.headers.get("email");
  const post = await request.json();
  const { category, title, content, author, tags } = post;
  if (!category || !title || !content || !author || !tags) {
    return Response.json(
      { code: "ERR_MISSING_FIELDS", message: "포스트 게시물의 내용물을 누락하였습니다." },
      { status: 400 }
    );
  }
  // throw new Error("포스트 게시물의 내용물을 누락하였습니다.");
  // 서버에서 throw를 사용하여 에러를 발생시키면 클라이언트에서 trycatch문을 통해서 대응하게 된다.
  // console.log({ post });

  // query
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    return Response.json(
      { code: "ERR_USER_NOT_FOUND", message: "존재하지 않은 사용자입니다." },
      { status: 404 }
    );
  }
  // console.log({ foundUser });

  // creation
  const newPost = await Post.create({ ...post, author: foundUser._id });
  console.log({ newPost });

  return Response.json({ newPost }, {});
}
