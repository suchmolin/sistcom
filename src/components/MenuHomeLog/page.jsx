import { SlArrowRight } from "react-icons/sl";

export default function MenuHomeLog(props) {
  const { setCurrentPage, currentPage } = props;

  const classLi =
    " border-b-2 px-5 py-4 flex justify-between hover:bg-gray-200 cursor-pointer items-center";
  return (
    <div
      id="menuList"
      className="absolute md:relative top-0 left-0 z-40 bg-white h-screen hidden md:block w-8/12 md:w-3/12  text-black border-r-2 transition-all ease-in-out delay-150"
    >
      <ul className="">
        <li
          onClick={() => {
            setCurrentPage("inicio");
            document.getElementById("menuList").classList.add("hidden");
          }}
          className={
            currentPage === "inicio" ? "bg-gray-100" + classLi : classLi
          }
        >
          Inicio
          <span className="text-xs">
            <SlArrowRight />
          </span>
        </li>
        <li
          onClick={() => {
            setCurrentPage("agregarmm");
            document.getElementById("menuList").classList.add("hidden");
          }}
          className={
            currentPage === "agregarmm" ? "bg-gray-100" + classLi : classLi
          }
        >
          Agregar MM
          <span className="text-xs">
            <SlArrowRight />
          </span>
        </li>
        <li
          onClick={() => {
            setCurrentPage("finalizados");
            document.getElementById("menuList").classList.add("hidden");
          }}
          className={
            currentPage === "finalizados" ? "bg-gray-100" + classLi : classLi
          }
        >
          Finalizados{" "}
          <span className="text-xs">
            <SlArrowRight />
          </span>
        </li>
        <li
          onClick={() => {
            setCurrentPage("clientes");
            document.getElementById("menuList").classList.add("hidden");
          }}
          className={
            currentPage === "clientes" ? "bg-gray-100" + classLi : classLi
          }
        >
          Clientes
          <span className="text-xs">
            <SlArrowRight />
          </span>
        </li>
        <li
          onClick={() => {
            setCurrentPage("promosGG");
            document.getElementById("menuList").classList.add("hidden");
          }}
          className={
            currentPage === "promosGG" ? "bg-gray-100" + classLi : classLi
          }
        >
          Promos & GG
          <span className="text-xs">
            <SlArrowRight />
          </span>
        </li>
        <li
          onClick={() => {
            setCurrentPage("pagoPromos");
            document.getElementById("menuList").classList.add("hidden");
          }}
          className={
            currentPage === "pagoPromos" ? "bg-gray-100" + classLi : classLi
          }
        >
          Pago Promos
          <span className="text-xs">
            <SlArrowRight />
          </span>
        </li>
        {/*<li
          onClick={() => deslog()}
          className="w-full border-b-2 px-5 py-4 flex justify-between hover:bg-gray-200 cursor-pointer  items-center"
        >
          Cerrar Sesión{" "}
          <span className="text-xs">
            <SlArrowRight />
          </span>
        </li>*/}
      </ul>
    </div>
  );
}
