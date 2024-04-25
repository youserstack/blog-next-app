import connectDB from "@/lib/config/connectDB";
import "./page.scss";

export default function Signin() {
  return (
    <main className="signin-page">
      <section>
        <form
          action={async (formData: FormData) => {
            "use server";
            console.log("signin-page > server-action");
            await connectDB();

            const email = formData.get("email");
            const password = formData.get("password");

            console.log("testing...");
          }}
        >
          <input type="email" name="email" />
          <input type="password" name="password" />
          <button type="submit">sign in</button>
        </form>
      </section>
    </main>
  );
}
