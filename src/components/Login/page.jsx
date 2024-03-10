"use client";
import HeaderLogin from "@/components/HeaderLogin/page";
import { useAuth } from "@/context/AuthContext";

import { useState } from "react";

export default function Login() {
  const { user } = useAuth;

  const [handleUser, setHandleUser] = useState("");
  const [handlePass, setHandlePass] = useState("");
  const [errorAuth, seterrorAuth] = useState(false);
  const { loginFire } = useAuth();

  const autenticar = async (e) => {
    e.preventDefault();
    const response = await loginFire(handleUser, handlePass);
    if (response && response.operationType === "signIn") {
    }
    if (response && response.code === "auth/invalid-credential") {
      seterrorAuth(true);
    }
  };

  return (
    <div>
      <HeaderLogin />
      <div className="Body flex h-full w-full justify-center items-center font-Anta">
        <div className="LogBox flex jsu items-center flex-col item-center w-11/12 md:w-6/12">
          <div className="LogHeader w-full rounded-t-md flex items-center justify-center mt-28  h-10 bg-teal-700 text-white tracking-widest ">
            Iniciar Sesión
          </div>
          <div className="LogBody w-full border border-teal-700 rounded-b-md shadow-xl">
            <form onSubmit={autenticar} className="my-10 ml-3">
              <div className="flex flex-col my-6 ml-6 w-full">
                <label htmlFor="email">Email </label>
                <input
                  value={handleUser}
                  onChange={(e) => setHandleUser(e.target.value)}
                  type="email"
                  id="email"
                  placeholder="example@email.com"
                  className="pl-5 ring-1 ring-teal-700 w-8/12 rounded-sm mt-1 hover:ring-teal-900 focus:ring-1 focus:ring-blue-950 focus:outline-none"
                />
              </div>
              <div className="flex flex-col my-6 ml-6 w-full">
                <label htmlFor="pass">Contraseña </label>
                <input
                  value={handlePass}
                  onChange={(e) => setHandlePass(e.target.value)}
                  type="password"
                  id="pass"
                  placeholder="**************"
                  className="pl-5 ring-1 ring-teal-700 w-8/12 rounded-sm mt-1 hover:ring-teal-900 focus:ring-1 focus:ring-blue-950 focus:outline-none"
                />
              </div>
              {errorAuth && (
                <p className="text-red-500 ml-6 mb-4">
                  Email y/o contraseña erroneas
                </p>
              )}
              <div className="w-full flex justify-center">
                <button className="p-3 rounded bg-teal-700 text-white hover:bg-teal-600">
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
