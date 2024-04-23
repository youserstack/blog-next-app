import Article from "@/components/Article";
import ScrollNav from "@/components/ScrollNav";

export default async function Page({ params }: { params: { slug: string[] } }) {
  // console.log({ params });
  const response = await fetch("http://localhost:3000/api");
  const data = await response.json();

  return (
    <main>
      <section>
        <ScrollNav />
        <Article />
      </section>
      <section></section>
    </main>
  );
}
