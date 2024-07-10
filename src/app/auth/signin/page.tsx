import SigninForm from "@/components/ui/SigninForm";

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
        <SigninForm />
      </section>
    </main>
  );
}
