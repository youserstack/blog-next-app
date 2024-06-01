import connectDB from "@/lib/config/connectDB";
import Category from "@/lib/models/Category";

export async function GET(request: Request) {
  // console.log("\n\x1b[32m[api/categories/GET]\x1b[0m");
  await connectDB();
  const foundCategories = await Category.find({});
  return Response.json({ categories: foundCategories });
}

export async function DELETE(request: Request) {
  console.log("\n\x1b[32m[api/categories/DELETE]\x1b[0m");
  await connectDB();

  // extraction
  const { categories, parentCategories, childCategory } = await request.json();
  const length = categories.length;
  console.log({ categories, parentCategories, childCategory });

  // query
  if (length === 1) {
    // 최상위 카테고리 삭제
    await Category.findOneAndDelete({ name: categories[0] });
  } else if (length === 2) {
    // 최상위 카테고리 찾기
    let category = await Category.findOne({ name: categories[0] });
    if (!category) throw new Error("Category not found");

    // 서브1 카테고리 배열에서 카테고리 삭제
    category.sub1Categories = category.sub1Categories.filter(
      (sub: any) => sub.name !== categories[1]
    );
    await category.save();
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
  }

  return Response.json({ message: "void..." }, { status: 200 });
}
// export async function DELETE(request: Request) {
//   console.log("\n\x1b[32m[api/categories/DELETE]\x1b[0m");
//   await connectDB();

//   // extraction
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
