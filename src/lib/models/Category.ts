import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
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

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
