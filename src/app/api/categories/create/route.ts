import connectDB from "@/lib/config/connectDB";
import Category from "@/lib/models/Category";

// async function createCategory(parentCategory: string, childCategory: string) {
//   // Create a new category
//   // 새로운 카테고리 생성
//   const newCategory = await Category.create({ name: categoryName });
//   parentCategory.categories.push(newCategory);
//   const savedParentCategory = await parentCategory.save();
//   console.log({ savedParentCategory });

//   return newCategory;
// }

// async function createCategory(categoryName: string, parentCategories: string) {
//   // Get the parent category id
//   // 부모 카테고리 ID를 가져와야 함
//   const parentCategory = parentCategories ? await Category.findById(parentCategories) : null;
//   console.log({ parentCategory });

//   // Connect the category to parent category
//   // 부모 카테고리가 있는 경우, 하위 카테고리로 추가
//   if (parentCategory) {
//     // Create a new category
//     // 새로운 카테고리 생성
//     const newCategory = await Category.create({ name: categoryName });
//     console.log({ newCategory });

//     parentCategory.categories.push(newCategory);
//     const savedParentCategory = await parentCategory.save();
//     console.log({ savedParentCategory });

//     return newCategory;
//   }

//   const newCategory = await Category.create({ name: categoryName });
//   return newCategory;
// }

export async function POST(request: Request) {
  console.log("\n\x1b[32m[api/categories/create]\x1b[0m");

  // Connect to db
  await connectDB();

  // Get data
  const { parentCategories, childCategory } = await request.json();
  console.log({ parentCategories, childCategory });

  // 카테고리 0개 (parentCAtegories === null)
  if (parentCategories.length === 0 || parentCategories === null) {
    const newCategory = await Category.create({ name: childCategory });
    console.log({ newCategory });
    return Response.json({ newCategory }, { status: 200 });
  }

  // 카테고리 1개 (parentCAtegories === ['web'])
  if (parentCategories.length === 1) {
    // Find the category
    const foundCategory = await Category.findOne({ name: parentCategories[0] });
    if (!foundCategory) return Response.json({ error: "no category" }, { status: 404 });

    // Set the category
    foundCategory.sub1Categories.push({ name: childCategory, sub2Categories: [] });
    const savedCategory = await foundCategory.save();
    console.log({ savedCategory });

    return Response.json({ newCategory: childCategory }, { status: 200 });
  }

  // 카테고리 2개 (parentCAtegories === ['web', 'framework'])
  if (parentCategories.length === 2) {
    // Find the category
    const foundCategory = await Category.findOne({ name: parentCategories[0] });
    const sub1Category = foundCategory.sub1Categories.find(
      (v: any) => v.name === parentCategories[1]
    );
    if (!sub1Category) return Response.json({ error: "no sub1Category" }, { status: 404 });
    console.log({ sub1Category });

    // Set the category
    sub1Category.sub2Categories.push({ name: childCategory });
    const savedCategory = await foundCategory.save();
    console.log({ savedCategory });

    return Response.json({ newCategory: childCategory }, { status: 200 });
  }

  return Response.json({ error: "카테고리 생성 실패" }, { status: 400 });
}

// import connectDB from "@/lib/config/connectDB";
// import Category from "@/lib/models/Category";

// export async function POST(request: Request) {
//   // Connect to db
//   await connectDB();

//   // Get data
//   const { category } = await request.json();
//   console.log({ category });
//   let validatedCategory;
//   if (category[0] === "/") validatedCategory = category.slice(1);
//   else validatedCategory = category;
//   // const categories = category.split("/");

//   // Confirm the duplicated category
//   const duplicatedCategory = await Category.findOne({ name: validatedCategory });
//   if (duplicatedCategory) {
//     // console.log({ duplicatedCategory });
//     return Response.json({ duplicatedCategory }, { status: 403 });
//   }

//   // Create a new category
//   const newCategory = await Category.create({ name: validatedCategory });
//   console.log({ newCategory });

//   return Response.json({ newCategory });
// }

// Check the duplicated category
// const duplicatedCategory = await Category.findOne({ name: categoryName });
// if (duplicatedCategory) {
//   console.log({ duplicatedCategory });
//   return Response.json({ duplicatedCategory }, { status: 403 });
// }

// Create the category
// const newCategory = await createCategory(categoryName);

// return Response.json({ newCategory }, { status: 200 });

// for (let i = 0; i < parentCategories.length; i++) {
//   const currentCategory = parentCategories[i];
//   console.log({ currentCategory });
//   // const foundCategory = await Category.findOne({ name: currentCategory });
//   // console.log({ foundCategory });
// }

// let i = 0;
// while (!parentCategories.length) {
//   createCategory(parentCategories[i], childCategory);
// }

// 서브1 카테고리가 있는 경우
// const foundParentCategory: any = await Category.find({ name: parentCategories[0] });
// console.log({ foundParentCategory });
// if (!foundParentCategory) return;
// foundParentCategory.sub1Categories.push({ name: childCategory, sub2Categories: [] });
// await foundParentCategory.save();

// let validatedCategories = [];
// if (parentCategories[0] === "/") {
//   validatedCategories = parentCategories.split("/").slice(1);
//   console.log({ validatedCategories });
// }
