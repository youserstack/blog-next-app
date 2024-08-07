"use client";

import { Button, Paper, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { signinAction } from "@/app/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <Paper
      component={"form"}
      action={formAction}
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
      <Typography variant="h5">계정 로그인</Typography>
      <TextField label="email" variant="outlined" type="email" name="email" required />
      <TextField label="password" variant="outlined" type="password" name="password" required />
      <Button type="submit" variant="contained">
        로그인
      </Button>
      {state?.error && (
        <>
          <p>{state.error}</p>
          <p>유효한 이메일과 비밀번호를 입력해주세요.</p>
        </>
      )}
      <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
        계정이 없으신가요?<Link href="/auth/signup">회원가입</Link>
      </Typography>
    </Paper>
  );
}
