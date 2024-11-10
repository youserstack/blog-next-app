import SearchFilters from "@/components/ui/SearchFilters";

interface Props {
  children: React.ReactNode;
}

export default function SearchLayout({ children }: Props) {
  return (
    <main>
      <section>
        <div className="search" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <SearchFilters />
          {children}
        </div>
      </section>
    </main>
  );
}
