import connectDB from "@/lib/config/connectDB";
import Category from "@/lib/models/Category";

export async function POST(request: Request) {
  // Connect to db
  await connectDB();

  // Get data
  const { category } = await request.json();
  // const categories = category.split("/");
  // console.log({ categories });

  // Create a new category
  const newCategory = await Category.create({ name: category });
  console.log({ newCategory });

  return Response.json({ newCategory });
}
