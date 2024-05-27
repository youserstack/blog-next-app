"use client";

import { signin } from "@/app/auth/signin/actions";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import "./page.scss";

export default function Signin() {
  const [state, signinAction]: any = useFormState(signin, undefined);
  const router = useRouter();

  if (state?.status === "ok") {
    // 서버로부터 클라이언트에서 액세스토큰을 받고나서 페이지를 이동해야한다.
    // 서버액션에서 리다이렉팅하게 되면 클라이언트 브라우저 로컬스토리지의 데이터를 설정할 수가 없다.
    // 설정할 수 없는 이유는 서버액션은 서버에서 동작하는 모듈만 사용할 수 있기 때문이다.
    localStorage.setItem("accessToken", state.accessToken);
    router.push("/protected");
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
