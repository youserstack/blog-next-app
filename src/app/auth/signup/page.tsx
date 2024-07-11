import SignupForm from "@/components/ui/SignupForm";

export default function Signup() {
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
