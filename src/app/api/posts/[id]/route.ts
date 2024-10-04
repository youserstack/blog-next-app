import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";
import { revalidatePath } from "next/cache";
import { uploadToCloudinary } from "@/lib/utils/uploader";
import "@/lib/config/cloudinaryConfig";
import User from "@/lib/models/User";
import { NextRequest } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // console.log("\n\x1b[32m[api/posts/[id]]\x1b[0m");
  await connectDB();

  // query
  const postId = params.id;
  const foundPost = await Post.findByIdAndUpdate(
    postId,
    { $inc: { views: 1 } }, // `views` 필드를 1 증가시킵니다.
    { new: true, upsert: false } // 업데이트된 포스트를 반환
  ).populate("author");

  // let foundPost = await Post.findById(postId).populate("author");
  // console.log({ foundPost });

  // 문서가 있는 경우에만 views 필드를 증가시킵니다.
  // if (foundPost) {
  //   foundPost.views += 1;
  //   await foundPost.save(); // 변경 사항을 저장합니다.
  // }

  return Response.json({ post: foundPost });
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  console.log("\n\x1b[38;2;255;100;0m[api/posts/[id]]:::[PATCH]\x1b[0m");

  // extract
  const postId = params.id;
  const formData = await request.formData();
  const category = formData.get("category") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const tags = formData.get("tags") as string;
  const image = formData.get("image") as File;

  // 업데이트할 객체를 준비한다.
  const payload: { [key: string]: any } = {};
  if (category !== null && category !== undefined) payload.category = category;
  if (title !== null && title !== undefined) payload.title = title;
  if (content !== null && content !== undefined) payload.content = content;
  if (tags !== null && tags !== undefined) {
    // 태그 문자열이 제공된 경우 배열로 변환합니다.
    payload.tags = tags
      .split(",")
      .map((tag: string) => tag.trim())
      .filter((tag: string) => tag !== ""); // 공백 태그 제거
  }
  if (image !== null && image !== undefined) {
    const isValidImage =
      image.size > 0 && image.name !== "undefined" && image.type !== "application/octet-stream";
    if (isValidImage) {
      try {
        const imageUrl = await uploadToCloudinary(image);
        payload.image = imageUrl;
      } catch (error) {
        console.error(error);
        return Response.json(
          { error: "이미지 파일을 클라우드에 저장하는데 실패했습니다." },
          { status: 400 }
        );
      }
    } else {
      console.log("유효하지 않은 이미지, 업로드 생략");
    }
  }

  // payload가 비어있는 경우, 업데이트할 데이터가 없음을 알립니다.
  if (Object.keys(payload).length === 0) {
    return Response.json({ error: "업데이트할 데이터가 제공되지 않았습니다." }, { status: 400 });
  }
  console.log({ payload });

  // 데이터베이스 업데이트
  const updatedPost = await Post.findByIdAndUpdate(postId, payload, { new: true });
  console.log({ updatedPost });

  // 서버 캐시 재검증
  revalidatePath(`/posts/${postId}`, "page");

  // 응답
  return Response.json({ updatedPost }, { status: 200 });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  console.log("\n\x1b[31m[api/posts/[id]]:::[DELETE]\x1b[0m");

  // authenticate
  const user = JSON.parse(request.headers.get("user") as string);
  const { email } = user;
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    const error = "유저 이메일(토큰에 저장된)을 조회하였지만 해당 사용자가 존재하지 않습니다.";
    return Response.json({ error }, { status: 404 });
  }

  // extract
  const postId = params.id;

  // delete
  const deletedPost = await Post.findByIdAndDelete(postId);
  console.log({ deletedPost });
  revalidatePath("/categories/[...category]", "page");
  return Response.json({ deletedPost });
}
