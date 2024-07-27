import LatestPostList from "@/components/lists/LatestPostList";
import PopularPostList from "@/components/lists/PopularPostList";
import RecentCommentList from "@/components/lists/RecentCommentList";
import HomeHeroImageSkeleton from "@/components/skeletons/HomeHeroImageSkeleton";
import LatestPostListSkeleton from "@/components/skeletons/LatestPostListSkeleton";
import PopularPostListSkeleton from "@/components/skeletons/PopularPostListSkeleton";
import RecentCommentListSkeleton from "@/components/skeletons/RecentCommentListSkeleton";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="home">
      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div className="first" style={{ display: "flex", gap: "1rem" }}>
          <Suspense fallback={<HomeHeroImageSkeleton />}>
            <div style={{ flex: "3" }}>
              <Image
                src={"/images/ant-rozetsky-HXOllTSwrpM-unsplash.jpg"}
                width={1000}
                height={1000}
                alt=""
              />
            </div>
          </Suspense>

          <Suspense fallback={<RecentCommentListSkeleton />}>
            <RecentCommentList />
          </Suspense>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <Suspense fallback={<PopularPostListSkeleton />}>
            <PopularPostList />
          </Suspense>

          <Suspense fallback={<LatestPostListSkeleton />}>
            <LatestPostList />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

// import RecentCommentList from "@/components/lists/RecentCommentList";
// import PopularPostList from "@/components/lists/PopularPostList";
// import LatestPostList from "@/components/lists/LatestPostList";
// import HomeSkeleton from "@/components/skeletons/HomeSkeleton";
// import { Suspense } from "react";
// import Image from "next/image";

// export default function Home() {
//   return (
//     <main className="home">
//       <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//         <Suspense fallback={<HomeSkeleton />}>
//           <div style={{ display: "flex", gap: "1rem" }}>
//             <div style={{ flex: "3" }}>
//               <Image
//                 src={
//                   "https://res.cloudinary.com/dzktdrw7o/image/upload/v1721977672/blog-next-app/ant-rozetsky-HXOllTSwrpM-unsplash_kqwe46.jpg"
//                 }
//                 width={1000}
//                 height={1000}
//                 alt=""
//               />
//             </div>
//             <RecentCommentList />
//           </div>

//           <div style={{ display: "flex", gap: "1rem" }}>
//             <PopularPostList />
//             <LatestPostList />
//           </div>
//         </Suspense>
//       </section>
//     </main>
//   );
// }
