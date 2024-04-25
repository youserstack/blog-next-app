import { cookies, headers } from "next/headers";

export default function Home() {
  const header = headers();
  const pathname = header.get("pathname");
  const url = header.get("url");

  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();
  // console.log({ allCookies });
  // console.log("env.mongodb_uri : ", process.env.MONGODB_URL);

  return (
    <main className="home-page">
      <section>
        <h1>Home page</h1>
        <h1>Home page</h1>
        <h1>Home page</h1>
      </section>
    </main>
  );
}
