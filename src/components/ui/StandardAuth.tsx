"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import Link from "next/link";
import { validateEmail, validatePassword } from "@/lib/utils/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function StandardAuth() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [emailHelperText, setEmailHelperText] = useState<string>("");
  const [passwordHelperText, setPasswordHelperText] = useState<string>("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await signIn("credentials", { redirect: false, email, password });

    if (res?.ok && res.status === 200) {
      console.log("로그인성공", { res });
      router.push("/");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const type = e.currentTarget.type;
    const value = e.currentTarget.value;

    if (type === "email") {
      const isValid = validateEmail(value);
      if (!isValid) {
        setEmailError(true);
        setEmailHelperText("유효한 이메일 주소를 입력하세요.");
      } else {
        setEmailError(false);
        setEmailHelperText("");
      }
      return;
    }

    if (type === "password") {
      const isValid = validatePassword(value);
      if (!isValid) {
        setPasswordError(true);
        setPasswordHelperText(
          "비밀번호는 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다."
        );
      } else {
        setPasswordError(false);
        setPasswordHelperText("");
      }
      return;
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
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
        onChange={handleChange}
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
        onChange={handleChange}
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
