const ROOT_URL = process.env.ROOT_URL;

export async function createCategory(formData: FormData, accessToken: string) {
  console.log("\n\x1b[35m<createCategory>\x1b[0m");

  const response = await fetch(`${process.env.ROOT_URL}/api/categories`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });

  return response.json();
}

export async function deleteCategory(categoryPath: string, accessToken: string) {
  console.log("\n\x1b[35m<createCategory>\x1b[0m");
  const encodedCategoryPath = encodeURIComponent(categoryPath);
  const response = await fetch(
    `${process.env.ROOT_URL}/api/categories?categoryPath=${encodedCategoryPath}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return response.json();
}
