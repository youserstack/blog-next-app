"use client";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { Button, Paper, TextField } from "@mui/material";
import { signinAction } from "@/app/actions";

export default function SigninForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(signinAction, null);

  useEffect(() => {
    if (state?.accessToken) {
      localStorage.setItem("accessToken", state.accessToken);
      router.refresh();
    }
  }, [state, router]);

  return (
    <form
      action={formAction}
      style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "5rem" }}
    >
      <input placeholder="email" type="email" name="email" required />
      <input placeholder="password" type="password" name="password" required />
      <button type="submit">sign in</button>
      {state?.error && (
        <>
          <p>{state.error}</p>
          <p>유효한 이메일과 비밀번호를 입력해주세요.</p>
        </>
      )}
    </form>
    // <Paper
    //   component={"form"}
    //   action={formAction}
    //   sx={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "5rem" }}
    // >
    //   <TextField label="email" variant="outlined" type="email" name="email" required />
    //   <TextField label="password" variant="outlined" type="password" name="password" required />
    //   <Button type="submit">sign in</Button>
    //   {state?.error && (
    //     <>
    //       <p>{state.error}</p>
    //       <p>유효한 이메일과 비밀번호를 입력해주세요.</p>
    //     </>
    //   )}
    // </Paper>
  );
}
