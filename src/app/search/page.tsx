import dynamic from "next/dynamic";
// import SearchResult from "@/components/articles/SearchResult";
// import { Suspense } from "react";
// import ServerLoading from "@/components/ui/ServerLoading";

const SearchResult = dynamic(() => import("@/components/articles/SearchResult"));

export default async function Search() {
  return (
    <SearchResult />
    // <div className="search">
    //   <Suspense fallback={<ServerLoading />}>
    //   </Suspense>
    // </div>
  );
}
