import connectDB from "@/lib/config/connectDB";
import { uploadMiddleware } from "@/lib/middlewares/uploadMiddlewares";
import Post from "@/lib/models/Post";
import cloudinary from "cloudinary";
import multer from "multer";

// 포스트글 읽기
export async function GET(request: Request, { params }: { params: { id: string } }) {
  console.log("\n\x1b[32m[api/posts/[id]]\x1b[0m");
  await connectDB();

  // query
  const postId = params.id;
  const foundPost = await Post.findById(postId).populate("author");
  console.log({ foundPost });

  return Response.json({ post: foundPost });
}

// 포스트글 수정
interface UploadResult {
  url: string;
}
async function saveFile(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const result = await new Promise<UploadResult>((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream({ folder: "blog-next-app" }, function (error, result) {
        if (error || result === undefined) {
          reject(error || new Error("Upload result is undefined."));
          return;
        }
        resolve(result);
      })
      .end(buffer);
  });

  return result.url;
}
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  console.log("\n\x1b[32m[api/posts/[id]]:::[PATCH]\x1b[0m");
  await connectDB();

  // extract the formData
  const formData = await request.formData();
  const postId = params.id;
  console.log({ formData });
  const category = formData.get("category");
  const title = formData.get("title");
  const content = formData.get("content");
  const tags = formData.get("tags");
  const image = formData.get("image") as File;

  // configurate the cloudinary api
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // upload a image
  const url = await saveFile(image);

  // arrange the document's fields
  // 업데이트할 객체를 준비한다.
  // payload에서 null이나 빈 객체 {}인 필드를 제거합니다.
  const payload = { category, title, content, tags, image: url };
  const filteredPayload = Object.entries(payload).reduce((acc, [key, value]: any) => {
    // value가 null이거나 빈 객체이면 acc에 추가하지 않고, 다음으로 넘어갑니다.
    const isNull = value === null;
    const isEmptyObject =
      typeof value === "object" && value !== null && Object.keys(value).length === 0;
    if (isNull || isEmptyObject) return acc;

    acc[key] = value; // null도 아니고 빈 객체도 아닌 경우, acc에 key-value 쌍을 추가합니다.
    return acc; // 누적된 객체를 반환합니다.
  }, {} as { [key: string]: any });
  console.log({ filteredPayload });

  // return Response.json({ message: "testing..." });

  // update
  const updatedPost = await Post.findByIdAndUpdate(postId, filteredPayload, { new: true });
  console.log({ updatedPost });

  return Response.json({ updatedPost }, { status: 200 });
}
// export async function PATCH(request: Request, { params }: { params: { id: string } }) {
//   console.log("\n\x1b[32m[api/posts/[id]]:::[PATCH]\x1b[0m");
//   await connectDB();

//   // extract
//   // const blob = await request.blob();
//   // const formData = await request.formData();
//   const postId = params.id;
//   const payload = await request.json();
//   console.log({ payload });

//   // payload에서 null이나 빈 객체 {}인 필드를 제거합니다.
//   const filteredPayload = Object.entries(payload).reduce((acc, [key, value]: any) => {
//     // value가 null이거나 빈 객체이면 acc에 추가하지 않고, 다음으로 넘어갑니다.
//     const isNull = value === null;
//     const isEmptyObject =
//       typeof value === "object" && value !== null && Object.keys(value).length === 0;
//     if (isNull || isEmptyObject) return acc;

//     acc[key] = value; // null도 아니고 빈 객체도 아닌 경우, acc에 key-value 쌍을 추가합니다.
//     return acc; // 누적된 객체를 반환합니다.
//   }, {} as { [key: string]: any });
//   console.log({ filteredPayload });

//   return Response.json({ message: "testing..." });

//   // const updatedPost = await Post.findByIdAndUpdate(postId, payload, { new: true });
//   // console.log({ updatedPost });

//   // return Response.json({ updatedPost }, { status: 200 });
// }

// 포스트글 삭제
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  console.log("\n\x1b[32m[api/posts/[id]]:::[DELETE]\x1b[0m");
  await connectDB();

  // query
  const postId = params.id;
  const deletedPost = await Post.findByIdAndDelete(postId);
  console.log({ deletedPost });

  return Response.json({ deletedPost });
}
