"use client";

import { useAuth } from "@/context/AuthContext";
import HomeLog from "../components/HomeLog/page";
import Login from "../components/Login/page";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, isLogged } = useAuth();
  useEffect(() => {
    const checkingLogging = async () => {
      await isLogged();
    };
    checkingLogging();
  }, []);

  return <>{user ? <HomeLog /> : <Login />}</>;
}
