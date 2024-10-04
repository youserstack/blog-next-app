import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";
import User from "@/lib/models/User";
import { uploadToCloudinary } from "@/lib/utils/uploader";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function GET(request: Request) {
  // console.log("\n\x1b[32m[api/posts]:::[GET]\x1b[0m");
  await connectDB();

  // extract
  const { searchParams } = new URL(request.url);
  const searchWords = searchParams.get("searchWords");
  const categoryPath = searchParams.get("categoryPath");
  const sort = searchParams.get("sort") || "newest";
  const page = searchParams.get("page") || "1";
  const POST_PER_PAGE = 5;
  const skip = ((parseInt(page) || 1) - 1) * POST_PER_PAGE;
  // console.log({ searchWords, categoryPath, sort, page });

  // 쿼리 조건 생성
  let query = {};
  if (searchWords) {
    const searchRegex = { $regex: searchWords, $options: "i" }; // $options: "i", // 대소문자 구분하지 않음
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
  // console.log(JSON.stringify({ query }, null, 2));

  // 정렬 조건 생성
  let sortOptions: any = {};
  switch (sort) {
    case "asc":
      sortOptions = { title: 1 }; // 제목 기준 오름차순
      break;
    case "desc":
      sortOptions = { title: -1 }; // 제목 기준 내림차순
      break;
    case "popular":
      sortOptions = { views: -1 }; // 조회수 기준 내림차순
      break;
    case "newest":
    default:
      sortOptions = { createdAt: -1 }; // 최신순 (기본값)
      break;
  }

  // query
  const totalCount = await Post.countDocuments(query);
  const posts: any = await Post.find(query)
    .populate("author")
    .sort(sortOptions) // 정렬 옵션 적용
    .skip(skip)
    .limit(POST_PER_PAGE);
  // console.log({ posts });

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

export async function POST(request: Request) {
  console.log("\n\x1b[34m[api/posts]:::[POST]\x1b[0m");

  // FormData에서 데이터 추출
  const formData = await request.formData();
  const userId = formData.get("userId");
  const category = formData.get("category");
  const title = formData.get("title");
  const content = formData.get("content");
  const tags = formData.get("tags");
  const image = formData.get("image") as File; // 이미지 파일
  console.log({ userId, category, title, content, tags, image });
  if (!category || !title || !content || !tags || !image)
    return Response.json(
      { error: "포스트 게시물의 필수 정보를 모두 입력하세요." },
      { status: 400 }
    );

  // create a image url
  let imageUrl: string | null;
  try {
    imageUrl = await uploadToCloudinary(image);
  } catch (error) {
    console.log(error);
    return Response.json(
      { error: "이미지 파일을 클라우드에 저장하는데 실패했습니다." },
      { status: 500 }
    );
  }
  console.log({ imageUrl });

  // create
  const payload = {
    category,
    title,
    content,
    author: userId,
    tags,
    image: imageUrl,
  };
  const newPost = await Post.create(payload);
  console.log({ newPost });

  // revalidatePath("/api/posts");

  return Response.json({ newPost }, { status: 200 });
}
