import cloudinary from "cloudinary";

export interface UploadResult {
  secure_url: string;
}

export async function uploadToCloudinary(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const result = await new Promise<UploadResult>((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream({ folder: "blog-next-app" }, (error, result) => {
        if (error || result === undefined) {
          reject(error || new Error("Upload result is undefined."));
          return;
        }
        resolve(result);
      })
      .end(buffer);
  });
  // console.log({ result });

  return result.secure_url;
}
