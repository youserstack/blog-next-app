"use client";

import { signup } from "@/app/auth/signup/actions";
import { useFormState } from "react-dom";
import { useState } from "react";
import "./page.scss";

export default function Signup() {
  const [error, action] = useFormState(signup, undefined);
  // const [state, action] = useFormState(signup, undefined);
  // console.log({ state });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="signup-page">
      <section>
        {/* server-action 을 사용한 방법 */}
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

        {/* api route 를 사용한 방법 */}
        {/* <form
          onSubmit={async (e) => {
            e.preventDefault();
            console.log({ email, password });
            const response = await fetch("http://localhost:3000/api/signup", {
              method: "post",
              body: JSON.stringify({ email, password }),
              headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            console.log({ data });
          }}
        >
          <h1>API route</h1>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
            required
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
          <button type="submit">submit</button>
        </form> */}
      </section>
    </main>
  );
}
