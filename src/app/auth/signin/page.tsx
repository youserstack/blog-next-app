"use client";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signinAction } from "@/app/actions";
import { Box, Button, Paper, TextField } from "@mui/material";
import "./page.scss";

export default function Signin() {
  const router = useRouter();
  const [state, formAction] = useFormState(signinAction, null);

  useEffect(() => {
    if (state?.accessToken) {
      localStorage.setItem("accessToken", state.accessToken);
      router.refresh();
    }
    // if (state?.accessToken) router.back();
  }, [state, router]);

  return (
    <main className="signin-page">
      <section>
        <Paper
          component={"form"}
          action={formAction}
          sx={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "5rem" }}
        >
          <TextField
            id="outlined-basic"
            label="email"
            variant="outlined"
            // default
            type="email"
            name="email"
            required
          />
          <TextField
            id="outlined-basic"
            label="password"
            variant="outlined"
            // default
            type="password"
            name="password"
            required
          />
          <Button type="submit">sign in</Button>
        </Paper>
        {state?.error && (
          <>
            <p>{state.error}</p>
            <p>유효한 이메일과 비밀번호를 입력해주세요.</p>
          </>
        )}
      </section>
    </main>
  );
}
