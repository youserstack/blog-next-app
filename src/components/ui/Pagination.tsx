// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { Box, Button, useTheme } from "@mui/material";
// import Link from "next/link";

// const ITEMS_PER_PAGE = 5;

// export default function Pagination({ totalCount }: any) {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const totalPageCount = Math.ceil(totalCount / ITEMS_PER_PAGE);
//   const currentPage = parseInt(searchParams.get("page") as string) || 1;
//   const theme = useTheme();

//   // 현재 URL의 모든 쿼리 파라미터를 유지하면서 페이지를 변경
//   const createPageLink = (pageNumber: number) => {
//     const currentParams = new URLSearchParams(searchParams.toString());
//     currentParams.set("page", pageNumber.toString());
//     return `?${currentParams.toString()}`;
//   };

//   const prev = () => router.push(createPageLink(currentPage - 1));
//   const next = () => router.push(createPageLink(currentPage + 1));

//   return (
//     <Box
//       className="pagination"
//       sx={{
//         display: "flex",
//         justifyContent: "space-between",

//         border: "1px solid red",
//       }}
//     >
//       <Button onClick={prev} disabled={currentPage === 1}>
//         prev
//       </Button>
//       <Box className="page-numbers" sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//         {Array.from({ length: totalPageCount }, (v, k) => (
//           <Link
//             key={k + 1}
//             href={createPageLink(k + 1)}
//             className={`page-number`}
//             style={{
//               color: `${currentPage === k + 1 ? theme.palette.primary.light : "inherit"}`,
//               padding: "0 5px",
//             }}
//           >
//             {k + 1}
//           </Link>
//         ))}
//       </Box>
//       <Button onClick={next} disabled={currentPage >= Math.ceil(totalCount / ITEMS_PER_PAGE)}>
//         next
//       </Button>
//     </Box>
//   );
// }
