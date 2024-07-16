import { Paper, Typography } from "@mui/material";
import { CSSProperties } from "react";
import Image from "next/image";

const fetcher = (url: string) => fetch(url, { cache: "no-cache" }).then((res) => res.json());

export default async function RecentCommentList() {
  const { comments } = await fetcher(`${process.env.ROOT_URL}/api/comments/recent`);

  return (
    <Paper className="recent-comment-list" variant="outlined" sx={commentListStyle}>
      <Typography>최근댓글</Typography>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {comments.map((comment: any) => (
          <Paper key={comment._id} variant="outlined" sx={commentStyle}>
            <div style={imageStyle}>
              <Image src={comment.author.image} alt="" width={30} height={30} />
            </div>

            <div>
              <Typography>{comment.author.name}</Typography>
              <Typography>
                {comment.content.length > 20
                  ? comment.content.slice(0, 20) + "..."
                  : comment.content}
              </Typography>
            </div>
          </Paper>
        ))}
      </div>
    </Paper>
  );
}

const commentListStyle: CSSProperties = {
  flex: "1",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const commentStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  padding: "1rem",
};

const imageStyle: CSSProperties = {
  width: "30px",
  height: "30px",
  minWidth: "30px",
  border: "2px solid green",
  borderRadius: "50%",
  overflow: "hidden",
};

// "use client";

// import { Paper, Skeleton, Typography } from "@mui/material";
// import { CSSProperties } from "react";
// import Image from "next/image";
// import useSWR from "swr";

// const fetcher = (url: string) => fetch(url, { cache: "no-cache" }).then((res) => res.json());

// export default function RecentCommentList() {
//   const { data } = useSWR(`${process.env.ROOT_URL}/api/comments/recent`, fetcher);

//   if (!data) {
//     return (
//       <Paper className="recent-comment-list" variant="outlined" sx={commentListStyle}>
//         <Skeleton variant="text" animation="wave" width={100} height={32} />

//         <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//           {[1, 2, 3, 4, 5].map((v: any) => (
//             <Paper key={v} variant="outlined" sx={commentStyle}>
//               <Skeleton variant="circular" animation="wave" width={30} height={30} />

//               <div>
//                 <Skeleton variant="text" animation="wave" width={40} height={24} />
//                 <Skeleton variant="text" animation="wave" width={150} height={24} />
//               </div>
//             </Paper>
//           ))}
//         </div>
//       </Paper>
//     );
//   }

//   return (
//     <Paper className="recent-comment-list" variant="outlined" sx={commentListStyle}>
//       <Typography>최근댓글</Typography>

//       <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//         {data.comments?.map((comment: any) => (
//           <Paper key={comment._id} variant="outlined" sx={commentStyle}>
//             <div style={imageStyle}>
//               <Image src={comment.author.image} alt="" width={30} height={30} />
//             </div>

//             <div>
//               <Typography>{comment.author.name}</Typography>
//               <Typography>
//                 {comment.content.length > 20
//                   ? comment.content.slice(0, 20) + "..."
//                   : comment.content}
//               </Typography>
//             </div>
//           </Paper>
//         ))}
//       </div>
//     </Paper>
//   );
// }

// const commentListStyle: CSSProperties = {
//   flex: "1",
//   padding: "1rem",
//   display: "flex",
//   flexDirection: "column",
//   gap: "1rem",
// };

// const commentStyle: CSSProperties = {
//   display: "flex",
//   alignItems: "center",
//   gap: "1rem",
//   padding: "1rem",
// };

// const imageStyle: CSSProperties = {
//   width: "30px",
//   height: "30px",
//   minWidth: "30px",
//   border: "2px solid green",
//   borderRadius: "50%",
//   overflow: "hidden",
// };
