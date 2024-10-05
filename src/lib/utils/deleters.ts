export async function deleteComment(commentId: string, accessToken: string) {
  const response = await fetch(`${process.env.ROOT_URL}/api/comments/${commentId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.json();
}
