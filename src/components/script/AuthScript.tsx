"use client";

import { Context } from "@/components/context/Provider";
import { useContext, useEffect } from "react";

export default function AuthScript({ user }: any) {
  const { setUser }: any = useContext(Context);

  useEffect(() => {
    console.log({ user });
    if (user) setUser(user);
    else setUser(null);
  }, [user, setUser]);

  return null;
}
