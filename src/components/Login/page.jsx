import "./page.css";
import { FaRegUser } from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";
import HeaderLogin from "@/components/HeaderLogin/page";
import { useAuth } from "@/context/AuthContext";

import { useState } from "react";

export default function Login2() {
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
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-teal-700 to-white">
        <div className="w-full md:w-full lg:w-9/12 h-full md:h-4/6 shadow-2xl flex bg-white  md:flex-row flex-col">
          <div className="h-5/6 w-full md:w-5/12 flex justify-center items-center">
            <div className="w-full text-center ">
              <form onSubmit={autenticar} action="">
                <h2
                  style={{ fontFamily: "Anta" }}
                  className="font-bold tracking-wider text-teal-700 text-xl mb-6"
                >
                  USER LOGIN
                </h2>
                <div className="flex justify-center items-center mb-6 w-full">
                  <label
                    htmlFor="emailUser"
                    className="-mr-6 z-10 text-teal-700 font-bold"
                  >
                    <FaRegUser />
                  </label>
                  <input
                    value={handleUser}
                    onChange={(e) => setHandleUser(e.target.value)}
                    id="emailUser"
                    placeholder="user.email@gmail.com"
                    className="py-1 pl-8 border-b-2 ring-red-500 focus:border-teal-700 focus:outline-none focus:placeholder-show"
                    type="email"
                    required
                  />
                </div>
                <div className="flex justify-center items-center mb-6 w-full">
                  <label
                    htmlFor="emailUser"
                    className="-mr-6 z-10 text-teal-700 font-bold"
                  >
                    <GiPadlock />
                  </label>
                  <input
                    value={handlePass}
                    onChange={(e) => setHandlePass(e.target.value)}
                    id="passUser"
                    placeholder="****************"
                    className="py-1 pl-8 border-b-2 ring-red-500 focus:border-teal-700 focus:outline-none focus:placeholder-show"
                    type="password"
                    required
                  />
                </div>
                {errorAuth && (
                  <p className="text-red-500 ml-6 mb-4">
                    Email y/o contraseña erroneas
                  </p>
                )}
                <button className="px-10 text-white bg-teal-700 py-2 rounded-sm hover:bg-teal-600">
                  Iniciar Sesión
                </button>
              </form>
            </div>
          </div>
          <div
            style={{
              backgroundImage: `url("Imagen2.png")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              fontFamily: "Anta",
            }}
            className="w-full md:w-7/12 h-full flex flex-col items-center"
          >
            <div className="w-full  flex justify-center ">
              <img width={200} height={200} src="logo.png" alt="logoSISTCOM" />
            </div>
            <div className="w-full text-center">
              <h3 className="text-white text-3xl">Welcome To SistCom</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
