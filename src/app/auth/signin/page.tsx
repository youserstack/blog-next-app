import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const SigninTabForm = dynamic(() => import("@/components/ui/SigninTabForm"), { ssr: false });

export default async function Signin() {
  const user = JSON.parse(headers().get("user") as string);

  if (user) {
    redirect("/");
  }

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
