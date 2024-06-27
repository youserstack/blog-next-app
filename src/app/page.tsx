import { headers } from "next/headers";

export default function Home() {
  // console.log("\n\x1b[34m[/]\x1b[0m");
  // const user = JSON.parse(headers().get("user") as string);

  return (
    <main className="home">
      <section>
        <h1>card list component</h1>
        <h1>side menu component</h1>
      </section>
    </main>
  );
}
