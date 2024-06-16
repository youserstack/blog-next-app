import connectDB from "@/lib/config/connectDB";
import Category from "@/lib/models/Category";

// 카테고리 생성
export async function POST(request: Request) {
  console.log("\n\x1b[32m[api/categories]:::[POST]\x1b[0m");
  await connectDB();

  // extract
  const formData = await request.formData();
  const parentCategories = JSON.parse(formData.get("parentCategories") as string) as string[];
  const childCategory = formData.get("childCategory") as string;
  if (!parentCategories || !childCategory) {
    return Response.json({ error: { message: "부모경로나 자식경로를 누락하였습니다." } });
  }
  console.log({ parentCategories, childCategory });

  // 카테고리 0개 (parentCAtegories === [])
  if (parentCategories.length === 0) {
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

    return Response.json({ newCategory: childCategory }, { status: 200 });
  }

  return Response.json({ error: "카테고리 생성 실패" }, { status: 400 });
}

// 전체 카테고리 읽기
export async function GET(request: Request) {
  // console.log("\n\x1b[32m[api/categories/GET]\x1b[0m");
  await connectDB();
  const foundCategories = await Category.find({});
  return Response.json({ categories: foundCategories });
}

// 카테고리 삭제
export async function DELETE(request: Request) {
  console.log("\n\x1b[32m[api/categories]:::[DELETE]\x1b[0m");
  await connectDB();

  // extract
  // const { categories } = await request.json();
  const url = new URL(request.url);
  const categoryPath = url.searchParams.get("categoryPath");
  console.log({ categoryPath });
  return Response.json({ message: "지금 테스트중..." });

  // const { categories, parentCategories, childCategory } = await request.json();
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

  return Response.json({ deletedCategory: categories[categories.length - 1] }, { status: 200 });
}
// export async function DELETE(request: Request) {
//   console.log("\n\x1b[32m[api/categories/DELETE]\x1b[0m");
//   await connectDB();

//   // extract
//   const { categories, parentCategories, childCategory } = await request.json();
//   console.log({ categories, parentCategories, childCategory });
//   const [categoryName, sub1CategoryName, sub2CategoryName] = categories;
//   console.log({ categoryName, sub1CategoryName, sub2CategoryName });

//   // query
//   let foundCategory;
//   try {
//     foundCategory = await Category.findOne({ name: categoryName });
//     if (!foundCategory) throw new Error("no foundCategory");
//     console.log({ foundCategory });

//     // sub1
//     const sub1Category = foundCategory.sub1Categories.find(
//       (sub1Category: any) => sub1Category.name === sub1CategoryName
//     );
//     if (!sub1Category) {
//       await foundCategory.remove();
//       return Response.json({ deletedLeafNode: foundCategory });
//     }
//     console.log({ sub1Category });

//     // sub2
//     const sub2Category = sub1Category.sub2Categories.find(
//       (sub2Category: any) => sub2Category.name === sub2CategoryName
//     );
//     if (!sub2Category) {
//       sub1Category.sub2Categories.filter(
//         (sub2Category: any) => sub2Category.name === sub2CategoryName
//       );
//       await foundCategory.save();
//       return Response.json({ deletedLeafNode: sub1Category });
//     }
//     console.log({ sub2Category });

//     await sub2Category.remove();
//     return Response.json({ deletedLeafNode: sub2Category });

//     // categories.forEach((category: any) => {
//     //   console.log({ category });
//     // });
//   } catch (error) {}

//   return Response.json({ message: "testing..." }, { status: 200 });
// }
