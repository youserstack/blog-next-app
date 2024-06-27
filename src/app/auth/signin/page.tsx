"use client";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signinAction } from "@/app/actions";
import "./page.scss";

export default function Signin() {
  const router = useRouter();
  const [state, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    const { error, accessToken } = await signinAction(formData);

    if (error) return { error };
    localStorage.setItem("accessToken", accessToken);
    router.refresh();
    return { accessToken };
  }, null);

  useEffect(() => {
    if (state?.accessToken) router.back();
  }, [state, router]);

  return (
    <main className="signin-page">
      <section>
        <form action={formAction}>
          <input type="email" name="email" placeholder="email" required />
          <input type="password" name="password" placeholder="password" required />
          <button type="submit">sign in</button>
        </form>
        {state?.error === "error" && (
          <>
            <p>{state.error}</p>
            <p>유효한 이메일과 비밀번호를 입력해주세요.</p>
          </>
        )}
      </section>
    </main>
  );
}
