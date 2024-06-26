"use client";

import { useContext } from "react";
import { Context } from "@/components/context/Provider";
import "./SignOutButton.scss";

export default function SignOutButton() {
  const { signout }: any = useContext(Context);

  return (
    <button className="sign-out-button" onClick={signout}>
      sign out
    </button>
  );
}
