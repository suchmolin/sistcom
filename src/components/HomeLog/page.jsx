"use client";
import "@/app/globals.css";
import HeaderHomeLog from "../HeaderHomeLog/page";
import MenuHomeLog from "../MenuHomeLog/page";
import BodyHomeLog from "../BodyHomeLog/page";
import AgregarMM from "@/components/AgregarMM/page";
import AgregarClientes from "@/components/AgregarClientes/page";
import FinalizadosMM from "../FinalizadosMM/page";
import { useState } from "react";

export default function HomeLog(props) {
  const { userEmail } = props;
  const [currentPage, setCurrentPage] = useState("inicio");

  return (
    <div className="font-Anta">
      <HeaderHomeLog />
      <div className="flex">
        <MenuHomeLog setCurrentPage={setCurrentPage} />
        {currentPage === "agregarmm" ? (
          <AgregarMM />
        ) : currentPage === "inicio" ? (
          <BodyHomeLog />
        ) : currentPage === "clientes" ? (
          <AgregarClientes userEmail={userEmail} />
        ) : currentPage === "finalizados" ? (
          <FinalizadosMM />
        ) : (
          true
        )}
      </div>
    </div>
  );
}
