export default async function Page({ params }: { params: { slug: string[] } }) {
  // console.log({ params });
  const response = await fetch("http://localhost:3000/api");
  const data = await response.json();
  console.log({ data });

  return (
    <main>
      <section>
        {params.slug.map((id: any) => (
          <h1 key={id}>{id}</h1>
        ))}
      </section>
    </main>
  );
}
