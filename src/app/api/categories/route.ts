import connectDB from "@/lib/config/connectDB";
import Category from "@/lib/models/Category";
import Post from "@/lib/models/Post";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  console.log("\n\x1b[34m[api/categories]:::[POST]\x1b[0m");
  await connectDB();

  // extract
  const { parentCategories: tempParentCategories, childCategory: temp } = await request.json();
  // console.log({ tempParentCategories, temp });
  if (!temp.trim()) return Response.json({ error: "카테고리 누락" }, { status: 400 });
  const childCategory = temp.replace(/\s+/g, "-"); // 공백을 대시로 표기
  const parentCategories = JSON.parse(tempParentCategories);

  // 부모 카테고리 0개 (최상위로서 네비게이션메뉴에서 카테고리를 생성한 경우)
  if (parentCategories.length === 0) {
    // 루트 카테고리에서 중복 확인
    const rootCategory = await Category.findOne({ name: childCategory });
    if (rootCategory) return Response.json({ error: "카테고리 중복" }, { status: 409 }); // 409 Conflict

    const newCategory = await Category.create({ name: childCategory });
    console.log({ newCategory });

    revalidatePath("/categories/[...category]", "layout");

    return Response.json({ newCategoryPath: `/${childCategory}` }, { status: 200 });
  }

  // 부모 카테고리 1개
  if (parentCategories.length === 1) {
    const rootCategory = await Category.findOne({ name: parentCategories[0] });
    if (!rootCategory) return Response.json({ error: "no category" }, { status: 404 });

    // 서브1 카테고리에서 중복 확인
    const sub1Category = rootCategory.sub1Categories.some((sub: any) => sub.name === childCategory);
    if (sub1Category) return Response.json({ error: "카테고리 중복" }, { status: 409 }); // 409 Conflict

    // Set the category
    rootCategory.sub1Categories.push({ name: childCategory, sub2Categories: [] });
    const savedCategory = await rootCategory.save();
    console.log({ savedCategory });

    revalidatePath("/categories/[...category]", "layout");

    return Response.json(
      { newCategoryPath: `/${parentCategories.join("/")}/${childCategory}` },
      { status: 200 }
    );
  }

  // 부모 카테고리 2개
  if (parentCategories.length === 2) {
    const rootCategory = await Category.findOne({ name: parentCategories[0] });
    if (!rootCategory) return Response.json({ error: "no category" }, { status: 404 });

    const sub1Category = rootCategory.sub1Categories.find(
      (v: any) => v.name === parentCategories[1]
    );
    if (!sub1Category) return Response.json({ error: "no sub1Category" }, { status: 404 });

    // 서브2 카테고리에서 중복 확인
    const sub2Category = sub1Category.sub2Categories.some((sub: any) => sub.name === childCategory);
    if (sub2Category)
      return Response.json({ error: "Sub-sub-category already exists" }, { status: 409 }); // 409 Conflict

    // Set the category
    sub1Category.sub2Categories.push({ name: childCategory });
    const savedCategory = await rootCategory.save();
    console.log({ savedCategory });

    revalidatePath("/categories/[...category]", "layout");

    return Response.json(
      { newCategoryPath: `/${parentCategories.join("/")}/${childCategory}` },
      { status: 200 }
    );
  }

  return Response.json({ error: "카테고리 생성 실패" }, { status: 400 });
}

export async function GET(request: Request) {
  await connectDB();
  const foundCategories = await Category.find({});
  return Response.json({ categories: foundCategories }, { status: 200 });
}

export async function DELETE(request: Request) {
  console.log("\n\x1b[31m[api/categories]:::[DELETE]\x1b[0m");
  await connectDB();

  // extract
  // 한글도 처리하기 위해서 decodedURI를 사용한다.
  const { categories: temp } = await request.json();
  const categories = temp.map((v: string) => decodeURI(v));
  const length = categories.length;
  console.log({ categories });
  // const [rootCategory, sub1Category, sub2Category] = categories;
  // console.log({ rootCategory, sub1Category, sub2Category });

  // query
  if (length === 1) {
    // 최상위 카테고리 삭제
    const deletedCategory = await Category.findOneAndDelete({ name: categories[0] });

    // 카테고리를 가지고 있는 포스트 삭제
    // await Post.deleteMany({ category: `/${categories[0]}` });
    const deletedPosts = await Post.deleteMany({
      category: { $regex: `/${categories[0]}`, $options: "i" },
    });
    console.log({ deletedCategory, deletedPosts });
  } else if (length === 2) {
    // 최상위 카테고리 찾기
    let category = await Category.findOne({ name: categories[0] });
    if (!category) throw new Error("Category not found");

    // 서브1 카테고리 배열에서 카테고리 삭제
    category.sub1Categories = category.sub1Categories.filter(
      (sub: any) => sub.name !== categories[1]
    );
    await category.save();

    // 카테고리를 가지고 있는 포스트 삭제
    const deletedPosts = await Post.deleteMany({
      category: { $regex: `/${categories[1]}`, $options: "i" },
    });
    console.log({ deletedCategory: categories[1], deletedPosts });
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

    // 카테고리를 가지고 있는 포스트 삭제
    const deletedPosts = await Post.deleteMany({
      category: { $regex: `/${categories[2]}`, $options: "i" },
    });
    console.log({ deletedCategory: categories[2], deletedPosts });
  }

  revalidatePath("/categories/[...category]", "layout");

  return Response.json({ deletedCategory: categories[categories.length - 1] }, { status: 200 });
}
