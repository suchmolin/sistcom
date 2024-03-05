import { SlArrowRight } from "react-icons/sl";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function MenuHomeLog(props) {
  const { logout } = useAuth();
  const router = useRouter();
  //if (!user) redirect("/login");

  const setCurrentPage = props.setCurrentPage;
  const changeMenu = (e) => {
    setCurrentPage(e.target.id);
  };
  const deslog = () => {
    logout();
  };
  return (
    <div className="relative h-screen hidden md:block md:w-3/12  text-black border-r-2 ">
      <ul className="">
        <li
          id="inicio"
          onClick={changeMenu}
          className="bg-gray-100 border-b-2 px-5 py-4 flex justify-between hover:bg-gray-200 cursor-pointer items-center"
        >
          Inicio
          <span className="text-xs">
            <SlArrowRight />
          </span>
        </li>
        <li
          id="agregarmm"
          onClick={changeMenu}
          className="border-b-2 px-5 py-4 flex justify-between hover:bg-gray-200 cursor-pointer  items-center"
        >
          Agregar MM
          <span className="text-xs">
            <SlArrowRight />
          </span>
        </li>
        <li
          id="finalizados"
          onClick={changeMenu}
          className="border-b-2 px-5 py-4 flex justify-between hover:bg-gray-200 cursor-pointer  items-center"
        >
          Finalizados{" "}
          <span className="text-xs">
            <SlArrowRight />
          </span>
        </li>
        <li
          id="clientes"
          onClick={changeMenu}
          className="border-b-2 px-5 py-4 flex justify-between hover:bg-gray-200 cursor-pointer  items-center"
        >
          Clientes
          <span className="text-xs">
            <SlArrowRight />
          </span>
        </li>
        <li
          onClick={() => deslog()}
          className="w-full border-b-2 px-5 py-4 flex justify-between hover:bg-gray-200 cursor-pointer  items-center"
        >
          Cerrar Sesión{" "}
          <span className="text-xs">
            <SlArrowRight />
          </span>
        </li>
      </ul>
    </div>
  );
}
