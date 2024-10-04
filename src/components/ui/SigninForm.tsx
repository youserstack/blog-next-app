"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import Link from "next/link";
import { validateEmail, validatePassword } from "@/lib/utils/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SigninForm() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [emailHelperText, setEmailHelperText] = useState<string>("");
  const [passwordHelperText, setPasswordHelperText] = useState<string>("");

  const [error, setError] = useState("");

  const router = useRouter();

  return (
    <Box
      component="form"
      onSubmit={async (e) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const email = formData.get("email");
        const password = formData.get("password");
        // console.log({ email, password });

        const res = await signIn("credentials", { redirect: false, email, password });
        console.log({ res });

        if (!res?.error) {
          // window.location.href = "/"; // 로그인 성공 시 원하는 페이지로 리디렉션
          console.log("로그인성공");
        } else {
          setError("Invalid email or password");
        }
      }}
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
        onChange={(e) => {
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

        onChange={(e) => {
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
      {error && <p>{error}</p>}

      <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
        계정이 없으신가요?<Link href="/auth/signup">회원가입</Link>
      </Typography>
    </Box>
  );
}
