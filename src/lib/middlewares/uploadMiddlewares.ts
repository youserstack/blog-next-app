import multer from "multer";

// 스토리지
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/uploads");
  },
  filename: function (req, file, callback) {
    callback(null, new Date().toISOString() + "-" + file.originalname);
  },
});

// 업로드 설정
const upload = multer({ storage });

// 미들웨어 함수
export const uploadMiddleware = upload.single("image"); // 'image'는 폼 필드의 이름
