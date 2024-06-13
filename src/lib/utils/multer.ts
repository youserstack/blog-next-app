import multer from "multer";

// Multer 설정 - 메모리에 파일을 저장
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
