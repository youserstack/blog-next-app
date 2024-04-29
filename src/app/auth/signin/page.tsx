"use client";

import { signin } from "@/app/auth/signin/actions";
import { useFormState } from "react-dom";
import "./page.scss";
import { useRouter } from "next/navigation";

export default function Signin() {
  const [state, signinAction]: any = useFormState(signin, undefined);
  const router = useRouter();

  if (state?.status === "ok") {
    localStorage.setItem("accessToken", state.accessToken);
    router.push("/dashboard");
  }

  return (
    <main className="signin-page">
      <section>
        <form action={signinAction}>
          <input type="email" name="email" placeholder="email" required />
          <input type="password" name="password" placeholder="password" required />
          <button type="submit">sign in</button>
        </form>
        {state?.status === "error" && (
          <>
            <p>{state.error}</p>
            <p>유효한 이메일과 비밀번호를 입력해주세요.</p>
          </>
        )}
      </section>
    </main>
  );
}
