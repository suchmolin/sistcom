"use client";
import appFirebase from "@/firebase/firebase.config";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    console.log("error creando auth context");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [state, setState] = useState({ error: null, user: null, logged: null });
  const { error, user, logged } = state;

  const loginFire = async (email, password) => {
    const auth = getAuth(appFirebase);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      setState((prevState) => ({ ...prevState, user: response.user }));
      return response;
    } catch (e) {
      setState((prevState) => ({ ...prevState, error: e }));
      return e;
    }
  };
  const logout = async () => {
    setState((prevState) => ({ ...prevState, user: null }));
    const auth = getAuth(appFirebase);
    await signOut(auth);
  };
  const isLogged = async () => {
    const auth = getAuth(appFirebase);
    await onAuthStateChanged(auth, (data) => {
      if (data) {
        setState((prevState) => ({ ...prevState, user: data }));
      }
    });
  };
  return (
    <authContext.Provider value={{ loginFire, logout, error, user, isLogged }}>
      {children}
    </authContext.Provider>
  );
}
