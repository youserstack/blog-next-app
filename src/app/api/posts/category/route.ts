import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";

export async function POST(request: Request) {
  console.log("\n\x1b[32m[api/posts/category]\x1b[0m");

  // Connect to db
  await connectDB();

  // Get data
  const { category } = await request.json();
  console.log({ category });

  // Lookup the posts
  const foundPosts: any = await Post.find({
    category: {
      $regex: category,
      // $options: "i", // 대소문자 구분하지 않음
    },
  })
    .populate("author")
    .exec();
  // const foundPosts: any = await Post.find({ category }).populate("author").exec();
  console.log({ foundPosts });

  // Modify the posts
  let modifiedPosts: any = [];
  // let temp = [];
  for (let i = 0; i < foundPosts.length; i++) {
    const post = foundPosts[i];
    modifiedPosts.push({ ...post._doc, author: post.author ? post.author.name : "unknown" });
    // temp.push(post.title);
  }
  // console.log({ postTitles: temp });
  console.log({ "posts.length": modifiedPosts.length });

  return Response.json({ posts: modifiedPosts }, {});
}
