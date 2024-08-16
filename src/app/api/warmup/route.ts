export const dynamic = "force-dynamic"; // static by default, unless reading the request

export function GET(req: Request) {
  console.log("cron warm up");
  return Response.json({ message: "cron warm up" }, { status: 200 });
}
