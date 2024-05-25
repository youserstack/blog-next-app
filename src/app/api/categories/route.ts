import connectDB from "@/lib/config/connectDB";
import Category from "@/lib/models/Category";

export async function GET(request: Request) {
  // console.log("\n\x1b[32m[api/categories]\x1b[0m");
  await connectDB();
  const foundCategories = await Category.find({});
  // const categoryNames = foundCategories.map((category: any) => category.name);
  // console.log({ categoryNames });
  return Response.json({ categories: foundCategories });
}
