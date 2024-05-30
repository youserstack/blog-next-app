"use client";

import { Context } from "@/components/context/Provider";
import { useContext, useEffect } from "react";

export default function Dashboard() {
  console.log("\n\x1b[34m[pages/dashboard]\x1b[0m");

  const { refreshAccessToken }: any = useContext(Context);

  useEffect(() => {
    const fetchSomething = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch("/api/test", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log({ data });
        } else {
          throw new Error("why not?");
        }
      } catch (error: any) {
        console.log(error.message);
        await refreshAccessToken();
        fetchSomething();
      }
    };
    fetchSomething();
  }, []);

  return (
    <main className="dashboard">
      <section>
        <h1>작성중인 최신블로그 글</h1>
        <h1></h1>
      </section>
    </main>
  );
}
