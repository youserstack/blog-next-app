export async function deleteCategory(categories: string[], accessToken: string) {
  console.log("\n\x1b[35m<deleteCategory>\x1b[0m");

  const response = await fetch(`${process.env.ROOT_URL}/api/categories`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ categories }),
  });

  return response.json();
}
