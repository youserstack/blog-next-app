import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";
import User from "@/lib/models/User";

// 전체 포스트 읽기
export async function GET(request: Request) {
  console.log("\n\x1b[32m[api/posts]:::[GET]\x1b[0m");
  await connectDB();

  // extract
  const { searchParams } = new URL(request.url);
  const searchWords = searchParams.get("searchWords") as string;
  const categoryPath = searchParams.get("categoryPath") as string;
  const page = searchParams.get("page") || ("1" as string);
  const POST_PER_PAGE = 5;
  const skip = ((parseInt(page) || 1) - 1) * POST_PER_PAGE;
  console.log({ searchWords, categoryPath, page });

  // Query 조건 생성
  let query = {};
  if (searchWords) {
    const searchRegex = { $regex: searchWords, $options: "i" };
    const authorIds = await User.find({ name: searchRegex }).select("_id"); // 검색어가 포함된 사용자의 ID 목록

    query = {
      ...query,
      $or: [
        { category: searchRegex },
        { title: searchRegex },
        { content: searchRegex },
        { tags: searchRegex },
        { author: { $in: authorIds } }, // 포함된 author ID 목록을 검색
      ],
    };
  }

  if (categoryPath) {
    query = { ...query, category: { $regex: categoryPath, $options: "i" } };
  }

  // query
  const totalCount = await Post.countDocuments(query);
  const posts: any = await Post.find(query).populate("author").skip(skip).limit(POST_PER_PAGE);
  // $options: "i", // 대소문자 구분하지 않음
  console.log({ posts });

  // 각 포스트의 content를 처리
  const processedPosts = posts.map((post: any) => {
    // 정규식을 사용하여 연속된 공백을 하나의 공백으로 변경
    const trimmedContent = post.content.replace(/\s{2,}/g, " ");
    // 문자열을 최대 길이로 자르고, 생략 부호 추가
    const content = `${trimmedContent.slice(0, 30)}...`;

    return {
      ...post.toObject(), // Mongoose Document를 일반 객체로 변환
      content, // 내용 처리 함수 적용
    };
  });
  // console.log({ posts: processedPosts });

  return Response.json({ totalCount, posts: processedPosts }, { status: 200 });
}

// 포스트 생성
export async function POST(request: Request) {
  console.log("\n\x1b[32m[api/posts]:::[POST]\x1b[0m");

  // authenticate
  const user = JSON.parse(request.headers.get("user") as string);
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

  // create
  const newPost = await Post.create({ ...post, author: foundUser._id });
  console.log({ newPost });

  return Response.json({ newPost }, { status: 200 });
}
