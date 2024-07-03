"use client";

import { Box, Button, TextField } from "@mui/material";
import { signupAction } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import "./page.scss";

export default function Signup() {
  const router = useRouter();
  const [state, action] = useFormState(signupAction, null);

  useEffect(() => {
    if (state?.newUser) router.push("/auth/signin");
    if (state?.error) console.error({ error: state.error });
  }, [state, router]);

  return (
    <main className="signup-page">
      <section>
        <Box
          component={"form"}
          action={action}
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <TextField
            id="outlined-basic"
            label="name"
            variant="outlined"
            // default
            type="text"
            name="name"
            required
          />
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
        <p>{state?.error}</p>
      </section>
    </main>
  );
}
