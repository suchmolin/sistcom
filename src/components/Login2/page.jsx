import "./page.css";
import { FaRegUser } from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";

export default function Login2() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-teal-700 to-white">
      <div className="w-full md:w-full lg:w-9/12 h-full md:h-4/6 shadow-2xl flex bg-white  md:flex-row flex-col">
        <div className="h-5/6 w-full md:w-5/12 flex justify-center items-center">
          <div className="w-full text-center ">
            <form action="">
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
                  id="passUser"
                  placeholder="****************"
                  className="py-1 pl-8 border-b-2 ring-red-500 focus:border-teal-700 focus:outline-none focus:placeholder-show"
                  type="password"
                  required
                />
              </div>
              <button className="px-10 text-white bg-teal-700 py-2 rounded-sm hover:bg-teal-600">
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url("Imagen2.png")`,

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
  );
}
