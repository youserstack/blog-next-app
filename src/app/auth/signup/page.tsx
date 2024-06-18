"use client";

import { useFormState } from "react-dom";
import { signupAction } from "@/app/actions";
import "./page.scss";

export default function Signup() {
  console.log("\n\x1b[34m[/signup]\x1b[0m");

  const [error, action] = useFormState(signupAction, undefined);

  return (
    <main className="signup-page">
      <section>
        <form action={action}>
          <h1>Server-Action</h1>
          <input type="text" name="name" placeholder="name" required />
          <input type="email" name="email" placeholder="email" required />
          <input
            type="password"
            name="password"
            placeholder="password (8자 이상, 하나의 대소문자, 숫자, 특수문자를 포함)"
            required
          />
          <button type="submit">sign up</button>
        </form>
        <p>{error}</p>
      </section>
    </main>
  );
}
