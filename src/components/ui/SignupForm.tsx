"use client";

import { Button, Paper, TextField, Typography } from "@mui/material";
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
      sx={{
        width: "300px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1rem",
        padding: "1rem",
      }}
      variant="elevation"
      elevation={5}
    >
      <Typography variant="h5">회원가입</Typography>
      <TextField label="name" variant="outlined" name="name" required />
      <TextField label="email" variant="outlined" type="email" name="email" required />
      <TextField label="password" variant="outlined" type="password" name="password" required />
      <Button type="submit" variant="contained">
        가입
      </Button>
      <p>{state?.error}</p>
    </Paper>
  );
}
