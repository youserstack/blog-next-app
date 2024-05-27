"use client";

import { useRouter } from "next/navigation";
import "../../styles/SignOutButton.scss";

export default function SignOutButton() {
  const router = useRouter();

  const signout = async () => {
    const response = await fetch(`${process.env.ROOT_URL}/api/auth/signout`);
    const { message } = await response.json();
    console.log({ message });

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
