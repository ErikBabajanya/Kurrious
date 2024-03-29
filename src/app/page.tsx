"use client";
import React, { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <div>Loading...</div>;
  }
  const { user } = authContext;
  console.log(user);
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
    if (user) {
      router.push("/dashboard");
    }
  });

  return <div className=""></div>;
}
