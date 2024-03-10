"use client";
import { useAuth } from "@/context/AuthContext";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

export default function HeaderHomeLog() {
  const { user } = useAuth();
  const [menu, setMenu] = useState(false);
  const { logout } = useAuth();

  const toggleMenu = () => {
    const menuTag = document.getElementById("menuList");

    if (menuTag.classList.contains("hidden")) {
      menuTag.classList.remove("hidden");
      setMenu(true);
    } else {
      menuTag.classList.add("hidden");
      setMenu(false);
    }
  };

  const toggleUserMenu = () => {
    const menuTag = document.getElementById("UserMenu");

    if (menuTag.classList.contains("hidden")) {
      menuTag.classList.remove("hidden");
      setMenu(true);
    } else {
      menuTag.classList.add("hidden");
      setMenu(false);
    }
  };
  const deslog = () => {
    logout();
  };

  return (
    <div className="w-full relative flex items-center justify-center h-14 bg-teal-700">
      <span
        onClick={toggleMenu}
        className="absolute left-0 md:hidden ml-5 text-white text-2xl cursor-pointer border-2 border-teal-700 hover:border-2 hover:border-white hover:rounded-md p-1"
      >
        <MdMenu />
      </span>
      <h1 className="headerHomeLog flex text-2xl text-white tracking-widest shadow-xl">
        SISTCOM
      </h1>
      <div
        onClick={toggleUserMenu}
        className="absolute right-0 md:text-sm h-full z-40 cursor-pointer "
      >
        <div className="w-full text-white h-full relative flex items-center pr-1 border-b-2 border-b-teal-700 hover:border-b-2 hover:border-b-white">
          <p className="w-ful hidden md:block pl-2"> {user.email}</p>{" "}
          <span className="md:hidden text-white w-full pl-3">
            <FaRegUser />
          </span>
          <span className="text-white text-xl pt-1">
            <IoMdArrowDropdown />
          </span>
          <div
            id="UserMenu"
            className="absolute bottom-0 hidden -right-2 -mb-32 md:-mb-14 w-56 md:w-full bg-white"
          >
            <p className="w-ful md:hidden border-b-2 px-4 py-4 items-center text-black">
              {" "}
              {user.email}
            </p>{" "}
            <p
              onClick={() => deslog()}
              className="border-b-2 px-4 py-4 hover:bg-gray-50 cursor-pointer  items-center text-black"
            >
              Cerrar Sesion
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
