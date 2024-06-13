import multer from "multer";
import cloudinary, { UploadApiOptions } from "cloudinary";

export const uploadImagesToServer = async (req: any, res: any, next: any) => {
  console.log("\n\x1b[32m(uploadImagesToServer)\x1b[0m");

  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "public/uploads");
    },
    filename: function (req, file, callback) {
      callback(null, new Date().toISOString() + "-" + file.originalname);
    },
  });

  await new Promise((resolve) => {
    // you may use any other multer function
    //use resolve() instead of next()
    // upload(req, res, resolve);

    const upload = multer({ storage }).single("image");
    // const upload = multer({ storage }).array("images");
    upload(req, res, resolve);
  });

  console.log({ files: req.files, body: req.body });
  await next();
};

export const uploadImagesToCloudinary = async (req: any, res: any, next: any) => {
  console.log("\n\x1b[32m(uploadImagesToCloudinary)\x1b[0m");

  // extract
  const { files } = req;
  // console.log({ files });

  cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
  const options: UploadApiOptions = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: "next-commerce-app",
  };

  // 1) upload : general Promise (비동기 업로드 : 로그를 한번에 보지 못하고, 처리된 순서대로 받게 된다.)
  // files.map(async (file: any) => {
  //   const result = await cloudinary.v2.uploader.upload(file.path, options);
  //   console.log({ cloudinaryUploadData: result });
  // });
  // 2) upload : Promise.all (비동기 업로드 : 로그 결과를 한번에 일괄적으로 받게 된다.)
  let uploadPromises: any = [];
  files.map(async (file: any) => {
    // keep the promise in uploadPromises
    // Promise.all을 사용하기 위해서 프라미스들을 저장한다.
    uploadPromises.push(cloudinary.v2.uploader.upload(file.path, options));
    // console.log({ cloudinaryUploadData: result });
  });
  const result = await Promise.all(uploadPromises);
  // console.log({ promiseAllResult: result });

  // add images to body
  req.body.images = result.map((item: any) => ({ url: item.url, secure_url: item.secure_url }));

  await next();
};
