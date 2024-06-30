"use client";

import { useContext } from "react";
import { Context } from "@/components/context/Provider";
import "./Loading.scss";

export default function Loading() {
  const { isLoading }: any = useContext(Context);

  if (!isLoading) return null;

  return <div className="loading">Loading...</div>;
}
