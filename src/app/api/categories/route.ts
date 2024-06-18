import connectDB from "@/lib/config/connectDB";
import Category from "@/lib/models/Category";
import { revalidatePath } from "next/cache";

// 카테고리 생성
export async function POST(request: Request) {
  console.log("\n\x1b[32m[api/categories]:::[POST]\x1b[0m");
  await connectDB();

  // extract
  const formData = await request.formData();
  const parentCategories = JSON.parse(formData.get("parentCategories") as string).map((v: string) =>
    decodeURI(v)
  );
  const childCategory = decodeURI(formData.get("childCategory") as string);
  console.log({ parentCategories, childCategory });

  // 부모 카테고리 0개 (최상위로서 네비게이션메뉴에서 카테고리를 생성한 경우)
  if (parentCategories.length === 0) {
    const newCategory = await Category.create({ name: childCategory });
    console.log({ newCategory });
    return Response.json({ newCategoryPath: `/${childCategory}` }, { status: 200 });
  }

  // 부모 카테고리 1개
  if (parentCategories.length === 1) {
    // Find the category
    const foundCategory = await Category.findOne({ name: parentCategories[0] });
    if (!foundCategory) return Response.json({ error: "no category" }, { status: 404 });

    // Set the category
    foundCategory.sub1Categories.push({ name: childCategory, sub2Categories: [] });
    const savedCategory = await foundCategory.save();
    console.log({ savedCategory });

    return Response.json(
      { newCategoryPath: `/${parentCategories.join("/")}/${childCategory}}` },
      { status: 200 }
    );
  }

  // 부모 카테고리 2개
  if (parentCategories.length === 2) {
    // Find the category
    const foundCategory = await Category.findOne({ name: parentCategories[0] });

    // Find the sub1category
    const foundSub1Category = foundCategory.sub1Categories.find(
      (v: any) => v.name === parentCategories[1]
    );
    if (!foundSub1Category)
      return Response.json({ error: "no foundSub1Category" }, { status: 404 });
    console.log({ foundSub1Category });

    // Set the category
    foundSub1Category.sub2Categories.push({ name: childCategory });
    const savedCategory = await foundCategory.save();
    console.log({ savedCategory });

    return Response.json(
      { newCategoryPath: `/${parentCategories.join("/")}/${childCategory}` },
      { status: 200 }
    );
  }

  revalidatePath("/api/categories");

  return Response.json({ error: { message: "카테고리 생성 실패" } }, { status: 400 });
}

// 전체 카테고리 읽기
export async function GET(request: Request) {
  // console.log("\n\x1b[32m[api/categories]:::[GET]\x1b[0m");
  await connectDB();
  const foundCategories = await Category.find({});
  return Response.json({ categories: foundCategories });
}

// 카테고리 삭제
export async function DELETE(request: Request) {
  console.log("\n\x1b[32m[api/categories]:::[DELETE]\x1b[0m");
  await connectDB();

  // extract
  // 한글도 처리하기 위해서 decodedURI를 사용한다.
  const { categories: temp } = await request.json();
  const categories = temp.map((v: string) => decodeURI(v));
  const length = categories.length;
  console.log({ categories });

  // query
  if (length === 1) {
    // 최상위 카테고리 삭제
    await Category.findOneAndDelete({ name: categories[0] });
    console.log({ deletedCategory: categories[0] });
  } else if (length === 2) {
    // 최상위 카테고리 찾기
    let category = await Category.findOne({ name: categories[0] });
    if (!category) throw new Error("Category not found");

    // 서브1 카테고리 배열에서 카테고리 삭제
    category.sub1Categories = category.sub1Categories.filter(
      (sub: any) => sub.name !== categories[1]
    );
    await category.save();
    console.log({ deletedCategory: categories[1] });
  } else if (length === 3) {
    // 최상위 카테고리 찾기
    let category = await Category.findOne({ name: categories[0] });
    if (!category) throw new Error("Category not found");

    // 서브1 카테고리 배열에서 카테고리 찾기
    let subCategory = category.sub1Categories.find((sub: any) => sub.name === categories[1]);
    if (!subCategory) throw new Error("Subcategory not found");

    // 서브2 카테고리 배열에서 카테고리 삭제
    subCategory.sub2Categories = subCategory.sub2Categories.filter(
      (sub: any) => sub.name !== categories[2]
    );
    await category.save();
    console.log({ deletedCategory: categories[2] });
  }

  revalidatePath("/api/categories");
  // revalidatePath("/", "layout");

  return Response.json({ deletedCategory: categories[categories.length - 1] }, { status: 200 });
}
