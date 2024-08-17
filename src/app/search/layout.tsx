import dynamic from "next/dynamic";

const SearchFilter = dynamic(() => import("@/components/features/SearchFilter"));

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <section>
        <div className="search" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <SearchFilter />
          {children}
        </div>
      </section>
    </main>
  );
}
