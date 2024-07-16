import LatestPostList from "@/components/lists/LatestPostList";
import PopularPostList from "@/components/lists/PopularPostList";
import RecentCommentList from "@/components/lists/RecentCommentList";
import HomeSkeleton from "@/components/skeletons/loading";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="home">
      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Suspense fallback={<HomeSkeleton />}>
          <div className="first" style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: "3" }}>
              <Image
                src={"/images/ant-rozetsky-HXOllTSwrpM-unsplash.jpg"}
                width={1000}
                height={1000}
                alt=""
              />
            </div>
            <RecentCommentList />
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <PopularPostList />
            <LatestPostList />
          </div>
        </Suspense>
      </section>
    </main>
  );
}

// import LatestPostList from "@/components/lists/LatestPostList";
// import PopularPostList from "@/components/lists/PopularPostList";
// import RecentCommentList from "@/components/lists/RecentCommentList";
// import Image from "next/image";

// export default function Home() {
//   return (
//     <main className="home">
//       <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//         <div className="first" style={{ display: "flex", gap: "1rem" }}>
//           <div style={{ flex: "3" }}>
//             <Image
//               src={"/images/ant-rozetsky-HXOllTSwrpM-unsplash.jpg"}
//               width={1000}
//               height={1000}
//               alt=""
//             />
//           </div>
//           <RecentCommentList />
//         </div>

//         <div style={{ display: "flex", gap: "1rem" }}>
//           <PopularPostList />
//           <LatestPostList />
//         </div>
//       </section>
//     </main>
//   );
// }
