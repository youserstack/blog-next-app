import Article from "@/components/Article";
import ScrollNav from "@/components/ScrollNav";
import { headers } from "next/headers";

export default function Home() {
  const header = headers();
  const pathname = header.get("pathname");
  const url = header.get("url");

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
