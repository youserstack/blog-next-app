import SigninForm from "@/components/ui/SigninForm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function Signin() {
  const user = JSON.parse(headers().get("user") as string);

  if (user) redirect("/");

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
        <SigninForm />
      </section>
    </main>
  );
}
