"use client";

import { Button } from "@mui/material";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { SiKakaotalk, SiNaver } from "react-icons/si";

const items = [
  { id: "google", icon: <FcGoogle size={"1rem"} />, label: "구글로 로그인" },
  { id: "naver", icon: <SiNaver size={"0.8rem"} color="#03c75a" />, label: "네이버로 로그인" },
  { id: "kakao", icon: <SiKakaotalk size={"0.9rem"} color="#fee500" />, label: "카카오로 로그인" },
];

export default function Oauth() {
  return (
    <div
      className="오픈인증"
      style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      {items.map((item) => (
        <Button
          variant="contained"
          key={item.id}
          onClick={async () => await signIn(item.id, { redirect: true, callbackUrl: "/" })}
          sx={{ display: "flex", gap: "0.5rem" }}
        >
          {item.icon}
          {item.label}
        </Button>
      ))}
    </div>
  );
}
