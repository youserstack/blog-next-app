import { Paper, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const fetcher = (url: string) =>
  fetch(url, { next: { revalidate: 600 } }).then((res) => res.json());

export default async function PopularPostList() {
  const { posts } = await fetcher(`${process.env.ROOT_URL}/api/home/popular-posts`);

  return (
    <Paper className="popular-post-list" variant="outlined" sx={{ padding: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Typography>인기글</Typography>
        <Link href="/search?sort=popular">더보기</Link>
      </div>

      <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {posts.map((post: any) => (
          <Paper key={post._id} variant="outlined" sx={{ height: "100px", overflow: "hidden" }}>
            <Link href={`/posts/${post._id}`} style={{ height: "100%", display: "flex" }}>
              <div className="thumbnail" style={{ width: "100px" }}>
                {post.image && <Image src={post.image} alt="alt" width={200} height={200} />}
              </div>

              <div
                className="content"
                style={{
                  flex: "1",
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5">{post.title}</Typography>
                <Typography>
                  {post.content.length > 40 ? post.content.slice(0, 40) + "..." : post.content}
                </Typography>

                {/* <div style={{ display: "flex", gap: "1rem" }}>
                  <p>조회수 {post.views}</p>
                  <p>카테고리 {post.category.replaceAll("/", " > ")}</p>
                </div> */}
              </div>
            </Link>
          </Paper>
        ))}
      </ul>
    </Paper>
  );
}

// "use client";

// import { Paper, Skeleton, Typography } from "@mui/material";
// import Image from "next/image";
// import Link from "next/link";
// import useSWR from "swr";

// const fetcher = (url: string) =>
//   fetch(url, { next: { revalidate: 600 } }).then((res) => res.json());

// export default function PopularPostList() {
//   const { isLoading, data } = useSWR(`${process.env.ROOT_URL}/api/posts?sort=popular`, fetcher);

//   if (isLoading || !data) {
//     return (
//       <Paper className="latest-post-list" variant="outlined" sx={{ padding: "1rem" }}>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "1rem",
//           }}
//         >
//           <Skeleton variant="text" animation="wave" width={100} />
//           <Skeleton variant="text" animation="wave" width={40} />
//         </div>

//         <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//           {[1, 2, 3, 4, 5].map((v: any) => (
//             <Paper
//               key={v}
//               component={"li"}
//               variant="outlined"
//               sx={{ height: "100px", display: "flex", overflow: "hidden" }}
//             >
//               <Skeleton variant="rectangular" animation="wave" width={100} height={100} />

//               <div
//                 style={{
//                   width: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                   padding: "1rem",
//                 }}
//               >
//                 <Skeleton
//                   variant="text"
//                   animation="wave"
//                   sx={{ width: { xs: "30%", lg: "40%" } }}
//                 />
//                 <Skeleton
//                   variant="text"
//                   animation="wave"
//                   sx={{ width: { xs: "70%", lg: "80%" } }}
//                 />
//               </div>
//             </Paper>
//           ))}
//         </ul>
//       </Paper>
//     );
//   }

//   return (
//     <Paper className="popular-post-list" variant="outlined" sx={{ padding: "1rem" }}>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "1rem",
//         }}
//       >
//         <Typography>인기글</Typography>
//         <Link href="/search?sort=popular">더보기</Link>
//       </div>

//       <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//         {data.posts.map((post: any) => (
//           <Paper key={post._id} variant="outlined" sx={{ height: "100px", overflow: "hidden" }}>
//             <Link href={`/posts/${post._id}`} style={{ height: "100%", display: "flex" }}>
//               <div className="thumbnail" style={{ width: "100px" }}>
//                 {post.image && <Image src={post.image} alt="alt" width={200} height={200} />}
//               </div>

//               <div
//                 className="content"
//                 style={{
//                   flex: "1",
//                   padding: "1rem",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <Typography variant="h5">{post.title}</Typography>
//                 <Typography>
//                   {post.content.length > 40 ? post.content.slice(0, 40) + "..." : post.content}
//                 </Typography>

//                 {/* <div style={{ display: "flex", gap: "1rem" }}>
//                   <p>조회수 {post.views}</p>
//                   <p>카테고리 {post.category.replaceAll("/", " > ")}</p>
//                 </div> */}
//               </div>
//             </Link>
//           </Paper>
//         ))}
//       </ul>
//     </Paper>
//   );
// }
