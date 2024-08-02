"use client";

import { CircularProgress } from "@mui/material";
import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";

export default function Loading() {
  const { isLoading }: any = useContext(LoadingContext);

  if (!isLoading) return null;

  return (
    <div
      className="loading"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
}
