"use client";

import { Context } from "@/components/context/Provider";
import { useContext, useEffect } from "react";

export default function AuthScript({ user }: any) {
  const { setIsSignedIn }: any = useContext(Context);

  useEffect(() => {
    // console.log({ user });
    if (user) setIsSignedIn(true);
    else setIsSignedIn(false);
  }, [user]);

  return null;
}
