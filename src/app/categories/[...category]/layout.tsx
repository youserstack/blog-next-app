import ExpandableNav from "@/components/ui/ExpandableNav";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Props {
  children: React.ReactNode;
}

export default async function CategoryLayout({ children }: Props) {
  const { categories } = await fetcher(`${process.env.ROOT_URL}/api/categories`);

  return (
    <main className="category-layout">
      <section style={{ display: "flex" }}>
        <ExpandableNav categories={categories} />
        {children}
      </section>
    </main>
  );
}
