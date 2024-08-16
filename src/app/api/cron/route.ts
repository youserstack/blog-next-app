export function GET(req: Request) {
  console.log("cron warm up");
  return Response.json({ message: "cron warm up" }, { status: 200 });
}
