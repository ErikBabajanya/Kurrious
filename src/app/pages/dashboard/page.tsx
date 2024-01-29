"use client";
import React, { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Page() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <div>Loading...</div>;
  }
  const { user } = authContext;

  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
    if (user) {
      router.push("/pages/dashboard");
    }
  });
  return <h1>Hello, Dashboard Page!</h1>;
}
