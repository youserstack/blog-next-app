import Article from "@/components/Article";
import ScrollNav from "@/components/ScrollNav";
import "./page.scss";

export default async function Blog({ params }: { params: { slug: string[] } }) {
  // console.log({ params });
  const response = await fetch("http://localhost:3000/api");
  const data = await response.json();

  return (
    <main className="blog-page">
      <section>
        <ScrollNav />
        <Article />
      </section>
      <section></section>
    </main>
  );
}
