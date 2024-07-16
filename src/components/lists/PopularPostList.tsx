import { Paper, Typography } from "@mui/material";
import { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

const fetcher = (url: string) => fetch(url, { cache: "no-cache" }).then((res) => res.json());

export default async function PopularPostList() {
  const { posts } = await fetcher(`${process.env.ROOT_URL}/api/posts?sort=popular`);

  return (
    <Paper className="popular-post-list" variant="outlined" sx={popularPostListStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography>인기글</Typography>
        <Link href="/search?sort=popular">더보기</Link>
      </div>

      {posts.map((post: any) => (
        <Paper key={post._id} variant="outlined" sx={{ height: "100px", overflow: "hidden" }}>
          <Link href={`/posts/${post._id}`} style={{ height: "100%", display: "flex" }}>
            <div className="thumbnail" style={{ width: "100px" }}>
              {post.image && <Image src={post.image} alt="alt" width={200} height={200} />}
            </div>

            <div className="content" style={contentStyle}>
              <Typography variant="h5" sx={{ flex: "1" }}>
                {post.title}
              </Typography>

              <div style={{ display: "flex", gap: "1rem" }}>
                <p>조회수 {post.views}</p>
                <p>카테고리 {post.category.replaceAll("/", " > ")}</p>
              </div>
            </div>
          </Link>
        </Paper>
      ))}
    </Paper>
  );
}

const popularPostListStyle: CSSProperties = {
  flex: "1",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  fontSize: "12px",
};

const contentStyle: CSSProperties = {
  flex: "1",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

// "use client";

// import { Paper, Skeleton, Typography } from "@mui/material";
// import { CSSProperties } from "react";
// import useSWR from "swr";
// import Image from "next/image";
// import Link from "next/link";

// const fetcher = (url: string) => fetch(url, { cache: "no-cache" }).then((res) => res.json());

// export default function PopularPostList() {
//   const { data } = useSWR(`${process.env.ROOT_URL}/api/posts?sort=popular`, fetcher);

//   if (!data) {
//     return (
//       <Paper className="latest-post-list" variant="outlined" sx={popularPostListStyle}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <Skeleton variant="text" animation="wave" width={100} height={32} />
//           <Skeleton variant="text" animation="wave" width={40} height={32} />
//         </div>

//         {[1, 2, 3, 4, 5].map((v: any) => (
//           <Paper
//             key={v}
//             variant="outlined"
//             sx={{ height: "100px", display: "flex", overflow: "hidden" }}
//           >
//             <Skeleton variant="rectangular" animation="wave" width={100} height={100} />

//             <div className="content" style={contentStyle}>
//               <Skeleton variant="text" animation="wave" width={300} height={32} />
//               <Skeleton variant="text" animation="wave" width={250} height={16} />
//             </div>
//           </Paper>
//         ))}
//       </Paper>
//     );
//   }

//   return (
//     <Paper className="popular-post-list" variant="outlined" sx={popularPostListStyle}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <Typography>인기글</Typography>
//         <Link href="/search?sort=popular">더보기</Link>
//       </div>

//       {data.posts?.map((post: any) => (
//         <Paper key={post._id} variant="outlined" sx={{ height: "100px", overflow: "hidden" }}>
//           <Link href={`/posts/${post._id}`} style={{ height: "100%", display: "flex" }}>
//             <div className="thumbnail" style={{ width: "100px" }}>
//               {post.image && <Image src={post.image} alt="alt" width={200} height={200} />}
//             </div>

//             <div className="content" style={contentStyle}>
//               <Typography variant="h5" sx={{ flex: "1" }}>
//                 {post.title}
//               </Typography>

//               <div style={{ display: "flex", gap: "1rem" }}>
//                 <p>조회수 {post.views}</p>
//                 <p>카테고리 {post.category.replaceAll("/", " > ")}</p>
//               </div>
//             </div>
//           </Link>
//         </Paper>
//       ))}
//     </Paper>
//   );
// }

// const popularPostListStyle: CSSProperties = {
//   flex: "1",
//   padding: "1rem",
//   display: "flex",
//   flexDirection: "column",
//   gap: "1rem",
//   fontSize: "12px",
// };

// const contentStyle: CSSProperties = {
//   flex: "1",
//   padding: "1rem",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "space-between",
// };

// // const { setIsLoading }: any = useContext(Context);
// // useEffect(() => setIsLoading(isValidating), [isValidating]);
