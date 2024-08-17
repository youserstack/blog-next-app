import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const SignupForm = dynamic(() => import("@/components/ui/SignupForm"));

export default function Signup() {
  const user = JSON.parse(headers().get("user") as string);

  if (user) {
    redirect("/");
  }

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
