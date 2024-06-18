import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";
import { uploadMiddleware } from "@/lib/middlewares/uploadMiddlewares";
import { revalidatePath } from "next/cache";
import { uploadToCloudinary } from "@/lib/utils/uploader";
import "@/lib/config/cloudinaryConfig";
import User from "@/lib/models/User";

// 포스트 읽기 (read)
export async function GET(request: Request, { params }: { params: { id: string } }) {
  console.log("\n\x1b[32m[api/posts/[id]]\x1b[0m");
  await connectDB();

  // query
  const postId = params.id;
  const foundPost = await Post.findById(postId).populate("author");
  // console.log({ foundPost });

  return Response.json({ post: foundPost });
}

// 포스트 수정 (update)
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  console.log("\n\x1b[32m[api/posts/[id]]:::[PATCH]\x1b[0m");
  await connectDB();

  // extract the formData
  const formData = await request.formData();
  const postId = params.id;
  const category = formData.get("category");
  const title = formData.get("title");
  const content = formData.get("content");
  const tags = formData.get("tags");
  const image = formData.get("image");

  // create a image url
  let imageUrl: string | null;
  if (image && image instanceof File && image.size > 0) {
    // upload a image
    imageUrl = await uploadToCloudinary(image);
  } else {
    imageUrl = null;
    // console.error("Provided image is not a valid file or it is empty.");
    console.error("제공된 이미지 파일은 유효하지 않습니다.");
  }

  // 업데이트할 객체를 준비한다.
  // payload에서 null이나 빈 객체 {}인 필드를 제거합니다.
  const payload = { category, title, content, tags, image: imageUrl };
  const filteredPayload = Object.entries(payload).reduce((acc, [key, value]: any) => {
    // value가 null이거나 빈 객체이면 acc에 추가하지 않고, 다음으로 넘어갑니다.
    const isNull = value === null;
    const isEmptyObject =
      typeof value === "object" && value !== null && Object.keys(value).length === 0;
    if (isNull || isEmptyObject) return acc;

    acc[key] = value; // null도 아니고 빈 객체도 아닌 경우, acc에 key-value 쌍을 추가합니다.
    return acc; // 누적된 객체를 반환합니다.
  }, {} as { [key: string]: any });
  // console.log({ filteredPayload });

  // update
  const updatedPost = await Post.findByIdAndUpdate(postId, filteredPayload, { new: true });
  console.log({ updatedPost });

  // 서버 캐시 재검증
  revalidatePath("/posts/[...id]", "page");
  // revalidatePath("/", "layout");

  return Response.json({ updatedPost }, { status: 200 });
}

// 포스트 삭제 (delete)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  console.log("\n\x1b[32m[api/posts/[id]]:::[DELETE]\x1b[0m");
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
  const postId = params.id;

  // delete
  const deletedPost = await Post.findByIdAndDelete(postId);
  console.log({ deletedPost });

  revalidatePath("/categories/[...category]", "page");

  return Response.json({ deletedPost });
}
