"use client";

import { Button, Paper, TextField } from "@mui/material";
import { signupAction } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { useEffect } from "react";

export default function SignupForm() {
  const router = useRouter();
  const [state, action] = useFormState(signupAction, null);

  useEffect(() => {
    if (state?.newUser) router.push("/auth/signin");
    if (state?.error) console.error({ error: state.error });
  }, [state, router]);

  return (
    <Paper
      component={"form"}
      action={action}
      sx={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "5rem" }}
      variant="outlined"
    >
      <TextField label="name" variant="outlined" name="name" required />
      <TextField label="email" variant="outlined" type="email" name="email" required />
      <TextField label="password" variant="outlined" type="password" name="password" required />
      <Button type="submit">sign in</Button>
      <p>{state?.error}</p>
    </Paper>
  );
}
