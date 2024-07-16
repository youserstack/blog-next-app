import SignupForm from "@/components/ui/SignupForm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function Signup() {
  const user = JSON.parse(headers().get("user") as string);

  if (user) redirect("/dashboard");

  return (
    <main className="signup-page">
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SignupForm />
      </section>
    </main>
  );
}
