import dynamic from "next/dynamic";

const SearchResult = dynamic(() => import("@/components/articles/SearchResult"));

export default async function Search() {
  return <SearchResult />;
}
