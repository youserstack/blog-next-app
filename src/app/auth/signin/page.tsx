"use client";

import { signin } from "@/app/auth/signin/actions";
import { useFormState } from "react-dom";
import "./page.scss";

export default function Signin() {
  const [error, action] = useFormState(signin, undefined);

  return (
    <main className="signin-page">
      <section>
        <form action={action}>
          <input type="email" name="email" placeholder="email" required />
          <input type="password" name="password" placeholder="password" required />
          <button type="submit">sign in</button>
        </form>
        {error && (
          <>
            <p>{error}</p>
            <p>유효한 이메일과 비밀번호를 입력해주세요.</p>
          </>
        )}
      </section>
    </main>
  );
}
