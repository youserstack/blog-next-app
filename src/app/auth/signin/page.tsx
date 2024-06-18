"use client";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { Context } from "@/components/context/Provider";
import { signinAction } from "@/app/actions";
import "./page.scss";

export default function Signin() {
  console.log("\n\x1b[34m[/signin]\x1b[0m");

  const [state, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    const result = await signinAction(formData);

    if (result.error) return { error: result.error };
    localStorage.setItem("accessToken", result.accessToken);
    setIsSignedIn(true);
    router.refresh();
    return { accessToken: result.accessToken };
  }, null);
  const { setIsSignedIn }: any = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    // 로그인 성공하면 이전 경로로 이동한다.
    if (state?.accessToken) {
      router.back();
    }
  }, [state]); // `state`와 `setIsSignedIn`, `router`가 변경될 때마다 이 효과가 실행됩니다.

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
