import dynamic from "next/dynamic";

const SearchFilter = dynamic(() => import("@/components/features/SearchFilter"));
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default async function SearchLayout({ children }: { children: React.ReactNode }) {
  const { categories } = await fetcher(`${process.env.ROOT_URL}/api/categories`);

  return (
    <main>
      <section>
        <div className="search" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <SearchFilter categories={categories} />
          {children}
        </div>
      </section>
    </main>
  );
}
