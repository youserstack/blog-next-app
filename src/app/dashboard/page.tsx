"use client";

import { Context } from "@/components/context/Provider";
import { useContext, useEffect } from "react";

export default function Dashboard() {
  // console.log("\n\x1b[34m[pages/dashboard]\x1b[0m");

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
        const result = await response.json();
        if (response.ok) console.log(response.url, result);
        else throw new Error(result.message);
      } catch (error: any) {
        console.error(error.message);
        console.error("다시 엑세스 토큰을 갱신합니다.");
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
