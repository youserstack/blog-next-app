import connectDB from "@/lib/config/connectDB";
import Category from "@/lib/models/Category";

// 전체 카테고리 읽기
export async function GET(request: Request) {
  // console.log("\n\x1b[32m[api/categories]:::[GET]\x1b[0m");
  await connectDB();

  const foundCategories = await Category.find({});
  // console.log({ foundCategories });

  return Response.json({ categories: foundCategories });
}
