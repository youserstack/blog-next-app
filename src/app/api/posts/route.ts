// 수정필요 (요청 메서드 post > get)

import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";
import User from "@/lib/models/User";

connectDB();

// 전체 포스트 읽기 (read all)
export async function GET(request: Request) {
  console.log("\n\x1b[32m[api/posts]:::[GET]\x1b[0m");

  // extract
  const { searchParams } = new URL(request.url);
  const categoryPath = searchParams.get("categoryPath");
  const page = searchParams.get("page") || "1";
  console.log({ categoryPath, page });
  const POST_PER_PAGE = 5;
  const skip = ((parseInt(page) || 1) - 1) * POST_PER_PAGE;

  // query
  const totalCount = await Post.countDocuments({ category: { $regex: categoryPath } });
  const posts: any = await Post.find({ category: { $regex: categoryPath } })
    .populate("author")
    .skip(skip)
    .limit(POST_PER_PAGE);
  // $options: "i", // 대소문자 구분하지 않음

  return Response.json({ totalCount, posts }, { status: 200 });
}

// 포스트 생성 (create)
export async function POST(request: Request) {
  console.log("\n\x1b[32m[api/posts]:::[POST]\x1b[0m");

  // authenticate
  const user = JSON.parse(request.headers.get("user") as string);
  // console.log({ user });
  const foundUser = await User.findOne({ email: user.email });
  if (!foundUser) {
    const error = { error: { message: "해당 사용자가 존재하지 않습니다." } };
    return Response.json(error, { status: 404 });
  }

  // extract
  const formData = await request.formData();
  const category = formData.get("category");
  const title = formData.get("title");
  const content = formData.get("content");
  const author = formData.get("author");
  const tags = formData.get("tags");
  // const images = formData.get('images')
  const post = { category, title, content, author, tags };
  if (!category || !title || !content || !author || !tags) {
    const error = { error: { message: "포스트 게시물의 내용물을 누락하였습니다." } };
    return Response.json(error, { status: 400 });
  }

  // creation
  const newPost = await Post.create({ ...post, author: foundUser._id });
  console.log({ newPost });

  return Response.json({ newPost }, { status: 200 });
}
