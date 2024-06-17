"use server";

export async function createCategoryAction(
  payload: { parentCategories: string[]; childCategory: string },
  accessToken: string
) {
  console.log("\x1b[35m\n<createCategoryAction>\x1b[0m");

  const response = await fetch(`${process.env.ROOT_URL}/api/categories`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(payload),
  });

  return response.json();
}
