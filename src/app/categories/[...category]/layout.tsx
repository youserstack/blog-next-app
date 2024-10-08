import dynamic from "next/dynamic";

const NestedNav = dynamic(() => import("@/components/ui/NestedNav"));

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="category-layout">
      <section style={{ display: "flex" }}>
        <NestedNav />
        {children}
      </section>
      <section></section>
    </main>
  );
}
