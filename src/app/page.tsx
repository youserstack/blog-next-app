export default function Home({ searchParams }: any) {
  console.log("\n[home-page]");
  console.log({ searchParams });

  return (
    <main className="home-page">
      <section>
        <h1>card list component</h1>
        <h1>side menu component</h1>
      </section>
    </main>
  );
}
