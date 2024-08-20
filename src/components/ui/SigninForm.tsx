"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { signinAction } from "@/app/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { validateEmail, validatePassword } from "@/lib/utils/auth";

export default function SigninForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(signinAction, null);

  useEffect(() => {
    if (state?.accessToken) {
      localStorage.setItem("accessToken", state.accessToken);
      router.refresh();
    }
  }, [state]);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailHelperText, setEmailHelperText] = useState<string>("");

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordHelperText, setPasswordHelperText] = useState<string>("");

  return (
    <Box
      component="form"
      action={formAction}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      <TextField
        label="email"
        variant="outlined"
        type="email"
        name="email"
        required
        ref={emailRef}
        error={emailError}
        helperText={emailHelperText}
        onBlur={(e) => {
          const isValid = validateEmail(e.target.value);
          if (!isValid) {
            setEmailError(true);
            setEmailHelperText("유효한 이메일 주소를 입력하세요.");
          } else {
            setEmailError(false);
            setEmailHelperText("");
          }
        }}
      />

      <TextField
        label="password"
        variant="outlined"
        type="password"
        name="password"
        required
        ref={passwordRef}
        error={passwordError}
        helperText={passwordHelperText}
        // helperText={
        //   <h1
        //     style={{
        //       position: "absolute",
        //       border: "1px solid red",
        //       padding: "1rem",
        //       top: "0",
        //       left: "100%",
        //       marginLeft: "1rem",
        //     }}
        //   >
        //     asdasdasd
        //   </h1>
        // }

        onBlur={(e) => {
          const isValid = validatePassword(e.target.value);
          if (!isValid) {
            setPasswordError(true);
            setPasswordHelperText(
              "비밀번호는 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다."
            );
          } else {
            setPasswordError(false);
            setPasswordHelperText("");
          }
        }}
      />

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
    </Box>
  );
}
