import mongoose from "mongoose";

// 카테고리 스키마 정의
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

// 카테고리 모델 정의
const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
