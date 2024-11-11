"use client";

import dynamic from "next/dynamic";

const AuthTabs = dynamic(() => import("@/components/ui/AuthTabs"), { ssr: false });

export default function Signin() {
  return (
    <main className="signin-page">
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AuthTabs />
      </section>
    </main>
  );
}
