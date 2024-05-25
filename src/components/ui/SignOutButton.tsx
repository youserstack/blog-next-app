"use client";

import { useRouter } from "next/navigation";
import "../../styles/SignOutButton.scss";

export default function SignOutButton() {
  const router = useRouter();

  const signout = async () => {
    // Send to api route
    const response = await fetch(`/api/auth/signout`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    console.log("로그아웃 결과 : ", { result });

    if (response.ok) {
      localStorage.removeItem("accessToken");
      router.push("/auth/signin");
      router.refresh();
    } else {
      console.log("faild signout");
    }
  };

  return (
    <button className="sign-out-button" onClick={signout}>
      sign out
    </button>
  );
}
