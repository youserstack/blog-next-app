import connectDB from "@/lib/config/connectDB";
import Category from "@/lib/models/Category";

export async function GET(request: Request) {
  console.log("\n\x1b[32m[api/categories]\x1b[0m");

  // Connect to db
  await connectDB();

  const foundCategories = await Category.find({}).exec();
  console.log({ categories: foundCategories });
  if (!foundCategories) return Response.json({ message: "asdahsdah" });

  return Response.json({ categories: foundCategories });
}
