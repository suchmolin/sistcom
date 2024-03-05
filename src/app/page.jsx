"use client";

import { useAuth } from "@/context/AuthContext";
import HomeLog from "../components/HomeLog/page";
import Login from "../components/Login/page";

export default function Home() {
  const { user } = useAuth();
  /****/
  return <>{user ? <HomeLog /> : <Login />}</>;
}
