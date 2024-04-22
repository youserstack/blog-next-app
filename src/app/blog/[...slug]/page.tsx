import Article from "@/components/Article";
import ScrollNav from "@/components/ScrollNav";

export default async function Page({ params }: { params: { slug: string[] } }) {
  // console.log({ params });
  const response = await fetch("http://localhost:3000/api");
  const data = await response.json();

  return (
    <main>
      <section>
        {/* {params.slug.map((id: any) => (
          <h1 key={id}>{id}</h1>
        ))} */}
        <ScrollNav />
        <Article />
      </section>
    </main>
  );
}
