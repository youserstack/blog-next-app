"use client";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signinAction } from "@/app/actions";
import { Box, Button, TextField } from "@mui/material";
import "./page.scss";

export default function Signin() {
  const router = useRouter();

  const [state, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    const { error, accessToken } = await signinAction(formData);

    if (error) {
      return { error };
    } else {
      localStorage.setItem("accessToken", accessToken);
      router.refresh();
      return { accessToken };
    }
  }, null);

  useEffect(() => {
    if (state?.accessToken) router.back();
  }, [state]);

  return (
    <main className="signin-page">
      <section>
        <Box
          component={"form"}
          action={formAction}
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
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
        </Box>
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
