"use client";

import dynamic from "next/dynamic";

const SigninTabForm = dynamic(() => import("@/components/ui/SigninTabForm"), { ssr: false });

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
        <SigninTabForm />
      </section>
    </main>
  );
}
