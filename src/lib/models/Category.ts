import mongoose from "mongoose";

// 카테고리 스키마 정의
const categorySchema: any = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sub1Categories: [
      {
        name: String,
        sub2Categories: [
          {
            name: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

// 카테고리 모델 정의
const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
