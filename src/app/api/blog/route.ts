import connectDB from "@/lib/config/connectDB";

export async function POST(request: Request) {
  console.log("\n[api/blog]");

  // Connect to db
  await connectDB();

  const slugs = await request.json();
  console.log({ slugs });

  return Response.json({ message: "temp..." }, {});
}
