"use client";

import { signinAction } from "@/app/auth/signin/actions";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { Context } from "@/components/context/Provider";
import "./page.scss";

export default function Signin() {
  console.log("\n\x1b[34m[pages/signin]\x1b[0m");

  const [state, formAction] = useFormState(signinAction, null);
  const { setIsSignedIn }: any = useContext(Context);
  const router = useRouter();

  // useEffect 훅을 사용하여 상태 변경 및 페이지 이동 처리
  useEffect(() => {
    if (state?.accessToken) {
      // 서버로부터 클라이언트에서 액세스토큰을 받고나서 페이지를 이동해야한다.
      // 서버액션에서 리다이렉팅하게 되면 클라이언트 브라우저 로컬스토리지의 데이터를 설정할 수가 없다.
      // 설정할 수 없는 이유는 서버액션은 서버에서 동작하는 모듈만 사용할 수 있기 때문이다.
      // console.log({ state });
      localStorage.setItem("accessToken", state.accessToken);
      setIsSignedIn(true);
      router.back();
      // router.push("/protected");
    }
  }, [state, setIsSignedIn, router]); // `state`와 `setIsSignedIn`, `router`가 변경될 때마다 이 효과가 실행됩니다.

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
