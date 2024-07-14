export default async function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {children}
      </section>
    </main>
  );
}
