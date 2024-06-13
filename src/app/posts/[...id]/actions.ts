"use server";

import { updatePost } from "@/lib/utils/fetcher";
import cloudinary from "cloudinary";

// cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

export async function updatePostAction(formData: FormData, postId: string, accessToken: string) {
  console.log("\n\x1b[35m\n<updatePostAction>\x1b[0m");

  // extract
  // const category = formData.get("category");
  // const title = formData.get("title");
  // const content = formData.get("content");
  // const tags = formData.get("tags");
  // const image = formData.get("image") as File;
  // const payload = { category, title, content, tags, image };

  // image upload
  // const url = await saveFile(image);
  // console.log({ url });
  // const payload = { category, title, content, tags, image: url };
  // console.log({ payload });

  // request
  const result = await updatePost(postId, formData, accessToken);
  return result;
}

export async function createComment(formData: FormData, postId: string, accessToken: string) {
  console.log("\n\x1b[35m<createComment>\x1b[0m");

  // extract
  // console.log({ accessToken, postId, content });
  const content = formData.get("content");

  // request
  const response = await fetch(`${process.env.ROOT_URL}/api/comments/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, postId }),
  });
  const result = await response.json();
  return result;
}
