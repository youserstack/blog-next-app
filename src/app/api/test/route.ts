export async function GET(request: Request) {
  console.log("\n\x1b[32m[api/test]\x1b[0m");

  return Response.json({ message: "sdfhlsdhflsdkhfls" }, { status: 200 });
}
