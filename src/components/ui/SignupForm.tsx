"use client";

import { Button, Paper, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

  return (
    <Paper
      component="form"
      variant="elevation"
      elevation={5}
      onSubmit={async (e) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const response = await fetch(`${process.env.ROOT_URL}/api/v2/auth/signup`, {
          method: "post",
          body: formData,
        });
        const data = await response.json();

        console.log("가입완료", data);
        router.push("/auth/signin");
      }}
      sx={{
        width: "300px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      <Typography variant="h5">회원가입</Typography>
      <TextField label="name" variant="outlined" type="text" name="name" required />
      <TextField label="email" variant="outlined" type="email" name="email" required />
      <TextField label="password" variant="outlined" type="password" name="password" required />
      <Button type="submit" variant="contained">
        가입
      </Button>
    </Paper>
  );
}
