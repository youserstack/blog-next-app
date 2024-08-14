import dynamic from "next/dynamic";

const SideNav = dynamic(() => import("@/components/ui/SideNav"));

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="category-layout">
      <section style={{ display: "flex" }}>
        <SideNav />
        {children}
      </section>
      <section></section>
    </main>
  );
}
